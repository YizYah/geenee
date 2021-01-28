const {setNsInfo} = require('magicalstrings').nsFiles
import {StaticInstanceContext} from '../../settings/contexts'

import {Choice, FlowType, MenuAnswers} from 'choicebrew'
import {updateInstanceSpecs} from '../../updateInstanceSpecs'
const {attention, generalOption, statusUpdate} = require('magicalstrings').constants.chalkColors
const {setFlow} = require('choicebrew')
const inquirer = require('inquirer')
const actionTypes = {
  RENAME: 'rename',
  UPDATE_SPECS: 'updateSpecs',
  DELETE: 'delete',
  BACK: 'back',
}

interface AnswersForRenameInstance {
  name: string;
}

// const ACTION = 'action'
const NAME = 'name'

async function deleteInstance(context: StaticInstanceContext, answers: any): Promise<StaticInstanceContext> {
  const {instance} = context
  const {nsInfo, staticType, codeDir} = context

  if (!nsInfo.static) throw new Error('no static information stored in the settings file')
  if (!nsInfo.static[staticType])
    throw new Error(`no static information stored in the settings file for type ${staticType}`)
  if (!nsInfo.static[staticType][instance])
    throw new Error(`attempt to delete a nonexistent instance ${instance} of type ${staticType}`)

  delete nsInfo.static[staticType][instance]
  await setNsInfo(codeDir, nsInfo)
  // eslint-disable-next-line no-console
  console.log(statusUpdate(`${instance} deleted... nsInfo.static[staticType]=${JSON.stringify(nsInfo.static[staticType])}`))
  context.nsInfo = nsInfo

  setFlow(answers, FlowType.back) // back up a level
  return context
}

async function renameInstance(context: StaticInstanceContext, answers: MenuAnswers): Promise<StaticInstanceContext> {
  const {instance} = context
  const {nsInfo, staticType, codeDir} = context

  if (!nsInfo.static) throw new Error('no static information stored in the settings file')
  if (!nsInfo.static[staticType])
    throw new Error(`no static information stored in the settings file for type ${staticType}`)

  const questions = [
    {
      type: 'input',
      name: NAME,
      message: 'What should the name be?',
      default: instance,
    },
  ]
  const renameAnswers: AnswersForRenameInstance = await inquirer.prompt(questions)

  const instanceInfo = nsInfo.static[staticType][instance]
  if (instance !== renameAnswers[NAME]) {
    nsInfo.static[staticType][renameAnswers[NAME]] = {...instanceInfo}
    nsInfo.static[staticType][renameAnswers[NAME]].slug = renameAnswers[NAME]
    delete nsInfo.static[staticType][instance]
    await setNsInfo(codeDir, nsInfo)
  }
  setFlow(answers, FlowType.back) // back up a level
  return context
}

async function updateSpecs(context: StaticInstanceContext): Promise<StaticInstanceContext> {
  const {instance} = context
  const {nsInfo, staticType, config, codeDir, session} = context
  if (!nsInfo.static) throw new Error('no static information stored in the settings file')
  await updateInstanceSpecs(
    staticType, instance, config, nsInfo, codeDir, session,
  )
  return context
}

export function choicesFromContext(context: StaticInstanceContext): Choice[] {
  const {instance} = context
  const instanceUpdateChoices: Choice[] = [
    {
      flow: FlowType.command,
      name: actionTypes.RENAME,
      description: generalOption(`Rename ${instance}`),
      value: actionTypes.RENAME,
      callback: renameInstance,
    },
    {
      flow: FlowType.command,
      name: actionTypes.UPDATE_SPECS,
      description: generalOption(`Update the specs for ${instance}`),
      value: actionTypes.UPDATE_SPECS,
      callback: updateSpecs,
    },
    {
      flow: FlowType.command,
      name: actionTypes.DELETE,
      description: attention(`Delete ${instance}`),
      value: actionTypes.DELETE,
      callback: deleteInstance,
    },
  ]
  return instanceUpdateChoices
}
