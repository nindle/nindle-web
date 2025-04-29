import { memo, useEffect, useState } from 'react'
import {
  Typography,
  Form,
  Input,
  Button,
  List,
  Avatar,
  Divider,
  Card,
  Rate,
  Space,
  Tooltip,
  message
} from 'antd'
import {
  UserOutlined,
  MailOutlined,
  MessageOutlined,
  SmileOutlined,
  LikeOutlined,
  LikeFilled,
  CommentOutlined
} from '@ant-design/icons'
import LazyImage from '@/components/LazyImage'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

// 定义留言类型接口
interface MessageItem {
  id: number
  author: string
  avatar: string
  content: string
  datetime: string
  email?: string
  likes: number
  liked?: boolean
  replies?: MessageItem[]
}

// 自定义留言组件
const CommentItem = ({
  author,
  avatar,
  content,
  datetime,
  actions,
  children,
  isAuthor = false
}: {
  author: React.ReactNode
  avatar: React.ReactNode
  content: React.ReactNode
  datetime: React.ReactNode
  actions?: React.ReactNode[]
  children?: React.ReactNode
  isAuthor?: boolean
}) => {
  return (
    <div className="flex">
      <div className="mr-3 flex-shrink-0">{avatar}</div>
      <div className="flex-1 overflow-hidden">
        <div className="mb-1 flex items-center">
          <span className="font-medium mr-2 w-auto">{author}</span>
          {isAuthor && (
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full mr-2">
              作者
            </span>
          )}
          <span className="text-gray-400 text-sm hidden md:block">{datetime}</span>
        </div>
        <div className="text-gray-700 mb-3">{content}</div>
        {actions && actions.length > 0 && <div className="mb-2 flex gap-2">{actions}</div>}
        {children}
      </div>
    </div>
  )
}

