let params = {
    youtubeHref: "youtube",
    vkHref: "vk.com",

    supportedPlaybackRange: 16,

    // Here you can change speed step (Multiple 0.1)
    speedStep: 0.1,
}

if (window.location.href.includes(params.vkHref)) {
    vkMain();
} else if (window.location.href.includes(params.youtubeHref)) {
    youtubeMain();
}

let speed = 1.0;

function main(event) {
    if (event.shiftKey && event.keyCode === 190) {  // >
        if (speed < params.supportedPlaybackRange) {
            speed += params.speedStep;
            speed = parseFloat(speed.toFixed(1));
        }
        event.currentTarget.changeSpeed(speed);
    }

    if (event.shiftKey && event.keyCode === 188) {  // <
        if (speed > params.speedStep * 2) {
            speed -= params.speedStep;
        } else {
            speed = params.speedStep;
        }
        speed = parseFloat(speed.toFixed(1));
        event.currentTarget.changeSpeed(speed);
    }
}
