import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import type { MetaFunction } from "react-router";
import type { Route } from "./+types/event-page1";

// ============================================================================
// Types
// ============================================================================

type ProgramId = "photo" | "love" | "essay";

interface ProgramImage {
  id: string;
  imageUrl: string;
}

interface ProgramConfig {
  id: ProgramId;
  label: string;
  subtitle: string;
  images: ProgramImage[];
}

// ============================================================================
// Configurable Constants
// ============================================================================

const PROGRAM_CONFIGS: ProgramConfig[] = [
  {
    id: "photo",
    label: "무색무취",
    subtitle: "사진으로 담는 감정",
    images: [
      { id: "p1", imageUrl: "/desc/p1.png" },
      { id: "p2", imageUrl: "/desc/p2.png" },
      { id: "p3", imageUrl: "/desc/p3.png" },
      { id: "p4", imageUrl: "/desc/p4.png" },
      { id: "p5", imageUrl: "/desc/p5.png" },
      { id: "p6", imageUrl: "/desc/p6.png" },
      { id: "p7", imageUrl: "/desc/p7.png" },
      { id: "p8", imageUrl: "/desc/p8.png" },
      { id: "p9", imageUrl: "/desc/p9.png" },
    ],
  },
  {
    id: "love",
    label: "코이창작소",
    subtitle: "사랑을 탐구하다",
    images: [
      { id: "l1", imageUrl: "/desc/l1.png" },
      { id: "l2", imageUrl: "/desc/l2.png" },
      { id: "l3", imageUrl: "/desc/l3.png" },
      { id: "l4", imageUrl: "/desc/l4.png" },
      { id: "l5", imageUrl: "/desc/l5.png" },
      { id: "l6", imageUrl: "/desc/l6.png" },
      { id: "l7", imageUrl: "/desc/l7.png" },
    ],
  },
  {
    id: "essay",
    label: "에세이",
    subtitle: "글로 표현하는 마음",
    images: [
      { id: "e1", imageUrl: "/desc/e1.png" },
      { id: "e2", imageUrl: "/desc/e2.png" },
      { id: "e3", imageUrl: "/desc/e3.png" },
    ],
  },
];

// ============================================================================
// Route Exports
// ============================================================================

export const meta: MetaFunction = () => [
  { title: "프로그램 소개 | 코이창작소" },
  {
    name: "description",
    content: "코이창작소의 프로그램을 둘러보세요. 클릭무드, 러브포션, 아무,말",
  },
];

export function loader(_: Route.LoaderArgs) {
  return {};
}

export async function action(_: Route.ActionArgs) {
  return {};
}

// ============================================================================
// Sub-components
// ============================================================================

interface ProgramSelectorProps {
  programs: ProgramConfig[];
  activeId: ProgramId;
  onSelect: (id: ProgramId) => void;
}

function ProgramSelector({ programs, activeId, onSelect }: ProgramSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {programs.map((program) => {
        const isActive = program.id === activeId;
        return (
          <button
            key={program.id}
            type="button"
            onClick={() => onSelect(program.id)}
            className={clsx(
              "rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300",
              isActive
                ? "bg-[#8b5cf6] text-white shadow-lg shadow-[#8b5cf6]/30"
                : "border-2 border-[#d4c2ff] bg-white/80 text-[#6b5b95] hover:border-[#8b5cf6] hover:bg-[#f9f7ff]"
            )}
          >
            {program.label}
          </button>
        );
      })}
    </div>
  );
}

interface OrbitCardProps {
  image: ProgramImage;
  index: number;
  currentIndex: number;
  totalCards: number;
}

