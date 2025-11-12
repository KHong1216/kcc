import { useState } from "react";
import type { MetaFunction } from "react-router";
import { Card, CardContent } from "../../../../common/components/ui/card";
import { Sparkles, Clock, Gamepad2 } from "lucide-react";
import { TimeGame } from "../components/time-game";
import { WordGame } from "../components/word-game";

const TARGET_TIME = 5.55;

export const meta: MetaFunction = () => [
  { title: `${TARGET_TIME}초 맞추기 - 당신의 감각을 측정해보세요 | 코이창작소` },
  { name: "description", content: `지금 이 순간, 당신의 감각은 얼마나 섬세할까요? ${TARGET_TIME}초를 눌러서 당신의 감정을 측정해보세요.` },
  { name: "robots", content: "noindex, nofollow" }
];

type GameType = 'time' | 'word';

export default function EasterEggPage() {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

  const handleBackToSelection = () => {
    setSelectedGame(null);
  };

  return (
    <div 
      className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F] relative overflow-hidden"
      style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ backgroundColor: '#A8C5F8' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" style={{ backgroundColor: '#F3C3E6' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" style={{ backgroundColor: '#FFE6C5' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        {/* 게임 선택 탭 */}
        {selectedGame === null && (
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}>
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                게임을 선택해주세요
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <Card 
                className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] cursor-pointer hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all"
                onClick={() => setSelectedGame('time')}
              >
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #A8C5F8, #F3C3E6)' }}>
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#3B2F2F]">1번 게임</h2>
                    <p className="text-lg text-[#3B2F2F]/85" style={{ lineHeight: '1.6' }}>
                      {TARGET_TIME}초 맞추기
                    </p>
                    <p className="text-sm text-[#3B2F2F]/70" style={{ lineHeight: '1.6' }}>
                      당신의 감각을 측정해보세요
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] cursor-pointer hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all"
                onClick={() => setSelectedGame('word')}
              >
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #F3C3E6, #FFE6C5)' }}>
                      <Gamepad2 className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#3B2F2F]">2번 게임</h2>
                    <p className="text-lg text-[#3B2F2F]/85" style={{ lineHeight: '1.6' }}>
                      단어 선택하기
                    </p>
                    <p className="text-sm text-[#3B2F2F]/70" style={{ lineHeight: '1.6' }}>
                      지금 나와 더 가까운 단어는?
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* 게임 컴포넌트 로드 */}
        {selectedGame === 'time' && <TimeGame onBack={handleBackToSelection} />}
        {selectedGame === 'word' && <WordGame onBack={handleBackToSelection} />}
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

