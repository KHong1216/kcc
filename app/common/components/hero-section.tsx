import { motion } from "framer-motion";
import { Link } from "react-router";
import { TypewriterText } from "./typer-write-text";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const activities = [
  {
    title: "연애",
    description: "연애를 잘하기 위하여선 나부터 알아야 건강한 연애가 가능하다",
    icon: "💕",
    color: "from-pink-400 to-red-400",
    to: "/camps/love",
    target: "건강한 연애를 원하는 청년들",
    badge: "HOT",
    badgeColor: "bg-pink-500",
    buttonText: "신청하기",
    gradient: "from-pink-50 via-rose-50 to-red-50"
  },
  {
    title: "사진",
    description: "사진을 통한 내외면의 아름다움을 가꿔가는 시간",
    icon: "📸",
    color: "from-blue-400 to-purple-400",
    to: "/camps/photo",
    target: "자신의 아름다움을 발견하고 싶은 청년들",
    badge: "BEST",
    badgeColor: "bg-blue-500",
    buttonText: "참여하기",
    gradient: "from-blue-50 via-indigo-50 to-purple-50"
  },
  {
    title: "에세이",
    description: "글을 통해서 나를 발견하고 찾아가는 시간",
    icon: "✍️",
    color: "from-green-400 to-teal-400",
    to: "/camps/essay",
    target: "글쓰기를 통해 성장하고 싶은 청년들",
    badge: "NEW",
    badgeColor: "bg-green-500",
    buttonText: "시작하기",
    gradient: "from-green-50 via-emerald-50 to-teal-50"
  }
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28">
      {/* 물결 패턴 배경 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* 메인 타이틀 */}
      <motion.div 
        className="text-center z-10 mb-8 sm:mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <TypewriterText 
          text="작은 물결이 큰 도약이 되는 창작소" 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-slate-800 leading-tight"
          delay={0.2}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <TypewriterText 
            text="코이창작소"
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 text-blue-600"
            delay={1.0}
          />
        </motion.div>
      </motion.div>

      {/* 코이창작소 소개 */}
      <motion.div 
        className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.0, duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 0.5 }}
        >
          <TypewriterText 
            text="탈광주 청년을 막기 위한 청년문화 공간을 만들기 위한 상담 스타트업"
            className="text-lg sm:text-xl font-semibold mb-4 text-slate-700"
            delay={3.5}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.0, duration: 0.5 }}
        >
          <TypewriterText 
            text="다양한 청년들의 의견을 듣고 모집해서 청년 이해 관계 센터 설립"
            className="text-base sm:text-lg text-slate-600 mb-4"
            delay={5.2}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7.0, duration: 0.5 }}
        >
          <TypewriterText 
            text="코이 = 사랑"
            className="text-base sm:text-lg text-blue-600 font-medium mb-3"
            delay={7.2}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8.5, duration: 0.5 }}
        >
          <TypewriterText 
            text="코이 물고기는 환경에 따라 성장크기가 달라지는 특징을 가지고 있습니다"
            className="text-sm sm:text-base text-slate-600 mb-3"
            delay={8.7}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 10.0, duration: 0.5 }}
        >
          <TypewriterText 
            text="청년들이 각자의 가능성을 발견하고 성장해 나가는 과정을 담았습니다"
            className="text-sm sm:text-base text-slate-600 leading-relaxed"
            delay={10.2}
          />
        </motion.div>
      </motion.div>

      {/* 핵심 메시지 섹션 */}
      <motion.div 
        className="max-w-5xl mx-auto mb-8 sm:mb-12 px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 12.0, duration: 0.5 }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌊</span>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-slate-800">청년의 성장을 돕는 공간</h3>
            <p className="text-sm text-slate-600">
              마치 코이가 흐름을 거슬러 도약하듯, 청년들이 어려움을 뚫고 성장할 수 있도록 지원합니다.
            </p>
          </Card>
          
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-slate-800">도전과 창의의 상징</h3>
            <p className="text-sm text-slate-600">
              실패를 두려워하지 않고 자유롭게 시도하며, 자신만의 이야기를 만들어가는 터전입니다.
            </p>
          </Card>
          
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-slate-800">공동체적 가치</h3>
            <p className="text-sm text-slate-600">
              혼자가 아니라 함께 꿈꾸고 함께 나아가는 청년들의 커뮤니티입니다.
            </p>
          </Card>
        </div>
      </motion.div>

      {/* 코이 프로젝트 카드들 */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 14.0, duration: 0.5 }}
      >
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: 14.3 + index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="group cursor-pointer h-full"
          >
            <Link to={activity.to} className="block h-full">
              <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 group h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg`}>
                <div className="relative">
                  <div className={`w-full h-48 bg-gradient-to-br ${activity.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white"></div>
                      <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white"></div>
                      <div className="absolute bottom-6 left-8 w-8 h-8 rounded-full bg-white"></div>
                    </div>
                    
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <motion.div 
                        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r ${activity.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.span 
                          className="text-3xl sm:text-4xl"
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        >
                          {activity.icon}
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>
                  <Badge className={`absolute top-4 left-4 ${activity.badgeColor} shadow-md`}>
                    {activity.badge}
                  </Badge>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <CardTitle className="text-xl mb-2 text-slate-800">{activity.title}</CardTitle>
                  <CardDescription className="mb-4 text-sm text-slate-600 leading-relaxed flex-grow">
                    {activity.description}
                  </CardDescription>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-sm text-slate-500 font-medium">
                      👥 {activity.target}
                    </span>
                    <Button size="sm" className={`bg-gradient-to-r ${activity.color} hover:opacity-90 text-white border-0`}>
                      {activity.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* 하단 인디케이터 */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-slate-400 text-sm text-center"
        >
          ↓ 아래로 스크롤하여 더 보기
        </motion.div>
      </motion.div>
    </section>
  );
}