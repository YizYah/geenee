// const {links, suffixes} = require('magicalstrings').constants
// const {attention, generalOption} = require('magicalstrings').constants.chalkColors
const {dingKats} = require('magicalstrings').constants.types.dingKats

export function printInstructionsForNewTemplate(templateDir: string) {
  return dingKats.SMILING + ` Your template has been created at ${templateDir}.

  `
  // +
  // ' To make the template functional, call ' + generalOption('copykat chase $TEMPLATE') +
  // ' to be guided through the steps for getting the correct files to generate.'
}
