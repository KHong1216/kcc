import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

const heroImages = [
  {
    id: 1,
    src: "/1.webp",
    alt: "코이창작소 메인 이미지 1",
    title: "작은 물결이 큰 도약이 되는 창작소",
    subtitle: "코이창작소",
    description: "탈광주 청년을 막기 위한 청년문화 공간",
    link: "/about/representative"
  },
  {
    id: 2,
    src: "/2.webp",
    alt: "코이창작소 메인 이미지 2",
    title: "청년들의 성장을 돕는 창작 공간",
    subtitle: "상담을 통한 '나'를 찾는 과정",
    description: "다양한 청년들의 의견을 듣고 모집해서 청년 이해 관계 센터 설립",
    link: "/programs/photo"
  },
  {
    id: 3,
    src: "/3.webp",
    alt: "코이창작소 메인 이미지 3",
    title: "코이 = 사랑",
    subtitle: "환경에 따라 성장하는 코이 물고기",
    description: "청년들이 각자의 가능성을 발견하고 성장해 나가는 과정",
    link: "/programs/essay"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  // 클라이언트 사이드에서만 framer-motion 활성화
  useEffect(() => {
    setIsClient(true);
    setIsMounted(true);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  function handleLearnMore() {
    const target = heroImages[currentSlide]?.link;
    if (target) navigate(target);
  }

  // 첫 번째 이미지 컴포넌트 (LCP 최적화)
  const FirstSlide = () => {
    const image = heroImages[0];
    const SlideWrapper = isClient ? motion.div : "div";
    const TextWrapper = isClient ? motion : { div: "div", h1: "h1", h3: "h3", p: "p" };

    return (
      <SlideWrapper
        key={`first-slide-${image.id}`}
        className="absolute inset-0 w-full h-full z-10"
        {...(isClient && {
          initial: isMounted ? false : { opacity: 0 },
          animate: { opacity: currentSlide === 0 ? 1 : 0 },
          transition: { duration: 0.8, ease: "easeInOut" }
        })}
        style={!isClient ? { opacity: currentSlide === 0 ? 1 : 0 } : undefined}
      >
        <div className="relative w-full h-full">
          <img
            key={`hero-${image.id}`}
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            style={{ imageRendering: 'auto' }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            {isClient ? (
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight break-keep"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ textWrap: "balance" }}
              >
                {image.title}
              </motion.h1>
            ) : (
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight break-keep">
                {image.title}
              </h1>
            )}

            {isClient ? (
              <motion.h3
                className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-blue-300 break-keep"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{ textWrap: "balance" }}
              >
                {image.subtitle}
              </motion.h3>
            ) : (
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-blue-300 break-keep">
                {image.subtitle}
              </h3>
            )}

            {isClient ? (
              <motion.p
                className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {image.description}
              </motion.p>
            ) : (
              <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                {image.description}
              </p>
            )}

            {isClient ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                  onClick={handleLearnMore}
                >
                  자세히 보기
                </Button>
              </motion.div>
            ) : (
              <div>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                  onClick={handleLearnMore}
                >
                  자세히 보기
                </Button>
              </div>
            )}
          </div>
        </div>
      </SlideWrapper>
    );
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="relative w-full h-screen">
        {/* 첫 번째 슬라이드 (LCP 요소) - 즉시 렌더링 */}
        <FirstSlide />

        {/* 나머지 슬라이드 - lazy loading */}
        {heroImages.slice(1).map((image, index) => {
          const actualIndex = index + 1;
          const SlideWrapper = isClient ? motion.div : "div";
          
          return (
            <SlideWrapper
              key={`slide-${image.id}`}
              className={`absolute inset-0 w-full h-full ${actualIndex === currentSlide ? 'z-10' : 'z-0'}`}
              {...(isClient && {
                initial: isMounted ? false : { opacity: 0 },
                animate: {
                  opacity: actualIndex === currentSlide ? 1 : 0,
                  scale: actualIndex === currentSlide ? 1 : 1.1
                },
                transition: { duration: 0.8, ease: "easeInOut" }
              })}
              style={!isClient ? { opacity: actualIndex === currentSlide ? 1 : 0 } : undefined}
            >
              <div className="relative w-full h-full">
                <img
                  key={`hero-${image.id}`}
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  style={{ imageRendering: 'auto' }}
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                  {isClient ? (
                    <motion.h2
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight break-keep"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      style={{ textWrap: "balance" }}
                    >
                      {image.title}
                    </motion.h2>
                  ) : (
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight break-keep">
                      {image.title}
                    </h2>
                  )}

                  {isClient ? (
                    <motion.h3
                      className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-blue-300 break-keep"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      style={{ textWrap: "balance" }}
                    >
                      {image.subtitle}
                    </motion.h3>
                  ) : (
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-blue-300 break-keep">
                      {image.subtitle}
                    </h3>
                  )}

                  {isClient ? (
                    <motion.p
                      className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                    >
                      {image.description}
                    </motion.p>
                  ) : (
                    <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                      {image.description}
                    </p>
                  )}

                  {isClient ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                    >
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                        onClick={handleLearnMore}
                      >
                        자세히 보기
                      </Button>
                    </motion.div>
                  ) : (
                    <div>
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                        onClick={handleLearnMore}
                      >
                        자세히 보기
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SlideWrapper>
          );
        })}

        {/* 네비게이션 화살표 */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="이전 이미지"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="다음 이미지"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* 인디케이터 도트 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
                }`}
              aria-label={`${index + 1}번째 이미지로 이동`}
            />
          ))}
        </div>
      </div>

      {/* 자동 슬라이드 (선택사항) */}
      {isClient && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/30 z-30"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          onAnimationComplete={() => {
            nextSlide();
          }}
        />
      )}
    </section>
  );
}
