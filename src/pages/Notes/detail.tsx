import { memo, useEffect, useState, useRef } from 'react'
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
  message,
  Row,
  Col,
  Input,
  List
} from 'antd'
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
  ClockCircleOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import { useParams, history } from '@umijs/max'
import LazyImage from '@/components/LazyImage'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import './detail.css'

const { Title, Paragraph, Text } = Typography

// 图标通用属性类型
type IconProps = {
  className?: string
  style?: React.CSSProperties
}

// 文章详情接口
interface ArticleDetail {
  id: number
  title: string
  content: string
  date: string
  author: string
  avatar: string
  authorUrl: string
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

const NoteDetail = () => {
  const { id } = useParams()
  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [commentText, setCommentText] = useState('')
  const articleRef = useRef<HTMLDivElement>(null)

  // 模拟文章数据
  const mockArticle: ArticleDetail = {
    id: 1,
    title: 'React 18新特性解析与最佳实践',
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
    date: '2023-10-15',
    author: 'Nindle',
    avatar: 'https://img.nindle.cn/logo.png',
    authorUrl: 'https://github.com/nindle',
    category: '前端',
    tags: ['React', 'JavaScript', '前端框架'],
    views: 1258,
    likes: 86,
    coverImage: 'https://picsum.photos/1200/400?random=1',
    related: [
      {
        id: 2,
        title: '使用TailwindCSS构建现代UI界面',
        coverImage: 'https://picsum.photos/300/200?random=2'
      },
      {
        id: 3,
        title: 'TypeScript高级类型技巧',
        coverImage: 'https://picsum.photos/300/200?random=3'
      }
    ],
    toc: [
      { id: 'react-18-新特性解析', title: 'React 18 新特性解析', level: 1 },
      { id: '自动批处理-automatic-batching', title: '自动批处理 (Automatic Batching)', level: 2 },
      { id: '并发特性-concurrent-features', title: '并发特性 (Concurrent Features)', level: 2 },
      {
        id: '1-usetransition-和-starttransition',
        title: '1. useTransition 和 startTransition',
        level: 3
      },
      { id: '2-usedeferredvalue', title: '2. useDeferredValue', level: 3 },
      { id: 'suspense改进', title: 'Suspense改进', level: 2 },
      { id: '新的客户端和服务器端渲染api', title: '新的客户端和服务器端渲染API', level: 2 },
      { id: 'react-18最佳实践', title: 'React 18最佳实践', level: 2 },
      { id: '结论', title: '结论', level: 2 }
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

  // 滚动到指定标题
  const scrollToHeading = (headingId: string) => {
    if (!articleRef.current) return

    // 修复以数字开头的ID选择器问题
    // 使用attribute选择器而不是ID选择器
    const element = articleRef.current.querySelector(`[id="${headingId}"]`)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // 处理点赞
  const handleLike = () => {
    if (!article) return

    const newLikes = liked ? article.likes - 1 : article.likes + 1
    setArticle({ ...article, likes: newLikes })
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
          url: window.location.href
        })
        .catch(() => message.info('分享功能需要HTTPS环境'))
    } else {
      // 复制当前链接到剪贴板
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => message.success('链接已复制到剪贴板'))
        .catch(() => message.error('复制失败，请手动复制链接'))
    }
  }

  // 处理返回列表
  const handleBack = () => {
    history.push('/notes')
  }

