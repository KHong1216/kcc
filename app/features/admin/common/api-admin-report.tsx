import OpenAI from "openai";
import { getAllReservations, type Reservation } from "../reservation/queries";
import type { Route } from "./+types/api-admin-report";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function action({ request }: Route.ActionArgs) {
  try {
    // 예약 데이터 가져오기
    const reservationsResult = await getAllReservations();
    const reservations = reservationsResult.data || [];

    // 오늘 날짜 기준 필터링
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayReservations = reservations.filter((r: Reservation) => {
      const createdDate = new Date(r.created_at);
      createdDate.setHours(0, 0, 0, 0);
      return createdDate.getTime() === today.getTime();
    });

    // 통계 계산
    const statistics = {
      total: reservations.length,
      today: todayReservations.length,
      byProgram: reservations.reduce((acc: Record<string, number>, r: Reservation) => {
        acc[r.program_id] = (acc[r.program_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byStatus: reservations.reduce((acc: Record<string, number>, r: Reservation) => {
        acc[r.status] = (acc[r.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };

    // AI 리포트 생성
    const reportPrompt = `다음은 코이창작소의 예약 현황 데이터입니다:

전체 예약: ${statistics.total}건
오늘 신청: ${statistics.today}건

프로그램별 통계:
${Object.entries(statistics.byProgram).map(([program, count]) => 
  `- ${program}: ${count}건`
).join('\n')}

상태별 통계:
${Object.entries(statistics.byStatus).map(([status, count]) => 
  `- ${status}: ${count}건`
).join('\n')}

오늘 신청된 예약 상세:
${todayReservations.slice(0, 10).map((r: Reservation) =>
  `- ${r.user_name} (${r.program_id}, ${r.status})`
).join('\n')}

위 데이터를 바탕으로 다음 형식의 JSON을 생성하세요:
{
  "summary": "오늘의 예약 현황을 2-3문장으로 요약",
  "insights": ["인사이트 1", "인사이트 2", "인사이트 3"],
  "recommendations": ["추천사항 1", "추천사항 2"]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "당신은 데이터 분석 전문가입니다. 예약 현황을 분석하고 인사이트와 추천사항을 제공합니다."
        },
        {
          role: "user",
          content: reportPrompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const aiResponse = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return Response.json({
      success: true,
      report: {
        summary: aiResponse.summary || "",
        insights: aiResponse.insights || [],
        recommendations: aiResponse.recommendations || [],
      },
      statistics
    });
  } catch (error: any) {
    console.error("Report generation error:", error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}