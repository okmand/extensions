// here you can write bad links
params = {
    badLinks: [
        "whatismyip.li/psiphon1",
    ],
}

function main() {
    let isBadLink = false;
    params.badLinks.some(element => {
        if (window.location.href.includes(element)) {
            isBadLink = true;
            return true;
        }
    })
    if (isBadLink) {
        close();
    }
}

main();
