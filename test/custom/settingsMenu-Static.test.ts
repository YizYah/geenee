import {settingsMenu} from '../../src/custom/settings/settingsMenu'
import {DONE} from '../../src/custom/settings/types'
import * as staticSettingsModule from '../../src/custom/settings/staticSettings'
import {Configuration, NsInfo} from 'magicalstrings'
import {expect} from '@oclif/test'
import {afterEach, beforeEach} from 'mocha'
const {answerValues, questionNames} = require('magicalstrings').constants
const inquirer = require('inquirer')
const sinon = require('sinon')
const {getConfig} = require('magicalstrings').configs
const {getNsInfo} = require('magicalstrings').nsFiles

const staticSettingsMock = async (config: Configuration, nsInfo: NsInfo) => {
  const sampleString =
    Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 10)
  if (nsInfo.static)
    nsInfo.static.command[sampleString] = {
      slug: sampleString,
      specs: {},
    }
  return nsInfo.static
}

let currentStep: number
const inquirerPromptMock = async () => {
  if (currentStep === 1) {
    currentStep = 2
    return Promise.resolve({[questionNames.SETTINGS_TYPE]: answerValues.settingsTypes.STATIC})
  }
  return Promise.resolve({[questionNames.SETTINGS_TYPE]: DONE})
}

describe('static settings update', async () => {
  let staticSettingsStub: any
  let inquirerPromptStub: any
  beforeEach(() => {
    staticSettingsStub = sinon.stub(staticSettingsModule, 'staticSettings').callsFake(staticSettingsMock)
    inquirerPromptStub = sinon.stub(inquirer, 'prompt').callsFake(inquirerPromptMock)
  })

  afterEach(() => {
    staticSettingsStub.restore()
    inquirerPromptStub.restore()
  })

  it('should set static', async () => {
    const mockTemplateDir = `${__dirname}/data`
    const config: Configuration = await getConfig(mockTemplateDir)
    const nsInfo: NsInfo = await getNsInfo(mockTemplateDir)
    const originalSettings = JSON.parse(JSON.stringify(nsInfo))

    currentStep = 1
    const output = await settingsMenu(
      config, nsInfo, ''
    )
    expect(output.general).to.deep.equal(originalSettings.general)
    expect(output.units).to.deep.equal(originalSettings.units)
    expect(output.static).to.not.equal(originalSettings.static)
  })
})
