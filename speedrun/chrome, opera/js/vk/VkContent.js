let vkParams = {
    divVkForNotification:   "videoplayer_media",
    videoVk:                "videoplayer_media_provider",
    bezelTextWrapperVk:     "bezel-text-wrapper",
    notificationVk:         "bezel-text",

    simpleNotification:     "notification_playbackRate_change",
}

function vkMain() {
    document.addEventListener('keydown', main, false);
    document.changeSpeed = vkChangeSpeed;
}

let clicker = 0;
let isFirstClick = true;
let levelRecursion = 0;

function vkChangeSpeed(newSpeed) {
    document.getElementsByClassName(vkParams.videoVk)[0].playbackRate = newSpeed;
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
    console.log("playbackRate = " + newSpeed + "x");
}

function createNotification() {
    let textWrapper = document.createElement('div');
    textWrapper.className = vkParams.bezelTextWrapperVk;
    textWrapper.style.display = "none";

    let bezelText = document.createElement('div');
    bezelText.className = vkParams.notificationVk;

    textWrapper.append(bezelText);

    let videoPlayer = document.getElementsByClassName(vkParams.divVkForNotification);
    videoPlayer[0].append(textWrapper);
}

function showNotification({levelRecursion, html, timeout}) {
    let textWrapper = document.getElementsByClassName(vkParams.bezelTextWrapperVk);
    let bezelText = document.getElementsByClassName(vkParams.notificationVk);
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
    notification.className = vkParams.simpleNotification;

    notification.innerHTML = html;

    // document.body.append(notification);
    let videoPlayer = document.getElementsByClassName(vkParams.divVkForNotification);
    videoPlayer[0].append(notification);

    setTimeout(() => notification.remove(), timeout);
}
