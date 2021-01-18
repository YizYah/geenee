import {Configuration, NsInfo} from 'magicalstrings'

const {setNsInfo} = require('magicalstrings').nsFiles

import {updateInstanceSpecs} from '../specs/updateInstanceSpecs'
import {StaticInstanceContext} from '../choiceBrew/types'

const {attention, exitOption, generalOption, statusUpdate} = require('magicalstrings').constants.chalkColors

const inquirer = require('inquirer')

const actionTypes = {
  RENAME: 'rename',
  UPDATE_SPECS: 'updateSpecs',
  DELETE: 'delete',
  BACK: 'back',
}

interface AnswersForUpdateInstance {
  action: string;
  name: string;
  slug: string;
}

const ACTION = 'action'
const NAME = 'name'
const SLUG = 'slug'

// const SPECS = 'specs'

interface AnswersForUpdateInstance {
  action: string;
  name: string;
  slug: string;
  specs: string;
}

export async function updateStaticInstance2(context: StaticInstanceContext,
  instanceName: string): Promise<StaticInstanceContext> {
  const {staticType, config, nsInfo, codeDir} = context
  if (!nsInfo.static ||
    !nsInfo.static[staticType] ||
    !nsInfo.static[staticType][instanceName]
  ) throw new Error(`attempt to edit nonexistent static instance ${instanceName}.`)

  console.log(`in updateStaticInstance2...`)
  const instanceInfo = nsInfo.static[staticType][instanceName]

  const questions = [
    {
      type: 'list',
      loop: false,
      message: `What would you like to do with ${instanceName}?`,
      name: ACTION,
      choices: [
        generalOption(actionTypes.RENAME),
        generalOption(actionTypes.UPDATE_SPECS),
        attention(actionTypes.DELETE),
        exitOption(actionTypes.BACK),
      ],
    },
    {
      type: 'input',
      name: NAME,
      message: 'What should the name be?',
      default: instanceName,
      when: function (answers: AnswersForUpdateInstance) {
        return (answers.action === generalOption(actionTypes.RENAME))
      },
    },
    {
      type: 'input',
      name: SLUG,
      message: 'What should the slug be?',
      default: instanceInfo.slug,
      when: function (answers: AnswersForUpdateInstance) {
        return answers.action === generalOption(actionTypes.RENAME)
      },
    },
  ]

  let answers: AnswersForUpdateInstance = await inquirer.prompt(questions)

  while (answers[ACTION]) {
    console.log(`answers in updateStaticInstance2=${JSON.stringify(answers)}`)
    if (nsInfo.static) console.log(`   list of instances in while loop of updateStaticInstance2 =
    ${JSON.stringify(Object.keys(nsInfo.static[staticType]))}
    `)

    const actionType = answers[ACTION]
    if (actionType === exitOption(actionTypes.BACK)) {
      // eslint-disable-next-line no-console
      console.log(statusUpdate(`finished updating ${staticType}...`))
      return context
    }

    if (actionType === attention(actionTypes.DELETE)) {
      delete nsInfo.static[staticType][instanceName]
      await setNsInfo(codeDir, nsInfo)
      // eslint-disable-next-line no-console
      console.log(statusUpdate(`${instanceName} deleted...`))
      context.nsInfo = nsInfo
      return context
    }

    if (actionType === generalOption(actionTypes.RENAME)) {
      if (instanceName !== answers[NAME]) {
        nsInfo.static[staticType][answers[NAME]] = {...instanceInfo}
        delete nsInfo.static[staticType][instanceName]
      }
      if (nsInfo.static) console.log(`   list of instances after the update =
    ${JSON.stringify(Object.keys(nsInfo.static[staticType]))}
    `)
      if (nsInfo.static) console.log(`   list of instances after the update in context =
    ${JSON.stringify(Object.keys(context.nsInfo.static[staticType]))}
    `)

      nsInfo.static[staticType][answers[NAME]].slug = answers[SLUG]
      await setNsInfo(codeDir, nsInfo)
      // eslint-disable-next-line no-console
      console.log(statusUpdate(`${instanceName} updated...`))
      return context
    }

    console.log(`
    About to call updateInstanceSpecs.staticType=${staticType}, instanceName={instanceName}`)
    await updateInstanceSpecs(
      staticType, instanceName, config, nsInfo, codeDir,
    )

    answers = await inquirer.prompt(questions)
  }
  return context
}
