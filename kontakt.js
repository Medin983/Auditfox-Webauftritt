document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTE FINDEN ---
    const auswahlContainer = document.getElementById('auswahl-zusammenfassung');
    // NEU: Den gesamten Abschnitt finden, den wir ausblenden wollen
    const auswahlSektion = document.getElementById('auswahl-sektion');
    
    // --- LOGIK ---
    
    // 1. URL-Parameter auslesen
    const urlParams = new URLSearchParams(window.location.search);
    const auswahl = urlParams.get('auswahl'); // Holt den Wert von z.B. ?auswahl=Social%20Media

    // 2. PRÜFEN, OB EINE AUSWAHL VORHANDEN IST
    if (auswahl && auswahlSektion) {
        // FALL 1: Ja, es gibt eine Auswahl in der URL.
        // -> Zeige die Auswahl an.
        
        const ausgewaehlteOptionen = auswahl.split(',');
        
        auswahlContainer.innerHTML = ''; // Leert den "Lade..." Text
        const liste = document.createElement('ul');
        
        ausgewaehlteOptionen.forEach(option => {
            const listenEintrag = document.createElement('li');
            listenEintrag.textContent = decodeURIComponent(option);
            liste.appendChild(listenEintrag);
        });
        auswahlContainer.appendChild(liste);

    } else if (auswahlSektion) {
        // FALL 2: Nein, die URL ist "sauber" (keine Auswahl).
        // -> Verstecke den gesamten Auswahl-Abschnitt.
        auswahlSektion.style.display = 'none';
    }

    // Die Logik für das Absenden des Formulars bleibt gleich.
    const form = document.getElementById('kontakt-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        alert('Vielen Dank für Ihre Anfrage! In einer echten Anwendung würden diese Daten nun an einen Server gesendet.');
    });
});

