import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Sparkles, Clock, Heart } from "lucide-react";

const TARGET_TIME = 5.55;

interface GameResult {
  time: number;
  accuracy: number;
  message: string;
  description: string;
  programLink: string;
  programName: string;
}

function getResult(time: number): GameResult {
  const diff = Math.abs(time - TARGET_TIME);
  const maxError = TARGET_TIME * 0.5;
  const accuracy = Math.max(0, Math.min(100, (1 - diff / maxError) * 100));
  
  if (diff === 0) {
    return {
      time,
      accuracy: 100,
      message: "완벽한 감각! ✨",
      description: "당신의 감각은 정말 놀랍습니다. 이런 섬세함은 당신만의 특별한 재능이에요.",
      programLink: "/join",
      programName: "프로그램 신청하기"
    };
  } else if (accuracy >= 95) {
    return {
      time,
      accuracy: Math.round(accuracy),
      message: "매우 섬세한 감각! 🌟",
      description: "당신은 자신의 감정과 순간을 잘 느끼는 사람이에요. 이런 감각을 더 깊이 탐구해보면 어떨까요?",
      programLink: "/join",
      programName: "프로그램 신청하기"
    };
  } else if (accuracy >= 85) {
    return {
      time,
      accuracy: Math.round(accuracy),
      message: "좋은 감각이에요! 💫",
      description: "당신의 감각은 이미 충분히 섬세합니다. 조금만 더 깊이 들어가면 더 많은 것을 발견할 수 있어요.",
      programLink: "/join",
      programName: "프로그램 신청하기"
    };
  } else if (accuracy >= 70) {
    return {
      time,
      accuracy: Math.round(accuracy),
      message: "괜찮은 감각이에요! 🌈",
      description: "당신의 감각을 더 깊이 탐구해볼 시간이에요. 자신을 더 잘 알아가는 여정을 시작해보세요.",
      programLink: "/join",
      programName: "프로그램 신청하기"
    };
  } else {
    return {
      time,
      accuracy: Math.round(accuracy),
      message: "감각을 키워볼 시간! 🌱",
      description: "지금은 조금 어색할 수 있지만, 연습하면 더 섬세해질 수 있어요. 자신을 탐구하는 여정을 함께해요.",
      programLink: "/join",
      programName: "프로그램 신청하기"
    };
  }
}

type TimeGameState = 'intro' | 'waiting' | 'playing' | 'result';

interface TimeGameProps {
  onBack: () => void;
}

export function TimeGame({ onBack }: TimeGameProps) {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<TimeGameState>('intro');
  const [startTime, setStartTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [result, setResult] = useState<GameResult | null>(null);

  const handleStop = useCallback(() => {
    if (gameState === 'playing' && startTime > 0) {
      const elapsed = (Date.now() - startTime) / 1000;
      const gameResult = getResult(elapsed);
      setResult(gameResult);
      setGameState('result');
    }
  }, [gameState, startTime]);

  // playing 상태일 때 최상위 div에 클릭 이벤트를 추가하기 위한 ref
  useEffect(() => {
    if (gameState === 'playing') {
      const handleClick = () => handleStop();
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [gameState, handleStop]);

  useEffect(() => {
    let animationFrame: number;
    
    if (gameState === 'playing' && startTime > 0) {
      const updateTime = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        setCurrentTime(elapsed);
        animationFrame = requestAnimationFrame(updateTime);
      };
      animationFrame = requestAnimationFrame(updateTime);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [gameState, startTime]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.key === ' ') {
        event.preventDefault();
        handleStop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, startTime, handleStop]);

  const handleStart = () => {
    setGameState('waiting');
    setTimeout(() => {
      setGameState('playing');
      setStartTime(Date.now());
      setCurrentTime(0);
    }, Math.random() * 2000 + 1000);
  };

  const handleRetry = () => {
    setGameState('intro');
    setStartTime(0);
    setCurrentTime(0);
    setResult(null);
  };

  return (
    <>
      {gameState === 'intro' && (
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}>
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
              "지금 이 순간, 당신의 감각은 얼마나 섬세할까요?"
            </h1>
            <p className="text-xl md:text-2xl text-[#3B2F2F]/85 font-medium" style={{ lineHeight: '1.6' }}>
              {TARGET_TIME}초를 눌러서 당신의 감정을 측정해보세요.
            </p>
          </div>

          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] mt-12">
            <CardContent className="p-8">
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#A8C5F8' }} />
                  <div>
                    <p className="font-semibold text-[#3B2F2F] mb-1">게임 방법</p>
                    <p className="text-[#3B2F2F]/85 text-sm" style={{ lineHeight: '1.6' }}>
                      시작 버튼을 누르면 잠시 후 게임이 시작됩니다. 정확히 {TARGET_TIME}초가 지났다고 생각되는 순간 아무 곳이나 클릭하거나 스페이스바를 눌러주세요.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#F3C3E6' }} />
                  <div>
                    <p className="font-semibold text-[#3B2F2F] mb-1">결과 확인</p>
                    <p className="text-[#3B2F2F]/85 text-sm" style={{ lineHeight: '1.6' }}>
                      당신의 감각 정확도에 따라 결과가 표시됩니다. 결과를 확인하고 나만의 여정을 시작해보세요.
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
              style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
            >
              <Clock className="w-5 h-5 mr-2" />
              시작하기
            </Button>
          </div>
        </div>
      )}

      {gameState === 'waiting' && (
        <div className="text-center space-y-8 animate-in fade-in">
          <div className="space-y-6">
            <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ background: 'linear-gradient(135deg, #A8C5F8, #F3C3E6)' }}>
              <Clock className="w-16 h-16 text-white animate-spin" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
              준비하세요...
            </h2>
            <p className="text-xl text-[#3B2F2F]/85" style={{ lineHeight: '1.6' }}>
              곧 시작됩니다
            </p>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="text-center space-y-8 animate-in fade-in">
          <div className="space-y-6">
            <div className="w-48 h-48 mx-auto rounded-full flex items-center justify-center shadow-lg relative" style={{ background: 'linear-gradient(135deg, #A8C5F8, #F3C3E6)' }}>
              <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
              <div className="text-center z-10">
                <div className="text-6xl md:text-7xl font-extrabold text-white mb-2">
                  {currentTime.toFixed(2)}
                </div>
                <div className="text-white/80 text-sm">초</div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
              {TARGET_TIME}초가 되었다고 생각되면 아무 곳이나 클릭하거나 스페이스바를 눌러주세요!
            </h2>
            <p className="text-lg text-[#3B2F2F]/70 mt-4" style={{ lineHeight: '1.6' }}>
              화면 어디를 클릭해도, 또는 스페이스바를 눌러도 됩니다
            </p>
          </div>
        </div>
      )}

      {gameState === 'result' && result && (
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)]">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #A8C5F8, #F3C3E6)' }}>
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F] mb-4" style={{ lineHeight: '1.6' }}>
                    {result.message}
                  </h2>
                  <div className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#A8C5F8' }}>
                    {result.time.toFixed(2)}초
                  </div>
                  <div className="text-lg text-[#7A6666] opacity-80 mb-6">
                    정확도: {result.accuracy}%
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
                  <p className="text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.6' }}>
                    {result.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <Button
                    size="lg"
                    onClick={() => navigate(result.programLink)}
                    className="w-full text-white text-lg px-8 py-6 font-semibold shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300 rounded-xl"
                    style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    {result.programName}
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

