import {createMenuOptions} from './createMenuOptions'
import {Choice, FlowType} from './types'
import {menuQuestionName} from './constants'
const inquirer = require('inquirer')

async function makeSelection(menuOptions: any) {
  const rawSelection = await inquirer.prompt(menuOptions)
  return rawSelection[menuQuestionName]
}

export async function menu(
  choices: Choice[],
  prompt: string,
  context: any,
) {
  const menuOptions = createMenuOptions(
    choices, prompt, context
  )
  console.log(`menuOptions is: ${JSON.stringify(menuOptions, null, 1)}`)

  try {
    let selection = await makeSelection(menuOptions)
    while (selection) {
      if (selection.flow === FlowType.back) {
        return context
      }
      console.log(`selection is: ${JSON.stringify(selection)}`)
      if (selection.callback) {
        console.log(`selection.callback is ${JSON.stringify(selection.callback)}`)
        context = await selection.callback(context)
      }
      selection = await makeSelection(menuOptions)
    }
  } catch (error) {
    throw new Error(`in menu: ${error}`)
  }
}
