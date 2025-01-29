/*
* 2C = Two of Clubs
* 2D = Two of Diamonds
* 2H = Two of Hearts
* 2S = Two of Spades
*/

(() => {
    'use strict'
    
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0;
    let puntosComputadora = 0;

    // DOM

    const [nuevoBtn, pedirBtn, detenerBtn] = document.querySelectorAll('.btn');
    const [ptsJugador, ptsComputadora] = document.querySelectorAll('small');
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');

    const crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (const tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (const tipo of tipos) {
            for (const especial of especiales) {
                deck.push(especial + tipo);
            }
        }

        deck = _.shuffle(deck);
        return deck;
    }

    crearDeck();

    // Esta función me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        };
        const carta = deck.pop();
        return carta;
    }


    // const valorCarta = (carta) => {
    //     const valor = carta.substring(0, carta.length - 1);
    //     let puntos = 0;
    //     if(isNaN(valor)){
    //         console.log('No es un número');
    //         puntos = ( valor === 'A' ) ? 11 : 10;
    //     } else {
    //         puntos = Number(valor);
    //     }
    //     return puntos;
    // }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : Number(valor)
    }

    const carta = pedirCarta();
    const valor = valorCarta(carta);

    // Logica de la PC
    const turnoPC = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora += valorCarta(carta);
            ptsComputadora.innerText = puntosComputadora;

            const imgCarta = document.createElement('img')
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta')
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana!!');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana!!');
            } else {
                alert('Computadora gana!!');
            }
        }, 100)
    }

    // Eventos
    // Una función que se manda como argumento o parametro se llama callback
    pedirBtn.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador += valorCarta(carta);
        console.log(puntosJugador)

        ptsJugador.innerText = puntosJugador;

        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            pedirBtn.disabled = true;
            turnoPC(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21 GENIAL!');
            pedirBtn.disabled = true;
            detenerBtn.disabled = true;
            turnoPC(puntosJugador);
        }
    });

    detenerBtn.addEventListener('click', () => {
        detenerBtn.disabled = true;
        pedirBtn.disabled = true;
        turnoPC(puntosJugador);
    })

    nuevoBtn.addEventListener('click', () => {
        console.clear()
        deck = [];
        deck = crearDeck();
        detenerBtn.disabled = false;
        pedirBtn.disabled = false;

        puntosJugador = 0;
        puntosComputadora = 0;

        ptsJugador.innerText = 0;
        ptsComputadora.innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

    })
})();

