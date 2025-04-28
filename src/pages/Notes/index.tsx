import { memo, useEffect, useState } from "react"
import { Typography, List, Card, Tag, Space, Row, Col, Pagination, Select } from "antd"
import { CalendarOutlined, UserOutlined, TagOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"

const { Title, Paragraph, Text } = Typography
const { Option } = Select

// 定义文章类型接口
interface Article {
  id: number
  title: string
  date: string
  author: string
  summary: string
  category: string
  tags: string[]
  coverImage: string
  readTime: string
  commentCount: number
}

export default memo(() => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 模拟文章数据
  const mockArticles: Article[] = [
    {
      id: 1,
      title: "React 18新特性解析",
      date: "2023-10-15",
      author: "Nindle",
      summary: "深入了解React 18的并发特性、自动批处理和新的Suspense SSR架构，以及这些功能如何改变我们的开发方式。",
      category: "前端",
      tags: ["React", "JavaScript", "前端框架"],
      coverImage: "https://picsum.photos/800/400?random=1",
      readTime: "8分钟",
      commentCount: 15,
    },
    {
      id: 2,
      title: "使用TailwindCSS构建现代UI界面",
      date: "2023-10-10",
      author: "Nindle",
      summary: "TailwindCSS如何改变我们的CSS编写方式，以及如何利用它快速构建响应式、美观且易于维护的用户界面。",
      category: "CSS",
      tags: ["CSS", "TailwindCSS", "设计"],
      coverImage: "https://picsum.photos/800/400?random=2",
      readTime: "6分钟",
      commentCount: 8,
    },
    {
      id: 3,
      title: "TypeScript高级类型技巧",
      date: "2023-10-05",
      author: "Nindle",
      summary: "探索TypeScript中的条件类型、映射类型和类型体操技巧，掌握类型系统的高级用法，提高代码的健壮性。",
      category: "TypeScript",
      tags: ["TypeScript", "编程", "前端"],
      coverImage: "https://picsum.photos/800/400?random=3",
      readTime: "10分钟",
      commentCount: 12,
    },
    {
      id: 4,
      title: "Next.js 13架构深度解析",
      date: "2023-09-28",
      author: "Nindle",
      summary: "Next.js 13带来了全新的App Router、React Server Components等特性，本文深入分析其架构设计和性能优化。",
      category: "前端",
      tags: ["Next.js", "React", "SSR"],
      coverImage: "https://picsum.photos/800/400?random=4",
      readTime: "12分钟",
      commentCount: 20,
    },
    {
      id: 5,
      title: "CSS新特性和最佳实践2023",
      date: "2023-09-20",
      author: "Nindle",
      summary: "2023年CSS领域的新特性，包括容器查询、级联层、嵌套规则等，以及如何在实际项目中应用这些特性。",
      category: "CSS",
      tags: ["CSS", "Web开发", "前端"],
      coverImage: "https://picsum.photos/800/400?random=5",
      readTime: "7分钟",
      commentCount: 10,
    },
    {
      id: 6,
      title: "Node.js性能调优指南",
      date: "2023-09-15",
      author: "Nindle",
      summary: "Node.js应用性能优化的实用技巧，包括内存管理、异步操作优化、数据库查询优化等方面的最佳实践。",
      category: "后端",
      tags: ["Node.js", "性能优化", "后端"],
      coverImage: "https://picsum.photos/800/400?random=6",
      readTime: "9分钟",
      commentCount: 14,
    },
    {
      id: 7,
      title: "GraphQL与REST API的比较与实践",
      date: "2023-09-08",
      author: "Nindle",
      summary: "GraphQL与传统REST API的优缺点比较，以及在实际项目中如何选择和实施这两种API架构。",
      category: "后端",
      tags: ["GraphQL", "REST", "API设计"],
      coverImage: "https://picsum.photos/800/400?random=7",
      readTime: "8分钟",
      commentCount: 9,
    },
    {
      id: 8,
      title: "Web Components入门与实践",
      date: "2023-09-01",
      author: "Nindle",
      summary: "Web Components的基础概念、核心技术和实际应用案例，以及如何与现代前端框架结合使用。",
      category: "前端",
      tags: ["Web Components", "JavaScript", "前端"],
      coverImage: "https://picsum.photos/800/400?random=8",
      readTime: "7分钟",
      commentCount: 6,
    },
  ]

  // 所有分类
  const categories = ["all", ...Array.from(new Set(mockArticles.map(article => article.category)))]

  useEffect(() => {
    // 模拟加载数据
    setLoading(true)
    setTimeout(() => {
      let filteredArticles = [...mockArticles]

      // 应用分类筛选
      if (selectedCategory !== "all") {
        filteredArticles = filteredArticles.filter(article => article.category === selectedCategory)
      }

      setArticles(filteredArticles)
      setLoading(false)
    }, 500)
  }, [selectedCategory])

  // 处理文章点击，导航到详情页面
  const handleArticleClick = (id: number) => {
    history.push(`/notes/${id}`)
  }

  // 处理分类变更
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1)
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white min-h-screen pt-24 pb-16">
      <div className="w-full max-w-[1440px] mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl font-bold mb-4">技术博客</Title>
          <Paragraph className="text-gray-500 max-w-2xl mx-auto text-lg">
            分享我在软件开发和Web技术领域的经验、见解和最新发现。
          </Paragraph>
        </div>

        {/* 分类筛选 */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex p-1 bg-gray-100 rounded-lg shadow-sm">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-base rounded-md transition-all ${
                  selectedCategory === category || (category === 'all' && selectedCategory === 'all')
                    ? 'bg-white shadow text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category === "all" ? "全部分类" : category}
              </button>
            ))}
          </div>
        </div>

        {/* 文章列表 */}
        <List
          loading={loading}
          grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
          dataSource={articles}
          renderItem={article => (
            <List.Item>
              <Card
                hoverable
                onClick={() => handleArticleClick(article.id)}
                cover={
                  <div className="h-[220px] overflow-hidden">
                    <img
                      alt={article.title}
                      src={article.coverImage}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                }
                className="h-full shadow-sm hover:shadow-md transition-shadow"
              >
                <Tag color="blue" className="mb-2">{article.category}</Tag>
                <Title level={4} ellipsis={{ rows: 2 }} className="mb-2 text-lg leading-tight">
                  {article.title}
                </Title>

                <Paragraph ellipsis={{ rows: 3 }} className="text-gray-500 mb-4 text-sm">
                  {article.summary}
                </Paragraph>

                <div className="flex justify-between items-center text-gray-400 text-xs">
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <UserOutlined className="mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <TagOutlined className="mr-1" />
                    <span>{article.tags[0]}</span>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />

        {/* 分页 */}
        {articles.length > 0 && (
          <div className="text-center mt-12">
            <Pagination
              current={currentPage}
              onChange={setCurrentPage}
              total={articles.length}
              showSizeChanger={false}
              showTotal={(total) => `共 ${total} 篇文章`}
            />
          </div>
        )}

        {/* 无数据显示 */}
        {articles.length === 0 && !loading && (
          <div className="text-center py-16">
            <Title level={4} className="text-gray-500">没有找到相关文章</Title>
          </div>
        )}
      </div>
    </div>
  )
})
