import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import {
  Users,
  Calendar,
  MessageSquare,
  Heart,
  FolderOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Menu,
} from "lucide-react";
import clsx from "clsx";

interface AdminSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function AdminSidebar({ currentPage, onPageChange }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuGroups = [
    {
      items: [
        { id: "dashboard", label: "대시보드", icon: BarChart3 },
      ],
    },
    {
      items: [
        { id: "reservations", label: "예약 관리", icon: Calendar },
        { id: "contact", label: "문의 관리", icon: MessageSquare },
        { id: "test", label: "테스트 관리", icon: Sparkles },
      ],
    },
    {
      items: [
        { id: "managers", label: "매니저 관리", icon: Users },
        { id: "programs", label: "프로젝트 관리", icon: FolderOpen },
        { id: "community", label: "커뮤니티 관리", icon: Heart },
      ],
    },
  ];

  // 모든 메뉴 아이템을 평탄화 (collapsed 모드용)
  const allMenuItems = menuGroups.flatMap(group => group.items);

  return (
    <div
      className={clsx(
        "relative bg-[#FDF6F0] border-r border-gray-200/60 transition-all duration-300 flex flex-col z-10",
        collapsed ? "w-16" : "w-80"
      )}
    >
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200/40 flex items-center justify-between bg-white/50 backdrop-blur-sm">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(90deg, #A8C5F8, #F3C3E6)" }}>
              <Menu className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-extrabold text-[#3B2F2F]">관리자</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 overflow-y-auto p-4">
        {collapsed ? (
          <div className="space-y-2">
            {allMenuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              // 그룹의 첫 번째 아이템이면 위에 Divider 추가 (첫 번째 그룹 제외)
              const showDivider = index > 0 && menuGroups.some((group, groupIndex) => {
                const prevGroupEndIndex = menuGroups.slice(0, groupIndex).reduce((sum, g) => sum + g.items.length, 0);
                return index === prevGroupEndIndex;
              });
              
              return (
                <div key={item.id}>
                  {showDivider && <div className="my-2 border-t border-gray-200" />}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(item.id)}
                    className={clsx(
                      "w-full justify-center transition-colors rounded-lg",
                      isActive ? "text-white" : "text-[#3B2F2F] hover:bg-white/60"
                    )}
                    style={isActive ? { background: "linear-gradient(90deg, #A8C5F8, #F3C3E6)" } : {}}
                    title={item.label}
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-1">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {groupIndex > 0 && (
                  <div className="my-3 border-t border-gray-200" />
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        size="lg"
                        onClick={() => onPageChange(item.id)}
                        className={clsx(
                          "w-full justify-start gap-3 transition-colors rounded-lg",
                          isActive ? "text-white" : "text-[#3B2F2F] hover:bg-white/60"
                        )}
                        style={isActive ? { background: "linear-gradient(90deg, #A8C5F8, #F3C3E6)" } : {}}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

