/* ns__file unit: static-command, comp: generate.ts */
/*
* This file is autogenerated using the easy-oclif-cli template with ns-geenee. Please view
* the instructions for this code base at meta/instructions.md.
*/

/* ns__start_section imports */
import {Command, flags} from '@oclif/command'

/* ns__custom_start customImports */
import {createCodeBase} from '../custom/generate/createCodeBase'

const {links} = require('magicalstrings').constants
const {resolveDir} = require('magicalstrings').resolveDir

/* ns__custom_end customImports */
/* ns__end_section imports */

export default class Generate extends Command {
static description = `generates code based on a template and a settings file. To set the template, you need the template flag.
`

static examples = [
/* ns__custom_start examples */
// replace this when you change your command!! To regenerate fresh, first delete everything between the squre brackets.
  `$ geenee generate sampleCode -t sampleTemplate -n
You have executed the generate command...
`,
/* ns__custom_end examples */
]

static flags = {
  help: flags.help({char: 'h'}),
  template: flags.string({
    char: 't',
    description: 'Template directory. Will generate from the template, and will override any prior template or template version used.',
  }),
  noSetup: flags.boolean({
    char: 'n',
    description: 'Do not update the startup routine (this is only relevant when the template flag is also used). Saves a lot of time for a template developer.',
  }),
}

static args = [
  {
    name: 'code',
    description: 'path to the code base to generate',
    required: true,
  },
]

async run() {
  const {args, flags} = this.parse(Generate)

  const {code} = args

  const {template, noSetup} = flags
  /* ns__custom_start run */
  const codeDir = resolveDir(code)
  const templateDir = resolveDir(template)
  try {
    await createCodeBase(
      templateDir, codeDir, noSetup
    )
  } catch (error) {
    this.log(error)
    throw new Error(`problem generating code: ${error}`)
  }

  this.log(`Generated the code at ${codeDir}.  For documentation: ${links.DOCUMENTATION}`)
  /* ns__custom_end run */
}
}
