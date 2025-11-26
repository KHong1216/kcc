import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Users, Calendar, MessageSquare, Heart, FolderOpen, Sparkles } from "lucide-react";

interface StatsCardsProps {
  stats: {
    activeManagerCount: number;
    inactiveManagerCount: number;
    reservationCount: number;
    communityCount: number;
    contactCount: number;
    testCount: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const statItems = [
    {
      title: "예약",
      value: stats.reservationCount,
      icon: Calendar,
      gradient: "linear-gradient(90deg, #A8C5F8, #F3C3E6)",
      bgGradient: "linear-gradient(180deg, #FFFFFF, #FFF7F5)",
    },
    {
      title: "문의",
      value: stats.contactCount,
      icon: MessageSquare,
      gradient: "linear-gradient(90deg, #F3C3E6, #FFE6C5)",
      bgGradient: "linear-gradient(180deg, #FFFFFF, #FFF7F5)",
    },
    {
      title: "커뮤니티",
      value: stats.communityCount,
      icon: Heart,
      gradient: "linear-gradient(90deg, #FFE6C5, #A8C5F8)",
      bgGradient: "linear-gradient(180deg, #FFFFFF, #FFF7F5)",
    },
    {
      title: "테스트",
      value: stats.testCount,
      icon: Sparkles,
      gradient: "linear-gradient(90deg, #A8C5F8, #FFE6C5)",
      bgGradient: "linear-gradient(180deg, #FFFFFF, #FFF7F5)",
    },
    {
      title: "매니저",
      value: `${stats.activeManagerCount} / ${stats.inactiveManagerCount}`,
      subtitle: "활성 / 비활성",
      icon: Users,
      gradient: "linear-gradient(90deg, #F3C3E6, #A8C5F8)",
      bgGradient: "linear-gradient(180deg, #FFFFFF, #FFF7F5)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.title}
            className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: item.gradient }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#7A6666] opacity-80 font-medium">{item.title}</p>
                    <p className="text-2xl font-extrabold text-[#3B2F2F]">
                      {typeof item.value === 'string' ? item.value : item.value.toLocaleString()}
                    </p>
                    {item.subtitle && (
                      <p className="text-xs text-[#7A6666] opacity-60 mt-0.5">{item.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

