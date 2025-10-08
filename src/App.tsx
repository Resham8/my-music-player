import MusicPlayerWidget from "./components/music-player-widget";
import Player from "./components/Player";
import "./index.css";

export default function App() {
  return (
    <main className="min-h-[100dvh] bg-background text-foreground flex items-center justify-center">
      <MusicPlayerWidget />
    </main>
  );
}
