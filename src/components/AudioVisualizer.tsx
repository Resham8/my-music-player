import { motion } from "framer-motion";

const barVariants = {
  idle: { scaleY: 0.25, transition: { duration: 0.7, repeat: Infinity, repeatType: "reverse" } },
  active: (i) => ({
    scaleY: [0.2, 1, 0.3],
    transition: { duration: 0.7 + (i * 0.2), ease: "easeInOut", repeat: Infinity },
  }),
};

export default function AudioVisualizer({ isPlaying }) {
  const bars = [0, 1, 2, 3, 4];
  return (
    <div className="w-full h-12 flex items-end gap-2 px-2">
      {bars.map((b, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm"
          style={{ transformOrigin: "bottom" }}
          variants={barVariants}
          animate={isPlaying ? "active" : "idle"}
          custom={i}
        >
          <div className="w-full h-full bg-gradient-to-t from-indigo-500 to-pink-500 rounded-sm" />
        </motion.div>
      ))}
    </div>
  );
}
