export enum CustomerSource {
  TIANYANCHA = 'TIANYANCHA', // 天眼查
  QICHACHA = 'QICHACHA', // 企查查
  DOUYIN = 'DOUYIN', // 抖音
  TAOBAO = 'TAOBAO', // 淘宝
  JIANQICHA = 'JIANQICHA', // 建企查
  OUTBOUND_CALL = 'OUTBOUND_CALL', // 外呼
  OTHER = 'OTHER', // 其他
}

export enum CustomerCategory {
  QUALIFICATION_PROCESSING = 'QUALIFICATION_PROCESSING', // 资质办理
  QUALIFICATION_MAINTENANCE = 'QUALIFICATION_MAINTENANCE', // 资质维护
  TALENT_DEMAND = 'TALENT_DEMAND', // 人才需求
  OTHER = 'OTHER', // 其他
}

export enum CustomerStatus {
  PENDING_FOLLOW = 'PENDING_FOLLOW', // 待跟进
  FOLLOWING = 'FOLLOWING', // 跟进中
  INTENTION = 'INTENTION', // 意向客户
  NON_INTENTION = 'NON_INTENTION', // 非意向客户
}

export enum FollowRecordType {
  VISIT = 'VISIT', // 到访
  PHONE_CALL = 'PHONE_CALL', // 电话
  WECHAT = 'WECHAT', // 微信
  QQ = 'QQ', // QQ
  SMS = 'SMS', // 短信
  EMAIL = 'EMAIL', // 邮件
  INTERNET_CALL = 'INTERNET_CALL', // 网络电话
  OUTBOUND_CALL = 'OUTBOUND_CALL ', // 外呼
  OTHER = 'OTHER', // 其他
}

export enum OperationRecordType {
  CREATE = 'CREATE', // 新增线索
  UPDATE = 'UPDATE', // 更新线索
  DELETE = 'DELETE', // 删除线索
}

export enum TimeLineColor {
  CREATE = 'green',
  UPDATE = 'blue',
  DELETE = 'red',
}
