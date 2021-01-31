import {EditInstanceContext, SetContext} from '../contexts'
import {MenuAnswers} from 'choicebrew'
import {askForValue} from '../../editSpecs/askForValue'
import {EDIT, types} from '../../../types'
import {simpleValueEdit} from '../../editSpecs/simpleValueEdit'

const {getValue} = require('choicebrew').functions
const inquirer = require('inquirer')

export async function editSimpleSubTypeInstance(context: EditInstanceContext, answers: MenuAnswers): Promise<SetContext> {
  const {specsForInstance, specsForType, session} = context
  const value = getValue(answers)
  const currentSimpleSubtype = value.name

  try {
    const {type} = specsForType
    let currentSpecsObject: any = specsForType
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
