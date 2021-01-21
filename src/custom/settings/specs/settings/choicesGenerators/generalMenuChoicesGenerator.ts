import {Choice, FlowType} from '../../../choiceBrew/types'

import {generalCallback} from '../callbacks/generalCallback'
import {staticCallback} from '../callbacks/staticCallback'

const {generalOption} = require('magicalstrings').constants.chalkColors
const {answerValues} = require('magicalstrings').constants

export function generalMenuChoicesGenerator(): Choice[] {
  const choices: Choice[] =
    [
      {
        flow: FlowType.command,
        name: 'General',
        description: generalOption('General'),
        value: answerValues.settingsTypes.GENERAL,
        callback: generalCallback,
      },
      {
        flow: FlowType.command,
        name: 'Static',
        description: generalOption('Static'),
        value: answerValues.settingsTypes.STATIC,
        callback: staticCallback,
      },
    ]
  return choices
}
