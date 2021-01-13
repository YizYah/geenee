import {checkDirForDiscrepancies} from './checkDirForDiscrepancies'
const {singularName} = require('magicalstrings').inflections

export async function checkGeneratedUnits(
  units: string[],
  diffsDir: string,
  originalComps: string,
  generatedComps: string,
  logFile: string,
  problemsFound: boolean,
) {
  await Promise.all(units.map(async (unit: string) => {
    const unitName = singularName(unit)
    const diffsFile = `${diffsDir}/${unitName}`
    const originalUnit = `${originalComps}/${unitName}`
    const generatedUnit = `${generatedComps}/${unitName}`
    const problemsFoundLocally: boolean = await checkDirForDiscrepancies(
      diffsFile,
      originalUnit,
      generatedUnit,
      logFile,
      problemsFound
    )
    if (!problemsFound) problemsFound = problemsFoundLocally
  }))
  return problemsFound
}
