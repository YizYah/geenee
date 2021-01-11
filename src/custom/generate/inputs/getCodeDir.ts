import {promptTypes, promptUser} from './promptUser'
const {testCodeDir} = require('magicalstrings').testCodeDir

export async function getCodeDir(codeDir: string | undefined) {
  if (codeDir) return codeDir

  const prompt = 'Please enter a path for your app.  The actual directory of the app must be all numbers and lowercase letters, with no spaces.'
  return promptUser(
    'codeDir',
    promptTypes.TEXT,
    prompt,
    testCodeDir,
  )
}
