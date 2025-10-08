import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CD from "./CD";
import NumberFlow from "./NumberFlow";
import AudioVisualizer from "./AudioVisualizer";


const variants = {
  container: {
    default: { scale: 1 },
  },
};

export default function Player() {
  const [state, setState] = useState("default");
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0); 
  const duration = 178; 

  useEffect(() => {
    let interval = null;
    if (state === "playing") {
      setIsPlaying(true);
      interval = setInterval(() => {
        setTime((t) => {
          if (t >= duration) {
            clearInterval(interval);
            setState("stopped");
            return duration;
          }
          return t + 1;
        });
      }, 1000);
    } else {
      setIsPlaying(false);
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    let t;
    if (state === "secondaryStart") {
      t = setTimeout(() => setState("playing"), 700); 
    }
    return () => clearTimeout(t);
  }, [state]);

  function handleCDClick() {
    switch (state) {
      case "default":
        setState("playing");
        break;
      case "playing":
        setState("stopped");
        break;
      case "stopped":
        setState("movedDown");
        break;
      case "movedDown":
        setState("secondaryStart");
        break;
      case "secondaryStart":
        setState("playing");
        break;
      default:
        setState("playing");
    }
  }

  function reset() {
    setTime(0);
    setState("default");
  }

  return (
    <motion.div
      className="w-[360px] md:w-[420px] bg-[#0f1724] rounded-2xl p-5 shadow-2xl border border-gray-800"
      variants={variants}
      animate={{}}
    >
      <div className="flex items-center gap-4">
        <CD
          variant={state}
          onClick={handleCDClick}
          isPlaying={isPlaying}
          albumSrc="https://images.unsplash.com/photo-1526404425899-87a7a58f7e3f?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&s=6f2b2442b4b8ac55b2b2a9d5b6b1b9f5"
        />
        <div className="flex-1">
          <div className="text-white text-lg font-semibold">Lorde — Melodrama</div>
          <div className={`text-sm text-gray-400 mt-1 ${state === "stopped" ? "scale-95 blur-sm" : ""}`}>
            Green Light
          </div>
          <div className="mt-3 flex items-center gap-3">
            <NumberFlow currentTime={time} />
            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={() => setState((s) => (s === "playing" ? "stopped" : "playing"))}
                className="px-3 py-1 rounded-md bg-gray-800 text-sm text-white"
              >
                {state === "playing" ? "Pause" : "Play"}
              </button>
              <button
                onClick={reset}
                className="px-2 py-1 rounded-md bg-gray-800 text-sm text-white"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-gradient-to-b from-transparent to-gray-900 rounded-xl p-4">
          <AudioVisualizer isPlaying={isPlaying} />
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Click the disc to cycle states: <span className="text-white">default → playing → stopped → movedDown → secondaryStart → playing</span>
      </div>
    </motion.div>
  );
}