  // 将Markdown内容转换为HTML
  const renderMarkdown = (content: string) => {
    // 在实际项目中应使用markdown-it或其他库处理
    // 这里仅做简单示例
    const html = content
      .replace(/^# (.*$)/gm, (_, title) => {
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
        return `<h1 id="${id}">${title}</h1>`
      })
      .replace(/^## (.*$)/gm, (_, title) => {
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
        return `<h2 id="${id}">${title}</h2>`
      })
      .replace(/^### (.*$)/gm, (_, title) => {
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
        return `<h3 id="${id}">${title}</h3>`
      })
      .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gm, '<em>$1</em>')
      .replace(
        /```(jsx|js|tsx|ts|css|html)([\s\S]*?)```/gm,
        '<pre><code class="language-$1">$2</code></pre>'
      )
      .replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>')
      .replace(/\n/gm, '<br>')

    return html
  }

  const handleComment = () => {
    // Implementation for handling comment submission
    console.log('Comment submitted:', commentText)
    message.success('评论已提交，等待审核')
    setCommentText('')
  }

  if (loading) {
    return (
      <div
        style={{ background: '#f8f9fa', minHeight: '100vh', padding: '20px 0' }}
        className="custom-scrollbar"
      >
        <div
          className="container"
          style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}
        >
          <Card bordered={false} style={{ borderRadius: '12px', marginBottom: '24px' }}>
            <Skeleton active avatar paragraph={{ rows: 4 }} />
          </Card>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card bordered={false} style={{ borderRadius: '12px' }}>
                <Skeleton active paragraph={{ rows: 15 }} />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card bordered={false} style={{ borderRadius: '12px', marginBottom: '24px' }}>
                <Skeleton active paragraph={{ rows: 5 }} />
              </Card>
              <Card bordered={false} style={{ borderRadius: '12px' }}>
                <Skeleton active avatar paragraph={{ rows: 2 }} />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>文章不存在或已被删除</Title>
        <Button type="primary" onClick={handleBack}>
          返回文章列表
        </Button>
      </div>
    )
  }

  return (
    <div
      style={{ background: '#f8f9fa', minHeight: '100vh', padding: '20px 0' }}
      className="custom-scrollbar"
    >
      <div
        className="container"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="back-header"
            onClick={() => history.push('/notes')}
            style={{ padding: '16px 0', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <LeftOutlined />
            <span style={{ marginLeft: '8px' }}>返回文章列表</span>
          </div>
        </motion.div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                bordered={false}
                style={{ marginBottom: '24px', borderRadius: '12px', overflow: 'hidden' }}
                className="article-card"
              >
                <Title level={1} style={{ marginBottom: '16px', color: '#1a202c' }}>
                  {article.title}
                </Title>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <Avatar src={article.avatar} size={40} />
                  <div style={{ marginLeft: '12px' }}>
                    <Text strong style={{ fontSize: '16px', display: 'block', color: '#1a202c' }}>
                      {article.author}
                    </Text>
                    <Space size={8}>
                      <Text type="secondary" style={{ fontSize: '14px' }}>
                        <CalendarOutlined />
                        <span style={{ marginLeft: '4px' }}>
                          {dayjs(article.date).format('YYYY-MM-DD')}
                        </span>
                      </Text>
                      <Text type="secondary" style={{ fontSize: '14px' }}>
                        <EyeOutlined />
                        <span style={{ marginLeft: '4px' }}>{article.views} 阅读</span>
                      </Text>
                    </Space>
                  </div>
                </div>

                {article.coverImage && (
                  <div style={{ margin: '0 -24px 24px', overflow: 'hidden', borderRadius: '8px' }}>
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      style={{
                        width: '100%',
                        objectFit: 'cover',
                        height: '300px'
                      }}
                    />
                  </div>
                )}

                <div className="article-content" ref={articleRef}>
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }} />
                </div>

                <Divider style={{ margin: '32px 0 24px' }} />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  <div
                    style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}
                  >
                    {article.tags.map((tag) => (
                      <Tag
                        key={tag}
                        color="blue"
                        style={{ padding: '4px 12px', borderRadius: '16px', fontSize: '14px' }}
                        className="article-tag"
                      >
                        <TagOutlined />
                        <span style={{ marginLeft: '4px' }}>{tag}</span>
                      </Tag>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Tooltip title={liked ? '取消点赞' : '点赞'}>
                      <Button
                        type="text"
                        icon={
                          liked ? <HeartFilled style={{ color: '#f5222d' }} /> : <HeartOutlined />
                        }
                        onClick={handleLike}
                        size="large"
                        className="action-button"
                      >
                        <span style={{ marginLeft: '4px' }}>{article.likes}</span>
                      </Button>
                    </Tooltip>

                    <Tooltip title="分享">
                      <Button
                        type="text"
                        icon={<ShareAltOutlined />}
                        onClick={handleShare}
                        size="large"
                        className="action-button"
                      >
                        <span style={{ marginLeft: '4px' }}>分享</span>
                      </Button>
                    </Tooltip>

                    <Tooltip title="评论">
                      <Button
                        type="text"
                        icon={<MessageOutlined />}
                        onClick={() =>
                          document
                            .getElementById('comments-section')
                            ?.scrollIntoView({ behavior: 'smooth' })
                        }
                        size="large"
                        className="action-button"
                      >
                        <span style={{ marginLeft: '4px' }}>评论</span>
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Card
                id="comments-section"
                bordered={false}
                style={{ borderRadius: '12px' }}
                title={
                  <Title level={4} style={{ margin: 0 }}>
                    评论 (0)
                  </Title>
                }
                className="article-card"
              >
                <div style={{ marginBottom: '24px' }}>
                  <Input.TextArea
                    rows={4}
                    placeholder="写下你的评论..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{ borderRadius: '8px', resize: 'none' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <Button
                      type="primary"
                      onClick={handleComment}
                      disabled={!commentText.trim()}
                      className="action-button"
                    >
                      发表评论
                    </Button>
                  </div>
                </div>

                <div style={{ textAlign: 'center', padding: '20px 0', color: '#666' }}>
                  <MessageOutlined style={{ fontSize: '20px' }} />
                  <p style={{ marginTop: '8px' }}>暂无评论，来发表第一条评论吧</p>
                </div>
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} lg={8}>
            <Affix offsetTop={24}>
              <div style={{ position: 'sticky', top: '0', minHeight: '100vh', overflow: 'auto' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <Card
                    bordered={false}
                    style={{ marginBottom: '24px', borderRadius: '12px' }}
                    title={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BookOutlined /> <span style={{ marginLeft: '8px' }}>文章目录</span>
                      </div>
                    }
                    className="article-card custom-scrollbar"
                  >
                    <div
                      style={{ maxHeight: '300px', overflow: 'auto' }}
                      className="custom-scrollbar"
                    >
                      {article.toc?.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            marginLeft: `${(item.level - 1) * 16}px`,
                            padding: '8px 0',
                            cursor: 'pointer',
                            paddingLeft: '12px'
                          }}
                          onClick={() => scrollToHeading(item.id)}
                          className="toc-item"
                        >
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <Card
                    bordered={false}
                    style={{ marginBottom: '24px', borderRadius: '12px' }}
                    title="作者信息"
                    className="article-card"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      <Avatar src={article.avatar} size={64} />
                      <div style={{ marginLeft: '16px' }}>
                        <Title level={5} style={{ margin: 0 }}>
                          {article.author}
                        </Title>
                        <Text type="secondary">{article.category} 领域创作者</Text>
                      </div>
                    </div>
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}
                      className="ml-2"
                    >
                      <Button
                        type="primary"
                        size="small"
                        className="action-button"
                        onClick={() => window.open(article.authorUrl, '_blank')}
                      >
                        关注
                      </Button>
                      <Button
                        size="small"
                        className="action-button"
                        onClick={() => window.open(article.authorUrl, '_blank')}
                      >
                        查看主页
                      </Button>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <Card
                    bordered={false}
                    style={{ borderRadius: '12px' }}
                    title="相关文章"
                    className="article-card"
                  >
                    <List
                      itemLayout="vertical"
                      dataSource={article.related}
                      renderItem={(item) => (
                        <List.Item
                          key={item.id}
                          style={{ padding: '12px 0', cursor: 'pointer' }}
                          onClick={() => history.push(`/notes/${item.id}`)}
                          className="related-article"
                        >
                          <div style={{ display: 'flex', gap: '12px' }}>
                            {item.coverImage && (
                              <img
                                src={item.coverImage}
                                alt={item.title}
                                style={{
                                  width: '80px',
                                  height: '60px',
                                  objectFit: 'cover',
                                  borderRadius: '6px'
                                }}
                              />
                            )}
                            <div>
                              <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                                {item.title}
                              </Text>
                              <Text type="secondary" style={{ fontSize: '12px' }}>
                                <ClockCircleOutlined />
                                <span style={{ marginLeft: '4px' }}>最近更新</span>
                              </Text>
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </motion.div>
              </div>
            </Affix>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default memo(NoteDetail)
