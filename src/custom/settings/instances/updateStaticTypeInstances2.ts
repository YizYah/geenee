// import {Configuration} from 'magicalstrings'
// import {NsInfo}  from 'magicalstrings'
import {StaticContext, StaticInstanceContext} from '../choiceBrew/types'
// import {OriginalChoice} from '../settingsTypes'
const {ADD_NEW_VALUE, menuChoices} = require('magicalstrings').constants
import {addStaticInstance} from './addStaticInstance'
// import {updateStaticInstance} from './updateStaticInstance'
import {Choice, FlowType} from '../choiceBrew/types'
import {generalOption} from 'magicalstrings/lib/exports/constants/chalkColors'
import {menu} from '../choiceBrew/menu'
import {updateStaticInstance2} from './updateStaticInstance2'
import {setNsInfo} from 'magicalstrings/lib/exports/nsFiles/setNsInfo'
// import {staticTypeChoicesFromConfig} from '../staticSettings'
// const {exitOption, progress, statusUpdate} = require('magicalstrings').constants.chalkColors
const {progress} = require('magicalstrings').constants.chalkColors

// const inquirer = require('inquirer')

const chalk = require('chalk')

const INSTANCE = 'staticInstance'

interface AnswersForStaticInstance {
  [INSTANCE]: string;
}

// function staticInstancesFromNsInfo(staticType: string, nsInfo: NsInfo) {
//   if (!nsInfo.static) nsInfo.static = {}
//
//   const staticInfo = nsInfo.static
//   const staticInstances = staticInfo[staticType]
//
//   const addNew = {
//     name: progress(`add new instance of ${staticType}`),
//     value: ADD_NEW_VALUE,
//     short: menuChoices.ADD_NEW,
//   }
//
//   const quit = {
//     name: exitOption('done'),
//     value: menuChoices.QUIT,
//     short: 'done',
//   }
//
//   let staticInstanceChoices: OriginalChoice[] = []
//   if (staticInstances) {
//     const instances = Object.keys(staticInstances)
//     staticInstanceChoices = instances.map((typeName: string) => {
//       return {
//         name: chalk.blueBright(typeName),
//         value: typeName,
//         short: typeName,
//       }
//     })
//   }
//
//   staticInstanceChoices.push(addNew)
//   staticInstanceChoices.push(quit)
//   return staticInstanceChoices
// }

async function staticInstanceUpdateCallback(context: StaticInstanceContext, instance: string):
  Promise<StaticInstanceContext> {
  return updateStaticInstance2(context, instance)
}

function staticInstancesFromNsInfo(context: StaticInstanceContext): Choice[] {
  const {staticType, nsInfo} = context
  if (!nsInfo.static) nsInfo.static = {}

  console.log(`in staticInstancesFromNsInfo...`)
  const staticInfo = nsInfo.static
  const staticInstances = staticInfo[staticType]

  const addNew = {
    flow: FlowType.command,
    name: menuChoices.ADD_NEW,
    description: progress(`add new instance of ${staticType}`),
    value: ADD_NEW_VALUE,
    callback: addStaticInstance,
  }

  let staticInstanceChoices: Choice[] = []
  if (staticInstances) {
    const instances = Object.keys(staticInstances)
    staticInstanceChoices = instances.map((typeName: string) => {
      return {
        flow: FlowType.command,
        name: typeName,
        description: generalOption(typeName),
        callback: staticInstanceUpdateCallback,
      }
    })
  }

  staticInstanceChoices.push(addNew)
  return staticInstanceChoices
}

// async function chooseStaticInstance(staticType: string, nsInfo: NsInfo) {
//   const choiceList: Choice[] = staticInstancesFromNsInfo(staticType, nsInfo)
//
//   // const questions = [{
//   //   type: 'list',
//   //   loop: false,
//   //   message: `Choose a ${chalk.blueBright(staticType)} to edit, or ${chalk.greenBright('add a newTemplate one')}...`,
//   //   name: INSTANCE,
//   //   choices: choiceList,
//   // }]
//
//   const prompt = `Choose a ${chalk.blueBright(staticType)} to edit, or ${chalk.greenBright('add a newTemplate one')}...`
//   const answers: AnswersForStaticInstance = await inquirer.prompt(questions)
//   // console.log(`** answers for static instance=${JSON.stringify(answers)}`)
//   return answers.staticInstance
// }

export async function updateStaticTypeInstances2(context: StaticContext,
  staticType: string,): Promise<StaticContext> {
  const {config,
    nsInfo,
    codeDir,
  } = context
  // eslint-disable-next-line no-console
  console.log(`Update the instances for static type ${staticType}.`)

  const staticTypes = config.static
  // // console.log(`**staticTypes[staticType]: ${JSON.stringify(staticTypes[staticType], null, ' ')}.`)
  const typeDescription = staticTypes[staticType].description
  // eslint-disable-next-line no-console
  console.log(chalk.green(typeDescription))
  let superContext: StaticInstanceContext = {
    staticType,
    config,
    nsInfo,
    codeDir,
  }
  const prompt = `Choose a ${generalOption(staticType)} to edit, or ${generalOption('add a newTemplate one')}...`
  try {
    if (nsInfo.static) console.log(`
    list of instances = ${JSON.stringify(Object.keys(nsInfo.static[staticType]))}
    `)
    superContext = await menu(
      staticInstancesFromNsInfo, prompt, superContext,
    )
  } catch (error) {
    throw new Error(`in settings menu: ${error}`)
  }

  context.nsInfo = superContext.nsInfo
  await setNsInfo(codeDir, context.nsInfo)
  return context

  // let staticInstance = await chooseStaticInstance(staticType, nsInfo)
  // // console.log(`** staticInstance=${staticInstance}`)
  //
  // while (staticInstance) {
  //   if (staticInstance === menuChoices.QUIT) {
  //     // eslint-disable-next-line no-console
  //     console.log(statusUpdate(`Finished updating ${staticType}...`))
  //     return context
  //   }
  //
  //   if (staticInstance === ADD_NEW_VALUE) {
  //     await addStaticInstance(
  //       staticType, config, nsInfo, codeDir
  //     )
  //   }
  //
  //   if (staticInstance !== ADD_NEW_VALUE) {
  //     // console.log(`** instance to edit = ${staticInstance}`)
  //     await updateStaticInstance(
  //       staticType,
  //       staticInstance,
  //       config,
  //       nsInfo,
  //       codeDir
  //     )
  //   }
  //
  //   staticInstance = await chooseStaticInstance(staticType, nsInfo)
  // }
}
