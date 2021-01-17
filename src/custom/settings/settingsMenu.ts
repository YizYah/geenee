import {Configuration, NsInfo} from 'magicalstrings'
import {FlowType} from './choiceBrew/types'
import {menu} from './choiceBrew/menu'
import {Choice} from './choiceBrew/types'
import {staticSettings} from './staticSettings'
import {types} from './types'
import {updateSpecSubtree} from './specs/updateSpecSubtree'

const {generalOption} = require('magicalstrings').constants.chalkColors

const setNsInfo = require('magicalstrings').nsFiles.setNsInfo
const {answerValues} = require('magicalstrings').constants

async function staticData(context: any) {
  const {config, nsInfo, codeDir} = context
  const nsInfoStatic = await staticSettings(
    config, nsInfo, codeDir,
  )
  nsInfo.static = nsInfoStatic
  await setNsInfo(codeDir, nsInfo)
  return context
}

async function generalData(context: any) {
  const {config, nsInfo, codeDir} = context
  const nsInfoGeneral = await updateSpecSubtree(
    nsInfo.general,
    config.general,
    types.TOP_LEVEL,
    'general settings',
    true,
  )

  nsInfo.general = nsInfoGeneral
  await setNsInfo(codeDir, nsInfo)
  return context
}

const prompt = 'What settings would you like to change?'
const choices: Choice[] =
  [
    {
      flow: FlowType.command,
      name: 'General',
      description: generalOption('General'),
      value: answerValues.settingsTypes.GENERAL,
      callback: generalData,
    },
    {
      flow: FlowType.command,
      name: 'Static',
      description: generalOption('Static'),
      value: answerValues.settingsTypes.STATIC,
      callback: staticData,
    },
  ]

export async function settingsMenu(
  config: Configuration,
  nsInfo: NsInfo,
  codeDir: string,
) {
  const context = {
    config,
    nsInfo,
    codeDir,
  }
  try {
    await menu(
      choices, prompt, context,
    )
  } catch (error) {
    throw new Error(`in settings menu: ${error}`)
  }
}
