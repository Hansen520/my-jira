import React from 'react'
import { Table } from 'antd'
import dayjs from 'dayjs'
import { User } from './search-panel'

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}
interface ListProps { 
  list: Project[]// Project类型的数组
  users: User[]// User类型的数组
}
export const List = ({ list, users }: ListProps) => { 
  return <Table
    rowKey={'id'}
    pagination={false}
    columns={[
      {
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)
      },
      {
        title: "部门",
        dataIndex: "organization",
      },
      {
        title: '负责人',
        render(value, project) {
          return (
            <span>
              {users.find(user => user.id === project.personId)?.name || '未知'}
            </span>
          )
        }
      },
      {
        title: "创建时间",
        render(value, project) {
          return (
            <span>
              {project.created
                ? dayjs(project.created).format("YYYY-MM-DD")
                : "无"}
            </span>
          );
        },
      },
    ]}
    dataSource={list}
  >
  </Table>
}