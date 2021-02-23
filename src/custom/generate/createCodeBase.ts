import {createNewCode} from './createNewCode'

const {commands, dirNames, fileNames, docPages, links, suffixes} = require('magicalstrings').constants

import {copyTemplateToMeta} from './copyTemplateToMeta'
import {createStarter} from '../headStart/createStarter'

const generateCode = require('geenee-spell')
const fs = require('fs-extra')

export async function createCodeBase(
  templateDir: string | undefined,
  codeDir: string,
  noSetup: boolean
) {
  const codeMetaDir = `${codeDir}/${dirNames.META}`
  const codeTemplateDir = `${codeMetaDir}/${dirNames.TEMPLATE}`
  const existsCodeTemplateDir = await fs.pathExists(codeTemplateDir)
  let session = {
    codeDir,
  }

  if (!templateDir && noSetup) {
    throw new Error('you called \'generate\' with the \'--noSetup\' flag without specifying ' +
      'a template.  Please either remove the \'--noSetup\' or provide a template ' +
      'with the \'-t\' flag. ' +
      `See ${links.DOCUMENTATION}/${docPages.BUILDING_CODE_BASE}.`)
  }

  if (!templateDir && !existsCodeTemplateDir) {
    if (!await fs.pathExists(codeDir)) {
      throw new Error('you called \'generate\' without specifying a template' +
        ` for a code base that does not yet exist (${codeDir}).  Please provide a template` +
        'with the \'-t\' flag to create the code base. ' +
        `See ${links.DOCUMENTATION}/${docPages.BUILDING_CODE_BASE}.`)
    }
    throw new Error('you called \'generate\' without specifying a template' +
      ' for a code base that does not have proper prior template info.  ' +
      'Please provide a template with the \'-t\' flag. ' +
      `See ${links.DOCUMENTATION}/${docPages.BUILDING_CODE_BASE}.`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  if (templateDir) {
    await copyTemplateToMeta(codeTemplateDir, templateDir)
    const initFunctionFile = `${codeTemplateDir}/general/init.ts`
    if (await fs.pathExists(initFunctionFile)) {
      const {init} = require(initFunctionFile)
      session = await init(commands.GENERATE, codeDir)
    }
  }

  if (templateDir && (!existsCodeTemplateDir || !noSetup)) {
    await createStarter(
      templateDir, codeDir, session
    )
    const nsFilePath = `${codeDir}/${dirNames.META}/${fileNames.NS_FILE}`
    if (!await fs.pathExists(nsFilePath)) {
      // if the settings file doesn't exist yet then it's a brand new Template...
      const starterDir = codeDir + suffixes.STARTUP_DIR
      const newAppTasks = await createNewCode(codeDir, starterDir)// , finalTemplateDir)
      await newAppTasks.run()
    }
  }

  await generateCode(
    codeDir, session, null
  )
}
