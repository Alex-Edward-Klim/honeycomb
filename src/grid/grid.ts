import { DefaultHexPrototype } from '../hex'
import { rectangle } from './functions'
import { TraverseOptions } from './types'

export class Grid<T extends DefaultHexPrototype> {
  // todo: make traverser optional (and use a default traverser)?
  constructor(public hexPrototype: T, public traverser: () => Generator<T, void>) {}

  [Symbol.iterator]() {
    return this.traverser()
  }

  rectangle(options: TraverseOptions<T>) {
    return rectangle(this.hexPrototype, options)
  }
}
