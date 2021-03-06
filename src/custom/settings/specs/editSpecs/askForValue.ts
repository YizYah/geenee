import {extendedDescription} from './extendedDescription'
import {Specs} from 'magicalstrings'
import {replaceGlobalObjectValues} from './replaceGlobalObjectValues'
const {attention} = require('magicalstrings').constants.chalkColors

export function askForValue(
  specsForInstance: any,
  specsForType: Specs,
  currentName: string,
  questionName: string,
  session: any,
) {
  const name = questionName

  const {type, description, choices, required} = specsForType
  const defaultAnswer = specsForInstance || replaceGlobalObjectValues(
    specsForType.default, session, {}
  )
  let fullDescription = '[' + extendedDescription(currentName, description) + ']'
  if (required) fullDescription += attention('*')
  if (type === 'boolean') {
    return {
      type: 'confirm',
      name,
      message: `is ${currentName} true? ${fullDescription}`,
      default: defaultAnswer,
    }
  }
  if (choices) {
    return {
      type: 'list',
      name,
      message: `choose value of ${currentName} ${fullDescription}`,
      choices,
      default: defaultAnswer,
    }
  }

  const questionInfo: any = {
    type: 'input',
    name,
    message: `enter value of ${currentName} ${fullDescription}`,
    default: defaultAnswer,
  }

  if (required)
    questionInfo.validate = function (value: any) {
      if (value) {
        return true
      }
      return attention(`${currentName} is required.`) + ' Please enter value:'
    }
  return questionInfo
}
