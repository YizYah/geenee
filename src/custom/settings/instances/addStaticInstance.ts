import {StaticTypeContext} from '../specs/settings/contexts'

const setNsInfo = require('magicalstrings').nsFiles.setNsInfo
const inquirer = require('inquirer')

export async function addStaticInstance(context: StaticTypeContext): Promise<StaticTypeContext> {
  // console.log(`** about to addStaticInstance for ${staticType}`)
  // const typeSpec = config.static[staticType].specs
  const {staticType,
    nsInfo,
    codeDir,
  } = context

  const addInstanceQuestions = [
    {
      type: 'input',
      name: 'name',
      message: `What is the name of the new ${staticType}?`,
    },
  ]

  let answers = await inquirer.prompt(addInstanceQuestions)

  const addSlugQuestion = [
    {
      type: 'input',
      name: 'slug',
      message: "What's the slug?  (It will get inserted into things like file names.)",
      default: answers.name,
    },
  ]
  const answersForSlug = await inquirer.prompt(addSlugQuestion)
  answers = {...answers, ...answersForSlug}

  if (nsInfo.static) {
    if (!nsInfo.static[staticType]) nsInfo.static[staticType] = {}

    nsInfo.static[staticType][answers.name] = {
      slug: answers.slug,
      specs: {},
    }
  } else {
    nsInfo.static = {
      [staticType]: {
        [answers.name]: {
          slug: answers.slug,
          specs: {},
        },
      },
    }
  }

  await setNsInfo(codeDir, nsInfo)
  return context

  // console.log(`** added answers = ${JSON.stringify(answers, null, 1)}`)
}
