import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/common/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/common/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"
import { CHART_COLORS } from "./types"

interface Step5CompleteProps {
  participantCount: number
  chartData: Array<{ name: string; value: number; fill: string }>
}

export default function Step5Complete({ participantCount, chartData }: Step5CompleteProps) {
  const chartConfig = chartData.reduce((acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: item.fill
    }
    return acc
  }, {} as Record<string, { label: string; color: string }>)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white pt-20 pb-12 px-4 sm:pt-24">
      <div className="max-w-3xl mx-auto">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center space-y-4">
            <div className="text-4xl mb-4">🎉</div>
            <CardTitle className="text-2xl">참여해 주셔서 감사합니다!</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              이번 감정 연구는 총 {participantCount}명 참여 중입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 통계 차트 */}
            {chartData.length > 0 && (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-center text-[#3A556A]">
                  현재까지의 감정 분포 통계
                </h3>
                <div className="flex items-center justify-center">
                  <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-[300px]">
                    <PieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, value }) => {
                          const total = chartData.reduce((sum, item) => sum + item.value, 0)
                          const percentage = total > 0 ? Math.round((value / total) * 100) : 0
                          return `${name} ${percentage}%`
                        }}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                </div>
              </div>
            )}

            <p className="text-sm text-[#3A556A] opacity-80 text-center">
              당첨되신 분께는 개별 연락을 드립니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

