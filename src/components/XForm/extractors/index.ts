import { ExtractorFactory } from '@x-form-legacy/react-jsonschema'

export default ExtractorFactory({
  boolean: schema => Boolean(schema.data),
})
