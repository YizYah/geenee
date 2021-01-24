import {SetContext} from '../contexts'
import {addNewListElement} from '../../addNewListElement'

// essentially just ensures that a new list is [] and sets the specsFotType to its contents.
export async function addListElement(context: SetContext): Promise<SetContext> {
  const {specsForInstance, specsForType} = context
  const originalSpecsForInstance = specsForInstance || []
  context.specsForInstance = await addNewListElement(originalSpecsForInstance, specsForType.contents)

  return context
}
