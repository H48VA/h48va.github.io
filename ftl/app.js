// Základní tabulka - lokální čas
const BASE_TABLE = [
  { start: "00:00", end: "04:59", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] },
  { start: "05:00", end: "05:14", values: ["12:00", "12:00", "11:30", "11:00", "10:30"] },
  { start: "05:15", end: "05:29", values: ["12:15", "12:15", "11:45", "11:15", "10:45"] },
  { start: "05:30", end: "05:44", values: ["12:30", "12:30", "12:00", "11:30", "11:00"] },
  { start: "05:45", end: "05:59", values: ["12:45", "12:45", "12:15", "11:45", "11:15"] },
  { start: "06:00", end: "06:14", values: ["13:00", "13:00", "12:30", "12:00", "11:30"] },
  { start: "06:15", end: "13:29", values: ["13:00", "13:00", "12:30", "12:00", "11:30"] },
  { start: "13:30", end: "13:59", values: ["12:45", "12:45", "12:15", "11:45", "11:15"] },
  { start: "14:00", end: "14:29", values: ["12:30", "12:30", "12:00", "11:30", "11:00"] },
  { start: "14:30", end: "14:59", values: ["12:15", "12:15", "11:45", "11:15", "10:45"] },
  { start: "15:00", end: "15:29", values: ["12:00", "12:00", "11:30", "11:00", "10:30"] },
  { start: "15:30", end: "15:59", values: ["11:45", "11:45", "11:15", "10:45", "10:15"] },
  { start: "16:00", end: "16:29", values: ["11:30", "11:30", "11:00", "10:30", "10:00"] },
  { start: "16:30", end: "16:59", values: ["11:15", "11:15", "10:45", "10:15", "09:45"] },
  { start: "17:00", end: "17:29", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] },
  { start: "17:30", end: "17:59", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] },
  { start: "18:00", end: "18:29", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] },
  { start: "18:30", end: "18:59", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] },
  { start: "19:00", end: "23:59", values: ["11:00", "11:00", "10:30", "10:00", "09:30"] }
];

// Tabulka „e“ - lokální čas
const EXTENDED_TABLE = [
  { start: "19:00", end: "04:59", values: ["11:00", "11:00", "10:30", "10:00", "09:30"], overnight: true },
  { start: "05:00", end: "05:14", values: ["12:00", "12:00", "11:30", "11:00", "10:30"] },
  { start: "05:15", end: "05:29", values: ["12:15", "12:15", "11:45", "11:15", "10:45"] },
  { start: "05:30", end: "05:44", values: ["12:30", "12:30", "12:00", "11:30", "11:00"] },
  { start: "05:45", end: "05:59", values: ["12:45", "12:45", "12:15", "11:45", "11:15"] },
  { start: "06:00", end: "06:14", values: ["13:00", "13:00", "12:30", "12:00", "11:30"] },
  { start: "06:15", end: "06:29", values: ["13:15", "13:15", "12:45", "12:15", "11:45"] },
  { start: "06:30", end: "06:44", values: ["13:30", "13:30", "13:00", "12:30", "12:00"] },
  { start: "06:45", end: "06:59", values: ["13:45", "13:45", "13:15", "12:45", "12:15"] },
  { start: "07:00", end: "13:29", values: ["14:00", "14:00", "13:30", "13:00", "12:30"] },
  { start: "13:30", end: "13:59", values: ["13:45", "13:45", "13:15", "12:45", "11:15"] },
  { start: "14:00", end: "14:29", values: ["13:30", "13:30", "13:00", "12:30", "11:00"] },
  { start: "14:30", end: "14:59", values: ["13:15", "13:15", "12:45", "12:15", "10:45"] },
  { start: "15:00", end: "15:29", values: ["13:00", "13:00", "12:30", "12:00", "10:30"] },
  { start: "15:30", end: "15:59", values: ["12:45", "12:45", "11:15", "10:45", "10:15"] },
  { start: "16:00", end: "16:29", values: ["12:30", "12:30", "11:00", "10:30", "10:00"] },
  { start: "16:30", end: "16:59", values: ["12:15", "12:15", "10:45", "10:15", "09:45"] },
  { start: "17:00", end: "17:29", values: ["12:00", "12:00", "10:30", "10:00", "09:30"] },
  { start: "17:30", end: "17:59", values: ["11:45", "11:45", "10:30", "10:00", "09:30"] },
  { start: "18:00", end: "18:29", values: ["11:30", "11:30", "10:30", "10:00", "09:30"] },
  { start: "18:30", end: "18:59", values: ["11:15", "11:15", "10:30", "10:00", "09:30"] }
];



