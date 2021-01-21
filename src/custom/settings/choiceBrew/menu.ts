import {createMenuOptions} from './createMenuOptions'
import {Choice, ChoicesGenerator, FlowType} from './types'
import {menuQuestionName} from './constants'
const inquirer = require('inquirer')

// async function makeSelection(menuOptions: any) {
//   const rawSelection = await inquirer.prompt(menuOptions)
//   return rawSelection[menuQuestionName]
// }

async function askQuestions(
  context: any, prompt: string, choicesGenerator: ChoicesGenerator
) {
  const choices: Choice[] = choicesGenerator(context)
  const menuOptions = createMenuOptions(choices, prompt)
  return inquirer.prompt(menuOptions)
}

export async function menu(
  choicesGenerator: ChoicesGenerator,
  prompt: string,
  context: any,
) {
  // try {
  let answers = await askQuestions(
    context, prompt, choicesGenerator
  )
  let selection = answers[menuQuestionName]
  while (selection) {
    if (selection.flow === FlowType.back) {
      return context
    }

    if (selection.callback) {
      context = await selection.callback(context, answers)
    }

    // check a second time. That will see whether the callback mutated 'selection.flow'
    if (answers[menuQuestionName].flow === FlowType.back) {
      return context
    }

    // ask again
    answers = await askQuestions(
      context, prompt, choicesGenerator
    )
    selection = answers[menuQuestionName]
  }
  // } catch (error) {
  //   throw new Error(`in menu: ${error}`)
  // }
}
