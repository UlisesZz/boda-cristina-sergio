// TU APP WEB REAL
const API_URL = "https://script.google.com/macros/s/AKfycbw85zDxjeZCgelmv66EbGvbdrCgTbElnbor5Cz7HVXLqllXXgOJ5hNzDbUxh3fserNV/exec";

// SPLASH
setTimeout(() => {
  const splash = document.getElementById("splash");
  splash.classList.add("fade");

  setTimeout(() => {
    splash.remove();
    document.getElementById("mainContent").classList.remove("hidden");
  }, 800);
}, 3500);

// COUNTDOWN
document.addEventListener("DOMContentLoaded", () => {
  const weddingDate = new Date(2026, 5, 20, 16, 0, 0);
  const el = document.getElementById("countdown");

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      el.innerText = "¡Hoy es el gran día! 💍";
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    el.innerText = `${days} días · ${hours}h · ${minutes}m · ${seconds}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// RSVP
function openRSVP(){
  document.getElementById("rsvpModal").classList.add("show");
}

function closeRSVP(e){
  if(!e || e.target.classList.contains("modal")){
    document.getElementById("rsvpModal").classList.remove("show");
  }
}

// GOOGLE SHEETS
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let guestData = null;

fetch(`${API_URL}?id=${id}`)
  .then(r => r.json())
  .then(data => {
    guestData = data;
    document.getElementById("guestTitle").innerText = `Hola ${data.nombre}`;
    document.getElementById("guestInfo").innerText =
      `Tienes ${data.max} boletos disponibles`;

    const select = document.getElementById("tickets");
    for(let i=1;i<=data.max;i++){
      const opt = document.createElement("option");
      opt.value=i;
      opt.innerText=i;
      select.appendChild(opt);
    }
  });

// CONFIRMAR
function confirmAttendance(){
  const asistentes = Number(document.getElementById("tickets").value);

  fetch(API_URL,{
    method:"POST",
    body:JSON.stringify({id, asistentes})
  });

  const msg =
`Hola, soy ${guestData.nombre}.
Confirmo ${asistentes} asistentes para la boda de Cristina y Sergio 💍`;

  window.location.href =
    `https://wa.me/521561832661?text=${encodeURIComponent(msg)}`;
}
