const generateCode = require('geenee-spell')
const {dirNames, fileNames, suffixes} = require('magicalstrings').constants

import {checkDirForDiscrepancies} from './checkDirForDiscrepancies'

export async function failsTests(codeDir: string) {
  // const metaDir = `${codeDir}/${dirNames.META}`
  const starter = `${codeDir}${suffixes.STARTUP_DIR}`
  const testDir = `${codeDir}${suffixes.TEST_DIR}`
  const testMetaDir = `${testDir}/${dirNames.META}`

  const diffsFile = `${testMetaDir}/${fileNames.DIFFS}`
  const logFile = `${testMetaDir}/${fileNames.TESTS_LOG}`

  let problemsFound = false
  if (!starter) throw new Error(`the '${fileNames.NS_FILE}' file contains no starter.  ` +
    'You need a starter to test the code.')

  // store added code before generating new code.
  try {
    await generateCode(
      testDir, {}, codeDir
    )
  } catch (error) {
    throw error
  }

  try {
    problemsFound = await checkDirForDiscrepancies(
      diffsFile,
      codeDir,
      testDir,
      logFile,
      problemsFound,
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error(`problem found with the testing: ${error}`)
  }

  return problemsFound
}
