document.getElementById('birthdayForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const DD = parseInt(document.getElementById('day').value);
    const MM = parseInt(document.getElementById('month').value);
    const YYYY = parseInt(document.getElementById('year').value);

    calculateBirthday(DD, MM, YYYY);
});

function calculateBirthday(DD, MM, YYYY) {
    const month = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    if (DD <= 0 || MM <= 0 || YYYY <= 0 || DD > 31 || MM > 12) {
        document.getElementById('result').innerText = "Oops! That's not a valid date. Let's try again!";
        return;
    }

    switch (MM) {
        case 2:
            if (YYYY % 400 === 0 || (YYYY % 4 === 0 && YYYY % 100 !== 0)) {
                if (DD > 29) {
                    document.getElementById('result').innerText = "February only has 29 days in a leap year. Let's double-check that!";
                    return;
                }
            } else if (DD > 28) {
                document.getElementById('result').innerText = "February typically has 28 days. Let's try again!";
                return;
            }
            break;
        case 4: case 6: case 9: case 11:
            if (DD > 30) {
                document.getElementById('result').innerText = `${month[MM - 1]} has 30 days. Let's give it another shot!`;
                return;
            }
            break;
    }

    let NYYYY, NMM, IDAY, day, flag = 0;

    if (MM <= 2) {
        NYYYY = YYYY - 1;
        NMM = 0;
    } else {
        NYYYY = YYYY;
        NMM = Math.floor((4 * MM + 23) / 10);
    }

    IDAY = 365 * YYYY + DD + 31 * (MM - 1) - NMM + Math.floor(NYYYY / 4) - Math.floor((3 * (Math.floor(NYYYY / 100) + 1)) / 4);
    day = IDAY % 7;

    if (DD !== 11 && DD !== 12 && DD !== 13) flag = DD % 10;

    let dayOfWeek;
    switch (day) {
        case 0: dayOfWeek = "Saturday"; break;
        case 1: dayOfWeek = "Sunday"; break;
        case 2: dayOfWeek = "Monday"; break;
        case 3: dayOfWeek = "Tuesday"; break;
        case 4: dayOfWeek = "Wednesday"; break;
        case 5: dayOfWeek = "Thursday"; break;
        case 6: dayOfWeek = "Friday"; break;
    }

    let daySuffix = "th";
    if (flag === 1) daySuffix = "st";
    if (flag === 2) daySuffix = "nd";
    if (flag === 3) daySuffix = "rd";

    // Calculate age
    const today = new Date();
    const birthDate = new Date(YYYY, MM - 1, DD);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        ageDays += lastMonth.getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // Display result with animation
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<span style="font-size: 1.6rem;">✨ Magic Revealed! ✨</span><br>You made your grand entrance on a <span style="color: var(--secondary-color);">${dayOfWeek}</span>,<br>the ${DD}${daySuffix} of ${month[MM - 1]} ${YYYY}!`;
    resultElement.classList.add('show');

    // Display age
    const ageElement = document.getElementById('age');
    ageElement.innerHTML = `<span style="font-size: 1.4rem;">🎂 You are <span style="color: var(--secondary-color);">${ageYears}</span> years, <span style="color: var(--secondary-color);">${ageMonths}</span> months, and <span style="color: var(--secondary-color);">${ageDays}</span> days old.</span>`;
    
    // Trigger confetti celebration
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}