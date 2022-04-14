// import { useEffect, useState } from 'react'
// import XForm, { Do } from '@x-form-legacy/react-jsonschema'
// import { Select, Popover } from 'antd'
// import { SchemaRQ, DocumentRQ } from '@/requests'
// import { Form } from '@/components'

// const { Option } = Select

// export default function Link({ schema }) {
//   const [documents, setDocuments] = useState([])
//   const [linkSchema, setLinkSchema] = useState({})

//   const { to } = schema

//   useEffect(() => {
//     if (to === undefined) return

//     SchemaRQ.get(to).then(schema_response =>
//       DocumentRQ.getAll('?schema=' + to).then(documents_response => {
//         setLinkSchema(schema_response.content)
//         setDocuments(documents_response)
//       }),
//     )
//   }, [])

//   return (
//     <Select value={schema.data} onChange={u => Do(() => (schema.data = u))}>
//       {documents.map((document: any) => (
//         <Option key={document.id} value={document.id}>
//           <Popover
//             content={
//               <XForm
//                 schema={linkSchema}
//                 formData={document.content}
//                 extensions={Form.Mini}
//               />
//             }
//           >
//             {document.id}
//           </Popover>
//         </Option>
//       ))}
//     </Select>
//   )
// }

export default function () {
  return <div>Link</div>
}
