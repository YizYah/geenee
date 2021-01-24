import {Configuration, NsInfo} from 'magicalstrings'
const {setNsInfo} = require('magicalstrings').nsFiles
import {types} from '../types'
import {updateSpecSubtree} from './updateSpecSubtree'

export async function updateInstanceSpecs(
  staticType: string,
  instanceName: string,
  config: Configuration,
  nsInfo: NsInfo,
  codeDir: string,
  session: any,
) {
  const specsForType = {
    type: 'set',
    required: true,
    contents: config.static[staticType].specs,
  }

  if (!nsInfo.static) return
  const specsForInstance = nsInfo.static[staticType][instanceName].specs

  try {
    nsInfo.static[staticType][instanceName].specs =
      await updateSpecSubtree(
        specsForInstance,
        specsForType,
        types.SET,
        instanceName,
        true,
        session,
      )
    await setNsInfo(codeDir, nsInfo)
  } catch (error) {
    // console.log(error)
    throw new Error(`problem updating specs for instance '${instanceName}': ${error}`)
  }
}
