const fc = require('fast-check')
const _ = require('lodash')

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

describe('Test Oracle', () => {
  it('myCode === oracleCode', async () => {
    const arbitraries = fc.oneof(fc.integer(), fc.float(), fc.double())

    // prettier-ignore
    const property = fc.property(
      arbitraries, 
      num => _.isNumber(num) === isNumber(num)
    )

    fc.assert(property, { numRuns: 500 })
  })
})
