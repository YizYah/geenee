import {Specs, SpecSet} from 'magicalstrings'
import {DELETE, types} from '../../../../types'
import {Choice, FlowType} from '../../../../choiceBrew/types'
import {SetContext} from '../../contexts'
import {deleteInstance} from '../../callbacks/deleteInstance'
import {answerForSpecificSubtype} from './answerForSpecificSubtype'
import {choicesForList} from './choicesForList'

const {attention} = require('magicalstrings').constants.chalkColors

function createChildrenChoices(
  specsForType: Specs | SpecSet, type: string, currentName: string, specsForInstance: any
) {
  let subTypes: string[] = Object.keys(specsForType)
  let childSpecObject = specsForType
  if (type !== types.TOP_LEVEL && specsForType.contents) {
    subTypes = Object.keys(specsForType.contents)
    childSpecObject = specsForType.contents
  }
  console.log(`in createChildrenChoices, type = ${type}. subTypes=${JSON.stringify(subTypes)} `)
  console.log(`in createChildrenChoices, specsForType=${JSON.stringify(specsForType, null, 1)} `)
  return subTypes.map((subTypeName: string) => {
    console.log(`in createChildrenChoices, for subType ${subTypeName}, childSpecObject[subTypeName]=${JSON.stringify(childSpecObject[subTypeName])} `)
    // @ts-ignore
    if (!childSpecObject[subTypeName]) throw new Error(`the type ${currentName} has no specs for ${subTypeName}`)
    // @ts-ignore
    const specsForTypeElement = childSpecObject[subTypeName]
    const instanceSpecsSubtreeElement = specsForInstance[subTypeName]
    console.log(`in createChildrenChoices, specsForTypeElement=${JSON.stringify(specsForTypeElement)} `)
    return answerForSpecificSubtype(
      subTypeName,
      specsForTypeElement,
      instanceSpecsSubtreeElement,
    )
  })
}

function addDeleteChoice(specChildrenChoices: Choice[], currentName: string) {
  specChildrenChoices.push({
    flow: FlowType.command,
    name: DELETE,
    description: attention(`delete ${currentName}`),
    value: {name: DELETE, typeOfValue: '', required: false},
    callback: deleteInstance,
  })
}

export function subTreeChoicesGenerator(context: SetContext): Choice[] {
  const {specsForType, specsForInstance, type, required, currentName, session} = context
  let specChildrenChoices: Choice[] = []

  if (type === types.LIST) {
    return choicesForList(
      specsForInstance, specsForType, specChildrenChoices, currentName, required
    )
  }

  if (specsForType) {
    specChildrenChoices = createChildrenChoices(
      specsForType, type, currentName, specsForInstance
    )
  }

  if (!required) {
    addDeleteChoice(specChildrenChoices, currentName)
  }

  return specChildrenChoices
}

// export function subTreeChoices(
//   specsForInstance: any,
//   specsForType: Specs | SpecSet,
//   type: string,
//   currentName: string,
//   required: boolean,
// ) {
//   const choices: Choice[] = []
//   //   {
//   //     flow: FlowType.command,
//   //     name: actionTypes.RENAME,
//   //     description: generalOption(`Rename ${instance}`),
//   //     value: actionTypes.RENAME,
//   //     callback: renameInstance,
//   //   },
//   //   {
//   //     flow: FlowType.command,
//   //     name: actionTypes.UPDATE_SPECS,
//   //     description: generalOption(`Update the specs for ${instance}`),
//   //     value: actionTypes.UPDATE_SPECS,
//   //     callback: updateSpecs,
//   //   },
//   //   {
//   //     flow: FlowType.command,
//   //     name: actionTypes.DELETE,
//   //     description: attention(`Delete ${instance}`),
//   //     value: actionTypes.DELETE,
//   //     callback: deleteInstance,
//   //   },
//   // ]
//   const questions = []
//
//   if (type === types.TOP_LEVEL) {
//     // there is no "contents" for a top level set
//     // choices.push({
//     //       flow: FlowType.command,
//     //       name: actionTypes.RENAME,
//     //       description: generalOption(`Rename ${instance}`),
//     //       value: actionTypes.RENAME,
//     //       callback: renameInstance,
//     //     })
//     //
//     questions.push({
//       type: 'list',
//       loop: false,
//       message: `What would you like to edit for ${currentName}? ${attention('[*=required]')}`,
//       name: TO_EDIT,
//       choices: choicesForSpecChildren(
//         specsForType, specsForInstance, type
//       ),
//     },)
//     return questions
//   }
//
//   if (type === types.LIST || type === types.SET) {
//     questions.push({
//       type: 'list',
//       loop: false,
//       message: `What would you like to edit for ${currentName}? ${attention('[*=required]')}`,
//       name: TO_EDIT,
//       choices: choicesForSpecChildren(
//         specsForType.contents, specsForInstance, type
//       ),
//     },)
//     return questions
//   }
//
//   const editQuestion: any = askForValue(
//     specsForInstance,
//     // @ts-ignore
//     specsForType,
//     currentName,
//     EDIT,
//   )
//   if (required) {
//     questions.push(editQuestion)
//   } else {
//     editQuestion.when = function (answers: any) {
//       return (answers[EDIT_OPTIONS] === 'edit')
//     }
//     questions.push({
//       type: 'list',
//       loop: false,
//       message: `What would you like to do for ${currentName}?`,
//       name: EDIT_OPTIONS,
//       choices: [
//         'edit',
//         'delete',
//       ],
//     },
//     editQuestion,)
//   }
//
//   return questions
// }
