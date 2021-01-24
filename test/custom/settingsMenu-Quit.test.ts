// import {settingsMenu} from '../../src/custom/settings/settingsMenu'
// import {DONE} from '../../src/custom/settings/types'
//
// import {Configuration, NsInfo} from 'magicalstrings'
// const {questionNames} = require('magicalstrings').constants
// import {expect} from '@oclif/test'
// import {afterEach, beforeEach} from 'mocha'
//
// const {getConfig} = require('magicalstrings').configs
// const {getNsInfo} = require('magicalstrings').nsFiles
// const menu = require('../../src/custom/settings/choiceBrew/menu').menu
//
// describe('settings exits properly', async () => {
//   let backup: any
//
//   beforeEach(() => {
//     backup = inquirer.prompt
//   })
//   afterEach(() => {
//     inquirer.prompt = backup
//   })
//
//   it('should quit', async () => {
//     const mockTemplateDir = `${__dirname}/data`
//     const config: Configuration = await getConfig(mockTemplateDir)
//     const nsInfo: NsInfo = await getNsInfo(mockTemplateDir)
//     inquirer.prompt = async () => Promise.resolve({[questionNames.SETTINGS_TYPE]: DONE})
//     const output = await settingsMenu(
//       config, nsInfo, ''
//     )
//     expect(output).to.deep.equal(nsInfo)
//   })
// })
