import XForm from '@x-form/react-jsonschema'
import transpilers from './transpilers'

const Default = {
  transpile: transpilers.Default,
}

const ReadOnly = {
  transpile: transpilers.ReadOnly,
}

const Mini = {
  transpile: transpilers.Mini,
}

export default function ({ schema, formData = null, onChange = () => {}, className = '' }) {
  return <XForm schema={schema} formData={formData} onChange={onChange} className={className} extensions={Default} />
}
