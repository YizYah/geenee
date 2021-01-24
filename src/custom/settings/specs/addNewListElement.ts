import {createSpecElement} from './specCreation/createSpecElement'

interface NewSpecElementQuestion {
  type: string;
  name: string;
  message: string;
}

// adds to a list of specs a new element, then returns the list
export async function addNewListElement(listContents: any, specsForElementType: any) {
  listContents.push(await createSpecElement(specsForElementType))
  return listContents
}
