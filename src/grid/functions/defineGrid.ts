// import { DefaultHexPrototype } from '../../hex'
// import { Grid } from '../types'
// import { rectangle, RectangleOptions } from './rectangle'

// export const defineGrid = <T extends DefaultHexPrototype>(hexPrototype: T) =>
//   Object.create({
//     hexPrototype,
//     rectangle(options?: RectangleOptions<T>) {
//       return rectangle(hexPrototype, options)
//     },
//   }) as Grid<T>

// // return Object.assign(Object.create(prototype), {
// //   *[Symbol.iterator](hexes: Iterable<T & Hex>) {
// //     for (const hex of hexes) {
// //       yield hex
// //     }
// //   },
// // }) as Grid<T>
