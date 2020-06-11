import { createHex, createHexPrototype, DefaultHexPrototype, Hex, HexCoordinates } from '../../hex'

export const createTraverser = <T extends DefaultHexPrototype, A extends unknown[]>(
  hexPrototype: T,
  generator: (hexPrototype: T, ...args: A) => Generator<Hex & T>,
) => (...args: A) => ({
  [Symbol.iterator]: generator(hexPrototype, ...args),
})

// playground:
const traverse = createTraverser(createHexPrototype(), function* derp(
  hexPrototype,
  start: HexCoordinates,
  stop?: HexCoordinates,
) {
  yield createHex(hexPrototype, start)
  yield createHex(hexPrototype, { q: 0, r: 0 })
  yield createHex(hexPrototype, stop ?? { q: 0, r: 0 })
})

const grid = traverse({ q: 1, r: 2 })

/**
 * // traverse() returns a grid instance
 * const traverse = Grid.createTraverser(function* ({ start = {q:0,r:0}, stop = never, direction = E }) {
 *   // todo: set `this` to grid instance (which has hexPrototype) or hexPrototype?
 *   yield coordinates // not hexes to keep it simple for users (they'd need the hex prototype) and to prevent users from yielding invalid hexes
 * })
 */
