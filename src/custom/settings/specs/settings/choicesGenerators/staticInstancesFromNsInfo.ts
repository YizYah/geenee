import {StaticTypeContext} from '../contexts'
import {addStaticInstance} from '../../../instances/addStaticInstance'
import {updateStaticInstance2} from '../../../instances/updateStaticInstance2'

const {menuChoices} = require('magicalstrings').constants
const {generalOption, progress} = require('magicalstrings').constants.chalkColors
import {Choice, FlowType} from 'choicebrew'

export function staticInstancesFromNsInfo(context: StaticTypeContext): Choice[] {
  const {staticType, nsInfo} = context

  if (!nsInfo.static) nsInfo.static = {}

  const staticInfo = nsInfo.static
  const staticInstances = staticInfo[staticType]

  const addNew = {
    flow: FlowType.command,
    name: menuChoices.ADD_NEW,
    description: progress(`add new instance of ${staticType}`),
    callback: addStaticInstance,
  }

  let staticInstanceChoices: Choice[] = []
  if (staticInstances) {
    const instances = Object.keys(staticInstances)
    staticInstanceChoices = instances.map((typeName: string) => {
      return {
        flow: FlowType.command,
        name: typeName,
        description: generalOption(typeName),
        callback: updateStaticInstance2,
      }
    })
  }

  staticInstanceChoices.push(addNew)
  return staticInstanceChoices
}
