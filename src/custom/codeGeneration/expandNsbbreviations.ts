const {regExTemplateAbbreviation} = require('magicalstrings').constants.Regex.regExTemplateAbbreviation
const {placeholders} = require('magicalstrings').constants

export function expandNsAbbreviations(template: string) {
  return template
  .replace(regExTemplateAbbreviation, '{{$1 \'$2\'}}')
  .replace('{{nsFile}}',
    placeholders.OPEN_COMMENT +
    ' ns__file {{fileInfo}} ' +
    placeholders.CLOSE_COMMENT)
}
