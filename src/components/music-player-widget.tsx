import { motion, type Variants } from "framer-motion";
import { cn } from "../lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";


type PlayerState =
  | "starting"
  | "playing"
  | "stopped"
  | "movedDown"
  | "starting2";

interface MusicPlayerWidgetProps {
  className?: string;
  initialState?: PlayerState;
  title?: string;
  artist?: string;
  album?: string;
  current?: string;
  total?: string;
  artworkSrc?: string;
  holeSrc?: string; 
}


export function MusicPlayerWidget({
  className,
  initialState = "starting",
  title = "Sober II (Melodrama)",
  artist = "Lorde",
  album = "—",
  current = "1:58",
  total = "2:58",
  artworkSrc = "https://framerusercontent.com/images/NQPhihM1R2aMeK6u99BFv9WXTI.jpg",
  holeSrc = "https://framerusercontent.com/images/nsrPYVTZMStiAxlUIkLPdy4uVI.png",
}: MusicPlayerWidgetProps) {
  const [state, setState] = useState<PlayerState>(initialState);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(178);

  const formatTime = useCallback((secs?: number) => {
    if (secs == null || Number.isNaN(secs)) return "";
    const s = Math.max(0, Math.floor(secs));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    if (state === "starting") {
      const t = setTimeout(() => setState("playing"), 600);
      return () => clearTimeout(t);
    }
    if (state === "starting2") {
      const t = setTimeout(() => setState("playing"), 600);
      return () => clearTimeout(t);
    }
  }, [state]);

  const onClick = () => {
    if (!userInteracted) setUserInteracted(true);
    setState((s) => {
      if (s === "playing") return "stopped";
      if (s === "stopped") return "movedDown";
      if (s === "movedDown") return "starting2";
      return s;
    });
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onLoaded = () => setDuration(el.duration || 0);
    const onTime = () => setCurrentTime(el.currentTime || 0);
    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("timeupdate", onTime);
    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("timeupdate", onTime);
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (state === "playing" && userInteracted) {
      el.play().catch(() => {
      });
    } else {
      el.pause();
    }
  }, [state, userInteracted]);

  const viewportVariants: Variants = {
    starting: {
      height: 130,
      transition: { type: "spring", stiffness: 220, damping: 24 },
    },
    playing: {
      height: 130,
      transition: { type: "spring", stiffness: 220, damping: 24 },
    },
    stopped: {
      height: 130,
      transition: { type: "spring", stiffness: 220, damping: 24 },
    },
    movedDown: { height: 260, transition: { duration: 0.6 } },
    starting2: { height: 130, transition: { duration: 0.6 } },
  };

  const cdVariants: Variants = {
    starting: {
      y: -130,
      borderRadius: 999,
      rotate: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 220, damping: 24 },
    },
    playing: {
      y: -130,
      borderRadius: 999,
      rotate: 360,
      transition: {
        ease: "linear",
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
    stopped: {
      y: -130,
      borderRadius: 999,
      rotate: 0,
      transition: { duration: 0.6 },
    },
    movedDown: {
      y: 0,
      borderRadius: 28,
      rotate: 0,
      transition: { duration: 0.6 },
    },
    starting2: {
      y: -130,
      borderRadius: 999,
      rotate: 0,
      transition: { duration: 0.6 },
    },
  };

  const metaVariants: Variants = {
    starting: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.3 },
    },
    playing: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.3 },
    },
    stopped: {
      opacity: 0.5,
      filter: "blur(3px)",
      scale: 0.98,
      transition: { duration: 0.35 },
    },
    movedDown: { opacity: 0, y: 8, transition: { duration: 0.35 } },
    starting2: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div
      className={cn("w-full flex items-center justify-center py-12", className)}
    >
      <motion.div
        role="button"
        aria-label="Music player widget"
        onClick={onClick}
        className={cn(
          "relative w-[260px] h-[260px] rounded-[28px] bg-secondary text-secondary-foreground/90",
          "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
          "overflow-hidden" 
        )}
      >
        <audio
          ref={audioRef}
          src="../audio/sample.mp3"
          preload="auto"
          className="hidden"
          aria-hidden="true"
        />

        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <motion.div
          className="overflow-hidden rounded-t-[28px]"
          variants={viewportVariants}
          animate={state}
          initial={initialState}
        >
          <div className="relative h-[260px] w-full flex items-start justify-center">
            <motion.div
              className="relative h-[260px] w-[260px] overflow-hidden"
              variants={cdVariants}
              animate={state}
              initial={initialState}
            >
              <img
                src={artworkSrc || "/placeholder.svg"}
                alt="Album artwork"
                className="object-cover"
              />
              {state !== "movedDown" && (
                <img
                  src={holeSrc || "/placeholder.svg"}
                  alt="CD hole"
                  width={84}
                  height={84}
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
              <div className="pointer-events-none absolute inset-0 rounded-inherit bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_60%)] mix-blend-overlay" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={metaVariants}
          animate={state}
          initial={initialState}
          className="px-4 pt-3 pb-4 flex flex-col items-center text-center"
        >
          <div className="mx-auto mb-1.5 flex h-5 w-5 items-end justify-center gap-[2px] text-foreground/60">
            <span className="block h-[6px] w-[3px] rounded-sm bg-foreground/40" />
            <span className="block h-[10px] w-[3px] rounded-sm bg-foreground/50" />
            <span className="block h-[6px] w-[3px] rounded-sm bg-foreground/40" />
          </div>

          <div className="text-xs text-foreground/70">{artist}</div>
          <div className="mt-1 text-pretty text-base font-medium tracking-wide text-foreground/90">
            {title}
          </div>
          <div className="mt-0.5 text-xs text-foreground/50">{album}</div>


          <div className="text-sm font-medium tabular-nums">
            <span className="text-foreground/80">
              {formatTime(currentTime) || current}
            </span>
            <span className="mx-1 text-foreground/30">/</span>
            <span className="text-foreground/50">
              {formatTime(duration) || total}
            </span>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/0 transition-[box-shadow] duration-200 hover:shadow-[0_0_0_3px_rgba(124,58,237,0.25)]" />
      </motion.div>
    </div>
  );
}

export default MusicPlayerWidget;
