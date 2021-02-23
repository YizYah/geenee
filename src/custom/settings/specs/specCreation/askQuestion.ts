import {askForValue} from '../editSpecs/askForValue'
import {replaceGlobalValuesInObject} from '../../../dynamapper/replaceGlobalValuesInObject'

const inquirer = require('inquirer')

export async function askQuestion(
  subTypeInfo: any,
  subType: string,
  answers: any,
  session: any = {},
) {
  let questions
  try {
    const questionKeys = replaceGlobalValuesInObject(
      subTypeInfo, session, answers
    )
    questions = [
      askForValue(
        null,
        questionKeys,
        subType,
        subType,
        session
      ),
    ]
  } catch (error) {
    throw new Error(`asking a question for subType ${subType}`)
  }

  const theseAnswers = await inquirer.prompt(questions)
  answers = {...answers, ...theseAnswers}
  return answers
}
