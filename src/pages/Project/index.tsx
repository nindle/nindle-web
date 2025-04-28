import { memo, useEffect, useState } from "react"
import {
  Typography,
  Card,
  Tag,
  Row,
  Col,
  Button,
  Divider,
  Space,
  Image,
  Tooltip,
  Skeleton
} from "antd"
import {
  GithubOutlined,
  LinkOutlined,
  StarOutlined,
  ForkOutlined,
  CalendarOutlined,
  CodeOutlined
} from "@ant-design/icons"

const { Title, Paragraph, Text } = Typography
const { Meta } = Card

// 定义项目类型接口
interface Project {
  id: number
  title: string
  description: string
  imageUrl: string
  demoUrl?: string
  githubUrl?: string
  stars?: number
  forks?: number
  tags: string[]
  date: string
  featured?: boolean
  techStack: string[]
}

export default memo(() => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  // 模拟项目数据
  const mockProjects: Project[] = [
    {
      id: 1,
      title: "个人博客网站",
      description: "使用React、UmiJS、Ant Design和TailwindCSS构建的响应式个人博客网站，支持文章发布、分类、留言等功能。",
      imageUrl: "https://picsum.photos/600/400?random=101",
      demoUrl: "https://blog.example.com",
      githubUrl: "https://github.com/user/blog",
      stars: 28,
      forks: 12,
      tags: ["全栈", "前端", "React"],
      date: "2023-10",
      featured: true,
      techStack: ["React", "UmiJS", "TypeScript", "Ant Design", "TailwindCSS", "Node.js"]
    },
    {
      id: 2,
      title: "在线任务管理系统",
      description: "团队协作的任务管理系统，支持任务分配、进度跟踪、统计报表等功能，提高团队工作效率。",
      imageUrl: "https://picsum.photos/600/400?random=102",
      demoUrl: "https://tasks.example.com",
      githubUrl: "https://github.com/user/task-system",
      stars: 46,
      forks: 23,
      tags: ["全栈", "React", "工具"],
      date: "2023-08",
      techStack: ["React", "Redux", "Express", "MongoDB", "Socket.io", "Styled Components"]
    },
    {
      id: 3,
      title: "图片处理工具库",
      description: "基于Canvas的图片处理工具库，提供裁剪、旋转、滤镜、压缩等功能，适用于各类图片处理场景。",
      imageUrl: "https://picsum.photos/600/400?random=103",
      githubUrl: "https://github.com/user/image-tools",
      stars: 135,
      forks: 42,
      tags: ["前端", "工具", "库"],
      date: "2023-05",
      featured: true,
      techStack: ["JavaScript", "Canvas", "WebWorker", "Rollup", "Jest"]
    },
    {
      id: 4,
      title: "电商数据分析平台",
      description: "为电商平台提供销售数据分析、用户行为分析、营销效果分析等功能，帮助商家优化运营策略。",
      imageUrl: "https://picsum.photos/600/400?random=104",
      demoUrl: "https://analytics.example.com",
      tags: ["全栈", "数据可视化", "企业应用"],
      date: "2023-02",
      techStack: ["Vue3", "Echarts", "Flask", "PostgreSQL", "Redis", "Docker"]
    },
    {
      id: 5,
      title: "React组件库",
      description: "一套基于React的UI组件库，提供丰富的组件和主题定制能力，适用于快速构建企业级应用。",
      imageUrl: "https://picsum.photos/600/400?random=105",
      demoUrl: "https://ui.example.com",
      githubUrl: "https://github.com/user/react-components",
      stars: 87,
      forks: 31,
      tags: ["前端", "React", "库"],
      date: "2022-12",
      techStack: ["React", "TypeScript", "Storybook", "Emotion", "Testing Library", "Webpack"]
    },
    {
      id: 6,
      title: "移动端音乐播放器",
      description: "基于React Native开发的跨平台音乐播放器应用，支持在线音乐、本地音乐、歌单管理等功能。",
      imageUrl: "https://picsum.photos/600/400?random=106",
      githubUrl: "https://github.com/user/music-player",
      stars: 56,
      forks: 19,
      tags: ["移动应用", "React Native"],
      date: "2022-09",
      techStack: ["React Native", "Redux", "TypeScript", "Styled Components", "Firebase"]
    }
  ]

  // 所有可用标签
  const allTags = ["全部", ...Array.from(new Set(mockProjects.flatMap(project => project.tags)))]

  useEffect(() => {
    // 模拟加载数据
    setLoading(true)
    setTimeout(() => {
      setProjects(mockProjects)
      setLoading(false)
    }, 800)
  }, [])

  // 项目过滤处理
  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(project => project.tags.includes(filter))

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    setFilter(tag === "全部" ? "all" : tag)
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white min-h-screen pt-24 pb-16">
      <div className="w-full max-w-[1440px] mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl font-bold mb-4">个人项目</Title>
          <Paragraph className="text-gray-500 max-w-2xl mx-auto text-lg">
            以下是我的部分开源项目和个人作品，涵盖前端、全栈、移动应用等多个领域。
          </Paragraph>
        </div>

        {/* 标签筛选 */}
        <div className="mb-12 text-center">
          <Space size={[8, 16]} wrap>
            {allTags.map(tag => (
              <Tag
                key={tag}
                color={filter === (tag === "全部" ? "all" : tag) ? "blue" : "default"}
                onClick={() => handleTagClick(tag)}
                className="px-4 py-1 text-base cursor-pointer"
              >
                {tag}
              </Tag>
            ))}
          </Space>
        </div>

        {/* 特色项目展示 */}
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <>
            {/* 特色项目 */}
            {filter === "all" && projects.some(p => p.featured) && (
              <div className="mb-12">
                <Title level={3} className="mb-6">
                  <span className="border-b-2 border-blue-500 pb-2">特色项目</span>
                </Title>
                <Row gutter={[24, 24]}>
                  {projects.filter(p => p.featured).map(project => (
                    <Col xs={24} md={12} key={project.id}>
                      <Card
                        hoverable
                        className="h-full overflow-hidden"
                        cover={
                          <div className="h-[260px] overflow-hidden relative">
                            <Image
                              alt={project.title}
                              src={project.imageUrl}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              preview={false}
                            />
                            {project.tags.map((tag, index) => (
                              <Tag
                                key={index}
                                color="blue"
                                className="absolute top-3 right-3 m-1"
                              >
                                {tag}
                              </Tag>
                            ))}
                          </div>
                        }
                        actions={[
                          project.demoUrl && (
                            <Tooltip title="查看演示">
                              <Button type="link" href={project.demoUrl} target="_blank" icon={<LinkOutlined />}>
                                演示
                              </Button>
                            </Tooltip>
                          ),
                          project.githubUrl && (
                            <Tooltip title="访问代码库">
                              <Button type="link" href={project.githubUrl} target="_blank" icon={<GithubOutlined />}>
                                源码
                              </Button>
                            </Tooltip>
                          )
                        ].filter(Boolean)}
                      >
                        <Meta
                          title={<Title level={4}>{project.title}</Title>}
                          description={
                            <>
                              <Paragraph ellipsis={{ rows: 3 }} className="text-gray-500 mb-4">
                                {project.description}
                              </Paragraph>

                              <div className="flex items-center text-gray-400 mb-3">
                                <CalendarOutlined className="mr-1" />
                                <span className="mr-4">{project.date}</span>

                                {project.stars && (
                                  <span className="mr-3">
                                    <StarOutlined className="mr-1 text-yellow-500" />
                                    {project.stars}
                                  </span>
                                )}

                                {project.forks && (
                                  <span>
                                    <ForkOutlined className="mr-1 text-blue-500" />
                                    {project.forks}
                                  </span>
                                )}
                              </div>

                              <div>
                                {project.techStack.map((tech, index) => (
                                  <Tag key={index} color="green" className="mr-1 mb-1">
                                    <CodeOutlined className="mr-1" />
                                    {tech}
                                  </Tag>
                                ))}
                              </div>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {/* 所有项目 */}
            <div>
              <Title level={3} className="mb-6">
                <span className="border-b-2 border-blue-500 pb-2">
                  {filter === "all" ? "全部项目" : `${filter}项目`}
                </span>
              </Title>
              <Row gutter={[24, 24]}>
                {filteredProjects.filter(p => filter !== "all" || !p.featured).map(project => (
                  <Col xs={24} sm={12} lg={8} key={project.id}>
                    <Card
                      hoverable
                      className="h-full"
                      cover={
                        <div className="h-[200px] overflow-hidden">
                          <Image
                            alt={project.title}
                            src={project.imageUrl}
                            className="w-full h-full object-cover"
                            preview={false}
                          />
                        </div>
                      }
                    >
                      <Meta
                        title={project.title}
                        description={
                          <>
                            <Paragraph ellipsis={{ rows: 2 }} className="text-gray-500 mb-3">
                              {project.description}
                            </Paragraph>

                            <div className="flex flex-wrap mb-3">
                              {project.tags.map((tag, index) => (
                                <Tag key={index} color="blue" className="mr-1 mb-1">{tag}</Tag>
                              ))}
                            </div>

                            <div className="flex justify-between items-center">
                              <Text type="secondary">
                                <CalendarOutlined className="mr-1" />
                                {project.date}
                              </Text>

                              <Space>
                                {project.demoUrl && (
                                  <Button
                                    type="link"
                                    href={project.demoUrl}
                                    target="_blank"
                                    icon={<LinkOutlined />}
                                    size="small"
                                  >
                                    演示
                                  </Button>
                                )}

                                {project.githubUrl && (
                                  <Button
                                    type="link"
                                    href={project.githubUrl}
                                    target="_blank"
                                    icon={<GithubOutlined />}
                                    size="small"
                                  >
                                    源码
                                  </Button>
                                )}
                              </Space>
                            </div>
                          </>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}

        {/* 项目为空时显示 */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Title level={4} className="text-gray-500">没有找到相关项目</Title>
          </div>
        )}
      </div>
    </div>
  )
})
