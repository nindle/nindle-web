import { EnumFromMode } from '@/enums'

export const getModalTitleByFormMode = (mode: EnumFromMode | undefined, title: string) => {
  switch (mode) {
    case EnumFromMode.CREATE:
      return `新建${title}`
    case EnumFromMode.UPDATE:
      return `编辑${title}`
    case EnumFromMode.READ:
      return `查看${title}`
    default:
      return ''
  }
}
