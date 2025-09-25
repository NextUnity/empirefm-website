// Hole aktuellen Song von Laut.fm API
const currentSongElement = document.getElementById("current-song");

async function fetchCurrentSong() {
  try {
    const response = await fetch("https://api.laut.fm/station/edmfm/current_song");
    const data = await response.json();

    if (data && data.title && data.artist) {
      currentSongElement.textContent = `${data.artist.name} – ${data.title}`;
    } else {
      currentSongElement.textContent = "Keine Songinformationen verfügbar.";
    }
  } catch (error) {
    currentSongElement.textContent = "Fehler beim Laden des Songs.";
    console.error(error);
  }
}

fetchCurrentSong();
setInterval(fetchCurrentSong, 30000); // alle 30 Sekunden aktualisieren

// --- Laut.fm API - Jetzt laufender Song (wenn Element existiert) ---
const currentSongElement = document.getElementById("current-song");

async function fetchCurrentSong() {
  try {
    const response = await fetch("https://api.laut.fm/station/edmfm/current_song");
    const data = await response.json();

    if (data && data.title && data.artist) {
      currentSongElement.textContent = `${data.artist.name} – ${data.title}`;
    } else {
      currentSongElement.textContent = "Keine Songinformationen verfügbar.";
    }
  } catch (error) {
    currentSongElement.textContent = "Fehler beim Laden des Songs.";
    console.error(error);
  }
}

// --- Cookie Banner Steuerung ---
function showCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  banner.style.display = "flex";
}

function hideCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  banner.style.display = "none";
}

function hasAcceptedCookies() {
  return localStorage.getItem("edmfm_cookies_accepted") === "true";
}

function acceptCookies() {
  localStorage.setItem("edmfm_cookies_accepted", "true");
  hideCookieBanner();
  enablePlayerAndAPI();
}

function disablePlayerAndAPI() {
  // Player ausblenden
  const player = document.querySelector(".player-container");
  if (player) player.style.display = "none";

  // Songanzeige verstecken
  if (currentSongElement) currentSongElement.textContent = "Cookie-Einstellungen erforderlich, um Player und Songinfos zu sehen.";
}

function enablePlayerAndAPI() {
  // Player anzeigen
  const player = document.querySelector(".player-container");
  if (player) player.style.display = "block";

  // Song anzeigen & starten
  if (currentSongElement) fetchCurrentSong();
}

// --- Initialisierung beim Laden ---
document.addEventListener("DOMContentLoaded", () => {
  if (!hasAcceptedCookies()) {
    disablePlayerAndAPI();
    showCookieBanner();
  } else {
    if (currentSongElement) {
      fetchCurrentSong();
      setInterval(fetchCurrentSong, 30000);
    }
  }

  // Cookie-Banner Button Event
  const acceptBtn = document.getElementById("cookie-accept");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", acceptCookies);
  }
});