function toMinutes(timeString) {
  if (!timeString || !timeString.includes(":")) return 0;
  const [h, m] = timeString.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function minutesToDuration(totalMinutes) {
  const sign = totalMinutes < 0 ? "-" : "";
  const abs = Math.abs(totalMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function localToUtc(localMinutes, utcOffsetHours) {
  return localMinutes - utcOffsetHours * 60;
}

function getNowLocalMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function getSelectedServiceType() {
  const selected = document.querySelector('input[name="serviceType"]:checked');
  return selected ? selected.value : "normal";
}

function isInRange(reportMinutes, startMinutes, endMinutes, overnight = false) {
  if (overnight || startMinutes > endMinutes) {
    return reportMinutes >= startMinutes || reportMinutes <= endMinutes;
  }
  return reportMinutes >= startMinutes && reportMinutes <= endMinutes;
}

function lookupTableValue(table, reportMinutes, sectors) {
  for (const row of table) {
    const start = toMinutes(row.start);
    const end = toMinutes(row.end);
    if (isInRange(reportMinutes, start, end, row.overnight)) {
      return toMinutes(row.values[sectors - 1]);
    }
  }
  return null;
}

function overlapMinutes(startA, endA, startB, endB) {
  const start = Math.max(startA, startB);
  const end = Math.min(endA, endB);
  return Math.max(0, end - start);
}

// Spočítá část SBY, která leží v denním okně 07:00–23:00 local
function calculateCountableStandbyMinutes(reportMinutes, sbyMinutes) {
  const standbyStart = reportMinutes - sbyMinutes;
  const standbyEnd = reportMinutes;

  let countable = 0;

  // projdeme všechny "dny", kterých se interval může dotknout
  const firstDay = Math.floor(standbyStart / 1440);
  const lastDay = Math.floor((standbyEnd - 1) / 1440);

  for (let day = firstDay; day <= lastDay; day++) {
    const dayOffset = day * 1440;

    // započitatelné okno je 07:00–23:00
    const countableStart = dayOffset + 7 * 60;   // 07:00
    const countableEnd = dayOffset + 23 * 60;    // 23:00

    countable += overlapMinutes(
      standbyStart,
      standbyEnd,
      countableStart,
      countableEnd
    );
  }

  return countable;
}

function calculateStandbyReduction(reportMinutes, sbyMinutes) {
  const countableStandby = calculateCountableStandbyMinutes(reportMinutes, sbyMinutes);
  return Math.max(0, countableStandby - 360);
}

function calculateResults() {
  const report = toMinutes(document.getElementById("report").value);
const utcOffsetHours = parseInt(document.getElementById("utcOffsetHours").value, 10);
const utcOffsetHalf = parseInt(document.getElementById("utcOffsetHalf").value, 10);
const utcOffset = utcOffsetHours + (utcOffsetHours < 0 ? -utcOffsetHalf / 60 : utcOffsetHalf / 60);  const sectors = parseInt(document.getElementById("sectors").value, 10);
  const sby = toMinutes(document.getElementById("sby").value);
  const lastLeg = toMinutes(document.getElementById("lastLeg").value);
  const taxi = toMinutes(document.getElementById("taxi").value);
  const serviceType = getSelectedServiceType();

  const selectedTable = serviceType === "extended" ? EXTENDED_TABLE : BASE_TABLE;

  const baseTableFdp = lookupTableValue(BASE_TABLE, report, sectors);
  const selectedTableFdp = lookupTableValue(selectedTable, report, sectors);

  if (baseTableFdp === null || selectedTableFdp === null) {
    return { error: "Nepodařilo se najít odpovídající řádek v tabulce." };
  }

  const plannedExtensionDifference = selectedTableFdp - baseTableFdp;
  const captainExtraFromSelectedLimit = 120 - Math.max(0, plannedExtensionDifference);
  const captainExtraApplied = Math.max(0, captainExtraFromSelectedLimit);

 const countableStandby = calculateCountableStandbyMinutes(report, sby);
const standbyReduction = calculateStandbyReduction(report, sby);

  const maxFdp = selectedTableFdp - standbyReduction;
  const maxFdpCaptain = selectedTableFdp + captainExtraApplied - standbyReduction;

  const dutyEndLocal = report + maxFdp;
  const dutyEndCaptainLocal = report + maxFdpCaptain;

  const latestDepartureLocal = dutyEndLocal - lastLeg - taxi;
  const latestDepartureCaptainLocal = dutyEndCaptainLocal - lastLeg - taxi;

  const dutyEndUtc = localToUtc(dutyEndLocal, utcOffset);
  const dutyEndCaptainUtc = localToUtc(dutyEndCaptainLocal, utcOffset);
  const latestDepartureUtc = localToUtc(latestDepartureLocal, utcOffset);
  const latestDepartureCaptainUtc = localToUtc(latestDepartureCaptainLocal, utcOffset);

  return {
    error: null,
    serviceType,
    utcOffset,
    report,
    sectors,
    sby,
    countableStandby,
    standbyReduction,
    lastLeg,
    taxi,
    baseTableFdp,
    selectedTableFdp,
    plannedExtensionDifference,
    captainExtraApplied,
    maxFdp,
    maxFdpCaptain,
    dutyEndLocal,
    dutyEndCaptainLocal,
    latestDepartureLocal,
    latestDepartureCaptainLocal,
    dutyEndUtc,
    dutyEndCaptainUtc,
    latestDepartureUtc,
    latestDepartureCaptainUtc
  };
}

function renderResults(result) {
  const infoBox = document.getElementById("infoBox");

  if (result.error) {
    document.getElementById("maxFdp").textContent = "--:--";
    document.getElementById("maxFdpCaptain").textContent = "--:--";
    document.getElementById("fdpEndText").textContent = "Konec duty: --:-- local / --:-- UTC";
    document.getElementById("fdpEndCaptainText").textContent = "Konec duty: --:-- local / --:-- UTC";
    document.getElementById("latestDeparture").textContent = "--:-- local";
    document.getElementById("latestDepartureUtc").textContent = "--:-- UTC";
    document.getElementById("latestDepartureCaptain").textContent = "--:-- local";
    document.getElementById("latestDepartureCaptainUtc").textContent = "--:-- UTC";
  

    infoBox.className = "status bad";
    infoBox.textContent = result.error;
    return;
  }

  document.getElementById("maxFdp").textContent = minutesToDuration(result.maxFdp);
  document.getElementById("maxFdpCaptain").textContent = minutesToDuration(result.maxFdpCaptain);

  document.getElementById("fdpEndText").textContent =
    `Konec duty: ${minutesToTime(result.dutyEndLocal)} local / ${minutesToTime(result.dutyEndUtc)} UTC`;

  document.getElementById("fdpEndCaptainText").textContent =
    `Konec duty: ${minutesToTime(result.dutyEndCaptainLocal)} local / ${minutesToTime(result.dutyEndCaptainUtc)} UTC`;

  document.getElementById("latestDeparture").textContent =
    `${minutesToTime(result.latestDepartureLocal)} local`;

  document.getElementById("latestDepartureUtc").textContent =
    `${minutesToTime(result.latestDepartureUtc)} UTC`;

  document.getElementById("latestDepartureCaptain").textContent =
    `${minutesToTime(result.latestDepartureCaptainLocal)} local`;

  document.getElementById("latestDepartureCaptainUtc").textContent =
    `${minutesToTime(result.latestDepartureCaptainUtc)} UTC`;

  let infoText = "";
  if (result.serviceType === "extended") {
    infoText =
      `Služba je počítaná z tabulky „e“. Oproti základní tabulce je plánované prodloužení ${minutesToDuration(result.plannedExtensionDifference)}. ` +
      `Kapitánské prodloužení přidává ještě ${minutesToDuration(result.captainExtraApplied)}.`;
  } else {
    infoText =
      `Služba je počítaná ze základní tabulky. Kapitánské prodloužení přidává ${minutesToDuration(result.captainExtraApplied)}.`;
  }

  if (result.sby > 0) {
  infoText += ` Z celkové SBY ${minutesToDuration(result.sby)} se pro krácení počítá ${minutesToDuration(result.countableStandby)} (mimo 23:00–07:00).`;
}

if (result.standbyReduction > 0) {
  infoText += ` SBY zkrátila duty o ${minutesToDuration(result.standbyReduction)}.`;
} else {
  infoText += ` SBY duty nezkrátila.`;
}

const offsetSign = result.utcOffset >= 0 ? "+" : "-";
const offsetAbs = Math.abs(result.utcOffset);
const offsetHoursPart = Math.floor(offsetAbs);
const offsetMinutesPart = Math.round((offsetAbs - offsetHoursPart) * 60);
const offsetFormatted = `UTC${offsetSign}${offsetHoursPart}:${String(offsetMinutesPart).padStart(2, "0")}`;

infoText += ` Přepočet do UTC je udělaný s offsetem ${offsetFormatted}.`;
  infoBox.className = "status good";
  infoBox.textContent = infoText;


}





function runCalculation() {
  const result = calculateResults();
  renderResults(result);
}

document.getElementById("calculateBtn").addEventListener("click", runCalculation);



runCalculation();

// PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
