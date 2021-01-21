// import {Configuration, NsInfo} from 'magicalstrings'

import {menuQuestionName} from '../choiceBrew/constants'

export const {setNsInfo} = require('magicalstrings').nsFiles

import {MenuAnswers} from '../choiceBrew/types'
// import {addStaticInstance} from './addStaticInstance'
import {menu} from '../choiceBrew/menu'
import {StaticInstanceContext, StaticTypeContext} from '../specs/settings/contexts'
import {choicesFromContext} from '../specs/settings/choicesGenerators/choicesFromContext'

export async function updateStaticInstance2(context: StaticTypeContext,
  answers: MenuAnswers): Promise<StaticTypeContext> {
  console.log(`answers in updateStaticInstance2 = ${JSON.stringify(answers)}`)
  const {staticType, nsInfo, codeDir} = context
  const instances: string = answers[menuQuestionName].value
  if (!nsInfo.static ||
    !nsInfo.static[staticType] ||
    !nsInfo.static[staticType][instances]
  ) throw new Error(`attempt to edit nonexistent static instance ${instances}.`)

  const prompt = `How do you want to modify ${instances}?`
  let superContext: StaticInstanceContext = {...context, instance: instances}

  try {
    superContext = await menu(
      choicesFromContext, prompt, superContext,
    )
  } catch (error) {
    console.log(error)
    throw new Error(`in update static instance menu: ${error}`)
  }

  context.nsInfo = superContext.nsInfo
  await setNsInfo(codeDir, context.nsInfo)

  // const questions = [
  //   {
  //     type: 'list',
  //     loop: false,
  //     message: `What would you like to do with ${instanceName}?`,
  //     name: ACTION,
  //     choices: [
  //       generalOption(actionTypes.RENAME),
  //       generalOption(actionTypes.UPDATE_SPECS),
  //       attention(actionTypes.DELETE),
  //       exitOption(actionTypes.BACK),
  //     ],
  //   },
  //   {
  //     type: 'input',
  //     name: NAME,
  //     message: 'What should the name be?',
  //     default: instanceName,
  //     when: function (answers: AnswersForUpdateInstance) {
  //       return (answers.action === generalOption(actionTypes.RENAME))
  //     },
  //   },
  //   {
  //     type: 'input',
  //     name: SLUG,
  //     message: 'What should the slug be?',
  //     default: instanceInfo.slug,
  //     when: function (answers: AnswersForUpdateInstance) {
  //       return answers.action === generalOption(actionTypes.RENAME)
  //     },
  //   },
  // ]

  // let answers: AnswersForUpdateInstance = await inquirer.prompt(questions)
  //
  // while (answers[ACTION]) {
  //   console.log(`answers in updateStaticInstance2=${JSON.stringify(answers)}`)
  //   if (nsInfo.static) console.log(`   list of instances in while loop of updateStaticInstance2 =
  //   ${JSON.stringify(Object.keys(nsInfo.static[staticType]))}
  //   `)
  //
  //   const actionType = answers[ACTION]
  //   if (actionType === exitOption(actionTypes.BACK)) {
  //     // eslint-disable-next-line no-console
  //     console.log(statusUpdate(`finished updating ${staticType}...`))
  //     return context
  //   }
  //
  //   if (actionType === attention(actionTypes.DELETE)) {
  //     delete nsInfo.static[staticType][instanceName]
  //     await setNsInfo(codeDir, nsInfo)
  //     // eslint-disable-next-line no-console
  //     console.log(statusUpdate(`${instanceName} deleted...`))
  //     context.nsInfo = nsInfo
  //     return context
  //   }
  //
  //   if (actionType === generalOption(actionTypes.RENAME)) {
  //     if (instanceName !== answers[NAME]) {
  //       nsInfo.static[staticType][answers[NAME]] = {...instanceInfo}
  //       delete nsInfo.static[staticType][instanceName]
  //     }
  //     if (nsInfo.static) console.log(`   list of instances after the update =
  //   ${JSON.stringify(Object.keys(nsInfo.static[staticType]))}
  //   `)
  //     if (nsInfo.static) console.log(`   list of instances after the update in context =
  //   ${JSON.stringify(Object.keys(context.nsInfo.static[staticType]))}
  //   `)
  //
  //     nsInfo.static[staticType][answers[NAME]].slug = answers[SLUG]
  //     await setNsInfo(codeDir, nsInfo)
  //     // eslint-disable-next-line no-console
  //     console.log(statusUpdate(`${instanceName} updated...`))
  //     return context
  //   }
  //
  //   console.log(`
  //   About to call updateInstanceSpecs.staticType=${staticType}, instanceName={instanceName}`)
  //   await updateInstanceSpecs(
  //     staticType, instanceName, config, nsInfo, codeDir,
  //   )
  //
  //   answers = await inquirer.prompt(questions)
  // }
  return context
}
