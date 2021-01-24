import {StaticContext} from '../contexts'
import {staticSettings} from '../../../staticSettings'

export const setNsInfo = require('magicalstrings').nsFiles.setNsInfo

export async function staticCallback(context: StaticContext): Promise<StaticContext> {
  const {config, nsInfo, codeDir} = context
  context = await staticSettings(
    config, nsInfo, codeDir,
  )
  await setNsInfo(codeDir, context.nsInfo)
  return context
}
