import { memo, useEffect, useState } from 'react'
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
} from 'antd'
import {
  GithubOutlined,
  LinkOutlined,
  StarOutlined,
  ForkOutlined,
  CalendarOutlined,
  CodeOutlined
} from '@ant-design/icons'
import LazyImage from '@/components/LazyImage'

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

const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  // 模拟项目数据
  const mockProjects: Project[] = [
    {
      id: 1,
      title: '个人博客网站',
      description:
        '使用React、UmiJS、Ant Design和TailwindCSS构建的响应式个人博客网站，支持文章发布、分类、留言等功能。',
      imageUrl: 'https://picsum.photos/600/400?random=101',
      demoUrl: 'https://blog.example.com',
      githubUrl: 'https://github.com/user/blog',
      stars: 28,
      forks: 12,
      tags: ['全栈', '前端', 'React'],
      date: '2023-10',
      featured: true,
      techStack: ['React', 'UmiJS', 'TypeScript', 'Ant Design', 'TailwindCSS', 'Node.js']
    },
    {
      id: 2,
      title: '在线任务管理系统',
      description:
        '团队协作的任务管理系统，支持任务分配、进度跟踪、统计报表等功能，提高团队工作效率。',
      imageUrl: 'https://picsum.photos/600/400?random=102',
      demoUrl: 'https://tasks.example.com',
      githubUrl: 'https://github.com/user/task-system',
      stars: 46,
      forks: 23,
      tags: ['全栈', 'React', '工具'],
      date: '2023-08',
      techStack: ['React', 'Redux', 'Express', 'MongoDB', 'Socket.io', 'Styled Components']
    },
    {
      id: 3,
      title: '图片处理工具库',
      description:
        '基于Canvas的图片处理工具库，提供裁剪、旋转、滤镜、压缩等功能，适用于各类图片处理场景。',
      imageUrl: 'https://picsum.photos/600/400?random=103',
      githubUrl: 'https://github.com/user/image-tools',
      stars: 135,
      forks: 42,
      tags: ['前端', '工具', '库'],
      date: '2023-05',
      featured: true,
      techStack: ['JavaScript', 'Canvas', 'WebWorker', 'Rollup', 'Jest']
    },
    {
      id: 4,
      title: '电商数据分析平台',
      description:
        '为电商平台提供销售数据分析、用户行为分析、营销效果分析等功能，帮助商家优化运营策略。',
      imageUrl: 'https://picsum.photos/600/400?random=104',
      demoUrl: 'https://analytics.example.com',
      tags: ['全栈', '数据可视化', '企业应用'],
      date: '2023-02',
      techStack: ['Vue3', 'Echarts', 'Flask', 'PostgreSQL', 'Redis', 'Docker']
    },
    {
      id: 5,
      title: 'React组件库',
      description:
        '一套基于React的UI组件库，提供丰富的组件和主题定制能力，适用于快速构建企业级应用。',
      imageUrl: 'https://picsum.photos/600/400?random=105',
      demoUrl: 'https://ui.example.com',
      githubUrl: 'https://github.com/user/react-components',
      stars: 87,
      forks: 31,
      tags: ['前端', 'React', '库'],
      date: '2022-12',
      techStack: ['React', 'TypeScript', 'Storybook', 'Emotion', 'Testing Library', 'Webpack']
    },
    {
      id: 6,
      title: '移动端音乐播放器',
      description:
        '基于React Native开发的跨平台音乐播放器应用，支持在线音乐、本地音乐、歌单管理等功能。',
      imageUrl: 'https://picsum.photos/600/400?random=106',
      githubUrl: 'https://github.com/user/music-player',
      stars: 56,
      forks: 19,
      tags: ['移动应用', 'React Native'],
      date: '2022-09',
      techStack: ['React Native', 'Redux', 'TypeScript', 'Styled Components', 'Firebase']
    }
  ]

  // 所有可用标签
  const allTags = ['全部', ...Array.from(new Set(mockProjects.flatMap((project) => project.tags)))]

  useEffect(() => {
    // 模拟加载数据
    setLoading(true)
    setTimeout(() => {
      setProjects(mockProjects)
      setLoading(false)
    }, 800)
  }, [])

  // 项目过滤处理
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((project) => project.tags.includes(filter))

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    setFilter(tag === '全部' ? 'all' : tag)
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white min-h-screen pt-24 pb-16">
      <div className="w-full max-w-[1440px] mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl font-bold mb-4">
            个人项目
          </Title>
          <Paragraph className="text-gray-500 max-w-2xl mx-auto text-lg">
            以下是我的部分开源项目和个人作品，涵盖前端、全栈、移动应用等多个领域。
          </Paragraph>
        </div>

        {/* 标签筛选 */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap gap-2 justify-center bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
            {allTags.map((tag) => (
              <Tag
                key={tag}
                color={filter === (tag === '全部' ? 'all' : tag) ? 'blue' : 'default'}
                onClick={() => handleTagClick(tag)}
                className={`mr-0 px-4 py-1.5 text-base cursor-pointer transition-all ${
                  filter === (tag === '全部' ? 'all' : tag)
                    ? 'shadow-md'
                    : 'hover:shadow hover:bg-white'
                }`}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        {/* 特色项目展示 */}
        {loading ? (
          <div className="space-y-6">
            <Skeleton active paragraph={{ rows: 4 }} />
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
        ) : (
          <>
            {/* 特色项目 */}
            {filter === 'all' && projects.some((p) => p.featured) && (
              <div className="mb-16">
                <Title level={3} className="mb-8 flex items-center">
                  <span className="w-1 h-6 bg-blue-500 mr-2 rounded"></span>
                  <span className="text-gray-800">特色项目</span>
                </Title>
                <Row gutter={[24, 24]}>
                  {projects
                    .filter((p) => p.featured)
                    .map((project) => (
                      <Col xs={24} md={12} key={project.id}>
                        <Card
                          hoverable
                          className="h-full overflow-hidden rounded-lg border-0 shadow-md hover:shadow-lg transition-all duration-300"
                          cover={
                            <div className="h-[260px] overflow-hidden relative">
                              <LazyImage
                                alt={project.title}
                                src={project.imageUrl}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              />
                              <div className="absolute top-0 left-0 p-3 flex flex-wrap gap-1">
                                {project.tags.map((tag, index) => (
                                  <Tag key={index} color="blue" className="shadow-sm">
                                    {tag}
                                  </Tag>
                                ))}
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-20"></div>
                            </div>
                          }
                          actions={[
                            project.demoUrl && (
                              <Tooltip title="查看演示">
                                <Button
                                  type="link"
                                  href={project.demoUrl}
                                  target="_blank"
                                  icon={<LinkOutlined />}
                                  className="text-blue-500 hover:text-blue-600"
                                >
                                  演示
                                </Button>
                              </Tooltip>
                            ),
                            project.githubUrl && (
                              <Tooltip title="访问代码库">
                                <Button
                                  type="link"
                                  href={project.githubUrl}
                                  target="_blank"
                                  icon={<GithubOutlined />}
                                  className="text-blue-500 hover:text-blue-600"
                                >
                                  源码
                                </Button>
                              </Tooltip>
                            )
                          ].filter(Boolean)}
                          bodyStyle={{ padding: '16px' }}
                        >
                          <Meta
                            title={
                              <Title level={4} className="text-gray-800 mb-2">
                                {project.title}
                              </Title>
                            }
                            description={
                              <>
                                <Paragraph
                                  ellipsis={{ rows: 3 }}
                                  className="text-gray-500 mb-4 min-h-[50px]"
                                >
                                  {project.description}
                                </Paragraph>

                                <div className="flex items-center text-gray-400 mb-4">
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

                                <div className="flex flex-wrap gap-1">
                                  {project.techStack.slice(0, 5).map((tech, index) => (
                                    <Tag
                                      key={index}
                                      color="green"
                                      className="mb-1 transition-all hover:scale-105"
                                    >
                                      <CodeOutlined className="mr-1" />
                                      {tech}
                                    </Tag>
                                  ))}
                                  {project.techStack.length > 5 && (
                                    <Tooltip title={project.techStack.slice(5).join(', ')}>
                                      <Tag
                                        color="green"
                                        className="mb-1 transition-all hover:scale-105"
                                      >
                                        <CodeOutlined className="mr-1" />+
                                        {project.techStack.length - 5}
                                      </Tag>
                                    </Tooltip>
                                  )}
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
              <Title level={3} className="mb-8 flex items-center">
                <span className="w-1 h-6 bg-blue-500 mr-2 rounded"></span>
                <span className="text-gray-800">
                  {filter === 'all' ? '全部项目' : `${filter}项目`}
                </span>
              </Title>
              <Row gutter={[24, 24]}>
                {filteredProjects
                  .filter((p) => filter !== 'all' || !p.featured)
                  .map((project, index) => (
                    <Col xs={24} sm={12} lg={8} key={project.id}>
                      <Card
                        hoverable
                        className="h-full rounded-lg border-0 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                        style={{
                          animationName: 'fadeIn',
                          animationDuration: '0.8s',
                          animationFillMode: 'both',
                          animationDelay: `${index * 0.1}s`
                        }}
                        cover={
                          <div className="h-[200px] overflow-hidden relative">
                            <LazyImage
                              alt={project.title}
                              src={project.imageUrl}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute top-0 right-0 m-2">
                              {project.tags.slice(0, 1).map((tag, index) => (
                                <Tag key={index} color="blue" className="shadow-sm">
                                  {tag}
                                </Tag>
                              ))}
                              {project.tags.length > 1 && (
                                <Tooltip title={project.tags.slice(1).join(', ')}>
                                  <Tag color="blue" className="shadow-sm mt-1">
                                    +{project.tags.length - 1}
                                  </Tag>
                                </Tooltip>
                              )}
                            </div>
                          </div>
                        }
                        bodyStyle={{
                          padding: '16px',
                          flex: '1 1 auto',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <Meta
                          title={
                            <span className="text-lg font-medium text-gray-800">
                              {project.title}
                            </span>
                          }
                          description={
                            <div className="flex flex-col h-full">
                              <Paragraph
                                ellipsis={{ rows: 2 }}
                                className="text-gray-500 mb-4 mt-2 min-h-[48px]"
                              >
                                {project.description}
                              </Paragraph>

                              <div className="flex flex-wrap gap-1 mb-3 min-h-[28px]">
                                {project.techStack.slice(0, 5).map((tech, index) => (
                                  <Tag
                                    key={index}
                                    color="green"
                                    className="mr-1 mb-1 transition-all hover:scale-105"
                                  >
                                    <CodeOutlined className="mr-1" />
                                    {tech}
                                  </Tag>
                                ))}
                                {project.techStack.length > 5 && (
                                  <Tooltip title={project.techStack.slice(5).join(', ')}>
                                    <Tag
                                      color="green"
                                      className="mb-1 transition-all hover:scale-105"
                                    >
                                      <CodeOutlined className="mr-1" />+
                                      {project.techStack.length - 5}
                                    </Tag>
                                  </Tooltip>
                                )}
                              </div>

                              <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-auto">
                                <Text type="secondary" className="flex items-center">
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
                                      className="px-0 text-blue-500"
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
                                      className="px-0 text-blue-500"
                                    >
                                      源码
                                    </Button>
                                  )}
                                </Space>
                              </div>
                            </div>
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
          <div className="text-center py-16 bg-gray-50 rounded-lg shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <Title level={4} className="text-gray-500 mb-2">
              没有找到相关项目
            </Title>
            <Text className="text-gray-400">请尝试选择其他分类查看</Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(ProjectPage)
