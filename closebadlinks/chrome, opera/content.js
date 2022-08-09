// here you can write bad links
params = {
    badLinks: [
        "whatismyip.li/psiphon1",
    ],
}

function main() {
    let check = false;
    params.badLinks.some(element => {
        if (window.location.href.includes(element)) {
            check = true;
            return true;
        }
    })
    if (check) {
        close();
    }
}

main();
