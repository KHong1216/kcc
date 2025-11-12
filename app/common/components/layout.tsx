import * as React from "react";
import { cn } from "~/lib/utils";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "section" | "container";
}

/**
 * KOI 브랜드 레이아웃 컴포넌트
 * 섹션별 여백과 배경색을 일관되게 관리합니다.
 */
export function Layout({ children, variant = "default", className, ...props }: LayoutProps) {
  const variantStyles = {
    default: "",
    section: "py-20 px-8 bg-[#FAFBFC]",
    container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  };

  return (
    <div
      className={cn(variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  background?: "white" | "light" | "gradient";
}

/**
 * 섹션 컴포넌트
 * 페이지의 주요 섹션을 감싸는 컨테이너입니다.
 */
export function Section({ children, background = "light", className, ...props }: SectionProps) {
  const backgroundStyles = {
    white: "bg-white",
    light: "bg-[#FDF6F0]",
    gradient: "bg-gradient-to-br from-[#FDF6F0] via-white to-[#FFF7F5]",
  };

  return (
    <section
      className={cn("py-20 px-4 sm:px-6 lg:px-8", backgroundStyles[background], className)}
      {...props}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * 컨테이너 컴포넌트
 * 콘텐츠의 최대 너비를 제한하고 중앙 정렬합니다.
 */
export function Container({ children, size = "lg", className, ...props }: ContainerProps) {
  const sizeStyles = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn("mx-auto px-4 sm:px-6 lg:px-8", sizeStyles[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}

