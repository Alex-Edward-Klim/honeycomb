import { createHexPrototype, Hex, rectangle } from '../dist'
import { createSuite } from './benchmark'
import { render } from './render'

interface CustomHex extends Hex {
  custom: string
}

const hexPrototype = createHexPrototype<CustomHex>({
  dimensions: 30,
  custom: 'custom',
  origin: (hexPrototype) => ({ x: hexPrototype.width * -0.5, y: hexPrototype.height * -0.5 }),
})
// const hexPrototype = createHexPrototype({ dimensions: 50 })
// const hex = createHex(hexPrototype, { q: 4, r: 3 })
// const Grid = defineGrid(hexPrototype)

const grid = rectangle(hexPrototype, { width: 24, height: 16 })
console.log(grid)

render(hexPrototype, grid)
createSuite()
  .add('', function () {})
  .add('', function () {})

/**
 * Latest permutation of what's below:
 * There are only traversers: a "creator" only sets boundaries. For traversal, only these parameters are significant:
 * - start hex and direction
 * - when to stop, e.g.:
 *   - at a certain hex
 *   - after n hexes
 *   - when a boundary is reached
 *   - combination of the above
 * The result of a traversal is a (sub)grid, this can be added/subtracted/intersected/differenced, mapped/reduced or just ignored (in case of side-effects).
 *
 *
 * Two main groups of functions for grids:
 * 1. Creators (Factories? Generators?) (create grids (iterables of hexes), dimensions are important)
 *   - new Grid(hexPrototype): can be traversed (indefinitely)
 *   - grid.hexagon()
 *   - grid.parallelogram()
 *   - grid.rectangle()
 *   - grid.spiral() (grid.ring() would be a spiral that stops)
 *   - grid.triangle()
 * 2. Traversers (iterate over hexes, order, where to start, when to stop are important)
 *   Ideas:
 *   - Begin with calling traverser, then do things with hexes
 *     grid.spiral({ start, direction }) // spiral() is also a traverser (just like the other "shape" methods)
 *     traverse = grid.createTraverser(function* customTraverser(options) {})
 *     traverse({ start, direction }).pipe(
 *       filter(),
 *       until(), // signal when to stop traversing (can be used to stop when a certain hex is reached)
 *     )
 *   - Make traversers even finer-grained (seems very complex):
 *     grid.traverse({ start, direction: NE }).pipe(
 *       // this would create a ring around the start hex (excluding the start hex)
 *       step(1),
 *       take(),
 *       rotate(2),
 *       repeat([take(), rotate(1)], 5),
 *       until((hex, i) => i === 6)
 *     )
 *
 * Things you can do with a grid:
 * 1. transform (add/subtract hexes, "move" hexes, also includes mergeMap(), tap())
 * 2. iterate (for side effects: forEach())?
 * 3. assert (some/every/has)
 * 4. map/reduce (to something different than a grid, also includes find())
 *
 * 1 and 2 return grids
 * 3 and 4 return a different type
 *
 * A grid has these methods:
 * - group 1:
 *   - transform()/pipe(): accepts 1 or more transformer functions (todo: this might be overkill, how many transforms are people gonna use?):
 *     - filter() (is a traverser)
 *     - reject(): opposite of filter() (is a traverser)
 *     - tap(): for side-effects? (is a traverser)
 *     - mergeMap() todo: ???
 *     - add()/union()
 *     - subtract()
 *     - intersect()
 *     - difference()
 * - group 2:
 *   - forEach() (is a traverser)
 * - group 3:
 *   - some()/contains()/has()/includes(): accepts a predicate function, returns a boolean (is a traverser)
 *   - every()/all(): accepts a predicate function, returns a boolean (is a traverser)
 *   - where(): accepts a predicate function, returns a boolean (is a traverser)
 * - group 4:
 *   - ~~map(): accepts a function, returns ...~~
 *   - reduce(): accepts a function and accumulator, returns accumulator
 *   - toArray()
 *   - toJSON()
 *   - toString()
 *   - toLinkedList() todo: ???
 *   - toRecord() todo: ???
 *   - toMap() todo: ???
 *   - toSet() todo: ???
 *
 * todo: a lot of these methods are (very) similar to Ramda's
 * todo: grid.pipe() only accepts functions that return a grid (group 1 and 2), all other functions (group 3 and 4) are methods of grid?
 */
