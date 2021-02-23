import {askForValue} from '../editSpecs/askForValue'
const dynamapping = require('dynamapping')
const inquirer = require('inquirer')

export async function askQuestion(
  subTypeInfo: any,
  subType: string,
  answers: any,
  session: any = {},
) {
  let questions
  try {
    const questionKeys = dynamapping(
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
