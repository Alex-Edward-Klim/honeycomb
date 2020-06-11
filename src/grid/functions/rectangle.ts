import { createHex, CubeCoordinates, DefaultHexPrototype, equals, Hex, isPointy, Orientation } from '../../hex'
import { isFunction, offsetFromZero } from '../../utils'
import { Grid } from '../grid'
import { FlatCompassDirection, PointyCompassDirection, TraverseOptions } from '../types'

const DIRECTIONS = [
  ['q', 'r', 's'],
  ['r', 'q', 's'],
  ['r', 's', 'q'],
  ['s', 'r', 'q'],
  ['s', 'q', 'r'],
  ['q', 's', 'r'],
] as [keyof CubeCoordinates, keyof CubeCoordinates, keyof CubeCoordinates][]

// todo: see if some sort of general traverse function can be extracted from this
export const rectangle = <T extends DefaultHexPrototype>(
  hexPrototype: T,
  {
    direction = hexPrototype.orientation === Orientation.POINTY ? PointyCompassDirection.E : FlatCompassDirection.S,
    start = { q: 0, r: 0, s: 0 },
    stop = () => false,
    width = Infinity,
    height = Infinity,
  } = {} as TraverseOptions<T>,
) => {
  const traverser = function* hexes() {
    // todo: add warning about infinite loop when width and height are Infinity and stop() never returns true
    stop = isFunction(stop) ? stop : (hex: T & Hex) => equals(hex, stop as CubeCoordinates)

    // todo: assert unambiguous directions
    const [firstCoordinate, secondCoordinate, thirdCoordinate] = DIRECTIONS[direction]
    const [firstStop, secondStop] = isPointy(hexPrototype) ? [width, height] : [height, width]

    for (let second = 0; second < secondStop; second++) {
      const secondOffset = offsetFromZero(hexPrototype.offset, second)

      for (let first = -secondOffset; first < firstStop - secondOffset; first++) {
        const nextCubeCoordinates = {
          [firstCoordinate]: first + start[firstCoordinate],
          [secondCoordinate]: second + start[secondCoordinate],
          [thirdCoordinate]: -first - second + start[thirdCoordinate],
        } as unknown
        const nextHex = createHex(hexPrototype, nextCubeCoordinates as CubeCoordinates)

        if (stop(nextHex)) {
          return
        }

        yield nextHex
      }
    }
  }

  return new Grid(hexPrototype, traverser)
}
