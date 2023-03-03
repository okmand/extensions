let youtubeParams = {
    videoYoutube:           "video-stream html5-main-video",
    notificationYoutube:    "ytp-bezel-text",
}

function youtubeMain() {
    document.addEventListener('keydown', main, false);
    document.changeSpeed = youtubeChangeSpeed;
}

function youtubeChangeSpeed(newSpeed) {
    document.getElementsByClassName(youtubeParams.videoYoutube)[0].playbackRate = newSpeed;
    document.getElementsByClassName(youtubeParams.notificationYoutube)[0].innerHTML = newSpeed + "x";  // show notification
    console.log("playbackRate = " + newSpeed + "x");
}
