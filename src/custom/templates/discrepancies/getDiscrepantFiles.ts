import {Configuration} from 'magicalstrings'
const getIgnoredList = require('magicalstrings').configs.getIgnoredList
const {magicStrings} = require('magicalstrings').constants
import {compareSync, Result} from 'dir-compare'

export async function getDiscrepantFiles(
  config: Configuration, codeDir: string, modelDir: string
) {
  const allIgnored = getIgnoredList(config).map((dir: any) => {
    if (dir.includes('/')) return '/' + dir
    return dir
  })
  let excludeFilter = allIgnored.join(',')
  if (excludeFilter.length > 0) excludeFilter += ','
  excludeFilter += magicStrings.DEFAULT_EXCLUDED_FOLDERS

  const res: Result = compareSync(
    codeDir, modelDir, {
      excludeFilter,
      compareContent: true,
    }
  )
  return res
}
