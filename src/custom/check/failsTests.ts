import {regenerateCode} from '../codeGeneration/regenerateCode'
// import {generateCode} from '../codeGeneration/generateCode'
// import {insertCustomChanges} from '../codeGeneration/customCode/insertCustomChanges'
// import {storeCustomCode} from '../storeCustomCode/storeCustomCode'

const {dirNames, fileNames, suffixes} = require('magicalstrings').constants
// const {getNsInfo} = require('magicalstrings').nsFiles
// const {getConfig} = require('magicalstrings').configs

import {checkDirForDiscrepancies} from './checkDirForDiscrepancies'
// import {moveOverIgnored} from './moveOverIgnored'
// import writePackage = require('write-pkg');

// const {copyCodeBaseToNewDir} = require('magicalstrings').copyCodeBaseToNewDir

// const fs = require('fs-extra')

export async function failsTests(codeDir: string) {
  // const metaDir = `${codeDir}/${dirNames.META}`
  const starter = `${codeDir}${suffixes.STARTUP_DIR}`
  const testDir = `${codeDir}${suffixes.TEST_DIR}`
  const testMetaDir = `${testDir}/${dirNames.META}`

  const diffsFile = `${testMetaDir}/${fileNames.DIFFS}`
  const logFile = `${testMetaDir}/${fileNames.TESTS_LOG}`

  // const nsInfo = await getNsInfo(codeDir)

  // const templateDir = `${metaDir}/${dirNames.TEMPLATE}`

  // WARNING: breaking change from 1.6.8!!
  // const config = await getConfiguration(template.dir)
  // const config = await getConfig(templateDir)

  let problemsFound = false
  if (!starter) throw new Error(`the '${fileNames.NS_FILE}' file contains no starter.  ` +
    'You need a starter to test the code.')

  // store added code before generating new code.
  try {
    // await fs.remove(testDir)
    // await copyCodeBaseToNewDir(starter, testDir)
    // await moveOverIgnored(
    //   codeDir, testDir, config
    // )
    // const mergedJson = await mergePackageJsons(starter, codeDir)
    // await writePackage(`${testDir}/package.json`, mergedJson)

    // await generateCode(
    //   testDir, nsInfo, config
    // )
    await regenerateCode(
      testDir, {}, codeDir
    )

    // const customCodeDoc = `${metaDir}/${fileNames.CUSTOM_CODE_FILE}`
    // await insertCustomChanges(
    //   testDir, customCodeDoc, config
    // )
  } catch (error) {
    throw error
  }

  // this.log('*** temporary injected return for check ***')
  // return // temp

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
