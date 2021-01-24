const {regExObjectValueString} = require('magicalstrings').constants.Regex.regExObjectValueString

const regExObjectValue = new RegExp(regExObjectValueString, 'g')
const globalObjects = {
  SETTINGS: 'nsInfo',
  ANSWERS: 'answers',
  SESSION: 'session',
  CONFIG: 'config',
}

function fixBooleans(str: string) {
  // assumes that a 'true' or 'false' is meant to be a boolean.
  if (str === 'true') return true
  if (str === 'false') return false
  return str
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

// takes in a raw object (of depth 1) and replaces any session variables there.
// Not currently recursive.
export function replaceGlobalValuesInObject(
  rawObject: any, session: any, answers: any = {}
) {
  const keys = Object.keys(rawObject)
  const newObject = {...rawObject}

  keys.map((key: string) => {
    const value = rawObject[key]
    if ((typeof value) !== 'string') return

    newObject[key] = replaceGlobalObjectValues(
      value, session, answers
    )
    if (value !== newObject[key]) newObject[key] = fixBooleans(newObject[key])
  })

  return newObject
}
