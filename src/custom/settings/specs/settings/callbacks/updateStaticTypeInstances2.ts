import {MenuAnswers} from '../../../choiceBrew/types'
import {menu} from '../../../choiceBrew/menu'
import {menuQuestionName} from '../../../choiceBrew/constants'
import {StaticContext, StaticTypeContext} from '../contexts'
import {staticInstancesFromNsInfo} from '../choicesGenerators/staticInstancesFromNsInfo'

const chalk = require('chalk')
const {generalOption} = require('magicalstrings').constants.chalkColors
const {setNsInfo} = require('magicalstrings').nsFiles

const INSTANCE = 'staticInstance'

interface AnswersForStaticInstance {
  [INSTANCE]: string;
}

export async function updateStaticTypeInstances2(context: StaticContext,
  answers: MenuAnswers): Promise<StaticContext> {
  const {
    config,
    nsInfo,
    codeDir,
  } = context
  const staticType: string = answers[menuQuestionName].value
  // eslint-disable-next-line no-console
  console.log(`Update the instances for static type ${staticType}.`)

  const staticTypes = config.static
  // // console.log(`**staticTypes[staticType]: ${JSON.stringify(staticTypes[staticType], null, ' ')}.`)
  const typeDescription = staticTypes[staticType].description
  // eslint-disable-next-line no-console
  console.log(chalk.green(typeDescription))
  let superContext: StaticTypeContext = {
    staticType,
    config,
    nsInfo,
    codeDir,
  }
  const prompt = `Choose a ${generalOption(staticType)} to edit, or ${generalOption('add a newTemplate one')}...`
  try {
    superContext = await menu(
      staticInstancesFromNsInfo, prompt, superContext,
    )
  } catch (error) {
    throw new Error(`in update static type menu: ${error}`)
  }

  context.nsInfo = superContext.nsInfo
  await setNsInfo(codeDir, context.nsInfo)
  return context
}
