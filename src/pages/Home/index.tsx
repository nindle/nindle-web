import { memo, useEffect } from "react"
import { login } from "../../services/login"
import { Card, Typography, Row, Col, Tag, Avatar, Button } from "antd"
import { ArrowRightOutlined, ReadOutlined, FileTextOutlined, MessageOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"

const { Title, Paragraph, Text } = Typography

export default memo(() => {
  useEffect(() => {
    login({})
  }, [])

  // 模拟最新文章数据
  const latestPosts = [
    {
      id: 1,
      title: "React 18新特性解析",
      date: "2023-10-15",
      summary: "深入了解React 18的并发特性、自动批处理和新的Suspense SSR架构...",
      tags: ["React", "前端", "JavaScript"],
      image: "https://picsum.photos/300/200?random=1",
    },
    {
      id: 2,
      title: "使用TailwindCSS构建现代UI界面",
      date: "2023-10-10",
      summary: "TailwindCSS如何改变我们的CSS编写方式，以及如何高效利用它...",
      tags: ["CSS", "TailwindCSS", "设计"],
      image: "https://picsum.photos/300/200?random=2",
    },
    {
      id: 3,
      title: "TypeScript高级类型技巧",
      date: "2023-10-05",
      summary: "探索TypeScript中的条件类型、映射类型和类型体操技巧...",
      tags: ["TypeScript", "编程", "前端"],
      image: "https://picsum.photos/300/200?random=3",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-800 pt-24 pb-20 relative overflow-hidden">
        {/* 几何背景元素 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute w-96 h-96 rounded-full bg-blue-400 -top-20 -left-20"></div>
          <div className="absolute w-80 h-80 rounded-full bg-purple-400 bottom-10 right-10"></div>
          <div className="absolute w-60 h-60 rounded-full bg-indigo-400 top-40 right-1/4"></div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="animate-fadeIn">
              <Title level={1} className="text-5xl md:text-6xl font-bold mb-6 text-white">
                欢迎来到 Nindle 的博客
              </Title>
              <Paragraph className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
                这里记录我的技术探索、学习心得和个人感悟。主要关注前端开发、React生态和Web技术的最新动态。
              </Paragraph>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  type="primary"
                  size="large"
                  className="bg-blue-500 hover:bg-blue-600 border-0 h-12 px-6 text-base"
                  onClick={() => history.push('/notes')}
                  icon={<ReadOutlined />}
                >
                  浏览文章
                </Button>
                <Button
                  size="large"
                  className="border-white text-white hover:text-blue-500 hover:border-blue-500 h-12 px-6 text-base"
                  onClick={() => history.push('/message')}
                  icon={<MessageOutlined />}
                >
                  留言交流
                </Button>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <div className="max-w-xs md:max-w-md rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-105">
                <img
                  src="https://picsum.photos/800/400?random=0"
                  alt="Featured"
                  className="w-full h-48 md:h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 最新文章 */}
      <div className="py-20 bg-gray-50">
        <div className="w-full max-w-[1440px] mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <Title level={2} className="mb-0 text-3xl font-bold">
              <span className="border-b-2 border-blue-500 pb-2">最新文章</span>
            </Title>
            <Button
              type="link"
              className="text-blue-500 hover:text-blue-700"
              onClick={() => history.push('/notes')}
            >
              查看全部 <ArrowRightOutlined />
            </Button>
          </div>

          <Row gutter={[24, 24]}>
            {latestPosts.map(post => (
              <Col xs={24} md={8} key={post.id}>
                <Card
                  hoverable
                  cover={
                    <div className="h-[180px] overflow-hidden">
                      <img
                        alt={post.title}
                        src={post.image}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  }
                  className="h-full shadow hover:shadow-md transition-shadow"
                  onClick={() => history.push(`/notes/${post.id}`)}
                >
                  <div className="flex items-center mb-3">
                    <Avatar size="small" className="bg-blue-500 mr-2">N</Avatar>
                    <Text type="secondary" className="text-sm">{post.date}</Text>
                  </div>

                  <Typography.Title level={4} ellipsis={{ rows: 2 }} className="mb-2">
                    {post.title}
                  </Typography.Title>

                  <Paragraph ellipsis={{ rows: 2 }} className="text-gray-500 mb-3">
                    {post.summary}
                  </Paragraph>

                  <div className="mt-auto pt-2">
                    {post.tags.map(tag => (
                      <Tag color="blue" key={tag} className="mr-1">{tag}</Tag>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* 关于博客 */}
      <div className="py-16 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-4">
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
            <Title level={3} className="mb-4 flex items-center">
              <FileTextOutlined className="mr-2" />
              关于这个博客
            </Title>
            <Paragraph className="text-lg text-gray-700 mb-6">
              这个博客使用React、UmiJS、Ant Design和TailwindCSS构建，旨在分享我的编程经验和学习笔记。
              如果您有任何问题或建议，欢迎在留言板与我交流！
            </Paragraph>
            <div className="flex flex-wrap gap-2">
              <Tag color="green" className="px-3 py-1 text-base">React</Tag>
              <Tag color="green" className="px-3 py-1 text-base">UmiJS</Tag>
              <Tag color="green" className="px-3 py-1 text-base">Ant Design</Tag>
              <Tag color="green" className="px-3 py-1 text-base">TailwindCSS</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
