import {SetContext} from '../contexts'
import {addNewSpecElement} from '../../addNewSpecElement'

export async function addSubtype(context: SetContext): Promise<SetContext> {
  const {specsForInstance, specsForType} = context
  const originalSpecsForInstance = specsForInstance || []
  context.specsForInstance = await addNewSpecElement(originalSpecsForInstance, specsForType.contents)
  return context
}
