import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TypewriterText({ text, className = "", delay = 0 }: TypewriterTextProps) {
  const words = text.split(" ");
  
  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: "easeOut"
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}