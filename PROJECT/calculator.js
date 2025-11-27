const credits = {
    IHS111: 3,
    ICS112: 5,
    ICS111: 5,
    IMA111: 4,
    IHS112: 1,
    IEC111: 5
};
const totalClassesTaken = {
    ICS111: 54,
    ICS112: 49,
    IEC111: 50,
    IMA111: 41,
    IHS111: 28,
    IHS112: 8
};


function findsub() {
    
    const subject = localStorage.getItem("subject");

    if (!subject) {
        alert("ERROR: No subject found. Please go back and select a subject first.");
        return;
    }
    const percentage = Number(document.getElementById("percentage").value);

    const totalTaken = totalClassesTaken[subject];

    const attended = (percentage / 100) * totalTaken;

    const future = credits[subject];

    let x = 0;

    while (true) {
        let finalAttendance = (attended + (future - x)) / (totalTaken + future);
        if (finalAttendance <= 0.80) break;
        x++;
        if (x > future) break;
    }

    x = x - 1;

document.getElementById("final").innerHTML = (`
<table border="2" cellpadding="5px" align="center">
    <tr><th>Current Attendance</th><th>Classes Attended</th><th>Future Classes</th><th>More Classes Required</th><th>Missable</th></tr>
    <tr><td>${percentage}%</td><td>${attended.toFixed(0)}</td><td>${future}</td><td>${future-x}</td><td>${x}</td></tr>
</table>
    `);
}

