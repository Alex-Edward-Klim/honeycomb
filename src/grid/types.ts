import { CubeCoordinates, DefaultHexPrototype, Hex } from '../hex'

export const enum CompassDirection {
  E,
  SE,
  S,
  SW,
  W,
  NW,
  N,
  NE,
}

export const enum PointyCompassDirection {
  E,
  SE,
  SW,
  W,
  NW,
  NE,
}

export const enum FlatCompassDirection {
  SE,
  S,
  SW,
  NW,
  N,
  NE,
}

/**
 * todo: add more constraints than width and height (e.g. radius, maxAmount (of hexes))
 *
 * Maybe a traverser only requires start and direction (minimum start conditions) and there are functions for when to stop, what to do with each hex, etc:
 * Pseudocode:
 * grid
 *   .spiral({ start, direction })
 *   .pipe(
 *     filter((hex) => hex.hasSomeState),
 *     stop((hex, hexesSoFar) => )
 *   )
 */
export interface TraverseOptions<T extends DefaultHexPrototype> {
  direction?: PointyCompassDirection | FlatCompassDirection
  start?: CubeCoordinates
  stop?: CubeCoordinates | ((hex: T & Hex) => boolean)
  width?: number
  height?: number
}
