import {Specs} from 'magicalstrings'
import {types} from '../../../../types'
import {extendedDescription} from '../../../editSpecs/extendedDescription'
import {FlowType} from 'choicebrew'

import {editSubtype} from '../../callbacks/editSubtype'
import {editSimpleSubTypeInstance} from '../../callbacks/editSimpleSubTypeInstance'

const {attention, generalOption, userValue} = require('magicalstrings').constants.chalkColors

const pluralize = require('pluralize')

export function answerForSpecificSubtype(
  name: string, specType: Specs, instanceInfo: any,
) {
  const typeOfValue = specType.type
  const typeDescription = specType.description || ''
  if (!typeOfValue)
    throw new Error(`problem in config.  The spec type ${name} does not have a proper 'type' value. e.g. 'list' or 'set'.`)

  if (typeOfValue === types.LIST || typeOfValue === types.SET) {
    const required = specType.required || false
    const description = `edit ${generalOption(pluralize(name))} [${extendedDescription(typeOfValue, typeDescription)}]`
    return {
      flow: FlowType.command,
      name,
      description,
      value: {name, typeOfValue, required},
      callback: editSubtype,
    }
  }

  const currentValue = instanceInfo || 'not set...'
  let displayedValue = currentValue
  if (typeof currentValue === 'string')
    displayedValue = currentValue.length < 40 ?
      currentValue :
      currentValue.substr(0, 35) + '...'
  let description = `edit ${generalOption(name)} [${extendedDescription(typeOfValue, typeDescription)}]`
  if (specType.required) description += attention('*')
  description += ` value: ${userValue(displayedValue)}`
  return {
    flow: FlowType.command,
    name,
    description,
    value: {name, typeOfValue},
    callback: editSimpleSubTypeInstance,
  }
}
