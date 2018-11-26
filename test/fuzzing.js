const fc = require('fast-check')
const got = require('got')

jest.setTimeout(15 * 1000)

describe('fuzzing', () => {
  it('API fuzzing', async () => {
    const property = fc.asyncProperty(fc.string(1, 10), async str => {
      const url = `https://jobs.github.com/positions.json?description=${str}&page=1`
      const response = await got(url)

      return response.statusCode < 500
    })

    await fc.assert(property, { numRuns: 3 })
  })
})
