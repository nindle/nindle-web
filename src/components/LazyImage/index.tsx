import { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
}

const LazyImage = ({ src, alt, className = '', placeholderColor = 'bg-gray-200' }: LazyImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // 使用 Intersection Observer API 监测图片是否进入视口
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      });
    }, {
      rootMargin: '50px', // 提前50px开始加载
      threshold: 0.1 // 当10%的图片可见时触发
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  // 图片加载完成的处理函数
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  // 图片加载失败的处理函数
  const handleImageError = () => {
    // 可以设置默认占位图
    if (imgRef.current) {
      imgRef.current.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIyMHB4IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+图片加载失败</dGV4dD48L3N2Zz4=';
      setIsLoaded(true);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        ref={imgRef}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        src={isInView ? src : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+'}
        onLoad={handleImageLoaded}
        onError={handleImageError}
      />
    </div>
  );
};

export default LazyImage;