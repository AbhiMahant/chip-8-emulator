class Speaker {
    constructor() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new  AudioContext();
        // Create a gain, which allows us to control volume
        this.gain = this.audioCtx.createGain();
        this.finsish = this.audioCtx.destination;

        // Connect the gain to the audio context
        this.gain.connect(this.finsish);

    }
    muteAudio() {
        this.gain.setValueAtTime(0, this.audioCtx.currentTime);
    }
    unmumteAudio() {
        this.gain.setValueAtTime(1, this.audioCtx.currentTime);
    }
    play(frequency) {
        if(this.audioCtx && !this.oscillator) {
            this.oscillator = this.audioCtx.createOscillator();

            // Set the frequency
            this.oscillator.setValueAtTime(frequency || 440, this.audioCtx.currentTime);

            //Set the wave type
            this.oscillator.type = 'square';

            this.oscillator.connect(this.gain);
            this.oscillator.start();
        }
    }
    stop() {
        if(this.oscillator) {
            this.oscillator.stop();
            this.oscillator.disconnect();
            this.oscillator = null;
        }
    }
}

export default Speaker;