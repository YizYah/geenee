import {StaticContext} from '../contexts'
import {updateSpecSubtree} from '../../updateSpecSubtree'
import {types} from '../../../types'
import {setNsInfo} from './staticCallback'

const {commands, dirNames} = require('magicalstrings').constants
const fs = require('fs-extra')

async function createSession(codeDir: string) {
  const codeMetaDir = `${codeDir}/${dirNames.META}`
  const codeTemplateDir = `${codeMetaDir}/${dirNames.TEMPLATE}`
  const initFunctionFile = `${codeTemplateDir}/general/init.ts`
  let session = {
    codeDir,
  }
  if (await fs.pathExists(initFunctionFile)) {
    const {init} = require(initFunctionFile)
    session = await init(commands.GENERATE, codeDir)
  }
  return session
}

export async function generalCallback(context: StaticContext) {
  const {config, nsInfo, codeDir} = context
  const session = await createSession(codeDir)

  const nsInfoGeneral = await updateSpecSubtree(
    nsInfo.general,
    config.general,
    types.TOP_LEVEL,
    'general settings',
    true,
    session,
  )

  nsInfo.general = nsInfoGeneral
  await setNsInfo(codeDir, nsInfo)
  return context
}
