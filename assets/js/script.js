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
