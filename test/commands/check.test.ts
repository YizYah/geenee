/*
This file has been partially generated with the template 'ns-template-easy-oclif-cli'.

To permit updates to the generated portions of this code in the future,
please follow all rules at https://ns-flip.nostack.net//Safe-Custom-Code
*/
/* ns__file unit: static-command, comp: check.test.ts */

/* ns__start_section imports */
import {expect, test} from '@oclif/test'
/* ns__custom_start customImports */
/* ns__custom_end customImports */
/* ns__end_section imports */

/* ns__custom_start tests */
// replace everything in this tests section when you modify your code.
describe('check', () => {
  test
  .stdout()
  .command(['check', 'sampleCode'])
  .it('runs check with all args and flags', ctx => {
    expect(ctx.stdout).to.contain('You have executed the check command')
  })

  test
  .stderr()
  .command(['check', 'sampleBadArgValue'])
  .catch(error => {
    expect(error.message).to.contain('bad arg value')
  })
  .it('requires proper args')
})
/* ns__custom_end tests */
