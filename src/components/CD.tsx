import { motion } from "framer-motion";


const cdVariants = {
  default: {
    rotate: 0,
    y: 0,
    borderRadius: "9999px",
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  playing: {
    rotate: 360,
    y: 0,
    borderRadius: "9999px",
    scale: 1,
    transition: {
      rotate: { repeat: Infinity, ease: "linear", duration: 2 },
    },
  },
  stopped: {
    rotate: 0,
    y: 0,
    borderRadius: "9999px",
    scale: 0.95,
    transition: { duration: 0.5 },
  },
  movedDown: {
    rotate: 0,
    y: 18,
    borderRadius: "12px",
    scale: 0.98,
    transition: { duration: 0.45, ease: "easeInOut" },
  },
  secondaryStart: {
    rotate: 0,
    y: 0,
    borderRadius: "9999px",
    scale: 1.02,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CD({ variant = "default", onClick, isPlaying, albumSrc }) {
  return (
    <motion.div
      className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 cursor-pointer"
      onClick={onClick}
      animate={variant}
      variants={cdVariants}
      initial="default"
    >
      <motion.div
        className="w-full h-full rounded-full overflow-hidden shadow-inner border border-gray-700 relative bg-black"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}
      >
        <motion.img
          src={albumSrc}
          alt="album"
          className="w-full h-full object-cover"
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { rotate: { repeat: Infinity, ease: "linear", duration: 6 } } : { duration: 0.4 }}
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-6 h-6 bg-gray-900 rounded-full border border-gray-700" />
        </div>
      </motion.div>
    </motion.div>
  );
}
