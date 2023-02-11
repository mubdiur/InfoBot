const { exec } = require('child_process');
let childProcess = null;
let autoRestart = true;
function run() {
    try {
        childProcess = exec('npm run start');
        childProcess.on("exit", () => {
            if (autoRestart) {
                console.log("Restarting in 3 seconds");
                setTimeout(run, 3000);
            } else {
                console.log("App has been stopped!")
            }
        })
        childProcess.stdout.on("data", (data) => {
            console.log(data)
            if (data?.trim() === "command: shutdown now") {
                autoRestart = false;
            }
        })
        childProcess.stderr.on("data", (data) => {
            console.log(data)
        })
    } catch (e) {
        console.log(e);
        if (childProcess) {
            console.log("killing process");
            childProcess.kill();
            console.log("After killing, process = ", childProcess);
            childProcess = null;
            console.log("Restarting in 3 seconds");
            setTimeout(run, 3000);
        }
    }
}

run();