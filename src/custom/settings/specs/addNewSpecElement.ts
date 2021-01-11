import {createSpecElement} from './specCreation/createSpecElement'

interface NewSpecElementQuestion {
  type: string;
  name: string;
  message: string;
}

export async function addNewSpecElement(specsForInstance: any, specsForTypeContents: any) {
  specsForInstance.push(await createSpecElement(specsForTypeContents))
  return specsForInstance
}
