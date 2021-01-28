import {MenuAnswers} from 'choicebrew'
import {Specs, SpecSet} from 'magicalstrings'
import {updateSpecSubtree} from '../../updateSpecSubtree'
import {types} from '../../../types'
import {SetContext} from '../contexts'
const {getValue} = require('choicebrew')

async function updateList(
  answers: MenuAnswers,
  specsForInstance: any,
  specsForType: Specs | SpecSet,
  currentName: string,
  session: any,
) {
  // in a list, the index is used rather than the name
  const {name, index} = getValue(answers)
  // @ts-ignore
  const specsForChildInstance = specsForInstance[index]
  const specsForChildType = {...specsForType}
  specsForChildType.type = types.SET

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const newSpecsForChildInstance = await updateSpecSubtree(
    specsForChildInstance,
    specsForChildType,
    types.SET,
    currentName + '-->' + name,
    false,
    session,
  )

  if (index) {
    if (newSpecsForChildInstance)
      specsForInstance[index] = newSpecsForChildInstance
    else {
      specsForInstance.splice(index, 1)
    }
  }
}

async function updateSet(
  answers: MenuAnswers,
  specsForInstance: any,
  specsForType: Specs | SpecSet,
  currentName: string,
  topLevel = false,
  session: any,
) {
  const {name, typeOfValue, required} = getValue(answers)

  const specsForChildInstance = specsForInstance[name]
  // @ts-ignore
  const specsForChildType: Specs = topLevel ? specsForType[name] : specsForType.contents[name]

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  specsForInstance[name] = await updateSpecSubtree(
    specsForChildInstance,
    specsForChildType,
    typeOfValue,
    currentName + '-->' + name,
    required || false,
    session,
  )
}

export async function editSubtype(context: SetContext, answers: MenuAnswers): Promise<SetContext> {
  const {
    specsForInstance,
    specsForType,
    currentName,
    type,
    session,
  } = context

  if (type === types.LIST) {
    await updateList(
      answers, specsForInstance, specsForType, currentName, session
    )
  }

  if (type === types.SET || type === types.TOP_LEVEL) {
    await updateSet(
      answers,
      specsForInstance,
      specsForType,
      currentName,
      type === types.TOP_LEVEL,
      session,
    )
  }

  return context
}
