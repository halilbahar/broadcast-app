const { writeFileSync, unlinkSync } = require('fs');
const { spawn } = require('child_process');
const host = process.env.HOST || 'localhost';

module.exports = class Ffmpeg {
    constructor(buffer) {
        this.fileName = `audio/${Math.random().toString(36).substr(2, 9)}.mp3`;
        writeFileSync(this.fileName, buffer);
    }

    startStream() {
        const ffmpeg = spawn('ffmpeg', [
            '-hide_banner',
            '-loglevel', 'error',
            '-nostdin',
            '-re',
            '-stream_loop', '-1',
            '-i', this.fileName,
            '-acodec', 'aac',
            '-vn',
            '-f', 'flv',
            `rtmp://${host}/medt/radio`
        ]);

        ffmpeg.stderr.on('data', data => console.log(data.toString()));
        this.ffmpeg = ffmpeg;
    }

    stopStream() {
        this.ffmpeg.kill();
        unlinkSync(this.fileName);
    }
}