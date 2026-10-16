/**
 * Web Audio API Analyser helper to connect to microphone and extract real-time audio energy
 */
export class AudioVisualizerService {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphoneStream: MediaStream | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private dataArray: Uint8Array | null = null;
  private isListeningToMic: boolean = false;

  public async startMicMonitoring(): Promise<boolean> {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return false;
      }

      this.microphoneStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.sourceNode = this.audioContext.createMediaStreamSource(this.microphoneStream);
      this.sourceNode.connect(this.analyser);

      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.isListeningToMic = true;
      return true;
    } catch (err) {
      console.warn('Microphone audio stream could not be opened for visualizer:', err);
      this.isListeningToMic = false;
      return false;
    }
  }

  public stopMicMonitoring() {
    this.isListeningToMic = false;
    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }
    if (this.microphoneStream) {
      this.microphoneStream.getTracks().forEach((track) => track.stop());
      this.microphoneStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch (e) {
        // ignore
      }
      this.audioContext = null;
    }
    this.analyser = null;
    this.dataArray = null;
  }

  /**
   * Returns current audio volume (0 to 1) and frequency bins (array of 0-1 values)
   */
  public getAudioData(): { volume: number; bars: number[] } {
    if (!this.analyser || !this.dataArray || !this.isListeningToMic) {
      return { volume: 0, bars: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1] };
    }

    this.analyser.getByteFrequencyData(this.dataArray as any);
    let sum = 0;
    const barCount = 12;
    const step = Math.floor(this.dataArray.length / barCount);
    const bars: number[] = [];

    for (let i = 0; i < barCount; i++) {
      const val = this.dataArray[i * step] || 0;
      bars.push(Math.min(1, Math.max(0.1, val / 255)));
      sum += val;
    }

    const avg = sum / this.dataArray.length;
    const volume = Math.min(1, avg / 128);

    return { volume, bars };
  }

  public getIsActive(): boolean {
    return this.isListeningToMic;
  }
}

export const audioVisualizerService = new AudioVisualizerService();
