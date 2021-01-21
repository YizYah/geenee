import {SetContext} from '../contexts'

export async function deleteInstance(context: SetContext): Promise<SetContext> {
  context.specsForInstance = null
  return context
}
