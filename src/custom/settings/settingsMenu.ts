import {Configuration, NsInfo} from 'magicalstrings'
import {menu} from './choiceBrew/menu'
import {StaticContext} from './specs/settings/contexts'

import {generalMenuChoicesGenerator} from './specs/settings/choicesGenerators/generalMenuChoicesGenerator'

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
    await menu(
      generalMenuChoicesGenerator, prompt, context,
    )
  } catch (error) {
    console.log(error)
    // throw new Error(`in settings menu: ${error}`)
  }
}
