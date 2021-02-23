const {regExObjectValueString} = require('magicalstrings').constants.Regex.regExObjectValueString

const regExObjectValue = new RegExp(regExObjectValueString, 'g')
const globalObjects = {
  SETTINGS: 'nsInfo',
  ANSWERS: 'answers',
  SESSION: 'session',
  CONFIG: 'config',
}

/*
  replaces any global objects.  Also set up to take answers so that you can use it
  with inquirer globally.
 */
export function replaceGlobalObjectValues(
  value: any, session: any, answers: any
) {
  if (!value) return value
  const newValue = value.replace(regExObjectValue, function (
    match: string,
    objectName: string,
    key: string,
  ) {
    if (objectName === globalObjects.ANSWERS) return answers[key]
    if (objectName === globalObjects.SESSION) return session[key]
    // if (objectName === globalObjects.SETTINGS) return nsInfo[key]
  })

  return newValue
}
