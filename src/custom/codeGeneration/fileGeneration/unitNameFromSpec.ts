const {singularName} = require('magicalstrings').inflections
const {parseSpecName} = require('magicalstrings').constants.parseSpecName

export const unitNameFromSpec = (text: string) => {
  return singularName(parseSpecName(text).name)
}
