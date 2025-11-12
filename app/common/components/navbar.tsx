import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";

interface NavbarProps {
  className?: string;
}

/**
 * KOI 브랜드 Navbar 컴포넌트
 * 따뜻하고 감성적인 네비게이션 바입니다.
 */
export function Navbar({ className }: NavbarProps) {
  const location = useLocation();

  const menuItems = [
    { name: "홈", href: "/" },
    { name: "에세이캠프", href: "/programs/essay" },
    { name: "연애캠프", href: "/programs/love" },
    { name: "문의", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "flex justify-between items-center py-4 px-6 bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300",
        className
      )}
    >
      <Link
        to="/"
        className="text-xl font-bold text-[#2D6A9F] hover:text-[#1E3A8A] transition-colors"
      >
        KOI Creative Lab
      </Link>
      <div className="flex gap-6 text-gray-600 font-medium">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "transition-colors hover:text-[#2D6A9F] relative",
                isActive && "text-[#2D6A9F] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2D6A9F]"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

