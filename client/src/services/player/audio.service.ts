class AudioService {
  private audio = new Audio();

  constructor(){
    this.audio.preload = 'metadata';
    this.audio.volume = 0.7
  }

  play(src: string) {
    this.audio.src = src;
    return this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  resume() {
    this.audio.play();
  }

  getVolume() {
    return this.audio.volume;
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }

  seek(time: number) {
    this.audio.currentTime = time;
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getDuration() {
    return this.audio.duration;
  }
  onTimeUpdate(callback: (time: number) => void) {
    this.audio.addEventListener("timeupdate", () => {
      callback(this.audio.currentTime);
    });
  }

  onDurationChange(callback: (duration: number) => void) {
    this.audio.addEventListener("loadedmetadata", () => {
      callback(this.audio.duration);
    });
  }

  onEnded(callback: () => void) {
    this.audio.addEventListener("ended", callback);
  }
}

export const audioService = new AudioService();
