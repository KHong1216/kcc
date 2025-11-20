import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Sparkles, Gamepad2 } from "lucide-react";

const WORD_PAIRS = [
  { left: "여유", right: "불안" },
  { left: "성장", right: "쉼" },
  { left: "혼자", right: "함께" },
  { left: "시작", right: "멈춤" },
  { left: "웃음", right: "피곤" },
];

type WordGameState = 'intro' | 'playing' | 'result';

interface WordGameProps {
  onBack: () => void;
}

export function WordGame({ onBack }: WordGameProps) {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<WordGameState>('intro');
  const [currentWordPair, setCurrentWordPair] = useState<{ left: string; right: string } | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const handleStart = () => {
    const randomPair = WORD_PAIRS[Math.floor(Math.random() * WORD_PAIRS.length)];
    setCurrentWordPair(randomPair);
    setGameState('playing');
    setSelectedWord(null);
  };

  const handleWordSelect = (word: string) => {
    setSelectedWord(word);
    setGameState('result');
  };

  const handleRetry = () => {
    setGameState('intro');
    setCurrentWordPair(null);
    setSelectedWord(null);
  };

  return (
    <>
      {gameState === 'intro' && (
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #F3C3E6, #FFE6C5)' }}>
              <Gamepad2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
              "둘 중에 지금 나랑 더 가까운 단어는?"
            </h1>
            <p className="text-xl md:text-2xl text-[#3B2F2F]/85 font-medium" style={{ lineHeight: '1.6' }}>
              화면에 두 단어가 나타나면 하나를 선택해주세요
            </p>
          </div>

          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] mt-12">
            <CardContent className="p-8">
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Gamepad2 className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#F3C3E6' }} />
                  <div>
                    <p className="font-semibold text-[#3B2F2F] mb-1">게임 방법</p>
                    <p className="text-[#3B2F2F]/85 text-sm" style={{ lineHeight: '1.6' }}>
                      시작 버튼을 누르면 두 단어가 화면에 나타납니다. 지금 당신과 더 가까운 단어를 선택해주세요.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={onBack}
              className="border-2 border-[#FADADD] text-[#3B2F2F] hover:bg-[#E8F4FB] transition-all rounded-xl"
            >
              뒤로가기
            </Button>
            <Button
              size="lg"
              onClick={handleStart}
              className="text-white text-lg px-12 py-6 font-semibold shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300 rounded-xl"
              style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              시작하기
            </Button>
          </div>
        </div>
      )}

      {gameState === 'playing' && currentWordPair && (
        <div className="text-center space-y-8 animate-in fade-in">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F] mb-8" style={{ lineHeight: '1.6' }}>
            둘 중에 지금 나랑 더 가까운 단어는?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => handleWordSelect(currentWordPair.left)}
              className="w-full sm:w-64 h-64 rounded-2xl border-4 border-[#FADADD]/50 shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300 text-4xl font-bold text-[#3B2F2F] hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #A8C5F8, #E8F4FB)' }}
            >
              {currentWordPair.left}
            </button>
            
            <div className="text-3xl font-bold text-[#3B2F2F]/50">🆚</div>
            
            <button
              onClick={() => handleWordSelect(currentWordPair.right)}
              className="w-full sm:w-64 h-64 rounded-2xl border-4 border-[#FADADD]/50 shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300 text-4xl font-bold text-[#3B2F2F] hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #F3C3E6, #FFF0F5)' }}
            >
              {currentWordPair.right}
            </button>
          </div>
        </div>
      )}

      {gameState === 'result' && selectedWord && currentWordPair && (
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)]">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #F3C3E6, #FFE6C5)' }}>
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F] mb-4" style={{ lineHeight: '1.6' }}>
                    요즘 '{selectedWord}'을 선택한 당신,
                  </h2>
                  <p className="text-xl md:text-2xl text-[#3B2F2F]/85 mb-6" style={{ lineHeight: '1.6' }}>
                    당신의 이야기를 코이에서 기록하고 싶어요 :)
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <Button
                    size="lg"
                    onClick={() => navigate('/join')}
                    className="w-full text-white text-lg px-8 py-6 font-semibold shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300 rounded-xl"
                    style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}
                  >
                    🎁 굿즈 / 체험 신청하기
                  </Button>
                  
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={onBack}
                      className="flex-1 border-2 border-[#FADADD] text-[#3B2F2F] hover:bg-[#E8F4FB] transition-all rounded-xl"
                    >
                      게임 선택
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleRetry}
                      className="flex-1 border-2 border-[#FADADD] text-[#3B2F2F] hover:bg-[#E8F4FB] transition-all rounded-xl"
                    >
                      다시 해보기
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}


























