import { motion } from "framer-motion";
import { Link } from "react-router";
import { TypewriterText } from "./typer-write-text";

const activities = [
  {
    title: "연애",
    description: "진정한 사랑을 찾아가는 여정을 함께합니다",
    icon: "💕",
    color: "from-pink-400 to-red-400",
    to: "/love",
    target: "연애에 대한 고민이 있는 청년들"
  },
  {
    title: "무색무취 매거진",
    description: "청년들의 진솔한 이야기를 담은 매거진",
    icon: "📖",
    color: "from-blue-400 to-purple-400",
    to: "/magazine",
    target: "글쓰기와 스토리텔링에 관심 있는 청년들"
  },
  {
    title: "북스테이 - 에세이캠프",
    description: "글쓰기를 통한 자기 발견과 성장의 여정",
    icon: "✍️",
    color: "from-green-400 to-teal-400",
    to: "/bookstay",
    target: "독서와 글쓰기를 통해 성장하고 싶은 청년들"
  }
];

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 메인 타이틀 */}
      <motion.div 
        className="text-center z-10 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <TypewriterText 
          text="Koi Creative Center" 
          className="text-4xl md:text-6xl font-bold mb-4 text-gray-900"
          delay={0.5}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <TypewriterText 
            text="코이 창작소"
            className="text-2xl md:text-3xl font-semibold mb-6 text-blue-600"
            delay={2.5}
          />
        </motion.div>
      </motion.div>

      {/* 우리에 대한 소개 */}
      <motion.div 
        className="text-center max-w-4xl mx-auto mb-8 px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.8 }}
        >
          <TypewriterText 
            text="왜 '코이'인가요?"
            className="text-lg md:text-xl font-semibold mb-3 text-gray-800"
            delay={4.2}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 0.8 }}
        >
          <TypewriterText 
            text="코이는 일본어로 '사랑'을 의미합니다. 우리는 청년들이 자신을 사랑하고, 타인을 사랑하며, 세상을 사랑할 수 있도록 돕고자 합니다."
            className="text-sm md:text-base text-gray-600 leading-relaxed mb-4"
            delay={5.2}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6.5, duration: 0.8 }}
        >
          <TypewriterText 
            text="우리의 방향성"
            className="text-lg md:text-xl font-semibold mb-3 text-gray-800"
            delay={6.7}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7.5, duration: 0.8 }}
        >
          <TypewriterText 
            text="진정한 성장은 혼자서는 불가능합니다. 우리는 청년들이 서로를 이해하고, 소통하며, 함께 성장할 수 있는 공간을 만들어갑니다."
            className="text-sm md:text-base text-gray-600 leading-relaxed"
            delay={7.7}
          />
        </motion.div>
      </motion.div>

      {/* 활동 카드들 */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 8.5, duration: 0.8 }}
      >
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 9 + index * 0.3,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className="group cursor-pointer"
          >
            <Link to={activity.to} className="block">
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-4 h-52 flex flex-col items-center justify-center text-center group-hover:shadow-2xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${activity.color} flex items-center justify-center mb-3`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.span 
                    className="text-xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {activity.icon}
                  </motion.span>
                </motion.div>
                
                <motion.h3 
                  className="text-base font-bold mb-2 group-hover:text-blue-600 transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 9.3 + index * 0.3 }}
                >
                  {activity.title}
                </motion.h3>
                
                <motion.p 
                  className="text-xs text-gray-600 leading-relaxed mb-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 9.5 + index * 0.3 }}
                >
                  {activity.description}
                </motion.p>

                <motion.div 
                  className="text-xs text-blue-500 font-medium"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 9.7 + index * 0.3 }}
                >
                  👥 {activity.target}
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* 배경 파티클 효과 */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
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
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>

      {/* 하단 인디케이터 */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 11, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 text-sm"
        >
          ↓ 스크롤하여 더 알아보기
        </motion.div>
      </motion.div>
    </section>
  );
}

