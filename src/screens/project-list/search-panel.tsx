/** @jsx jsx */
import React from 'react'

import { jsx, css } from '@emotion/react'
import { Form, Input, Select } from 'antd'

export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
  token: string
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
  return (<Form css={{ marginBottom: "2rem" }} layout={"inline"}>
    <Form.Item>
      <Input
        placeholder={"项目名"}
        type="text"
        value={param.name}
        onChange={
          evt => setParam({
            ...param,
            name: evt.target.value
          })
        } />
    </Form.Item>
    <Form.Item>
      <Select
        value={param.personId}
        onChange={
          (value) => setParam({
            ...param,
            personId: value
          })
        }>
        <Select.Option value={''}>负责人</Select.Option>
        {users.map(user =>
          <Select.Option key={user.id} value={user.name}>
            {user.name}
          </Select.Option>)}
      </Select>
    </Form.Item>
  </Form>)
}