import {Configuration, NsInfo} from 'magicalstrings'
import {ChoicesGenerator, FlowType, StaticContext} from './choiceBrew/types'
import {menu} from './choiceBrew/menu'
import {Choice} from './choiceBrew/types'
import {staticSettings} from './staticSettings'
import {types} from './types'
import {updateSpecSubtree} from './specs/updateSpecSubtree'

const {generalOption} = require('magicalstrings').constants.chalkColors

const setNsInfo = require('magicalstrings').nsFiles.setNsInfo
const {answerValues} = require('magicalstrings').constants

async function staticData(context: StaticContext, selection: any): Promise<StaticContext> {
  console.log(`selection=${JSON.stringify(selection)}`)
  const {config, nsInfo, codeDir} = context
  context = await staticSettings(
    config, nsInfo, codeDir,
  )
  await setNsInfo(codeDir, context.nsInfo)
  return context
}

async function generalData(context: StaticContext) {
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

function choicesGenerator(): Choice[] {
  return choices
}

export async function settingsMenu(
  config: Configuration,
  nsInfo: NsInfo,
  codeDir: string,
) {
  const context: StaticContext = {
    config,
    nsInfo,
    codeDir,
  }
  try {
    await menu(
      choicesGenerator, prompt, context,
    )
  } catch (error) {
    throw new Error(`in settings menu: ${error}`)
  }
}
