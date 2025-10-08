import { motion } from "framer-motion";


function pad(num:number, len = 2) {
  return String(num).padStart(len, "0");
}

function Digit({ value }) {
  const translateY = -value * 24; 
  return (
    <div className="digit-slot w-4 text-xs text-white overflow-hidden">
      <motion.div
        className="digit-stack"
        animate={{ y: translateY }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {[0,1,2,3,4,5,6,7,8,9].map((d) => (
          <div key={d} style={{ height: 24 }} className="flex items-center justify-center">
            {d}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function NumberFlow({ currentTime = 0 }) {
  const mm = Math.floor(currentTime / 60);
  const ss = currentTime % 60;
  const mmStr = pad(mm);
  const ssStr = pad(ss);
  return (
    <div className="flex items-center gap-1">
      <Digit value={parseInt(mmStr[0])} />
      <Digit value={parseInt(mmStr[1])} />
      <div className="text-xs text-gray-500">:</div>
      <Digit value={parseInt(ssStr[0])} />
      <Digit value={parseInt(ssStr[1])} />
    </div>
  );
}
