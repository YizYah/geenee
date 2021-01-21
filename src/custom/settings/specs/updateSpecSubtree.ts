import {Specs, SpecSet} from 'magicalstrings'
// import {getQuestionsForSpecSubtree} from './editSpecs/getQuestionsForSpecSubtree'
// import {ADD_NEW, AnswersForStaticInstanceSpec, DELETE, DONE, EDIT, EDIT_OPTIONS, TO_EDIT, types} from '../types'
import {types} from '../types'
// import {addNewSpecElement} from './addNewSpecElement'
// import {simpleValueEdit} from './editSpecs/simpleValueEdit'
import {createSpecElement} from './specCreation/createSpecElement'
// import {SetContext, StaticTypeContext} from '../contexts'
import {SetContext} from './settings/contexts'
// import {generalOption} from 'magicalstrings/lib/exports/constants/chalkColors'
import {menu} from '../choiceBrew/menu'
// import {setNsInfo} from 'magicalstrings/lib/exports/nsFiles/setNsInfo'
import {subTreeChoicesGenerator} from './settings/choicesGenerators/subTrees/subTreeChoicesGenerator'

// const inquirer = require('inquirer')
// const editOptions = {
//   DELETE: 'delete',
//   EDIT: 'edit',
// }
//
// async function updateList(
//   answers: AnswersForStaticInstanceSpec, specsForInstance: any, specsForType: Specs | SpecSet, currentName: string
// ) {
//   // in a list, the index is used rather than the name
//   const {name, index} = answers[TO_EDIT]
//   // @ts-ignore
//   const specsForChildInstance = specsForInstance[index]
//   const specsForChildType = {...specsForType}
//   specsForChildType.type = types.SET
//
//   // eslint-disable-next-line @typescript-eslint/no-use-before-define
//   const newSpecsForChildInstance = await updateSpecSubtree(
//     specsForChildInstance,
//     specsForChildType,
//     types.SET,
//     currentName + '-->' + name,
//     false,
//   )
//
//   if (index) {
//     if (newSpecsForChildInstance)
//       specsForInstance[index] = newSpecsForChildInstance
//     else {
//       specsForInstance.splice(index, 1)
//     }
//   }
// }
//
// async function updateSet(
//   answers: AnswersForStaticInstanceSpec,
//   specsForInstance: any,
//   specsForType: Specs | SpecSet,
//   currentName: string,
//   topLevel = false,
// ) {
//   const {name, typeOfValue, required} = answers[TO_EDIT]
//
//   const specsForChildInstance = specsForInstance[name]
//   // @ts-ignore
//   const specsForChildType: Specs = topLevel ? specsForType[name] : specsForType.contents[name]
//
//   // eslint-disable-next-line @typescript-eslint/no-use-before-define
//   specsForInstance[name] = await updateSpecSubtree(
//     specsForChildInstance,
//     specsForChildType,
//     typeOfValue,
//     currentName + '-->' + name,
//     required || false
//   )
// }

export async function updateSpecSubtree(
  specsForInstance: any,
  specsForType: Specs | SpecSet,
  type: string,
  currentName: string,
  required: boolean,
  session: any,
) {
  try {
    console.log(`in updateSpecSubtree, type = ${type}, specsForType= ${JSON.stringify(specsForType,null,1)}`)
    // if a set or list has no value, create the element
    if (!specsForInstance && (type in [types.SET, types.LIST, types.TOP_LEVEL])) {
      specsForInstance = await createSpecElement(specsForType)
    }
    console.log(`in updateSpecSubtree, type = ${type}, specsForInstance= ${JSON.stringify(specsForInstance,null,1)}`)

    let context: SetContext = {
      specsForInstance, specsForType, currentName, type, required, session
    }
    const prompt = `How would you like to modify ${currentName}?`
    context = await menu(
      subTreeChoicesGenerator, prompt, context,
    )

    return context.specsForInstance
    /*
      This while loop is central to the settings process.  There can be a few
      levels handled here:
          (1) a control step, meaning deciding navigation;
          (2) actually prompting for a value.
      'TO_EDIT' is set for the first, and 'EDIT' for the second.  They are mutually exclusive,
      so this is poorly done.
      TODO: refactor this to have a separate function for each.
     */

    // // eslint-disable-next-line no-constant-condition
    // while (true) {
    //   const questions = getQuestionsForSpecSubtree(
    //     specsForInstance,
    //     specsForType,
    //     type,
    //     currentName,
    //     required
    //   )
    //   const answers: AnswersForStaticInstanceSpec = await inquirer.prompt(questions)
    //
    //   if (answers[EDIT] !== undefined) return simpleValueEdit(type, answers[EDIT])
    //
    //   if (answers[TO_EDIT] && answers[TO_EDIT].name === DONE) {
    //     return specsForInstance
    //   }
    //   if (answers[TO_EDIT] && answers[TO_EDIT].name === DELETE) return undefined
    //
    //   if (answers[EDIT_OPTIONS] && answers[EDIT_OPTIONS] === editOptions.DELETE)
    //      return null
    //
    //   if (answers[TO_EDIT].name === ADD_NEW) {
    //     if (!specsForInstance) specsForInstance = []
    //     // eslint-disable-next-line no-console
    //     specsForInstance = await addNewSpecElement(specsForInstance, specsForType.contents)
    //     continue
    //   }
    //
    //   // otherwise, update the values for the set or list...
    //
    //   if (answers[TO_EDIT] && type === types.LIST) {
    //     await updateList(
    //       answers, specsForInstance, specsForType, currentName
    //     )
    //   }
    //
    //   if (answers[TO_EDIT] && (type === types.SET || type === types.TOP_LEVEL)) {
    //     await updateSet(
    //       answers,
    //       specsForInstance,
    //       specsForType,
    //       currentName,
    //       type === types.TOP_LEVEL
    //     )
    //   }
    // }
  } catch (error) {
    // console.error(error)
    throw new Error(`problem updating the spec subtree: ${error}`)
  }
}
