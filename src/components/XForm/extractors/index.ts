import { ExtractorFactory } from '@x-form/react-jsonschema'

export default ExtractorFactory({
  boolean: schema => Boolean(schema.data),
})
