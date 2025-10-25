import { motion } from "framer-motion";
import { TypewriterText } from "./typer-write-text";

export function HomeHero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center z-10 max-w-4xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <TypewriterText
                        text="Koi Creative Center"
                        className="text-6xl md:text-8xl font-bold mb-6 text-gray-900"
                        delay={0.5}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.8 }}
                >
                    <TypewriterText
                        text="청년들이 자신의 길을 찾고, 더 넓은 세상 속에서 가능성을 발견할 수 있도록 돕는 청년 성장 플랫폼입니다."
                        className="text-xl md:text-2xl text-gray-600 leading-relaxed"
                        delay={2.5}
                    />
                </motion.div>
            </div>

            {/* 배경 파티클 효과 */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
            >
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </motion.div>
        </section>
    );
}