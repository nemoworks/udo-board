import HOC, { __depth__, __label__ } from './HOC'

/* 基本组件 */
import Input from './Input'
import DatePicker from './DatePicker'
import Select from './Select'
import Link from './Link'
import Info from './Info'
import Checkbox from './Checkbox'
/* ------- */

/* 高级组件 */
import Options from './Options'
import List from './List'
/* ------- */

/* 容器组件 */
import Card from './Card'
import Divider from './Divider'
import Label from './Label'
/* ------- */

const renders = {
  Input,
  DatePicker,
  Select,
  Link,
  Options,
  List,
  Card,
  Label,
  Divider,
  Info,
  Checkbox,
}

Object.keys(renders).forEach(key => (renders[key] = HOC(renders[key])))

export default renders

export { __depth__, __label__ }
