import { memo, useEffect, useState } from "react"
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
} from "antd"
import {
  UserOutlined,
  MailOutlined,
  MessageOutlined,
  SmileOutlined,
  LikeOutlined,
  LikeFilled
} from "@ant-design/icons"

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
  children
}: {
  author: React.ReactNode
  avatar: React.ReactNode
  content: React.ReactNode
  datetime: React.ReactNode
  actions?: React.ReactNode[]
  children?: React.ReactNode
}) => {
  return (
    <div className="flex">
      <div className="mr-3 flex-shrink-0">
        {avatar}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="mb-1">
          <span className="font-medium mr-2">{author}</span>
          <span className="text-gray-400 text-sm">{datetime}</span>
        </div>
        <div className="text-gray-700 mb-2">{content}</div>
        {actions && actions.length > 0 && (
          <div className="mb-2 flex gap-4">
            {actions}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default memo(() => {
  const [form] = Form.useForm()
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [submitting, setSubmitting] = useState(false)

  // 模拟留言数据
  const mockMessages: MessageItem[] = [
    {
      id: 1,
      author: "张三",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
      content: "博客内容非常棒！期待更多React相关的文章。",
      datetime: "2023-10-18 10:23",
      likes: 12,
      replies: [
        {
          id: 101,
          author: "Nindle",
          avatar: "/src/favicon.svg",
          content: "谢谢支持！我会持续更新React相关内容的。",
          datetime: "2023-10-18 11:05",
          likes: 3
        }
      ]
    },
    {
      id: 2,
      author: "李四",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
      content: "能不能写一篇关于React Server Components的详细教程？现在这方面的中文资料太少了。",
      datetime: "2023-10-16 16:45",
      likes: 8
    },
    {
      id: 3,
      author: "王五",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
      content: "博主的文章逻辑清晰，很容易理解。不过感觉更新频率有点低，希望能加快更新节奏~",
      datetime: "2023-10-15 09:30",
      likes: 5,
      replies: [
        {
          id: 102,
          author: "Nindle",
          avatar: "/src/favicon.svg",
          content: "感谢建议！我会尽量提高更新频率的。",
          datetime: "2023-10-15 14:20",
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
      message.error("留言内容不能为空")
      return
    }

    setSubmitting(true)

    // 模拟提交请求
    setTimeout(() => {
      const newMessage: MessageItem = {
        id: Date.now(),
        author: values.name || "匿名用户",
        avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.floor(Math.random() * 100)}`,
        content: values.content,
        datetime: new Date().toLocaleString(),
        email: values.email,
        likes: 0
      }

      setMessages([newMessage, ...messages])
      setSubmitting(false)
      form.resetFields()
      message.success("留言成功")
    }, 1000)
  }

  // 处理点赞
  const handleLike = (id: number) => {
    setMessages(prevMessages =>
      prevMessages.map(msg => {
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
            replies: msg.replies.map(reply => {
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
          <Title level={1} className="text-4xl font-bold mb-4">留言板</Title>
          <Paragraph className="text-gray-500 max-w-2xl mx-auto text-lg">
            有什么想法、建议或问题？欢迎在这里留言，我会尽快回复。
          </Paragraph>
        </div>

        {/* 留言表单 */}
        <Card className="mb-12 shadow-sm">
          <Title level={4} className="mb-6">
            <MessageOutlined className="mr-2" />
            写下你的留言
          </Title>

          <Form
            form={form}
            name="message-form"
            onFinish={handleSubmit}
            layout="vertical"
          >
            <div className="flex flex-wrap gap-4">
              <Form.Item
                name="name"
                className="flex-1 min-w-[260px]"
                rules={[{ required: true, message: "请输入你的名字" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="你的名字"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="email"
                className="flex-1 min-w-[260px]"
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="你的邮箱（选填）"
                  size="large"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="content"
              rules={[{ required: true, message: "请输入留言内容" }]}
            >
              <TextArea
                placeholder="写下你的留言..."
                rows={4}
                showCount
                maxLength={500}
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
                >
                  发表留言
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>

        {/* 留言列表 */}
        <div>
          <Title level={4} className="mb-6">
            <span className="border-b-2 border-blue-500 pb-2">
              全部留言 ({messages.length})
            </span>
          </Title>

          <List
            itemLayout="vertical"
            dataSource={messages}
            renderItem={item => (
              <Card className="mb-6 shadow-sm">
                <CommentItem
                  author={<Text strong>{item.author}</Text>}
                  avatar={<Avatar src={item.avatar} alt={item.author} size={48} />}
                  content={<Paragraph>{item.content}</Paragraph>}
                  datetime={<span className="text-gray-400 text-sm">{item.datetime}</span>}
                  actions={[
                    <Tooltip key="like" title="点赞">
                      <span onClick={() => handleLike(item.id)} className="cursor-pointer">
                        {item.liked ? <LikeFilled className="text-blue-500" /> : <LikeOutlined />}
                        <span className="ml-1">{item.likes}</span>
                      </span>
                    </Tooltip>
                  ]}
                >
                  {/* 回复列表 */}
                  {item.replies && item.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-100">
                      {item.replies.map(reply => (
                        <CommentItem
                          key={reply.id}
                          author={<Text strong className="text-blue-500">{reply.author}</Text>}
                          avatar={<Avatar src={reply.avatar} alt={reply.author} size={36} />}
                          content={<Paragraph>{reply.content}</Paragraph>}
                          datetime={<span className="text-gray-400 text-sm">{reply.datetime}</span>}
                          actions={[
                            <Tooltip key="like" title="点赞">
                              <span onClick={() => handleLike(reply.id)} className="cursor-pointer">
                                {reply.liked ? <LikeFilled className="text-blue-500" /> : <LikeOutlined />}
                                <span className="ml-1">{reply.likes}</span>
                              </span>
                            </Tooltip>
                          ]}
                        />
                      ))}
                    </div>
                  )}
                </CommentItem>
              </Card>
            )}
          />
        </div>
      </div>
    </div>
  )
})
