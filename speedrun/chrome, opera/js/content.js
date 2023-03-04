let params = {
    youtubeHref:            "youtube",
    videoYoutube:           "video-stream html5-main-video",
    notificationYoutube:    "ytp-bezel-text",

    supportedPlaybackRange: 16,

    // Here you can change speed step (Multiple 0.1)
    speedStep:              0.1,
}

if (window.location.href.includes(params.youtubeHref)) {
    main();
}

function main() {
    document.addEventListener('keydown', changeSpeed, false);
}

let speed = 1.0;

function changeSpeed(event) {
    if (event.shiftKey && event.keyCode === 190) {  // >
        if (speed < params.supportedPlaybackRange) {
            speed += params.speedStep;
            speed = parseFloat(speed.toFixed(1));
        }
        youtubeChangeSpeed(speed);
    }

    if (event.shiftKey && event.keyCode === 188) {  // <
        if (speed > params.speedStep * 2) {
            speed -= params.speedStep;
        } else {
            speed = params.speedStep;
        }
        speed = parseFloat(speed.toFixed(1));
        youtubeChangeSpeed(speed);
    }
}

function youtubeChangeSpeed(newSpeed) {
    document.getElementsByClassName(params.videoYoutube)[0].playbackRate = newSpeed;
    document.getElementsByClassName(params.notificationYoutube)[0].innerHTML = newSpeed + "x";  // show notification
    console.log("playbackRate = " + newSpeed + "x");
}
