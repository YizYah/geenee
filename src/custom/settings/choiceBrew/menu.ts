import {createMenuOptions} from './createMenuOptions'
import {Choice, ChoicesGenerator, FlowType} from './types'
import {menuQuestionName} from './constants'
const inquirer = require('inquirer')

async function makeSelection(menuOptions: any) {
  const rawSelection = await inquirer.prompt(menuOptions)
  return rawSelection[menuQuestionName]
}

export async function menu(
  choicesGenerator: ChoicesGenerator,
  prompt: string,
  context: any,
) {
  const choices: Choice[] = choicesGenerator(context)
  const menuOptions = createMenuOptions(choices, prompt)

  try {
    let selection = await makeSelection(menuOptions)
    while (selection) {
      if (selection.flow === FlowType.back) {
        return context
      }
      if (selection.callback) {
        context = await selection.callback(context, selection.value)
      }
      selection = await makeSelection(createMenuOptions(choicesGenerator(context), prompt))
    }
  } catch (error) {
    throw new Error(`in menu: ${error}`)
  }
}
