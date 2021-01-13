import {logEntry} from '../shared/logEntry'
const {links} = require('magicalstrings').constants
import * as chalk from 'chalk'

const fs = require('fs-extra')

export async function discrepanciesFound(
  diffFile: string,
  logFile: string,
  problemsFound: boolean,
) {
  let diffString = ''
  await new Promise((r: any) => setTimeout(r, 2000)) // TODO: this gets out of a race condition.  Must be fixed.

  try {
    if (fs.existsSync(diffFile)) {
      diffString = fs.readFileSync(diffFile, 'utf8')
    }
  } catch (error) {
    throw error
  }

  // const matches = diffString.match(regEx)
  if (diffString.length > 0) {
    // if (matches && matches.length > 0) {
    problemsFound = true
    const logMessage = `
*** DISCREPANCIES FOUND!  You can find the discrepancies in ${diffFile}. Please see
${chalk.red(links.TEST_RESULTS)} for how to resolve them. ***
`
    try {
      await logEntry(
        logFile, logMessage, true
      )
    } catch (error) {
      throw error
    }
  }
  return problemsFound
}
