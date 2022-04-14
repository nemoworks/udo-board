import { TranspilerFactory } from '@x-form-legacy/react-jsonschema'
import Generators from './generators'
import Injectors from './injectors'

export default TranspilerFactory({
  injectors: [Injectors.Depth, Injectors.Label],
  generators: [Generators.ReadOnly, Generators.Mini],
})
