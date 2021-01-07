const {links, suffixes} = require('magicalstrings').constants
import {Configuration} from 'magicalstrings'
const getConfig = require('magicalstrings').configs.getConfig
import {handleNewFiles} from '../new/files/handleNewFiles'
import {handleUniqueModelFiles} from './handleUniqueModelFiles'
const {attention, generalOption} = require('magicalstrings').constants.chalkColors
import {displayModifiedFiles} from './displayModifiedFiles'
import {GenerationRequired} from './GenerationRequired'
import {displayInstructionsForNextStep} from './displayInstructionsForNextStep'
import {getDiscrepantFiles} from './getDiscrepantFiles'
const {dingKats} = require('magicalstrings').constants.types.dingKats

const emoji = require('node-emoji')
const fs = require('fs-extra')

export async function removeCodeModelDiscrepancies(
  templateDir: string, code: string, model: string
) {
  if (!await fs.pathExists(templateDir))
    throw new Error(`template directory ${templateDir} not found.`)

  const finalCode = code || templateDir + suffixes.SAMPLE_DIR
  const finalModel = model || templateDir + suffixes.MODEL_DIR

  const config: Configuration = await getConfig(templateDir)
  const res = await getDiscrepantFiles(
    config, finalCode, finalModel
  )

  if (!res || !res.diffSet) return
  const discrepancies = res.diffSet.filter((file: any) =>
    (file.type2 === 'missing') ||
    (file.type1 === 'missing') ||
    (file.state === 'distinct'))

  if (discrepancies.length === 0) {
    // eslint-disable-next-line no-console
    console.log(dingKats.THRILLED + attention(' AWESOME!') + ' Your template is generating your model code base exactly! ' + emoji.get('smiley_cat'))
    // eslint-disable-next-line no-console
    console.log('\n' + dingKats.POUTING + ' But, that does not mean that your template is fully functional yet.' +
      ' You have to replace things that were hard-coded to be what is in your code base' +
      ' with custom generated stuff. ' +
      '\n\n' + dingKats.GO_TO + 'Not to worry... check out ' +
    generalOption(links.MAKING_FILES_CUSTOMIZABLE) +
    ' for how to replace your sample with what your really need. ')
    return
  }

  let generationRequired: GenerationRequired = await handleNewFiles(
    discrepancies, templateDir, finalCode, finalModel
  )
  const newGenerationRequired = await handleUniqueModelFiles(
    res, templateDir, finalModel, config
  )
  if (newGenerationRequired > generationRequired) generationRequired = newGenerationRequired

  displayModifiedFiles(res)  // TODO: replace with handleModifiedFiles

  displayInstructionsForNextStep(templateDir, generationRequired)
}
