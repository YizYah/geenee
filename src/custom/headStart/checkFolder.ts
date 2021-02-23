const fs = require('fs-extra')

export async function checkFolder(starterDir: string) {
  if (await fs.pathExists(starterDir)) {
    try {
      await fs.remove(starterDir)
    } catch (error) {
      throw new Error(`cannot remove the starter ${starterDir}: ${error}`)
    }
  }
}
