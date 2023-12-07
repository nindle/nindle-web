import { CustomerCategory, CustomerSource, CustomerStatus, FollowRecordType } from '@/enums'

export const CUSTOMER_SOURCE = [
  { label: '天眼查', value: CustomerSource.TIANYANCHA },
  { label: '企查查', value: CustomerSource.QICHACHA },
  { label: '抖音', value: CustomerSource.DOUYIN },
  { label: '淘宝', value: CustomerSource.TAOBAO },
  { label: '建企查', value: CustomerSource.JIANQICHA },
  { label: '外呼', value: CustomerSource.OUTBOUND_CALL },
  { label: '其他', value: CustomerSource.OTHER },
]

export const CUSTOMER_CATEGORY = [
  { label: '资质办理', value: CustomerCategory.QUALIFICATION_PROCESSING },
  { label: '资质维护', value: CustomerCategory.QUALIFICATION_MAINTENANCE },
  { label: '人才需求', value: CustomerCategory.TALENT_DEMAND },
  { label: '其他', value: CustomerCategory.OTHER },
]

export const CUSTOMER_STATUS = [
  { label: '待跟进', value: CustomerStatus.PENDING_FOLLOW },
  { label: '跟进中', value: CustomerStatus.FOLLOWING },
  { label: '意向客户', value: CustomerStatus.INTENTION },
  { label: '非意向客户', value: CustomerStatus.NON_INTENTION },
]

export const FOLLOW_RECORD_TYPE = [
  { label: '到访', value: FollowRecordType.VISIT },
  { label: '电话', value: FollowRecordType.PHONE_CALL },
  { label: '微信', value: FollowRecordType.WECHAT },
  { label: 'QQ', value: FollowRecordType.QQ },
  { label: '短信', value: FollowRecordType.SMS },
  { label: '邮件', value: FollowRecordType.EMAIL },
  { label: '网络电话', value: FollowRecordType.INTERNET_CALL },
  { label: '外呼', value: FollowRecordType.OUTBOUND_CALL },
  { label: '其他', value: FollowRecordType.OTHER },
]
