// ## **Part 1: Number Facts**

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the ***json*** query key, specific to this API. [Details](http://numbersapi.com/#json).

// Call NumbersAPI to get facts about number 24
async function oneNumber() {
    try{
        // call the api
        let res = await axios.get("http://numbersapi.com/24#json")
        // console the response
        console.log("CALL NUMBERSAPI ON THE NUMBER 24:")
        console.log(res.data)
    }
    catch (e) {
        console.log("Error", e)
    }
}

oneNumber()

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

async function numbersOnPage() {
    try{
        let URL_List = [
            "http://numbersapi.com/24#json", 
            "http://numbersapi.com/52#json", 
            "http://numbersapi.com/48#json", 
            "http://numbersapi.com/95#json", 
            "http://numbersapi.com/48#json"
        ]

        // create ul to append items to
        let $ul = $('<ul></ul>');

        // call the api for each url in the list
        for (let url of URL_List){
            let res = await axios.get(url);
            // add li to the ul
            let $li = $('<li></li>').text(res.data);
            $ul.append($li);
        }

        // append the ul to the website
        $('.list_of_nums').append($ul);
    }
    catch (e) {
        console.log("Error", e)
    }
}

numbersOnPage();

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
//     *(Note: You’ll need to make multiple requests for this.)*

async function sameNumbersOnPage() {
    try{
        let URL = "http://numbersapi.com/24#json";

        // create ul to append items to
        let $ul = $('<ul></ul>');

        // call the api 4 times on the same url
        let i = 0;
        while (i < 4) {
            let res = await axios.get(URL);
            // add li to the ul
            let $li = $('<li></li>').text(res.data);
            $ul.append($li);
            i++;
        }

        // append the ul to the website
        $('.list_of_nums').append($ul);
    }
    catch (e) {
        console.log("Error", e)
    }
}

sameNumbersOnPage();

// ## **Part 2: Deck of Cards**

// 1. Make a request to the [Deck of Cards API](http://deckofcardsapi.com/) to request a single card from a newly shuffled deck. Once you have the card, ***console.log*** the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

async function singleCard() {
    try{
        let deck = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
        let card = deck.data.cards[0]
        console.log(`SINGLE CARD: ${card.value} OF ${card.suit}`)
    }
    catch (e) {
        console.log("Error", e)
    }
}

singleCard()

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.
//     Once you have both cards, ***console.log*** the values and suits of both cards.

async function twoCards() {
    try{
        let deck = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
        let deck_id = deck.data.deck_id
        let card_1 = deck.data.cards[0]
        let card_2 = deck.data.cards[1]
        console.log(`Deck ID: ${deck_id}. CARD 1: ${card_1.value} OF ${card_1.suit}. CARD 2: ${card_2.value} OF ${card_2.suit}`)
    }
    catch (e) {
        console.log("Error", e)
    }
}

twoCards()

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

async function cardDrawer() {
    try {
        let cards = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=52");
        let curr_card = 0;

        // append a "Draw Card" button to the dom
        $('.card_game').append('<button class="draw_card">Draw Card</button>');

        // function runs when the "Draw Card" button is pressed
        $('.draw_card').on('click', function() {

            // get card at location curr_card
            let new_card = cards.data.cards[curr_card]
            // generate random rotation between -10 and 10 degreea
            let random_rotation = Math.floor(Math.random() * 21) - 10;
            
            // append the card image to the web page
            $('.card_game').append(`<img src="${new_card.image}" class="card_image" style="transform: translate(-50%, -50%) rotate(${random_rotation}deg);"/>`);

            curr_card += 1;

            // remove the button if they drew all 52 cards
            if(curr_card == 51){
                $('.draw_card').remove();
            }

        });
    }
    catch (e) {
        console.log("Error", e)
    }
}

cardDrawer()

// ## **Further Study**

// 1. Figure out how to make a single request to the [Pokemon API](https://pokeapi.co/) to get names and URLs for every pokemon in the database.
// 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, ***console.log*** the data for each pokemon.

async function threeRandomPokemon() {
    try {
        let request_pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon-species?limit=3000&offset=0");

        // store the object of all the pokemon data
        let all_pokemon = request_pokemon.data.results;

        // get 3 random pokemon
        let count = 0
        while (count < 3){
            // get the url of a random pokemon in the object
            let random_pokemon_url = all_pokemon[`${Math.floor(Math.random() * Object.keys(all_pokemon).length) + 1}`].url
            // get the random pokemon from api and log it
            let pokemon = await axios.get(random_pokemon_url)
            console.log("RANDOM POKEMON")
            console.log(pokemon.data)
            count++;
        }
    }
    catch (e) {
        console.log("Error", e)
    }
}

threeRandomPokemon()

// 3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s ***species*** URL (you should see a key of ***species*** in the data). Once *that* request comes back, look in the ***flavor_text_entries*** key of the response data for a description of the species written in English. If you find one, ***console.log*** the name of the pokemon along with the description you found.

//     Example: “ducklett: They are better at swimming than flying, and they happily eat their favorite food, peat moss, as they dive underwater.”

async function threeRandomPokemonDescriptions() {
    try {
        let request_pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon-species?limit=3000&offset=0");

        // store the object of all the pokemon data
        let all_pokemon = request_pokemon.data.results;

        // get 3 random pokemon names and descriptions
        let count = 0
        while (count < 3){
            // get the name of a random pokemon in the object
            let random_pokemon_name = all_pokemon[`${Math.floor(Math.random() * Object.keys(all_pokemon).length) + 1}`].name
            // get the random pokemon species (includes descriptions) from api and log it
            let pokemon_species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${random_pokemon_name}`)
            // variable to store the pokemon's description
            let pokemon_flavor_text = ""
            // get the first description that is in english 'en'
            for(let flavor of pokemon_species.data.flavor_text_entries){
                if (flavor.language.name == 'en'){
                    pokemon_flavor_text = flavor.flavor_text
                    break;
                }
            }
            // log the pokemon name and description
            console.log(`"${random_pokemon_name}: ${pokemon_flavor_text}"`)
            count++;
        }
    }
    catch (e) {
        console.log("Error", e)
    }
}

threeRandomPokemonDescriptions()

// 4. **BONUS** Instead of relying on ***console.log***, let’s create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.

async function pokemonCardGenerator() {
    try {

        // append "Random Pokemon" button to the web page
        $('.pokemon_cards').append('<button class="random_pokemon">Random Pokemon</button>');

        let request_pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon-species?limit=3000&offset=0");

        // store the object of all the pokemon data
        let all_pokemon = request_pokemon.data.results;

        // function for when the "Random Pokemon" button is clicked
        $('.random_pokemon').on('click', async function() {

            // get the name of a random pokemon in the object
            let random_pokemon_name = all_pokemon[`${Math.floor(Math.random() * Object.keys(all_pokemon).length) + 1}`].name

            let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${random_pokemon_name}`)

            // store the pokemon's english description
            let random_pokemon_description = ""
            for(let flavor of pokemon.data.flavor_text_entries){
                if (flavor.language.name == 'en'){
                    random_pokemon_description = flavor.flavor_text
                    break;
                }
            }

            // store the pokemon's id
            let random_pokemon_id = pokemon.data.id
            // request the pokemon's sprites which has the pokemon's image
            let pokemon_sprites = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random_pokemon_id}/`)
            let random_pokemon_image = pokemon_sprites.data.sprites.front_shiny

            // append the pokemon to the page in the form of a card
            $('.pokemon_cards').append(`<div class="pokemon_card">
                <h2>${random_pokemon_name}</h2>
                <img src="${random_pokemon_image}"/>
                <p>${random_pokemon_description}</p>
                </div>`);

        });
    }
    catch (e) {
        console.log("Error", e)
    }
}

pokemonCardGenerator()




