import React from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from 'utils/index'
import * as qs from 'qs'
import { useHttp } from 'utils/http' 
  
const apiUrl = process.env.REACT_APP_API_URL


export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const debouncedParam = useDebounce(param, 200)
  const client = useHttp()
  useEffect(() => {
    // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => { 
    //   if (response.ok) { 
    //     setList(await response.json())
    //   }
    // })
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam])
  useMount(() => {
    // fetch(`${apiUrl}/users`).then(async response => { 
    //   if (response.ok) { 
    //     setUsers(await response.json())
    //   }
    // })
    client("users", {}).then(setUsers);
  })
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={ list }></List>
  </div>
 }