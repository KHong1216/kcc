import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const activities = [
  {
    title: "연애",
    description: "진정한 사랑을 찾아가는 여정을 함께합니다",
    icon: "💕",
    color: "from-pink-400 to-red-400",
    to: "/love"
  },
  {
    title: "무색무취 매거진",
    description: "청년들의 진솔한 이야기를 담은 매거진",
    icon: "📖",
    color: "from-blue-400 to-purple-400",
    to: "/magazine"
  },
  {
    title: "북스테이 - 에세이캠프",
    description: "글쓰기를 통한 자기 발견과 성장의 여정",
    icon: "✍️",
    color: "from-green-400 to-teal-400",
    to: "/bookstay"
  }
];

export function HomeCard() {
  return (
    <section className="py-20 px-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          우리의 활동
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
            >
              <Card className="h-full overflow-hidden border-0 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <motion.div 
                  className={`h-32 bg-gradient-to-r ${activity.color} flex items-center justify-center`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span 
                    className="text-4xl"
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
                
                <CardHeader>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {activity.title}
                    </CardTitle>
                  </motion.div>
                </CardHeader>
                
                <CardContent>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {activity.description}
                    </CardDescription>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}