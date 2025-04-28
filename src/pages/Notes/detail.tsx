import { memo, useEffect, useState } from "react"
import {
  Typography,
  Divider,
  Avatar,
  Tag,
  Space,
  Button,
  Card,
  Skeleton,
  Affix,
  Tooltip,
  message
} from "antd"
import {
  CalendarOutlined,
  UserOutlined,
  TagOutlined,
  EyeOutlined,
  LikeOutlined,
  LikeFilled,
  ShareAltOutlined,
  BookOutlined,
  RollbackOutlined,
} from "@ant-design/icons"
import { useParams, history } from "@umijs/max"

const { Title, Paragraph, Text } = Typography

// 文章详情接口
interface ArticleDetail {
  id: number
  title: string
  content: string
  date: string
  author: string
  avatar: string
  category: string
  tags: string[]
  views: number
  likes: number
  coverImage: string
  related?: {
    id: number
    title: string
    coverImage: string
  }[]
  toc?: {
    id: string
    title: string
    level: number
  }[]
}

export default memo(() => {
  const { id } = useParams()
  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  // 模拟文章数据
  const mockArticle: ArticleDetail = {
    id: 1,
    title: "React 18新特性解析与最佳实践",
    content: `
# React 18 新特性解析

React 18 带来了许多令人兴奋的新特性和改进，这些变化将极大地提升开发体验和应用性能。本文将深入解析React 18的主要特性，并提供最佳实践指导。

## 自动批处理 (Automatic Batching)

在React 18之前，React只在事件处理函数内部对状态更新进行批处理。而在React 18中，所有的状态更新都会自动批处理，无论它们来自于哪里—事件处理函数、promises、setTimeout或任何其他地方。

\`\`\`jsx
// React 17中：这会导致两次渲染
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);

// React 18中：这只会导致一次渲染
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);
\`\`\`

这个变化可以减少不必要的渲染，提高应用性能。如果你确实需要在某些情况下立即更新状态，可以使用 \`flushSync\`：

\`\`\`jsx
import { flushSync } from 'react-dom';

flushSync(() => {
  setCount(c => c + 1);
});
// 此时DOM已更新
flushSync(() => {
  setFlag(f => !f);
});
// 此时DOM已再次更新
\`\`\`

## 并发特性 (Concurrent Features)

React 18引入了并发渲染机制，这是一个底层的实现变化，允许React准备多个版本的UI同时存在。这项技术使React能够中断、暂停、恢复或放弃渲染。

要启用并发特性，需要使用新的root API：

\`\`\`jsx
// React 17
import { render } from 'react-dom';
const container = document.getElementById('root');
render(<App />, container);

// React 18
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
\`\`\`

并发特性包括：

### 1. useTransition 和 startTransition

这些API允许你将某些状态更新标记为非紧急，让React在渲染紧急更新时可以中断这些更新。

\`\`\`jsx
import { useTransition } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [filterText, setFilterText] = useState('');

  const handleChange = (e) => {
    // 紧急更新：显示用户输入
    setFilterText(e.target.value);

    // 非紧急更新：显示结果
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };

  return (
    <>
      <input value={filterText} onChange={handleChange} />
      {isPending ? <Spinner /> : <SearchResults query={searchQuery} />}
    </>
  );
}
\`\`\`

### 2. useDeferredValue

这个钩子允许你延迟更新屏幕的某些部分，类似于防抖，但React会根据用户设备能力自动调整延迟时间。

\`\`\`jsx
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);

  return <SlowList query={deferredQuery} />;
}
\`\`\`

## Suspense改进

React 18改进了Suspense组件，使其在服务器端渲染中也能工作。新的Suspense SSR架构带来了两大特性：

1. **服务器端组件流式传输**：允许浏览器在服务器仍在渲染内容时开始处理HTML。
2. **选择性水合**：允许页面的不同部分独立地变为可交互状态，无需等待整个页面加载完成。

\`\`\`jsx
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
\`\`\`

## 新的客户端和服务器端渲染API

React 18引入了新的API来支持并发渲染和新的流式SSR架构：

- \`createRoot\`：创建一个并发模式的根节点
- \`hydrateRoot\`：为SSR应用进行水合
- \`renderToPipeableStream\`：用于Node.js环境的流式SSR
- \`renderToReadableStream\`：用于现代边缘运行时环境的流式SSR

## React 18最佳实践

1. **升级应用到React 18**：使用新的root API和确保兼容性。
2. **利用自动批处理**：避免不必要地使用\`flushSync\`。
3. **区分紧急和非紧急更新**：使用\`useTransition\`和\`startTransition\`来优化用户体验。
4. **使用Suspense进行代码分割和数据获取**：结合React.lazy和数据获取库。
5. **采用渐进式水合**：对大型应用使用选择性水合，提高首次交互时间。

## 结论

React 18是一个重要的版本更新，它通过引入并发渲染机制和相关的新特性，大大提升了React应用的性能和用户体验。虽然并发特性是可选的，但它们为构建更加响应式的用户界面提供了强大的工具。

随着React生态系统逐渐适应这些新特性，我们可以期待看到更多创新的模式和实践出现。现在是时候开始探索这些新特性，并考虑如何将它们整合到你的应用中了。
    `,
    date: "2023-10-15",
    author: "Nindle",
    avatar: "/src/favicon.svg",
    category: "前端",
    tags: ["React", "JavaScript", "前端框架"],
    views: 1258,
    likes: 86,
    coverImage: "https://picsum.photos/1200/400?random=1",
    related: [
      {
        id: 2,
        title: "使用TailwindCSS构建现代UI界面",
        coverImage: "https://picsum.photos/300/200?random=2"
      },
      {
        id: 3,
        title: "TypeScript高级类型技巧",
        coverImage: "https://picsum.photos/300/200?random=3"
      },
      {
        id: 4,
        title: "Next.js 13架构深度解析",
        coverImage: "https://picsum.photos/300/200?random=4"
      }
    ],
    toc: [
      { id: "react-18-新特性解析", title: "React 18 新特性解析", level: 1 },
      { id: "自动批处理-automatic-batching", title: "自动批处理 (Automatic Batching)", level: 2 },
      { id: "并发特性-concurrent-features", title: "并发特性 (Concurrent Features)", level: 2 },
      { id: "1-usetransition-和-starttransition", title: "1. useTransition 和 startTransition", level: 3 },
      { id: "2-usedeferredvalue", title: "2. useDeferredValue", level: 3 },
      { id: "suspense改进", title: "Suspense改进", level: 2 },
      { id: "新的客户端和服务器端渲染api", title: "新的客户端和服务器端渲染API", level: 2 },
      { id: "react-18最佳实践", title: "React 18最佳实践", level: 2 },
      { id: "结论", title: "结论", level: 2 }
    ]
  }

  useEffect(() => {
    // 模拟加载数据
    setLoading(true)
    setTimeout(() => {
      setArticle(mockArticle)
      setLoading(false)
    }, 800)
  }, [id])

  // 处理点赞
  const handleLike = () => {
    if (!article) return

    const newLikes = liked ? article.likes - 1 : article.likes + 1
    setArticle({...article, likes: newLikes})
    setLiked(!liked)

    message.success(liked ? '已取消点赞' : '谢谢您的点赞！')
  }

  // 处理分享
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article?.title,
          text: `查看这篇文章：${article?.title}`,
          url: window.location.href,
        })
        .catch(() => message.info('分享功能需要HTTPS环境'))
    } else {
      // 复制当前链接到剪贴板
      navigator.clipboard.writeText(window.location.href)
        .then(() => message.success('链接已复制到剪贴板'))
        .catch(() => message.error('复制失败，请手动复制链接'))
    }
  }

  // 处理返回列表
  const handleBack = () => {
    history.push('/notes')
  }

  // 将Markdown内容转换为HTML（简化版）
  const renderMarkdown = (content: string) => {
    // 在实际项目中应使用markdown-it或其他库处理
    // 这里仅做简单示例
    const html = content
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gm, '<em>$1</em>')
      .replace(/```(jsx|js|tsx|ts|css|html)([\s\S]*?)```/gm, '<pre><code class="language-$1">$2</code></pre>')
      .replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>')
      .replace(/\n/gm, '<br>')

    return html
  }

  return (
    <div className="w-full bg-white min-h-screen py-10">
      <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* 主要内容区 */}
        <div className="flex-1">
          {loading ? (
            <Skeleton active avatar paragraph={{ rows: 10 }} />
          ) : article ? (
            <div>
              {/* 文章头部 */}
              <div className="mb-8">
                <Title level={1}>{article.title}</Title>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-500">
                  <div className="flex items-center">
                    <Avatar src={article.avatar} size={32} className="mr-2" />
                    <Text>{article.author}</Text>
                  </div>

                  <div className="flex items-center">
                    <CalendarOutlined className="mr-1" />
                    <Text>{article.date}</Text>
                  </div>

                  <div className="flex items-center">
                    <EyeOutlined className="mr-1" />
                    <Text>{article.views} 阅读</Text>
                  </div>

                  <div className="flex items-center">
                    <Tag color="blue">{article.category}</Tag>
                  </div>
                </div>
              </div>

              {/* 封面图 */}
              {article.coverImage && (
                <div className="mb-8 overflow-hidden rounded-lg">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* 文章内容 */}
              <div
                className="article-content prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
              />

              {/* 文章标签 */}
              <div className="my-8">
                <Space size={[0, 8]} wrap>
                  <TagOutlined className="mr-2" />
                  {article.tags.map(tag => (
                    <Tag key={tag} color="blue">{tag}</Tag>
                  ))}
                </Space>
              </div>

              {/* 分享和点赞 */}
              <div className="flex justify-center gap-4 my-12">
                <Button
                  type="primary"
                  size="large"
                  icon={liked ? <LikeFilled /> : <LikeOutlined />}
                  onClick={handleLike}
                >
                  点赞 ({article.likes})
                </Button>

                <Button
                  size="large"
                  icon={<ShareAltOutlined />}
                  onClick={handleShare}
                >
                  分享
                </Button>

                <Button
                  size="large"
                  icon={<RollbackOutlined />}
                  onClick={handleBack}
                >
                  返回列表
                </Button>
              </div>

              {/* 相关文章 */}
              {article.related && article.related.length > 0 && (
                <div className="mt-12">
                  <Divider orientation="left">
                    <Title level={4} className="mb-0">相关文章</Title>
                  </Divider>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {article.related.map((item) => (
                      <Card
                        key={item.id}
                        hoverable
                        cover={
                          <img
                            alt={item.title}
                            src={item.coverImage}
                            className="h-[160px] object-cover"
                          />
                        }
                        onClick={() => history.push(`/notes/${item.id}`)}
                      >
                        <Card.Meta title={item.title} />
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <Title level={4} className="text-gray-500">找不到该文章</Title>
              <Button
                type="primary"
                className="mt-4"
                onClick={handleBack}
              >
                返回列表
              </Button>
            </div>
          )}
        </div>

        {/* 侧边栏 */}
        {!loading && article && article.toc && (
          <div className="w-full md:w-72">
            <Affix offsetTop={20}>
              <Card title="目录" className="sticky top-20 w-full">
                <div className="max-h-[calc(100vh-180px)] overflow-auto pr-2">
                  {article.toc.map((item) => (
                    <div
                      key={item.id}
                      className={`py-2 pl-${(item.level - 1) * 4} hover:text-blue-500 cursor-pointer`}
                      onClick={() => {
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </Card>
            </Affix>
          </div>
        )}
      </div>
    </div>
  )
})