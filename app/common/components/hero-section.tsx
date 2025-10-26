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
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28">
      {/* 메인 타이틀 */}
      <motion.div 
        className="text-center z-10 mb-4 sm:mb-6 lg:mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <TypewriterText 
          text="작은 물결이 큰 도약이 되는 창작소" 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 text-gray-900 leading-tight"
          delay={0.2}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <TypewriterText 
            text="코이창작소"
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-blue-600"
            delay={1.0}
          />
        </motion.div>
      </motion.div>

      {/* 우리에 대한 소개 */}
      <motion.div 
        className="text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mb-4 sm:mb-6 lg:mb-8 px-4 sm:px-6"
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
            className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 text-gray-800"
            delay={3.5}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.0, duration: 0.5 }}
        >
          <TypewriterText 
            text="코이 = 사랑"
            className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-2 sm:mb-3 lg:mb-4"
            delay={5.2}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7.5, duration: 0.5 }}
        >
          <TypewriterText 
            text="코이 물고기는 환경에 따라 성장크기가 달라지는 특징을 가지고 있습니다"
            className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-2 sm:mb-3 lg:mb-4"
            delay={7.7}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8.0, duration: 0.5 }}
        >
          <TypewriterText 
            text="청년들이 각자의 가능성을 발견하고 성장해 나가는 과정을 담았습니다"
            className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed"
            delay={8.2}
          />
        </motion.div>
      </motion.div>

      {/* 코이 프로젝트 카드들 - 높이 통일 */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-xs sm:max-w-2xl lg:max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 lg:mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 10.0, duration: 0.5 }}
      >
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: 10.3 + index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="group cursor-pointer h-full"
          >
            <Link to={activity.to} className="block h-full">
              <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 group h-full bg-gradient-to-br ${activity.gradient} border-0 flex flex-col`}>
                <div className="relative">
                  {/* 더 예쁜 배경 디자인 */}
                  <div className={`w-full h-48 bg-gradient-to-br ${activity.gradient} relative overflow-hidden`}>
                    {/* 배경 패턴 */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/20"></div>
                      <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/15"></div>
                      <div className="absolute bottom-6 left-8 w-12 h-12 rounded-full bg-white/10"></div>
                      <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-white/20"></div>
                    </div>
                    
                    {/* 아이콘 */}
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
                  <CardTitle className="text-xl mb-2 text-gray-800">{activity.title}</CardTitle>
                  <CardDescription className="mb-4 text-sm text-gray-600 leading-relaxed flex-grow">
                    {activity.description}
                  </CardDescription>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-sm text-gray-500 font-medium">
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

      {/* 배경 파티클 효과 */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* 하단 인디케이터 */}
      <motion.div 
        className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-400 text-xs sm:text-sm text-center"
        >
          ↓ 아래로 스크롤하여 더 보기
        </motion.div>
      </motion.div>
    </section>
  );
}