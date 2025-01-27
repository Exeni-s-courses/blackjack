/*
* 2C = Two of Clubs
* 2D = Two of Diamonds
* 2H = Two of Hearts
* 2S = Two of Spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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
    console.log(deck)
    console.log(carta)
    return carta;
}

pedirCarta();
