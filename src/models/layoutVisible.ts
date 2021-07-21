import { useState } from 'react'

export default () => {
  const [layoutVisible, setLayoutVisible] = useState(true)
  return {
    layoutVisible,
    setLayoutVisible,
  }
}
