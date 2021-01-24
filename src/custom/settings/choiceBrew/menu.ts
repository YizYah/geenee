import {createMenuOptions} from './createMenuOptions'
import {Choice, ChoicesGenerator, FlowType} from './types'
import {menuQuestionName} from './constants'
const inquirer = require('inquirer')

// async function makeSelection(menuOptions: any) {
//   const rawSelection = await inquirer.prompt(menuOptions)
//   return rawSelection[menuQuestionName]
// }

const DEBUG_MODE = true
let DEBUG_LOCATION = ''

async function askQuestions(
  context: any, prompt: string, choicesGenerator: ChoicesGenerator
) {
  DEBUG_LOCATION = 'about to create choices'
  const choices: Choice[] = choicesGenerator(context)
  DEBUG_LOCATION = 'created choices:'
  const menuOptions = createMenuOptions(choices, prompt)
  DEBUG_LOCATION = 'created options'
  return inquirer.prompt(menuOptions)
}

export async function menu(
  choicesGenerator: ChoicesGenerator,
  prompt: string,
  context: any,
) {
  try {
    DEBUG_LOCATION = 'before ask'
    let answers = await askQuestions(
      context, prompt, choicesGenerator
    )
    let selection = answers[menuQuestionName]

    while (selection) {
      DEBUG_LOCATION = 'beginning of selection loop'
      if (selection.flow === FlowType.back) {
        return context
      }

      DEBUG_LOCATION = 'before callback'
      if (selection.callback) {
        context = await selection.callback(context, answers)
      }

      DEBUG_LOCATION = 'after callback'
      // check a second time. That will see whether the callback mutated 'selection.flow'
      if (answers[menuQuestionName].flow === FlowType.back) {
        return context
      }

      // ask again
      DEBUG_LOCATION = 'before asking again'
      answers = await askQuestions(
        context, prompt, choicesGenerator
      )
      selection = answers[menuQuestionName]
    }
  } catch (error) {
    if (DEBUG_MODE) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
    throw new Error(`in menu with prompt: "${prompt}" in location '${DEBUG_LOCATION}'`)
  }
}
