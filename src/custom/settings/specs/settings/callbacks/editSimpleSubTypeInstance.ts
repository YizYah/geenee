import {EditInstanceContext, SetContext} from '../contexts'
import {MenuAnswers} from '../../../choiceBrew/types'
import {menuQuestionName} from '../../../choiceBrew/constants'
import {askForValue} from '../../editSpecs/askForValue'
import {EDIT, types} from '../../../types'
import {simpleValueEdit} from '../../editSpecs/simpleValueEdit'

const inquirer = require('inquirer')

export async function editSimpleSubTypeInstance(context: EditInstanceContext, answers: MenuAnswers): Promise<SetContext> {
  const {specsForInstance, specsForType, currentName, type, session} = context
  const {value} = answers[menuQuestionName]
  const currentSimpleSubtype = value.name
  console.log(`in editSimpleSubTypeInstance: ${currentName}.  currentSimpleSubtype=${currentSimpleSubtype}`)
  console.log(`in editSimpleSubTypeInstance: ${currentName}.  specsForType=${JSON.stringify(specsForType)}`)
  try {
    const {type} = specsForType
    let currentSpecsObject = specsForType
    if (type !== types.TOP_LEVEL && specsForType.contents)
      currentSpecsObject = specsForType.contents
    const currentSpecsForType = currentSpecsObject[currentSimpleSubtype]
    const currentSpecsForInstance = specsForInstance[currentSimpleSubtype]

    const questions = [
      askForValue(
        currentSpecsForInstance, currentSpecsForType, currentSimpleSubtype, EDIT, session
      ),
    ]

    const editAnswers = await inquirer.prompt(questions)

    context.specsForInstance[currentSimpleSubtype] = simpleValueEdit(type, editAnswers[EDIT])
  } catch (error) {
    throw new Error(`in editing a simple subtype instance: ${error}`)
  }

  return context
}
