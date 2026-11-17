const students = [
  { id: 1, name: "ABENOJA AGE MONTILLA", voiceGender: "male" },
  { id: 2, name: "AGSALOG JHON LENARD DAVID", voiceGender: "male" },
  { id: 3, name: "AGUINALDO EUNICE RAMOS", voiceGender: "female" },
  { id: 4, name: "ARQUERO KRISTINE JOY QUITALIG", voiceGender: "female" },
  { id: 5, name: "ASUNCION NHORIEL LOMBOY", voiceGender: "male" },
  { id: 6, name: "BALAJADIA IRISH EDRADAN", voiceGender: "female" },
  { id: 7, name: "BALUBAR CHARMAINE SEJALBO", voiceGender: "female" },
  { id: 8, name: "BELLO JULIAN PENERA", voiceGender: "male" },
  { id: 9, name: "BERMUDEZ KARL JUSTINE VIERNES", voiceGender: "male" },
  { id: 10, name: "BRICIA CHRISTIAN JEFF BALETE", voiceGender: "male" },
  { id: 11, name: "CABRERA SHIELA GRACE YABES", voiceGender: "female" },
  { id: 12, name: "CADORNA JOSHUA DALIT", voiceGender: "male" },
  { id: 13, name: "CALIBOSO FLORENCIO III TALAY", voiceGender: "male" },
  { id: 14, name: "CALICDAN ONAY DIVINE AGUSTINE", voiceGender: "female" },
  { id: 15, name: "CARANZO ANGEL BOADO", voiceGender: "female" },
  { id: 16, name: "CARIAGA LEA-MAE SANTOS", voiceGender: "female" },
  { id: 17, name: "CASTRO ROBERT JR. VIERNES", voiceGender: "male" },
  { id: 18, name: "CUCHAPIN CLOE MAE MARZAN", voiceGender: "female" },
  { id: 19, name: "DENIEGA REY MARK JAY HILARIO", voiceGender: "male" },
  { id: 20, name: "DESGARGAR GWYNETH GALVAN", voiceGender: "female" },
  { id: 21, name: "DOMINGO RINA SANTOS", voiceGender: "female" },
  { id: 22, name: "FERNANDEZ A-JAY SINFUEGO", voiceGender: "male" },
  { id: 23, name: "FERNANDEZ ANGEL MIRANDA", voiceGender: "female" },
  { id: 24, name: "FRANCISCO CRIZEL", voiceGender: "female" },
  { id: 25, name: "GALLESTRE DIANA ROSE DEL ROSARIO", voiceGender: "female" },
  { id: 26, name: "GALLESTRE KARLA JANE PACIS", voiceGender: "female" },
  { id: 27, name: "GARCIA ABIGAIL LEONEN", voiceGender: "female" },
  { id: 28, name: "GUERRERO ROXANNE LOPEZ", voiceGender: "female" },
  { id: 29, name: "GUZMAN LYKA JOYCE VALEN", voiceGender: "female" },
  { id: 30, name: "LARIOSA CHARLENE KATE PONCE", voiceGender: "female" },
  { id: 31, name: "LAVERINTO JEFFERSON ISAIAH RODRIGO", voiceGender: "male" },
  { id: 32, name: "LICUANAN JEFFERSON BANAGA", voiceGender: "male" },
  { id: 33, name: "LINTAO PRECIOUS ANDREA ALARBA", voiceGender: "female" },
  { id: 34, name: "LOREZO REZZA ORDONIO", voiceGender: "female" },
  { id: 35, name: "MARTIN CRISTAL JOY DIZON", voiceGender: "female" },
  { id: 36, name: "MARTIN KATHLEEN CHARISH GARCIA", voiceGender: "female" },
  { id: 37, name: "MARTINEZ OYO BOY ZALUN", voiceGender: "male" },
  { id: 38, name: "MENSALVAS DELAMARIE VELASCO", voiceGender: "female" },
  { id: 39, name: "PANCHO STEPHANIE KEITH FRANCISCO", voiceGender: "female" },
  { id: 40, name: "PANGAN ANGELYN MAE MENDOZA", voiceGender: "female" },
  { id: 41, name: "RAMOS KATHLENE FAYE BAGALAY", voiceGender: "female" },
  { id: 42, name: "RAMOS ROSIE ANNE GUERRERO", voiceGender: "female" },
  { id: 43, name: "SABIANO AHRON DOMINGO", voiceGender: "male" },
  { id: 44, name: "SAHAGUN IVEE REBALDE", voiceGender: "female" },
  { id: 45, name: "SAN JOSE PRINCESS LORRAINE CALINGCA", voiceGender: "female" },
  { id: 46, name: "SANTIAGO AIREZEL CABANILLA", voiceGender: "female" },
  { id: 47, name: "SANTIAGO MARK RUEL NOBLEZA", voiceGender: "male" },
  { id: 48, name: "SANTOS JAY PEE CARBILLON", voiceGender: "male" },
  { id: 49, name: "TABLANG JOANABELLE RAMOS", voiceGender: "female" },
  { id: 50, name: "TRANSFIGURACION DIANE BAINGAN", voiceGender: "female" },
  { id: 51, name: "TULAGAN ANGEL TALOSIG", voiceGender: "female" },
  { id: 52, name: "VILLANUEVA HONRICH BERGONIA", voiceGender: "male" },
  { id: 53, name: "VILLANUEVA JAMES FRONDARINA", voiceGender: "male" }
];

