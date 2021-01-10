const inquirer = require('inquirer')
const {attention} = require('magicalstrings').constants.chalkColors
import {regenerateCode} from '../codeGeneration/regenerateCode'

export async function promptToGenerateCode(codeDir: string,) {
  const questions = [{
    type: 'confirm',
    name: 'generate',
    message: 'Your settings have changed. ' +
      attention('Generate the code now with your changes?') +
      ' (This is recommended, but is not done by default.)',
    default: false,
  }]
  const answers = await inquirer.prompt(questions)
  if (answers.generate) {
    await regenerateCode(
      codeDir, {codeDir}, null
    )
    // eslint-disable-next-line no-console
    console.log(`Your code has been regenerated at ${codeDir}`)
  }
}
