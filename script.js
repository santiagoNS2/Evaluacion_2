// Función para obtener información del Pokémon
async function getPokemonInfo(pokemonName) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = response.data;
        
        // Extraer tipo
        const types = pokemonData.types.map(type => type.type.name);
        const typeInfo = types.join(', ');

        // Descripción: Obtener la descripción del species endpoint
        const speciesUrl = pokemonData.species.url;
        const speciesResponse = await axios.get(speciesUrl);
        const speciesData = speciesResponse.data;
        const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text;
        const pokemonImg = document.querySelector('.pokemonImg');

        // Dentro del bloque try-catch
        pokemonImg.src = pokemonData.sprites.front_default;
        
        // Habilidades
        const abilities = pokemonData.abilities.map(ability => ability.ability.name);
        const abilitiesInfo = abilities.join(', ');
        document.querySelector('.containerEvolution').style.display = 'block';

        return { type: typeInfo, description: description, abilities: abilitiesInfo };
    } catch (error) {
        console.error('Error al obtener información del Pokémon:', error);
        throw error;
    }
}

// Evento clic del botón de búsqueda
const searchButton = document.querySelector('.buttonSearch');
searchButton.addEventListener('click', async () => {
    const pokemonName = document.getElementById('in1').value.trim().toLowerCase();

    try {
        const pokemonInfo = await getPokemonInfo(pokemonName);

        // Actualizar la interfaz con la información obtenida
        document.querySelector('.pokemonName').textContent = pokemonName.toUpperCase();
        document.querySelector('.pokemonType').textContent = pokemonInfo.type;
        document.querySelector('.pokemonDescrition').textContent = pokemonInfo.description;
        document.querySelector('.pokemonAbilities').textContent = pokemonInfo.abilities;

        // Mostrar el contenedor de información y ocultar el de error
        document.querySelector('.containerInfo').style.display = 'block';
        document.querySelector('.containerError').style.display = 'none';
    } catch (error) {
        // Mostrar el contenedor de error y ocultar el de información
        document.querySelector('.containerError').style.display = 'block';
        document.querySelector('.containerInfo').style.display = 'none';
    }
});

// Función para obtener información de la evolución del Pokémon
async function getPokemonEvolution(pokemonName) {
  try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      console.log(response);
      const pokemonData = response.data;
      
      // Obtener URL de la cadena de evolución
      const speciesUrl = pokemonData.species.url;
      const speciesResponse = await axios.get(speciesUrl);
      const speciesData = speciesResponse.data;
      const evolutionChainUrl = speciesData.evolution_chain.url;

      // Obtener información de la cadena de evolución
      const evolutionChainResponse = await axios.get(evolutionChainUrl);
      const evolutionChainData = evolutionChainResponse.data;

      // Procesar la información de la cadena de evolución
      // Aquí puedes extraer la información relevante sobre las evoluciones
      // y actualizar la interfaz de usuario en consecuencia
      console.log(evolutionChainData);

  } catch (error) {
      console.error('Error al obtener información de la evolución del Pokémon:', error);
      throw error;
  }
}

// Asociar evento clic al botón de evolución
const evolutionButton = document.getElementById('evolutionButton');
evolutionButton.addEventListener('click', async () => {
  const pokemonName = document.getElementById('in1').value.trim().toLowerCase();

  try {
      await getPokemonEvolution(pokemonName);
  } catch (error) {
      // Manejar errores
  }
});

