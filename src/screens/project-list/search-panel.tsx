import { useEffect } from 'react'

export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
}
interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps["param"]) => void// 里面就是说param参数是{name: stringpersonId: string}类型的，然后返回空
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return <form>
    <input type="text" value={param.name} onChange={evt => setParam({
      ...param,
      name: evt.target.value
    })} />
    
    <select value={param.personId} onChange={evt => setParam({
      ...param,
      name: evt.target.value
    })}>
      <option value={''}>负责人</option>
      {users.map(user => <option key={user.id} value={user.name}>{ user.name }</option>) }
    </select>
  </form>
}

// // 初始化
// export const useMount = (callback) => {
//   useEffect(() => {
//     callback()
//   }, [])
// }