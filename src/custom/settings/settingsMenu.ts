import {Configuration, NsInfo} from 'magicalstrings'
import {StaticContext} from './specs/settings/contexts'

import {generalMenuChoicesGenerator} from './specs/settings/choicesGenerators/generalMenuChoicesGenerator'

const {menu} = require('choicebrew')
const prompt = 'What settings would you like to change?'

export async function settingsMenu(
  config: Configuration,
  nsInfo: NsInfo,
  codeDir: string,
) {
  const context: StaticContext = {
    config,
    nsInfo,
    codeDir,
  }
  try {
    const newContext = await menu(
      generalMenuChoicesGenerator, prompt, context,
    )

    return newContext.nsInfo
  } catch (error) {
    throw new Error(`in settings menu: ${error}`)
  }
}
