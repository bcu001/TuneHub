class AudioService {
  private audio = new Audio();

  play(src: string) {
    this.audio.src = src;
    return this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  resume(){
    this.audio.play();
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }

  seek(time: number) {
    this.audio.currentTime = time;
  }
}

export const audioService = new AudioService();