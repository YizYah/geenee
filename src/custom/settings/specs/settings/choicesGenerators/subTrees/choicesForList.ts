import {Specs, SpecSet} from 'magicalstrings'
import {Choice, FlowType} from '../../../../choiceBrew/types'
import {extendedDescription} from '../../../editSpecs/extendedDescription'
import {editSubtype} from '../../callbacks/editSubtype'
import {menuChoices} from 'magicalstrings/lib/exports/constants'
import {ADD_NEW, DELETE} from '../../../../types'
import {addSubtype} from '../../callbacks/addSubtype'
import {deleteInstance} from '../../callbacks/deleteInstance'

const {attention, generalOption, progress} = require('magicalstrings').constants.chalkColors

export function choicesForList(
  specsForInstance: any,
  specsForType: Specs | SpecSet,
  specChildrenChoices: Choice[],
  currentName: string,
  required: boolean,
) {
  if (specsForInstance) {
    specsForInstance.map((instance: any, index: number) => {
      const name = instance.name || 'unnamed'
      // @ts-ignore
      const currentTypeSpec = specsForType[name]
      const typeOfValue = currentTypeSpec.type
      const typeDescription = currentTypeSpec.description

      specChildrenChoices.push({
        flow: FlowType.command,
        name,
        description: `edit ${generalOption(name)} [${extendedDescription(typeOfValue, typeDescription)}]`,
        value: {name, typeOfValue, required: false, index},
        callback: editSubtype,
      })
    })
  }

  specChildrenChoices.push({
    flow: FlowType.command,
    name: menuChoices.ADD_NEW,
    description: progress(`add new item to ${currentName}`),
    value: {name: ADD_NEW, typeOfValue: '', required: false},
    callback: addSubtype,
  })

  if (!required) {
    specChildrenChoices.push({
      flow: FlowType.command,
      name: DELETE,
      description: attention(`delete ${currentName}`),
      value: {name: DELETE, typeOfValue: '', required: false},
      callback: deleteInstance,
    })
  }

  return specChildrenChoices
}
