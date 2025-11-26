import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { AdminSidebar } from "./admin-sidebar";

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

  useEffect(() => {
    const page = searchParams.get("page") || "dashboard";
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page: string) => {
    setSearchParams({ page });
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#FDF6F0]" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>
      {/* 사이드바 */}
      <AdminSidebar currentPage={currentPage} onPageChange={handlePageChange} />

      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white/80 backdrop-blur-sm">
        <div className="flex-1 overflow-y-auto">
          {children(currentPage)}
        </div>
      </div>
    </div>
  );
}

