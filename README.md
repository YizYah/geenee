
[//]: # ( ns__file unit: standard, comp: README.md )

[//]: # ( ns__custom_start beginning )

[//]: # ( ns__custom_end beginning )

[//]: # ( ns__start_section intro )

[//]: # ( ns__custom_start description )
Code Regenerator.  Reapplies your template without losing your changes

[//]: # ( ns__custom_end description )

[//]: # ( ns__custom_start afterDescription )
![geenee logo and video](src/custom/images/GEENEE-GIF-7.gif)

[//]: # ( ns__custom_end afterDescription )

[//]: # ( ns__custom_start badges )

[//]: # ( ns__start_section usageSection )
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/copykat.svg)](https://npmjs.org/package/copykat)
[![Downloads/week](https://img.shields.io/npm/dw/copykat.svg)](https://npmjs.org/package/copykat)
[![License](https://img.shields.io/npm/l/copykat.svg)](https://github.com//blob/master/package.json)

[//]: # ( ns__custom_end badges )

[//]: # ( ns__end_section intro )


[//]: # ( ns__custom_start beforeToc )
A re-generator tool.  Whenever your update gets updated, you can apply the changes without losing your custom changes.  

# How
You should regenerate your code after you:
1. update your template (follow the instructions with its README)
2. update your settings file.

Here's the command:
```
npx geenee generate $CODE_PATH
```

You should always check first to be sure that your changes will be safe:
```
npx geenee check $CODE_PATH
```

If you want to install `geenee` globally to save time, call:
```
npm i -g geenee
```
Then, you can simply call the commands directly using `geenee <command>`.

See more complete instructions below in [Usage](#usage).

For an example, see [easy-oclif-cli](https://www.npmjs.com/package/easy-oclif-cli).




[//]: # ( ns__custom_end beforeToc )

[//]: # ( ns__custom_start toc )
<!-- toc -->
* [How](#how)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

[//]: # ( ns__custom_end toc )

[//]: # ( ns__custom_start usage )
# Usage

<!-- usage -->
```sh-session
$ npm install -g geenee
$ geenee COMMAND
running command...
$ geenee (-v|--version|version)
geenee/0.1.1 linux-x64 node-v14.9.0
$ geenee --help [COMMAND]
USAGE
  $ geenee COMMAND
...
```
<!-- usagestop -->

[//]: # ( ns__custom_end usage )

[//]: # ( ns__end_section usageSection )


[//]: # ( ns__start_section commandsSection )
# Commands


[//]: # ( ns__custom_start commands )
<!-- commands -->
* [`geenee chase TEMPLATE`](#geenee-chase-template)
* [`geenee check CODE`](#geenee-check-code)
* [`geenee generate CODE`](#geenee-generate-code)
* [`geenee help [COMMAND]`](#geenee-help-command)
* [`geenee pounce MODEL`](#geenee-pounce-model)

## `geenee chase TEMPLATE`

compare generated code to your model, changing both until you've replicated the model with your template

```
USAGE
  $ geenee chase TEMPLATE

ARGUMENTS
  TEMPLATE  the path to your template

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ copykat chase sampleTemplateDir
```

_See code: [src/commands/chase.ts](https://github.com/YizYah/geenee/blob/v0.1.1/src/commands/chase.ts)_

## `geenee check CODE`

checks that the code has been entered safely, meaning that regeneration won't lose any changes

```
USAGE
  $ geenee check CODE

ARGUMENTS
  CODE  path to the code base to check

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ geenee check sampleCode
```

_See code: [src/commands/check.ts](https://github.com/YizYah/geenee/blob/v0.1.1/src/commands/check.ts)_

## `geenee generate CODE`

generates code based on a template and a settings file. To set the template, you need the template flag.

```
USAGE
  $ geenee generate CODE

ARGUMENTS
  CODE  path to the code base to generate

OPTIONS
  -h, --help               show CLI help

  -n, --noSetup            Do not update the startup routine (this is only relevant when the template flag is also
                           used). Saves a lot of time for a template developer.

  -t, --template=template  Template directory. Will generate from the template, and will override any prior template or
                           template version used.

EXAMPLE
  $ geenee generate sampleCode -t sampleTemplate -n
  You have executed the generate command...
```

_See code: [src/commands/generate.ts](https://github.com/YizYah/geenee/blob/v0.1.1/src/commands/generate.ts)_

## `geenee help [COMMAND]`

display help for geenee

```
USAGE
  $ geenee help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `geenee pounce MODEL`

specify a model code base and generate a template to build it

```
USAGE
  $ geenee pounce MODEL

ARGUMENTS
  MODEL  path to a model code base from which you will generate your template

OPTIONS
  -h, --help                     show CLI help
  -t, --templateDir=templateDir  path to the generator that you will build

EXAMPLE
  $ copykat pounce sampleModel -t sampleTemplateDir
```

_See code: [src/commands/pounce.ts](https://github.com/YizYah/geenee/blob/v0.1.1/src/commands/pounce.ts)_
<!-- commandsstop -->


# Help

* Read our [documentation][1]
* Post questions on our [Community](https://spectrum.chat/ns-flip)
*  [open issues](https://github.com/NoStackApp/ns-flip/issues/new)

[//]: # ( ns__custom_end commands )

[//]: # ( ns__end_section commandsSection )


[1]: https://ns-flip.nostack.net/
