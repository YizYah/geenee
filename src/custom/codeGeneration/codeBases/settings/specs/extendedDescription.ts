const {explanation} = require('magicalstrings').constants.chalkColors

export const extendedDescription = (type: string, description: string|undefined) => {
  if (!description || description.length === 0) return type
  return type + ' ' + explanation(description)
}
