const fs = require('fs');
const axios = require('axios');
const { types } = require('util');

async function generateJsonDB() {
  // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  const pokemonApiURL = 'https://pokeapi.co/api/v2/pokemon?limit=100';
  // fetch API
  try {
    const response = await axios.get(pokemonApiURL);

    const resultPokemon = [];

    for (const pokemon of response.data.results) {
      const pokemonDetailResponse = await axios.get(pokemonApiURL);

      resultPokemon.push({
        id: pokemonDetailResponse.data.id,
        name: pokemonDetailResponse.data.name,
        types: pokemonDetailResponse.data.types.map((e) => e.type.name),
      });
    }

    // write data ke db.json
    const sample = {
      pokemon: [],
    };

    sample.pokemon = resultPokemon;

    fs.writeFileSync('db.json', JSON.stringify(sample, null, 2));
  } catch {
    console.log('gambar tidak berhasil di simpan');
  }
}
generateJsonDB();
