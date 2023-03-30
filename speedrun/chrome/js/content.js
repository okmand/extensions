let params = {
    videoYoutube: "video-stream html5-main-video",
    notificationYoutube: "ytp-bezel-text",

    supportedPlaybackRange: 16,

    youtubeMaxSpeed: 2,
    youtubeMinSpeed: 0.25,
    youtubeSpeedStep: 0.25,

    // Here you can change speed step (Multiple 0.1)
    speedStep: 0.1,

    // Here you can change time step
    timeStep: 5,
}

let youtubeSpeed = 1.0;

main();

function main() {
    youtubeSpeed = document.getElementsByClassName(params.videoYoutube)[0].playbackRate;
    document.getElementsByClassName(params.videoYoutube)[0].playbackRate = 1.0;
    document.addEventListener('keydown', changeSpeed, false);
    document.addEventListener('keydown', changeTime, false);
}

let speed = 1.0;

function changeSpeed(event) {
    if (event.shiftKey && event.keyCode === 190) {  // >
        if (youtubeSpeed < 2) {
            youtubeSpeed += 0.25
            youtubeSpeed = parseFloat(youtubeSpeed.toFixed(2));
        }

        if (speed < params.supportedPlaybackRange) {
            speed += params.speedStep;
            speed = parseFloat(speed.toFixed(1));
        }
        youtubeChangeSpeed(speed);
        console.log("YOUTUBE SPEED: " + youtubeSpeed)
    }

    if (event.shiftKey && event.keyCode === 188) {  // <
        if (youtubeSpeed > 0.5) {
            youtubeSpeed -= 0.25
        } else {
            youtubeSpeed = 0.25
        }
        youtubeSpeed = parseFloat(youtubeSpeed.toFixed(2));

        if (speed > params.speedStep * 2) {
            speed -= params.speedStep;
        } else {
            speed = params.speedStep;
        }
        speed = parseFloat(speed.toFixed(1));
        youtubeChangeSpeed(speed);
        console.log("YOUTUBE SPEED: " + youtubeSpeed)
    }
}

function changeTime(event) {
    // if (event.keyCode === 39) {  // ->
    //     youtubeChangeTime(true)
    // }
    //
    // if (event.keyCode === 37) {  // <-
    //     youtubeChangeTime(false)
    // }
}

function youtubeChangeSpeed(newSpeed) {
    document.getElementsByClassName(params.videoYoutube)[0].playbackRate = newSpeed;
    document.getElementsByClassName(params.notificationYoutube)[0].innerHTML = newSpeed + "x";  // show notification
    // console.log("playbackRate = " + newSpeed + "x");
}

function youtubeChangeTime(isPlus) {
    let currentTime = document.getElementsByClassName(params.videoYoutube)[0].currentTime
    if (isPlus) {
        currentTime += params.timeStep
    } else {
        currentTime -= params.timeStep
    }
    document.getElementsByClassName(params.videoYoutube)[0].currentTime = currentTime
    console.log(currentTime)
}