function OrbitCard({ image, index, currentIndex, totalCards }: OrbitCardProps) {
  // 화면 크기 감지
  const [translateX, setTranslateX] = useState(265);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    function updateTranslateX() {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      let cardWidth: number;
      
      if (width >= 768) {
        // md: 280px
        cardWidth = 280;
      } else if (width >= 640) {
        // sm: 250px
        cardWidth = 250;
      } else {
        // 모바일: 210px
        cardWidth = 210;
      }
      
      // 비율 계산: translateX = 265 * (현재 카드 너비 / 280)
      const newTranslateX = Math.round(265 * (cardWidth / 280));
      setTranslateX(newTranslateX);
    }

    updateTranslateX();
    window.addEventListener("resize", updateTranslateX);

    return () => {
      window.removeEventListener("resize", updateTranslateX);
    };
  }, []);

  // 이미지 preload
  useEffect(() => {
    const img = new Image();
    img.src = image.imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // 에러가 나도 표시
  }, [image.imageUrl]);

  // 항상 3개의 카드만 보임: 이전, 현재, 다음
  const getVisibleIndices = () => {
    if (totalCards === 0) return [];
    if (totalCards === 1) return [0];
    if (totalCards === 2) return [0, 1];

    const prev = (currentIndex - 1 + totalCards) % totalCards;
    const next = (currentIndex + 1) % totalCards;
    return [prev, currentIndex, next];
  };

  const visibleIndices = getVisibleIndices();
  const position = visibleIndices.indexOf(index);

  // 카드 스타일 계산
  function getCardStyle() {
    if (position === -1) {
      return {
        transform: "translate(-50%, -50%) translateX(0) translateZ(-200px) rotateY(0deg) scale(0)",
        opacity: 0,
      };
    }

    if (position === 1) {
      // 중앙 카드, 화면 정중앙에 위치
      return {
        transform: "translate(-50%, -50%) translateX(0) translateZ(10px) rotateY(0deg) scale(1)",
        opacity: 1,
      };
    }

    if (position === 0) {
      // 왼쪽 카드 (안쪽 모서리가 더 가까이)
      return {
        transform: `translate(-50%, -50%) translateX(-${translateX}px) translateZ(-110px) rotateY(-30deg) rotateX(1deg) scale(0.82)`,
        opacity: 0.55,
      };
    }

    // 오른쪽 카드 (안쪽 모서리가 더 가까이)
    return {
      transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(-110px) rotateY(30deg) rotateX(1deg) scale(0.82)`,
      opacity: 0.55,
    };
  }

  const style = getCardStyle();
  const isVisible = position !== -1;

  return (
    <div
      className={clsx(
        "absolute left-1/2 top-1/2",
        "w-[210px] sm:w-[250px] md:w-[280px]",
        "rounded-[28px] overflow-hidden shadow-2xl"
      )}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        pointerEvents: isVisible ? "auto" : "none",
        transition: "transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)",
      }}
    >
      <div className="w-full overflow-hidden rounded-2xl border border-white/40 bg-white shadow-xl shadow-[#8b5cf6]/10">
        <div className="relative w-full">
          {imageLoaded ? (
            <img
              src={image.imageUrl}
              alt={image.id}
              className="w-full h-auto object-contain"
              draggable={false}
              loading="eager"
            />
          ) : (
            <div className="w-full aspect-[3/4] bg-gray-100 animate-pulse" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}

interface OrbitCarouselProps {
  images: ProgramImage[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

function OrbitCarousel({ images, activeIndex, onIndexChange }: OrbitCarouselProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartIndex = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCards = images.length;

  // 드래그 시작
  function handleMouseDown(e: React.MouseEvent) {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartIndex.current = activeIndex;
    e.preventDefault();
  }

  function handleTouchStart(e: React.TouchEvent) {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragStartIndex.current = activeIndex;
    e.preventDefault();
  }

  // 드래그 중
  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.clientX - dragStartX.current;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      const direction = deltaX > 0 ? -1 : 1;
      const newIndex = (dragStartIndex.current + direction + totalCards) % totalCards;
      onIndexChange(newIndex);
      setIsDragging(false);
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.touches[0].clientX - dragStartX.current;
    const threshold = 30;

    if (Math.abs(deltaX) > threshold) {
      const direction = deltaX > 0 ? -1 : 1;
      const newIndex = (dragStartIndex.current + direction + totalCards) % totalCards;
      onIndexChange(newIndex);
      setIsDragging(false);
    }
  }

  // 드래그 종료
  function handleMouseUp() {
    setIsDragging(false);
  }

  function handleTouchEnd() {
    setIsDragging(false);
  }

  // 전역 이벤트 리스너
  useEffect(() => {
    if (!isDragging) return;

    function handleGlobalMouseMove(e: MouseEvent) {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX.current;
      const threshold = 50;

      if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? -1 : 1;
        const newIndex = (dragStartIndex.current + direction + totalCards) % totalCards;
        onIndexChange(newIndex);
        setIsDragging(false);
      }
    }

    function handleGlobalMouseUp() {
      setIsDragging(false);
    }

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, totalCards]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative flex w-full max-w-[560px] items-center justify-center"
    >
      <div
        className="relative w-full overflow-visible rounded-[36px] bg-transparent"
        style={{
          height: "clamp(320px, 48vh, 420px)",
          cursor: isDragging ? "grabbing" : "grab",
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
          style={{ transformStyle: "preserve-3d" }}
        >
          {images.map((image, index) => (
            <OrbitCard
              key={image.id}
              image={image}
              index={index}
              currentIndex={activeIndex}
              totalCards={totalCards}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export function EventPage1(_: Route.ComponentProps) {
  const [activeProgram, setActiveProgram] = useState<ProgramId>("photo");
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentConfig = PROGRAM_CONFIGS.find((p) => p.id === activeProgram) ?? PROGRAM_CONFIGS[0];

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeProgram]);

  // 이미지 preload
  useEffect(() => {
    const preloadImages = currentConfig.images.map((img) => {
      const image = new Image();
      image.src = img.imageUrl;
      return image;
    });
  }, [currentConfig]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-b from-[#f9f7ff] to-[#f2f5ff]">
      {/* Orbit Carousel*/}
      <div className="relative flex flex-1 items-center justify-center px-4 pt-12">
        <div className="mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
          <div
            key={activeProgram}
            className="w-full transition-opacity duration-300"
          >
            <OrbitCarousel
              images={currentConfig.images}
              activeIndex={currentIndex}
              onIndexChange={setCurrentIndex}
            />
          </div>
        </div>
      </div>

      {/* Header Section - 하단 */}
      <div className="px-4 pb-2 pt-2 text-center">
        {/* {카드인디케이터} */}
        <div className="mb-2 flex w-full items-center justify-center gap-3">
          {currentConfig.images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={clsx(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "w-8 bg-[#7c3aed]"
                  : "w-2 bg-[#d7c8ff] hover:bg-[#b8a5e8]"
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
        <div className="mx-auto max-w-[520px]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a28cdc]">
            RE-FRAME
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-[#20163a]">
            프로그램 소개
          </h1>
          <p className="mt-1 text-sm text-[#61567e]">
            코이창작소의 다양한 프로그램을 둘러보세요
          </p>
        </div>
      </div>

      {/* Program Selector - 최하단 */}
      <div className="px-4 pb-2">
        <div className="mx-auto max-w-[600px]">
          <ProgramSelector
            programs={PROGRAM_CONFIGS}
            activeId={activeProgram}
            onSelect={setActiveProgram}
          />
        </div>
      </div>
    </div>
  );
}

export default EventPage1;

