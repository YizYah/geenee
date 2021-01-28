import {Configuration} from 'magicalstrings'
import {NsInfo}  from 'magicalstrings'
import {updateStaticTypeInstances2} from './specs/settings/callbacks/updateStaticTypeInstances2'
import {Choice, FlowType} from 'choicebrew'

const {menu} = require('choicebrew')

import {StaticContext} from './specs/settings/contexts'

const {explanation, generalOption} = require('magicalstrings').constants.chalkColors
const {setNsInfo} = require('magicalstrings').nsFiles

export function staticTypeChoicesFromConfig(context: StaticContext): Choice[] {
  const {config} = context
  const staticTypes = config.static

  let staticTypeChoices: Choice[] = []
  if (staticTypes) {
    const types = Object.keys(staticTypes)

    staticTypeChoices = types.map((typeName: string) => {
      const {description} = staticTypes[typeName]
      return     {
        flow: FlowType.command,
        name: 'General',
        description: description ? generalOption(typeName) + ' ' + explanation(description) : generalOption(typeName),
        value: typeName,
        callback: updateStaticTypeInstances2,
      }
    })
  }
  return staticTypeChoices
}

export async function staticSettings(
  config: Configuration, nsInfo: NsInfo, codeDir: string
) {
  let context: StaticContext = {
    config,
    nsInfo,
    codeDir,
  }
  const prompt = `Updating Static Instances.  Choose a ${generalOption('static type')}.`
  try {
    context = await menu(
      staticTypeChoicesFromConfig, prompt, context,
    )
  } catch (error) {
    throw new Error(`in static settings menu: ${error}`)
  }
  await setNsInfo(codeDir, context.nsInfo)
  return context
}

// export async function staticSettings(
//   config: Configuration, nsInfo: NsInfo, codeDir: string
// ) {
//   let staticType = await chooseStaticType(config)
//
//   while (staticType) {
//     if (staticType === menuChoices.QUIT) {
//       return nsInfo.static
//     }
//
//     await updateStaticTypeInstances(
//       staticType, config, nsInfo, codeDir
//     )
//     staticType = await chooseStaticType(config)
//   }
// }
