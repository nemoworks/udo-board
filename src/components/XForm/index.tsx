import XForm from '@x-form-legacy/react-jsonschema'
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

interface Props {
  schema: any
  formData?: any
  onChange?: Function
  className?: string
}

export default function ({ schema, formData = null, onChange = () => {}, className = '' }: Props) {
  return <XForm schema={schema} formData={formData} onChange={onChange} className={className} extensions={Default} />
}
