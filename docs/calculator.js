const credits = {
    IHS121: 1,
    ICS122: 4,
    ICS121: 5,
    IMA121: 4,
    ICS123: 4,
    IEC121: 5
};

const translation = {
    IHS121: "PERSONALITY DEVELOPMENT",
    ICS122: "COMPUTER ORGANISATION",
    ICS121: "DATA STRUCTURES",
    IMA121: "CALCULUS AND LINEAR ALGEBRA",
    ICS123: "IT WORKSHOP 2",
    IEC121: "DIGITAL DESIGN AND EC"
}


const timetable = {
    monday: [2, 1, 1, 0, 0, 1],
    tuesday: [0, 0, 2, 0, 0, 1],
    wednesday: [1, 1, 1, 1, 1, 1],
    thursday: [1, 1, 0, 0, 2, 1],
    friday: [1, 1, 0, 0, 1, 1]
};
const startofsem = new Date("2026-01-01");
const endofsem = new Date("2026-04-14");
const today = new Date();
const sem2 = {
    Monday: 14,
    Tuesday: 13,
    Wednesday: 13,
    Thursday: 14,
    Friday: 14
};

const subjects = ["ICS121", "ICS122", "ICS123", "IHS121", "IMA121", "IEC121"];

const totalClassesTaken = {
    ICS121: Number(((today - startofsem) / (1000 * 60 * 60 * 24) * credits["ICS121"] / 7)).toFixed(0),
    ICS122: Number(((today - startofsem) / (1000 * 60 * 60 * 24) * credits["ICS122"] / 7)).toFixed(0),
    ICS123: Number(((today - startofsem) / (1000 * 60 * 60 * 24) * credits["ICS123"] / 7)).toFixed(0),
    IHS121: Number(((today - startofsem) / (1000 * 60 * 60 * 24) * credits["IHS121"] / 7)).toFixed(0),
    IMA121: Number(((today - startofsem) / (1000 * 60 * 60 * 24) * credits["IMA121"] / 7)).toFixed(0),
    IEC121: Number(((today - startofsem) / (1000 * 60 * 60 * 24) * credits["IEC121"] / 7)).toFixed(0)
};
const totalClasses = {
    ICS121: 0,
    ICS122: 0,
    ICS123: 0,
    IHS121: 0,
    IMA121: 0,
    IEC121: 0
}
for (const day in timetable) {
    const dayKey = day.charAt(0).toUpperCase() + day.slice(1); // monday → Monday
    const dayCount = sem2[dayKey];
    const classes = timetable[day];

    classes.forEach((count, index) => {
        totalClasses[subjects[index]] += count * dayCount;
    });
}

console.log(totalClasses);
function findsub() {

    const subject = localStorage.getItem("subject");

    if (!subject) {
        alert("ERROR: No subject found. Please go back and select a subject first.");
        return;
    }
    const percentage = Number(document.getElementById("percentage").value);

    const totalTaken = Number(totalClassesTaken[subject]);

    const attended = (percentage / 100) * totalTaken;

    const future = totalClasses[subject] - totalTaken;

    let x = 0;


    while (true) {
        let finalAttendance = (attended + (future - x)) / (totalTaken + future);
        if (finalAttendance <= 0.80) break;
        x++;
        if (x > future) break;
    }

    x = x - 1;
    console.log(x);
    document.getElementById("final").innerHTML = (`
<table border="2" cellpadding="5px" align="center">
    <tr><th colspan="5"><b>${translation[subject]}</b></th></tr>
    <tr><th><b>Current Attendance</b></th><th><b>Classes Attended</b></th><th><b>Future Classes</b></th><th><b>More Classes Required</b></th><th><b>Missable</b></th></tr>
    <tr><td><b>${percentage}%</b></td><td><b>${attended.toFixed(0)}</b></td><td><b>${future}</b></td><td><b>${future - x}</b></td><td><b>${x}</b></td></tr>
</table>
    `);
}

