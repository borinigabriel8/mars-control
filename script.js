const input = document.getElementById("commandInput");
const output = document.getElementById("output");

const systemName = "MARS_CONTROL AI v1.4";
let securityOverride = false;
let destructArmed = false;

// ===============================
// AUDIO ENGINE (RETRO BEEPS)
// ===============================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioCtx();

function playBeep(freq = 800, duration = 0.03, volume = 0.05) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.frequency.value = freq;
    osc.type = "square";

    gain.gain.value = volume;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function keySound() {
    playBeep(1200, 0.015, 0.03);
}

function enterSound() {
    playBeep(600, 0.08, 0.06);
}

function alarmSound() {
    let count = 0;
    const interval = setInterval(() => {
        playBeep(200 + count * 40, 0.15, 0.08);
        count++;
        if (count > 6) clearInterval(interval);
    }, 250);
}

// ===============================
// TERMINAL OUTPUT
// ===============================
function printLine(text = "", className = "") {
    const div = document.createElement("div");
    div.textContent = text;
    if (className) div.classList.add(className);
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

function typeLines(lines, speed = 35) {
    let lineIndex = 0;

    function typeLine() {
        if (lineIndex >= lines.length) return;

        let charIndex = 0;
        const line = lines[lineIndex];
        const div = document.createElement("div");
        output.appendChild(div);

        function typeChar() {
            if (charIndex < line.length) {
                div.textContent += line[charIndex++];
                playBeep(1000, 0.01, 0.015);
                output.scrollTop = output.scrollHeight;
                setTimeout(typeChar, speed);
            } else {
                lineIndex++;
                setTimeout(typeLine, 120);
            }
        }

        typeChar();
    }

    typeLine();
}

function clearTerminal() {
    output.innerHTML = "";
}

// ===============================
// MINI GAME
// ===============================
let gameActive = false;
let position = 0;

function gameCommand(cmd) {
    if (cmd === "SCAN") {
        typeLines([
            "AREA SCAN COMPLETE",
            position === 1 ? "RADIATION DETECTED AHEAD" : "AREA CLEAR"
        ]);
    }

    if (cmd === "MOVE NORTH") {
        position++;
        typeLines([
            "MOVING NORTH...",
            position === 1 ? "WARNING: RADIATION ZONE" : "TERRAIN UNSTABLE"
        ]);
    }

    if (cmd === "EXIT") {
        gameActive = false;
        typeLines(["EXITING SIMULATION"]);
    }
}

// ===============================
// COMMANDS
// ===============================
const commands = {
    HELP: () => typeLines([
        "AVAILABLE COMMANDS:",
        "STATUS",
        "MISSION",
        "SCAN",
        "LOG",
        "MAP",
        "GAME",
        "OVERRIDE",
        "SELFDESTRUCT",
        "CLEAR"
    ]),

    STATUS: () => typeLines([
        "SYSTEM STATUS: OPERATIONAL",
        "POWER: 96%",
        `SECURITY OVERRIDE: ${securityOverride ? "ENABLED" : "DISABLED"}`,
        "UPLINK: STABLE"
    ]),

    MISSION: () => typeLines([
        "MISSION CODE: ARES-7",
        "OBJECTIVE: SURFACE ANALYSIS",
        "LOCATION: MARS / SECTOR E9",
        "STATUS: ACTIVE"
    ]),

    SCAN: () => typeLines([
        "SCANNING...",
        "NO HOSTILE SIGNALS",
        "RADIATION: LOW"
    ]),

    LOG: () => typeLines([
        "[21:33] SIGNAL DETECTED",
        "[21:34] DATA PACKET RECEIVED",
        "[21:35] UPLINK VERIFIED"
    ]),

    MAP: () => typeLines([
        "SECTOR MAP:",
        "+----+----+",
        "| A1 | A2 |",
        "+----+----+",
        "| B1 | B2 |",
        "+----+----+"
    ]),

    GAME: () => {
        gameActive = true;
        position = 0;
        typeLines([
            "SIMULATION STARTED",
            "COMMANDS: SCAN | MOVE NORTH | EXIT"
        ]);
    },

    OVERRIDE: () => {
        securityOverride = true;
        typeLines([
            "SECURITY OVERRIDE ACCEPTED",
            "ACCESS LEVEL: ADMIN"
        ]);
    },

    SELFDESTRUCT: () => {
        if (!securityOverride) {
            typeLines([
                "ACCESS DENIED",
                "SECURITY OVERRIDE REQUIRED"
            ]);
            return;
        }

        let count = 5;
        alarmSound();

        function countdown() {
            if (count === 0) {
                clearTerminal();
                typeLines([
                    "***** SYSTEM FAILURE *****",
                    "CONNECTION LOST"
                ], 80);
                return;
            }

            printLine(`SELF DESTRUCT IN ${count}`);
            playBeep(300, 0.1, 0.07);
            count--;
            setTimeout(countdown, 1000);
        }

        countdown();
    },

    CLEAR: () => clearTerminal()
};

// ===============================
// INPUT HANDLING
// ===============================
function handleCommand(cmd) {
    const command = cmd.toUpperCase().trim();
    printLine(`> ${cmd}`);
    enterSound();

    if (!command) return;

    if (gameActive) {
        gameCommand(command);
        return;
    }

    if (!commands[command]) {
        typeLines(["UNKNOWN COMMAND — TYPE HELP"]);
        return;
    }

    commands[command]();
}

input.addEventListener("keydown", (e) => {
    if (audioCtx.state === "suspended") audioCtx.resume();

    if (e.key === "Enter") {
        handleCommand(input.value);
        input.value = "";
    } else {
        keySound();
    }
});

document.addEventListener("click", () => input.focus());

// ===============================
// BOOT
// ===============================
setTimeout(() => {
    typeLines([
        "BOOT SEQUENCE COMPLETE",
        `${systemName} READY`
    ]);
}, 500);