const $ = id => document.getElementById(id);

const studentList = $("studentList");
const attendanceDate = $("attendanceDate");
const searchInput = $("searchInput");
const clearSearch = $("clearSearch");
const emptyMessage = $("emptyMessage");
const toast = $("toast");

let attendance = {};
let toastTimer;

const now = new Date();
const localToday = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0")
].join("-");

attendanceDate.value = localToday;

// Convert uppercase names into normal spoken names.
function formatNameForSpeech(name) {
  return name.toLowerCase().split(" ").map(word => {
    if (word === "jr.") return "Junior";
    if (word === "iii") return "the Third";

    return word.split("-").map(part =>
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join("-");
  }).join(" ");
}

// Find a voice matching the student's selected voice gender.
function getVoiceForGender(gender) {
  if (!("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis.getVoices();

  const englishVoices = voices.filter(voice =>
    voice.lang.toLowerCase().startsWith("en")
  );

  const femaleHints = [
    "female", "woman", "samantha", "victoria",
    "karen", "zira", "susan", "aria", "jenny",
    "sara", "ava", "libby", "moira"
  ];

  const maleHints = [
    "male", "man", "david", "mark", "daniel",
    "james", "guy", "alex", "fred", "george",
    "ryan", "christopher"
  ];

  const hints = gender === "female" ? femaleHints : maleHints;

  const matchingVoice = englishVoices.find(voice => {
    const name = voice.name.toLowerCase();
    return hints.some(hint => name.includes(hint));
  });

  // Prefer a matching English voice; otherwise use an English default.
  return matchingVoice ||
    englishVoices.find(voice => voice.default) ||
    englishVoices[0] ||
    voices[0] ||
    null;
}

function storageKey(date) {
  return `cyber-attendance-v4-${date}`;
}

function loadAttendance() {
  try {
    const saved = localStorage.getItem(storageKey(attendanceDate.value));
    attendance = saved ? JSON.parse(saved) : {};

    if (!attendance || typeof attendance !== "object" || Array.isArray(attendance)) {
      attendance = {};
    }
  } catch (error) {
    attendance = {};
    showToast("Unable to load saved attendance.");
  }

  renderStudents();
  updateStats();
}

function saveAttendance() {
  try {
    localStorage.setItem(
      storageKey(attendanceDate.value),
      JSON.stringify(attendance)
    );
  } catch (error) {
    showToast("Unable to save attendance. Check browser storage.");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// Announce the complete name and status with the selected voice.
function announceAttendance(student, status) {
  const spokenName = formatNameForSpeech(student.name);

  const spokenStatus = {
    present: "is present.",
    absent: "is absent.",
    excuse: "is excused."
  };

  const message = `${spokenName}, ${spokenStatus[status]}`;

  showToast(`🔊 ${message}`);

  if (!("speechSynthesis" in window)) {
    showToast("Voice announcements are not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = "en-US";

  // Slower pace and gentle pitch for clearer speech.
  speech.rate = 0.88;
  speech.pitch = student.voiceGender === "female" ? 1.08 : 0.92;
  speech.volume = 1;

  const selectedVoice = getVoiceForGender(student.voiceGender);
  if (selectedVoice) {
    speech.voice = selectedVoice;
    speech.lang = selectedVoice.lang;
  }

  window.speechSynthesis.speak(speech);
}

function setAttendance(studentId, status) {
  const student = students.find(item => item.id === studentId);
  if (!student) return;

  attendance[studentId] = status;

  saveAttendance();
  renderStudents();
  updateStats();
  announceAttendance(student, status);

  const card = document.querySelector(
    `.student-card[data-id="${studentId}"]`
  );

  if (card) {
    card.classList.add("flash");
    setTimeout(() => card.classList.remove("flash"), 550);
  }
}

function statusLabel(status) {
  const labels = {
    present: "● PRESENT",
    absent: "● ABSENT",
    excuse: "● EXCUSED",
    unmarked: "○ NOT MARKED"
  };

  return labels[status] || "○ NOT MARKED";
}

function renderStudents() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm)
  );

  studentList.innerHTML = "";
  $("rosterCount").textContent = `${filteredStudents.length} RECORDS`;

  emptyMessage.classList.toggle("hidden", filteredStudents.length !== 0);

  filteredStudents.forEach(student => {
    const status = attendance[student.id] || "unmarked";

    const card = document.createElement("article");
    card.className = "student-card";
    card.dataset.id = student.id;

    if (status !== "unmarked") {
      card.classList.add(`status-${status}`);
    }

    const number = document.createElement("div");
    number.className = "student-number";
    number.textContent = String(student.id).padStart(2, "0");

    const info = document.createElement("div");
    info.className = "student-info";

    const name = document.createElement("div");
    name.className = "student-name";
    name.textContent = student.name;

    const statusText = document.createElement("div");
    statusText.className = "student-status";
    statusText.textContent = statusLabel(status);

    info.append(name, statusText);

    const buttons = document.createElement("div");
    buttons.className = "student-buttons";

    [
      { value: "present", label: "PRESENT" },
      { value: "absent", label: "ABSENT" },
      { value: "excuse", label: "EXCUSE" }
    ].forEach(option => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `status-button ${option.value}`;
      button.textContent = option.label;

      const active = status === option.value;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));

      button.addEventListener("click", () => {
        setAttendance(student.id, option.value);
      });

      buttons.appendChild(button);
    });

    card.append(number, info, buttons);
    studentList.appendChild(card);
  });
}

function updateStats() {
  const values = Object.values(attendance);

  const present = values.filter(v => v === "present").length;
  const absent = values.filter(v => v === "absent").length;
  const excuse = values.filter(v => v === "excuse").length;
  const marked = present + absent + excuse;

  const percentage = Math.round((marked / students.length) * 100);

  $("totalCount").textContent = students.length;
  $("presentCount").textContent = present;
  $("absentCount").textContent = absent;
  $("excuseCount").textContent = excuse;

  $("progressText").textContent = `${percentage}%`;
  $("progressFill").style.width = `${percentage}%`;
  $("markedText").textContent =
    `${marked} of ${students.length} students marked`;
}

searchInput.addEventListener("input", () => {
  clearSearch.classList.toggle("visible", searchInput.value.length > 0);
  renderStudents();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  clearSearch.classList.remove("visible");
  renderStudents();
  searchInput.focus();
});

attendanceDate.addEventListener("change", () => {
  if (!attendanceDate.value) return;
  loadAttendance();
  showToast("Attendance loaded for selected date.");
});

$("finishButton").addEventListener("click", () => {
  const present = students.filter(s => attendance[s.id] === "present").length;
  const absent = students.filter(s => attendance[s.id] === "absent").length;
  const excuse = students.filter(s => attendance[s.id] === "excuse").length;
  const unmarked = students.length - present - absent - excuse;

  if (unmarked > 0) {
    const proceed = confirm(
      `${unmarked} student(s) are not marked yet.\nFinish attendance anyway?`
    );
    if (!proceed) return;
  }

  showToast(
    `Attendance finished! Present: ${present}, Absent: ${absent}, Excused: ${excuse}.`
  );
});

$("resetButton").addEventListener("click", () => {
  const confirmed = confirm(
    `Reset all attendance records for ${attendanceDate.value}?`
  );

  if (!confirmed) return;

  attendance = {};
  saveAttendance();
  renderStudents();
  updateStats();

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  showToast("Attendance reset for this date.");
});

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function exportAttendancePDF() {
  const date = attendanceDate.value || localToday;

  const rows = students.map((student, index) => {
    const status = attendance[student.id] || "NOT MARKED";

    return `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHTML(student.name)}</td>
        <td>${escapeHTML(status.toUpperCase())}</td>
      </tr>
    `;
  }).join("");

  const present = students.filter(s => attendance[s.id] === "present").length;
  const absent = students.filter(s => attendance[s.id] === "absent").length;
  const excuse = students.filter(s => attendance[s.id] === "excuse").length;
  const unmarked = students.length - present - absent - excuse;

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("PDF export was blocked. Please allow pop-ups.");
    return;
  }

  const reportHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Attendance Report - ${escapeHTML(date)}</title>
      <style>
        body { font-family: Arial,sans-serif; color: #172033; padding: 25px; }
        h1,.subtitle,.details { text-align: center; }
        h1 { margin-bottom: 5px; font-size: 23px; }
        .details,.subtitle { margin: 5px 0; }
        .summary { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin: 25px 0 18px; font-size: 12px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; font-size: 11px; }
        th,td { border: 1px solid #9ba7b5; padding: 7px; text-align: left; }
        th { background: #e6edf5; }
        tr { page-break-inside: avoid; }
        .footer { margin-top: 25px; font-size: 10px; text-align: center; color: #657084; }
        @media print {
          body { padding: 0; }
          @page { size: A4 portrait; margin: 14mm; }
        }
      </style>
    </head>
    <body>
      <h1>ATTENDANCE CHECKER</h1>
      <p class="subtitle">OBJECT ORIENTED PROGRAMMING</p>
      <p class="details">Instructor: Jomar Balmores</p>
      <p class="details">Attendance Date: ${escapeHTML(date)}</p>

      <div class="summary">
        <span>Total: ${students.length}</span>
        <span>Present: ${present}</span>
        <span>Absent: ${absent}</span>
        <span>Excused: ${excuse}</span>
        <span>Not Marked: ${unmarked}</span>
      </div>

      <table>
        <thead>
          <tr><th>No.</th><th>Student Name</th><th>Attendance Status</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <p class="footer">Generated by Cyber Attendance Checker</p>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(reportHTML);
  printWindow.document.close();

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 700);
}

$("pdfButton").addEventListener("click", exportAttendancePDF);

function createParticles() {
  const particleContainer = $("particles");

  for (let i = 0; i < 35; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${7 + Math.random() * 12}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    particle.style.opacity = `${0.2 + Math.random() * 0.7}`;
    particleContainer.appendChild(particle);
  }
}

createParticles();
loadAttendance();

// Some browsers load their voice list after the page loads.
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}