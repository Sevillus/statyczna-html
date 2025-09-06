// Celowo pusty, ale ciężki do parsowania skrypt, który blokuje renderowanie
console.log("To jest dodatkowy, ciężki skrypt.");
// Poniższy kod celowo symuluje blokowanie wątku głównego
function heavyTask() {
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
        result += Math.random();
    }
    console.log("Ciężkie zadanie w tle zakończone.");
}
heavyTask();