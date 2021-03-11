
[//]: # ( ns__file unit: standard, comp: README.md )

[//]: # ( ns__custom_start beginning )

[//]: # ( ns__custom_end beginning )

[//]: # ( ns__start_section intro )

[//]: # ( ns__custom_start description )

[//]: # ( ns__custom_end description )

[//]: # ( ns__custom_start afterDescription )
![geenee logo and video](src/custom/images/GEENEE-GIF-7.gif)

Code **Re**generator.  Reapplies your template without losing your changes

[//]: # ( ns__custom_end afterDescription )

[//]: # ( ns__custom_start badges )

[//]: # ( ns__start_section usageSection )

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/geenee.svg)](https://npmjs.org/package/geenee)
[![Downloads/week](https://img.shields.io/npm/dw/geenee.svg)](https://npmjs.org/package/geenee)
[![License](https://img.shields.io/npm/l/geenee.svg)](https://github.com/YizYah/geenee/blob/master/package.json)

[//]: # ( ns__custom_end badges )

[//]: # ( ns__end_section intro )


[//]: # ( ns__custom_start beforeToc )

[//]: # ( ns__custom_end beforeToc )

[//]: # ( ns__custom_start toc )
<!-- toc -->
* [<a name="clipboard-why"></a>:clipboard: Why](#a-nameclipboard-whyaclipboard-why)
* [<a name="white_check_mark-steps"></a>:white_check_mark: Steps](#a-namewhite_check_mark-stepsawhite_check_mark-steps)
* [<a name="bulb-a-funny-sample"></a>:bulb: A Funny Sample](#a-namebulb-a-funny-sampleabulb-a-funny-sample)
* [<a name="wrench-usage"></a>:wrench: Usage](#a-namewrench-usageawrench-usage)
* [<a name="zap-commands"></a>:zap: Commands](#a-namezap-commandsazap-commands)
* [<a name="heavy_exclamation_mark-help"></a>:heavy_exclamation_mark: Help](#a-nameheavy_exclamation_mark-helpaheavy_exclamation_mark-help)
<!-- tocstop -->
* [:clipboard: Why](#clipboard-why)
* [:white_check_mark: Steps](#white_check_mark-steps)
* [:bulb: A Funny Sample](#bulb-a-funny-sample)
* [:wrench: Usage](#wrench-usage)
* [:zap: Commands](#zap-commands)
* [:heavy_exclamation_mark: Help](#heavy_exclamation_mark-help)
<!-- tocstop -->

[//]: # ( ns__custom_end toc )

[//]: # ( ns__custom_start usage )
# <a name="clipboard-why"></a>:clipboard: Why
Whenever you use a template that later gets updated, you normally have a problem.  You can regenerate from scratch or you can't use the new version.  But with `geenee`, you can reapply the template without losing your custom code!

# <a name="white_check_mark-steps"></a>:white_check_mark: Steps
1. Run `settings` if you haven't yet, and set or modify what you want to generate:
```
npx geenee $CODE_PATH
```

2. You should always check first to be sure that your changes will be safe:
```
npx geenee check $CODE_PATH
```

3. You should regenerate your code after you:
* update your template (follow the instructions with its README)
* update your settings file.

Here's the command:
  ```
  npx geenee generate $CODE_PATH
  ```

4. After you generate, you should always run `npm i` to install everything.


If you would like to install `geenee` globally to save time, call:
```
npm i -g geenee
```
Then, you can simply call the commands directly using `geenee <command>` instead of `npx geenee <command>`.

See more complete instructions below in [Usage](#usage).

# <a name="bulb-a-funny-sample"></a>:bulb: A Funny Sample

`geenee` is actually a *recursive* tool: `geenee` was generated by `geenee`! :smiley: It is based on the [easy-oclif-cli](https://www.npmjs.com/package/easy-oclif-cli) template.

![geenee sample](src/custom/images/geenee-funnysample.gif)


# <a name="wrench-usage"></a>:wrench: Usage

<!-- usage -->
```sh-session
$ npm install -g geenee
$ geenee COMMAND
running command...
$ geenee (-v|--version|version)
geenee/0.1.21 win32-x64 node-v14.15.5
$ geenee --help [COMMAND]
USAGE
  $ geenee COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g geenee
$ geenee COMMAND
running command...
$ geenee (-v|--version|version)
geenee/0.1.20 win32-x64 node-v14.15.5
$ geenee --help [COMMAND]
USAGE
  $ geenee COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g geenee
$ geenee COMMAND
running command...
$ geenee (-v|--version|version)
geenee/0.1.19 win32-x64 node-v14.15.5
$ geenee --help [COMMAND]
USAGE
  $ geenee COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g geenee
$ geenee COMMAND
running command...
$ geenee (-v|--version|version)
geenee/0.1.18 win32-x64 node-v14.15.5
$ geenee --help [COMMAND]
USAGE
  $ geenee COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g geenee
$ geenee COMMAND
running command...
$ geenee (-v|--version|version)
geenee/0.1.17 linux-x64 node-v15.8.0
$ geenee --help [COMMAND]
USAGE
  $ geenee COMMAND
...
```
<!-- usagestop -->

[//]: # ( ns__custom_end usage )

[//]: # ( ns__end_section usageSection )


[//]: # ( ns__start_section commandsSection )
# <a name="zap-commands"></a>:zap: Commands


[//]: # ( ns__custom_start commands )
<!-- commands -->
* [`geenee check CODE`](#geenee-check-code)
* [`geenee generate CODE`](#geenee-generate-code)
* [`geenee help [COMMAND]`](#geenee-help-command)
* [`geenee settings CODE`](#geenee-settings-code)

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

_See code: [src/commands/check.ts](https://github.com/YizYah/geenee/blob/v0.1.21/src/commands/check.ts)_

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

_See code: [src/commands/generate.ts](https://github.com/YizYah/geenee/blob/v0.1.21/src/commands/generate.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `geenee settings CODE`

change your settings for the next generation

```
USAGE
  $ geenee settings CODE

ARGUMENTS
  CODE  path to the code base

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ geenee settings sampleCode
  You have executed the settings command...
```

_See code: [src/commands/settings.ts](https://github.com/YizYah/geenee/blob/v0.1.21/src/commands/settings.ts)_
<!-- commandsstop -->
* [`geenee check CODE`](#geenee-check-code)
* [`geenee generate CODE`](#geenee-generate-code)
* [`geenee help [COMMAND]`](#geenee-help-command)
* [`geenee settings CODE`](#geenee-settings-code)

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

_See code: [src/commands/check.ts](https://github.com/YizYah/geenee/blob/v0.1.20/src/commands/check.ts)_

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

_See code: [src/commands/generate.ts](https://github.com/YizYah/geenee/blob/v0.1.20/src/commands/generate.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `geenee settings CODE`

change your settings for the next generation

```
USAGE
  $ geenee settings CODE

ARGUMENTS
  CODE  path to the code base

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ geenee settings sampleCode
  You have executed the settings command...
```

_See code: [src/commands/settings.ts](https://github.com/YizYah/geenee/blob/v0.1.17/src/commands/settings.ts)_
<!-- commandsstop -->


# <a name="heavy_exclamation_mark-help"></a>:heavy_exclamation_mark: Help

* Read our [documentation](https://geenee.nostack.net/)
* [Open issues](https://github.com/YizYah/geenee/issues/new)
* Post questions on [discussions](https://github.com/YizYah/geenee/discussions/) 

[//]: # ( ns__custom_end commands )

[//]: # ( ns__end_section commandsSection )
