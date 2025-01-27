/*
* 2C = Two of Clubs
* 2D = Two of Diamonds
* 2H = Two of Hearts
* 2S = Two of Spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// DOM

const [nuevoBtn, pedirBtn, detenerBtn] = document.querySelectorAll('.btn');
const [ptsJugador, ptsComputadora] = document.querySelectorAll('small');

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
    console.log(deck)
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


// Eventos

// Una función que se manda como argumento o parametro se llama callback
pedirBtn.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    console.log(puntosJugador)

    ptsJugador.innerText = puntosJugador;

})