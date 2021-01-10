import {Configuration} from 'magicalstrings'
import {NsInfo}  from 'magicalstrings'
import {updateStaticTypeInstances} from './instances/updateStaticTypeInstances'
const {menuChoices} = require('magicalstrings').constants
import {chooseStaticType} from './chooseStaticType'

export async function staticSettings(
  config: Configuration, nsInfo: NsInfo, codeDir: string
) {
  let staticType = await chooseStaticType(config)

  while (staticType) {
    if (staticType === menuChoices.QUIT) {
      return nsInfo.static
    }

    await updateStaticTypeInstances(
      staticType, config, nsInfo, codeDir
    )
    staticType = await chooseStaticType(config)
  }
}
