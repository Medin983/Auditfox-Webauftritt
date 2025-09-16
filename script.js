document.addEventListener('DOMContentLoaded', () => {
    // --- BESTEHENDE ELEMENTE ---
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const ausgewaehlteOptionenListe = document.getElementById('ausgewaehlte-optionen');
    const gesamtkostenEinmaligAnzeige = document.getElementById('gesamtkosten-einmalig');
    const gesamtkostenMonatlichAnzeige = document.getElementById('gesamtkosten-monatlich');

    // --- NEUE ELEMENTE ---
    // Die Checkbox für die spezielle Analyse-Option
    const analyseCheckbox = document.getElementById('website-analyse');
    // Der Haupt-Button am Ende des Konfigurators
    const anfrageButton = document.querySelector('#zusammenfassung button');

    function aktualisiereZusammenfassung() {
        let kostenEinmalig = 0;
        let kostenMonatlich = 0;
        ausgewaehlteOptionenListe.innerHTML = '';

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const preis = parseFloat(checkbox.value);
                const kostentyp = checkbox.dataset.costType;

                if (kostentyp === 'einmalig') {
                    kostenEinmalig += preis;
                } else if (kostentyp === 'monatlich') {
                    kostenMonatlich += preis;
                }

                const listenEintrag = document.createElement('li');
                const labelText = document.querySelector(`label[for="${checkbox.id}"]`).textContent;
                listenEintrag.textContent = labelText;
                ausgewaehlteOptionenListe.appendChild(listenEintrag);
            }
        });

        gesamtkostenEinmaligAnzeige.textContent = kostenEinmalig.toFixed(2);
        gesamtkostenMonatlichAnzeige.textContent = kostenMonatlich.toFixed(2);
    }

    // --- NEUE LOGIK FÜR DEN BUTTON-KLICK ---
    anfrageButton.addEventListener('click', () => {
        // Prüfen, ob die Website-Analyse ausgewählt wurde.
        if (analyseCheckbox.checked) {
            // **PHASE 1: Bezahlung simulieren**
            // In einer echten Anwendung würde hier die Weiterleitung zu einem
            // Bezahldienstleister wie Stripe oder PayPal stattfinden.
            // Wir simulieren das mit einer einfachen Bestätigungs-Box.
            const bestaetigung = confirm(
                "Sie haben die Website-Analyse ausgewählt.\n\n" +
                "Sie werden nun zur 'Bezahlung' weitergeleitet. " +
                "Da dies eine Demo ist, simulieren wir diesen Schritt und leiten Sie direkt zur Dateneingabe weiter.\n\n" +
                "Fortfahren?"
            );

            if (bestaetigung) {
                // **PHASE 2: Weiterleitung zur neuen Seite**
                // Wenn der Nutzer bestätigt, leiten wir ihn zur analyse.html Seite weiter.
                window.location.href = 'analyse.html';
            }
         // Ersetze den alten 'else'-Block hiermit:
} else {
    // FALLBACK: Wenn die Analyse NICHT ausgewählt wurde
    
    // 1. Sammle die Namen aller ausgewählten Optionen
    const ausgewaehlteOptionen = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const labelText = document.querySelector(`label[for="${checkbox.id}"]`).textContent;
            ausgewaehlteOptionen.push(labelText);
        }
    });

    if (ausgewaehlteOptionen.length > 0) {
        // 2. Baue die URL für die Kontaktseite zusammen
        // encodeURIComponent stellt sicher, dass auch Sonderzeichen korrekt übertragen werden.
        const queryString = ausgewaehlteOptionen.map(opt => encodeURIComponent(opt)).join(',');
        
        // 3. Leite den Nutzer zur Kontaktseite weiter und hänge die Auswahl als URL-Parameter an
        window.location.href = `kontakt.html?auswahl=${queryString}`;

    } else {
        // Wenn gar nichts ausgewählt wurde
        alert("Bitte wählen Sie mindestens eine Option aus, bevor Sie eine Anfrage stellen.");
    }
}

    });

    // Event Listener für die Checkboxen bleiben wie gehabt
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', aktualisiereZusammenfassung);
    });

    // Initiale Berechnung beim Laden der Seite
    aktualisiereZusammenfassung();
});
