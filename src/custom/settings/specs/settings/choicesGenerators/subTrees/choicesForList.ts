import {Specs, SpecSet} from 'magicalstrings'
import {editSubtype} from '../../callbacks/editSubtype'
import {menuChoices} from 'magicalstrings/lib/exports/constants'
import {ADD_NEW, DELETE, types} from '../../../../types'
import {addListElement} from '../../callbacks/addListElement'
import {deleteInstance} from '../../callbacks/deleteInstance'
import {explanation} from 'magicalstrings/lib/exports/constants/chalkColors'

const {attention, generalOption, progress} = require('magicalstrings').constants.chalkColors
import {Choice, FlowType} from 'choicebrew'

export function choicesForList(
  specsForInstance: any,
  specsForType: Specs | SpecSet,
  specChildrenChoices: Choice[],
  currentName: string,
  required: boolean,
) {
  if (specsForInstance) {
    // @ts-ignore
    const listElementTypeSpeck = specsForType.contents
    let listElementKeys: string[]
    if (listElementTypeSpeck) listElementKeys = Object.keys(listElementTypeSpeck)

    // const specsForTypeChildren = getSpecsObject(specsForType)
    let instanceName = ''
    let instanceDescription = ''
    specsForInstance.map((instance: any, index: number) => {
      listElementKeys.map(key => {
        if (key === 'name')
          instanceName = instance.name
        if (key === 'description')
          instanceDescription = instance.description
      })
      const name = instance.name || 'unnamed'

      specChildrenChoices.push({
        flow: FlowType.command,
        name,
        description: `edit ${generalOption(instanceName)} [${explanation(instanceDescription)}]`,
        value: {name, typeOfValue: types.SET, required: false, index},
        callback: editSubtype,
      })
    })
  }

  specChildrenChoices.push({
    flow: FlowType.command,
    name: menuChoices.ADD_NEW,
    description: progress(`add new item to ${currentName}`),
    value: {name: ADD_NEW, typeOfValue: '', required: false},
    callback: addListElement,
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
