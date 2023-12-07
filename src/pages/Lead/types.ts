import type { CustomerCategory, CustomerSource, CustomerStatus, FollowRecordType, OperationRecordType } from '@/enums'
import type { BaseTableListItem } from '@/types'

export interface Customer extends BaseTableListItem {
  name: string
  province: string
  city: string
  area: string
  phone: string
  wechat: string
  source: CustomerSource
  category: CustomerCategory
  status: CustomerStatus
  follower: string
  followerId: number
  followRecords: FollowRecord[]
  remarks: string
}

export interface FollowRecord extends BaseTableListItem {
  type: FollowRecordType
  hasAppointment: boolean
  followContent: string
  nextFollowAt: string
  nextFollowContent: string
  customerId: number
}

export interface OperationRecord extends BaseTableListItem {
  type: OperationRecordType
  details: string
  customerId: number
}
