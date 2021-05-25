import { Helmet } from 'umi'
import './index.less'

interface Props {
  title?: string
  className?: string
  children?: any
}

export default function ({ title = 'UDO-Board', className = '', children }: Props) {
  return (
    <div className={'page container ' + className}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  )
}
