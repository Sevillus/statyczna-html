document.addEventListener('DOMContentLoaded', () => {

    const dataContainer = document.getElementById('data-container');
    const unsplashAccessKey = 'TsbszjCfuMceKpo90pkigdDRdfLBiWypn0ZjkhBigwU';

    // Funkcja do symulacji opóźnienia, która spowolni TTI i TBT
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Celowe, nieoptymalne pobieranie danych i renderowanie
    async function loadData() {
        // Symulacja długiego opóźnienia sieci
        await delay(3000);

        try {
            // Zmienione API na Unsplash, które zapewnia poprawne i stabilne adresy URL obrazów.
            const response = await fetch(`https://api.unsplash.com/photos?per_page=30&client_id=${unsplashAccessKey}`);
            const data = await response.json();

            // Usunięcie spinnera po pobraniu danych
            dataContainer.innerHTML = '';

            // Renderowanie elementów w sposób, który generuje CLS (zmiana layoutu)
            data.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'col-sm-6 col-md-4 col-lg-3';
                card.innerHTML = `
                    <div class="card h-100">
                        <img src="${item.urls.small}" class="card-img-top" alt="${item.alt_description}">
                        <div class="card-body">
                            <h5 class="card-title">${item.user.name}</h5>
                            <p class="card-text">Autor: ${item.user.username}</p>
                        </div>
                    </div>
                `;
                dataContainer.appendChild(card);
            });

            // Celowe dodanie dużego, blokującego zadania po załadowaniu danych
            // To mocno wpłynie na TBT
            let heavyLoopResult = 0;
            for (let i = 0; i < 50000000; i++) {
                heavyLoopResult += Math.sqrt(i);
            }
            console.log("Ciężka pętla zakończona. Wynik:", heavyLoopResult);

        } catch (error) {
            console.error('Błąd podczas ładowania danych:', error);
            dataContainer.innerHTML = `<p class="text-danger">Nie udało się załadować danych. Spróbuj ponownie później.</p>`;
        }
    }

    // Wywołanie funkcji, która rozpoczyna ładowanie
    loadData();
});