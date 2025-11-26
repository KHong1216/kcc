import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { AdminSidebar } from "./admin-sidebar";
import { Menu, X } from "lucide-react";
import { Button } from "~/common/components/ui/button";

interface AdminLayoutProps {
  stats: {
    activeManagerCount: number;
    inactiveManagerCount: number;
    reservationCount: number;
    communityCount: number;
    contactCount: number;
    testCount: number;
  };
  children: (currentPage: string) => React.ReactNode;
}

export function AdminLayout({ stats, children }: AdminLayoutProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return searchParams.get("page") || "dashboard";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const page = searchParams.get("page") || "dashboard";
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page: string) => {
    setSearchParams({ page });
    setCurrentPage(page);
    // 모바일에서 페이지 변경 시 드로어 닫기
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#FDF6F0]" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>
      {/* 데스크톱 사이드바 */}
      <div className="hidden md:block">
        <AdminSidebar currentPage={currentPage} onPageChange={handlePageChange} isMobile={false} />
      </div>

      {/* 모바일 드로어 오버레이 */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 모바일 사이드바 드로어 */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-[70] md:hidden
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-hidden={!mobileMenuOpen}
      >
        <AdminSidebar 
          currentPage={currentPage} 
          onPageChange={handlePageChange} 
          isMobile={true}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white/80 backdrop-blur-sm">
        {/* 모바일 햄버거 메뉴 버튼 */}
        <div className="md:hidden p-4 border-b border-gray-200 bg-white/90 backdrop-blur-sm relative z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
            aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#3B2F2F]" />
            ) : (
              <Menu className="w-6 h-6 text-[#3B2F2F]" />
            )}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {children(currentPage)}
        </div>
      </div>
    </div>
  );
}

