import {Configuration, NsInfo} from 'magicalstrings'
import {expect} from '@oclif/test'
import {afterEach, beforeEach} from 'mocha'
import {staticSettings} from '../../src/custom/settings/staticSettings'
import * as chooseStaticTypeModule from '../../src/custom/settings/chooseStaticType'
import * as updateStaticTypeInstancesModule from '../../src/custom/settings/instances/updateStaticTypeInstances'

const {getConfig} = require('magicalstrings').configs
const {getNsInfo} = require('magicalstrings').nsFiles

const {menuChoices} = require('magicalstrings').constants

const sinon = require('sinon')

let currentStep: number
const chooseStaticTypeMock = async (config: Configuration) => {
  // simple stepper. will quit if current step is anything but 1.
  if (currentStep === 1) {
    currentStep = 2
    const staticTypes = config.static
    const staticTypeNames = Object.keys(staticTypes)
    return Promise.resolve(staticTypeNames[0])
  }
  return Promise.resolve(menuChoices.QUIT)
}

const updateStaticTypeInstancesMock = async (staticType: string, config: Configuration, nsInfo: NsInfo) => {
  const sampleInstance = {
    slug: 'sample',
    specs: {},
  }
  if (nsInfo.static && nsInfo.static.command)
    nsInfo.static[staticType].sample = sampleInstance
}

describe('static settings exits properly', async () => {
  let chooseStaticTypeStub: any
  let updateStaticTypeInstancesStub: any
  beforeEach(() => {
    chooseStaticTypeStub =
      sinon.stub(chooseStaticTypeModule, 'chooseStaticType')
      .callsFake(chooseStaticTypeMock)
    updateStaticTypeInstancesStub =
      sinon.stub(updateStaticTypeInstancesModule, 'updateStaticTypeInstances')
      .callsFake(updateStaticTypeInstancesMock)
  })

  afterEach(() => {
    chooseStaticTypeStub.restore()
    updateStaticTypeInstancesStub.restore()
  })

  it('should quit from staticSettings', async () => {
    currentStep = 2
    const mockTemplateDir = `${__dirname}/data`
    const config: Configuration = await getConfig(mockTemplateDir)
    const nsInfo: NsInfo = await getNsInfo(mockTemplateDir)
    const originalSettings = JSON.parse(JSON.stringify(nsInfo))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const output = await staticSettings(
      config, nsInfo, ''
    )
    expect(output).to.deep.equal(originalSettings.static)
  })

  it('should update staticSettings', async () => {
    currentStep = 1
    const mockTemplateDir = `${__dirname}/data`
    const config: Configuration = await getConfig(mockTemplateDir)
    const nsInfo: NsInfo = await getNsInfo(mockTemplateDir)
    const originalSettings = JSON.parse(JSON.stringify(nsInfo))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const output = await staticSettings(
      config, nsInfo, ''
    )
    expect(output).to.not.equal(originalSettings.static)

    // check that an existing old command still exists
    // @ts-ignore
    expect(output.command.new).to.exist
    // @ts-ignore
    expect(output.command.new).to.deep.equal(originalSettings.static.command.new)
  })
})
