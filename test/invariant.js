const fc = require('fast-check')
const _ = require('lodash')

// Based on https://stackoverflow.com/a/39627599/3496534
function quickSort(array) {
  if (array.length <= 1) {
    return array
  }

  const pivot = array[0]

  const left = []
  const right = []

  for (let i = 1; i < array.length; i++) {
    array[i] < pivot ? left.push(array[i]) : right.push(array[i])
  }

  return quickSort(left).concat(pivot, quickSort(right))
}

describe('Invariant functions', () => {
  it('x.sort().length === x.length', async () => {
    const arbitrary = fc.array(fc.double(), 500)

    // prettier-ignore
    const property = fc.property(
      arbitrary,
      (arr) =>  quickSort(arr).length === arr.length)

    fc.assert(property, { numRuns: 500 })
  })

  it('x.map().length === x.length', async () => {
    const arbitrary = fc.array(fc.double(), 500)

    const addOne = e => e + 1

    // prettier-ignore
    const property = fc.property(
      arbitrary,
      (arr) =>  _.map(arr, addOne).length === arr.length)

    fc.assert(property, { numRuns: 500 })
  })
})
