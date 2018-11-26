const jwt = require('jsonwebtoken')
const fc = require('fast-check')

describe('Inverse functions', () => {
  it('decode(encode(x)) === x', async () => {
    const arbitraries = fc.oneof(
      fc.string(1, 500),
      fc.unicodeString(1, 500),
      fc.hexaString(1, 500),
      fc.fullUnicodeString(1, 500),
    )

    // prettier-ignore
    const property = fc.property(
      arbitraries, 
      arbitraries, 
      (payload, secret) => {
      const token = jwt.sign(payload, secret)
      const decoded = jwt.decode(token, secret)

      return decoded === payload
    })

    fc.assert(property, { numRuns: 500 })
  })
})