import { EnumUserStatus } from '@/enums'

export const USER_GENDER = [
  { label: '男', value: 'MALE' },
  { label: '女', value: 'FEMALE' },
  { label: '未知', value: 'UNKNOWN' },
]

export const USER_STATUS = [
  { label: '启用', value: EnumUserStatus.ACTIVE },
  { label: '禁用', value: EnumUserStatus.DISABLED },
]