// 主留言页面组件
const MessagePage = () => {
  const [form] = Form.useForm()
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [submitting, setSubmitting] = useState(false)

  // 模拟留言数据
  const mockMessages: MessageItem[] = [
    {
      id: 1,
      author: '张三',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
      content: '博客内容非常棒！期待更多React相关的文章。',
      datetime: '2023-10-18 10:23',
      likes: 12,
      replies: [
        {
          id: 101,
          author: 'Nindle',
          avatar: 'https://img.nindle.cn/logo.png',
          content: '谢谢支持！我会持续更新React相关内容的。',
          datetime: '2023-10-18 11:05',
          likes: 3
        }
      ]
    },
    {
      id: 2,
      author: '李四',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=2',
      content: '能不能写一篇关于React Server Components的详细教程？现在这方面的中文资料太少了。',
      datetime: '2023-10-16 16:45',
      likes: 8
    },
    {
      id: 3,
      author: '王五',
      avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=3',
      content: '博主的文章逻辑清晰，很容易理解。不过感觉更新频率有点低，希望能加快更新节奏~',
      datetime: '2023-10-15 09:30',
      likes: 5,
      replies: [
        {
          id: 102,
          author: 'Nindle',
          avatar: 'https://img.nindle.cn/logo.png',
          content: '感谢建议！我会尽量提高更新频率的。',
          datetime: '2023-10-15 14:20',
          likes: 2
        }
      ]
    }
  ]

  useEffect(() => {
    // 模拟加载数据
    setTimeout(() => {
      setMessages([...mockMessages])
    }, 500)
  }, [])

  // 处理留言提交
  const handleSubmit = (values: { name: string; email: string; content: string }) => {
    if (!values.content.trim()) {
      message.error('留言内容不能为空')
      return
    }

    setSubmitting(true)

    // 模拟提交请求
    setTimeout(() => {
      const newMessage: MessageItem = {
        id: Date.now(),
        author: values.name || '匿名用户',
        avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.floor(Math.random() * 100)}`,
        content: values.content,
        datetime: new Date().toLocaleString(),
        email: values.email,
        likes: 0
      }

      setMessages([newMessage, ...messages])
      setSubmitting(false)
      form.resetFields()
      message.success('留言成功')
    }, 1000)
  }

  // 处理点赞
  const handleLike = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === id) {
          return {
            ...msg,
            likes: msg.liked ? msg.likes - 1 : msg.likes + 1,
            liked: !msg.liked
          }
        }

        // 处理回复中的点赞
        if (msg.replies) {
          return {
            ...msg,
            replies: msg.replies.map((reply) => {
              if (reply.id === id) {
                return {
                  ...reply,
                  likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                  liked: !reply.liked
                }
              }
              return reply
            })
          }
        }

        return msg
      })
    )
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white min-h-screen pt-24 pb-16">
      <div className="w-full max-w-[1440px] mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl font-bold mb-4">
            留言板
          </Title>
          <Paragraph className="text-gray-500 max-w-2xl mx-auto text-lg">
            有什么想法、建议或问题？欢迎在这里留言，我会尽快回复。
          </Paragraph>
        </div>

        {/* 留言表单 */}
        <Card className="mb-12 shadow-md rounded-xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 -m-6 mb-6 p-6">
            <Title level={4} className="mb-2 flex items-center">
              <MessageOutlined className="mr-2 text-blue-500" />
              写下你的留言
            </Title>
            <Text type="secondary">分享你的想法、问题或建议</Text>
          </div>

          <Form
            form={form}
            name="message-form"
            onFinish={handleSubmit}
            layout="vertical"
            className="px-1"
          >
            <div className="flex flex-wrap gap-4">
              <Form.Item
                name="name"
                className="flex-1 min-w-[260px]"
                rules={[{ required: true, message: '请输入你的名字' }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="你的名字"
                  size="large"
                  className="rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                />
              </Form.Item>

              <Form.Item name="email" className="flex-1 min-w-[260px]">
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="你的邮箱（选填）"
                  size="large"
                  className="rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                />
              </Form.Item>
            </div>

            <Form.Item name="content" rules={[{ required: true, message: '请输入留言内容' }]}>
              <TextArea
                placeholder="写下你的留言..."
                rows={4}
                showCount
                maxLength={500}
                className="rounded-lg text-base resize-none border border-gray-200 hover:border-blue-300 transition-colors"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={submitting}
                  icon={<MessageOutlined />}
                  className="rounded-lg px-8 h-10 shadow-md hover:shadow-lg transition-all bg-blue-500 hover:bg-blue-600 border-0"
                >
                  发表留言
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>

        {/* 留言列表 */}
        <div>
          <Title level={3} className="mb-8 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-2 rounded"></span>
            <span className="text-gray-800 flex items-center">
              全部留言 <span className="text-blue-500 ml-2 text-lg">({messages.length})</span>
            </span>
          </Title>

          <List
            itemLayout="vertical"
            dataSource={messages}
            locale={{
              emptyText: (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <SmileOutlined className="text-5xl text-gray-300 mb-3" />
                  <p className="text-gray-500">还没有留言，来发表第一条吧！</p>
                </div>
              )
            }}
            renderItem={(item, index) => (
              <Card
                className="mb-6 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl border-0 overflow-hidden"
                style={{
                  animationName: 'fadeIn',
                  animationDuration: '0.8s',
                  animationFillMode: 'both',
                  animationDelay: `${index * 0.1}s`
                }}
                bodyStyle={{ padding: '20px' }}
              >
                <CommentItem
                  author={
                    <Text strong className="text-gray-800 text-base">
                      {item.author}
                    </Text>
                  }
                  avatar={
                    <div className="relative">
                      <Avatar
                        src={item.avatar}
                        alt={item.author}
                        size={48}
                        className="border-2 border-white shadow-sm"
                      />
                      {item.replies && item.replies.length > 0 && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center bg-blue-500 text-white text-xs rounded-full shadow-sm">
                          {item.replies.length}
                        </div>
                      )}
                    </div>
                  }
                  content={
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow transition-all">
                      {item.content}
                    </div>
                  }
                  datetime={<span className="text-gray-400 text-sm">{item.datetime}</span>}
                  actions={[
                    <Tooltip key="like" title={item.liked ? '取消点赞' : '点赞'}>
                      <button
                        type="button"
                        onClick={() => handleLike(item.id)}
                        className={`cursor-pointer py-1 px-3 rounded-full transition-all flex items-center border-0 ${
                          item.liked
                            ? 'text-blue-500 bg-blue-50 hover:bg-blue-100'
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {item.liked ? <LikeFilled /> : <LikeOutlined />}
                        <span className="ml-1">{item.likes}</span>
                      </button>
                    </Tooltip>,
                    <Tooltip key="reply" title="回复">
                      <button
                        type="button"
                        className="cursor-pointer py-1 px-3 rounded-full transition-all text-gray-500 hover:bg-gray-100 flex items-center border-0"
                      >
                        <CommentOutlined />
                        <span className="ml-1">回复</span>
                      </button>
                    </Tooltip>
                  ]}
                >
                  {/* 回复列表 */}
                  {item.replies && item.replies.length > 0 && (
                    <div className="mt-5 relative">
                      <div className="absolute left-[-24px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-300 to-blue-100"></div>
                      <div className="space-y-5">
                        {item.replies.map((reply) => (
                          <div key={reply.id} className="bg-blue-50 rounded-lg p-4 shadow-sm">
                            <CommentItem
                              isAuthor={reply.author === 'Nindle'}
                              author={
                                <Text
                                  strong
                                  className={
                                    reply.author === 'Nindle' ? 'text-blue-600' : 'text-gray-700'
                                  }
                                >
                                  {reply.author}
                                </Text>
                              }
                              avatar={
                                <Avatar
                                  src={reply.avatar}
                                  alt={reply.author}
                                  size={36}
                                  className="border-2 border-white shadow-sm"
                                />
                              }
                              content={<div className="text-gray-700">{reply.content}</div>}
                              datetime={
                                <span className="text-gray-400 text-sm">{reply.datetime}</span>
                              }
                              actions={[
                                <Tooltip key="like" title={reply.liked ? '取消点赞' : '点赞'}>
                                  <button
                                    type="button"
                                    onClick={() => handleLike(reply.id)}
                                    className={`cursor-pointer py-1 px-3 rounded-full transition-all flex items-center border-0 ${
                                      reply.liked
                                        ? 'text-blue-500 bg-white hover:bg-blue-100'
                                        : 'text-gray-500 hover:bg-white'
                                    }`}
                                  >
                                    {reply.liked ? <LikeFilled /> : <LikeOutlined />}
                                    <span className="ml-1">{reply.likes}</span>
                                  </button>
                                </Tooltip>
                              ]}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CommentItem>
              </Card>
            )}
          />

          {/* 分页 */}
          {messages.length > 5 && (
            <div className="flex justify-center mt-8">
              <Button
                type="primary"
                shape="round"
                className="shadow-sm border-0 bg-blue-500 hover:bg-blue-600"
              >
                加载更多
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(MessagePage)
