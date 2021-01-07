import * as chalk from 'chalk'
import {Difference} from 'dir-compare'
const {getConfig} = require('magicalstrings').configs
const {setConfig} = require('magicalstrings').configs
const {progress} = require('magicalstrings').constants.chalkColors
import {GenerationRequired} from '../../discrepancies/GenerationRequired'
const {dingKats} = require('magicalstrings').constants.types.dingKats

const inquirer = require('inquirer')
const fs = require('fs-extra')
const newFileOptions = {
  COPY: 'Copy it over to the sample',
  REMOVE: 'Update setupSequence to remove it',
  NOTHING: 'Nothing.  I am not sure.',
}

function getNewFileQuestions(fileName: string) {
  return [
    {
      type: 'list',
      name: 'newFileTreatment',
      message: dingKats.POUTING + ` This file ${chalk.red(fileName)} is showing up only in your generated code, not in your sample.  What would you like done?`,
      choices: Object.values(newFileOptions),
    },
  ]
}

async function copyFileToSample(
  relativePath: string, codeDir: string, sampleDir: string
) {
  try {
    await fs.copy(codeDir + '/' + relativePath, sampleDir + '/' + relativePath)
  } catch (error) {
    throw new Error(`cannot copy ${relativePath} from ${codeDir} to ${sampleDir}: ${error}`)
  }
}

export async function handleNewFiles(
  differences: Array<Difference>,
  templateDir: string,
  code: string,
  model: string
) {
  let generationRequired = GenerationRequired.None

  if (differences) {
    const newFileInfo = differences.filter((file: any) => (file.type2 === 'missing'))
    const newFiles = newFileInfo.map((file: any) => {
      const filePath = file.relativePath.substring(1) + '/' + file.name1
      return filePath.replace(/\/\//g, '/')
    })

    const config = await getConfig(templateDir)

    const newFilesForPrompt: string[] = []
    newFiles.map(relativeFilePath => {
      if (relativeFilePath.startsWith('meta')) {
        copyFileToSample(
          relativeFilePath, code, model
        )
      } else {
        newFilesForPrompt.push(relativeFilePath)
      }
    })

    if (newFilesForPrompt.length === 0) return generationRequired

    let i
    for (i = 0; i < newFilesForPrompt.length; i++) {
      const newFileName = newFilesForPrompt[i]
      const newFileQuestions = getNewFileQuestions(newFileName)
      const answers = await inquirer.prompt(newFileQuestions)
      const {newFileTreatment} = answers
      if (newFileTreatment === newFileOptions.REMOVE) {
        if (!config) throw new Error('no config file in the specified template.')
        if (!config.setupSequence) config.setupSequence = {}
        if (!config.setupSequence.preCommands) config.setupSequence.preCommands = []
        config.setupSequence.preCommands.push({
          title: 'remove ' + newFileName,
          file: 'rm',
          arguments: [`$codeDir/${newFileName}`],
        })
        await setConfig(templateDir, config)
        generationRequired = GenerationRequired.Setup
      }
      if (newFileTreatment === newFileOptions.COPY) {
        await copyFileToSample(
          newFileName, code, model
        )
        // eslint-disable-next-line no-console
        console.log(progress(`copied ${newFileName} to model from code...`))
        if (generationRequired === GenerationRequired.None)
          generationRequired = GenerationRequired.Code
      }
    }
  }
  return generationRequired
}
