/*
This file has been partially generated with the template 'ns-template-easy-oclif-cli'.

To permit updates to the generated portions of this code in the future,
please follow all rules at https://ns-flip.nostack.net//Safe-Custom-Code
*/
/* ns__file unit: static-command, comp: generate.test.ts */

/* ns__start_section imports */
import {expect, test} from '@oclif/test'
/* ns__custom_start customImports */
/* ns__custom_end customImports */
/* ns__end_section imports */

/* ns__custom_start tests */
// replace everything in this tests section when you modify your code.
describe('generate', () => {
  test
  .stderr()
  .command(['generate', '-t', 'nonExistentTemplate', '--noSetup'])
  .catch(error => {
    expect(error.message).to.contain('Missing 1 required arg')
  })
  .it('requires existing template')

  test
  .stderr()
  .command(['generate', 'nonExistentCodeBase', '-t', 'nonExistentTemplate', '--noSetup'])
  .catch(error => {
    expect(error.message).to.contain('no such file or directory')
  })
  .it('requires existing template')
})
/* ns__custom_end tests */
