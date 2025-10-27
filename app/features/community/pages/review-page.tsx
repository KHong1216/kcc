import type { MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";
import { Star, Calendar, User, Heart } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "리뷰 - 코이창작소" },
    { name: "description", content: "코이창작소 프로그램 참여자들의 생생한 후기" }
  ];
};

const reviews = [
  {
    id: 1,
    author: "김민지",
    program: "연애",
    rating: 5,
    title: "정말 유익한 시간이었어요!",
    content: "연애에 대해 다시 생각해볼 수 있는 시간이었습니다. 강사님이 정말 친절하시고 실질적인 조언을 많이 해주셨어요. 덕분에 현재 연인과의 관계가 더 좋아졌습니다.",
    date: "2024-11-30",
    likes: 12,
    isVerified: true
  },
  {
    id: 2,
    author: "박서준",
    program: "사진",
    rating: 5,
    title: "자신감이 생겼어요",
    content: "사진을 통해 나를 다시 바라보는 시간이었습니다. 처음엔 부끄러웠지만 점점 자신감이 생기더라고요. 결과물도 정말 만족스러웠습니다!",
    date: "2024-11-28",
    likes: 8,
    isVerified: true
  },
  {
    id: 3,
    author: "이하늘",
    program: "에세이",
    rating: 4,
    title: "글쓰기의 즐거움을 알게 되었어요",
    content: "글쓰기가 이렇게 재미있을 줄 몰랐어요. 나의 이야기를 글로 풀어내는 과정이 정말 힐링이었습니다. 계속 참여하고 싶어요!",
    date: "2024-11-25",
    likes: 15,
    isVerified: false
  }
];

export default function ReviewPage() {
  return (
    <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gray-50">
      {/* 헤더 섹션 */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            참여자 리뷰
          </h1>
          <p className="text-lg text-gray-600">
            코이창작소 프로그램 참여자들의 생생한 후기를 확인하세요
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{review.author}</span>
                        {review.isVerified && (
                          <Badge variant="secondary" className="text-xs">인증</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{review.program}</Badge>
                </div>
                <CardTitle className="text-lg text-gray-900 mb-2">
                  {review.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {review.content}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{review.likes}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    도움됨
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}