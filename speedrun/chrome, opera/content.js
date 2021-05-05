document.addEventListener('keydown', main);

params = {
    videoYouTube:           "video-stream html5-main-video",
    notificationYoutube:    "ytp-bezel-text",

    divVkForNotification:   "videoplayer_media",
    videoVk:                "videoplayer_media_provider",
    bezelTextWrapperVk:     "bezel-text-wrapper",
    notificationVk:         "bezel-text",

    simpleNotification:     "notification_playbackRate_change"
}

var speed = 1.0
var videoClass = "";

if (window.location.href.includes("vk.com")) {
    videoClass = params.videoVk;
} else if (window.location.href.includes("youtube")) {
    videoClass = params.videoYouTube;
}

function main(event) {
    if (event.shiftKey && event.keyCode === 190) {  // >
        speed += 0.1;
        changeSpeed(speed.toFixed(1));
    }

    if (event.shiftKey && event.keyCode === 188) {  // <
        if (speed > 0.2) {
            speed -= 0.1;
        } else
            speed = 0.1;
        changeSpeed(speed.toFixed(1));
    }
}

var clicker = 0;
var isFirstClick = true;
var levelRecursion = 0;
function changeSpeed(newSpeed) {
    if (videoClass !== "") {
        if (videoClass === params.videoVk) {
            document.getElementsByClassName(videoClass)[0].playbackRate = newSpeed;
            if (isFirstClick) {
                createNotification();
                isFirstClick = false;
            }
            clicker++;
            showNotification({
                levelRecursion: levelRecursion,
                html: newSpeed + "x",
                timeout: 500
            });
        } else if (videoClass === params.videoYouTube) {
            document.getElementsByClassName(videoClass)[0].playbackRate = newSpeed;
            document.getElementsByClassName(params.notificationYoutube)[0].innerHTML = newSpeed + "x";  // show notification
        }
        console.log("playbackRate = " + newSpeed + "x");
    }
}

function createNotification() {
    let textWrapper = document.createElement('div');
    textWrapper.className = params.bezelTextWrapperVk;
    textWrapper.style.display = "none";

    let bezelText = document.createElement('div');
    bezelText.className = params.notificationVk;

    textWrapper.append(bezelText);

    let videoPlayer = document.getElementsByClassName(params.divVkForNotification);
    videoPlayer[0].append(textWrapper);
}

function showNotification({levelRecursion, html, timeout}) {
    let textWrapper = document.getElementsByClassName(params.bezelTextWrapperVk);
    let bezelText = document.getElementsByClassName(params.notificationVk);
    if (textWrapper !== undefined && bezelText !== undefined
        && textWrapper[0] !== undefined && bezelText[0] !== undefined) {

        textWrapper[0].style.display = "";
        bezelText[0].innerHTML = html;

        setTimeout(() => {
            clicker--;
            if (clicker === 0) {
                textWrapper[0].style.display = "none";
            }
        }, timeout);
    } else if (levelRecursion < 2) {
        createNotification();
        showNotification({
            levelRecursion: ++levelRecursion,
            html: html,
            timeout: timeout
        });
    } else {    // something is wrong and we can't create notification
        clicker--;
        showSimpleNotification({
            html: html,
            timeout: timeout
        });
    }
}

function showSimpleNotification({html, timeout}) {
    let notification = document.createElement('div');
    notification.className = params.simpleNotification;

    notification.innerHTML = html;

    // document.body.append(notification);
    let videoPlayer = document.getElementsByClassName(params.divVkForNotification);
    videoPlayer[0].append(notification);

    setTimeout(() => notification.remove(), timeout);
}
