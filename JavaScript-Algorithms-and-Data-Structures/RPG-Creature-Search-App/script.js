document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonId = document.getElementById('pokemon-id');
    const weight = document.getElementById('weight');
    const height = document.getElementById('height');
    const types = document.getElementById('types');
    const hp = document.getElementById('hp');
    const attack = document.getElementById('attack');
    const defense = document.getElementById('defense');
    const specialAttack = document.getElementById('special-attack');
    const specialDefense = document.getElementById('special-defense');
    const speed = document.getElementById('speed');
    const spriteContainer = document.getElementById('sprite-container');

    searchButton.addEventListener('click', async () => {
        try {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (!searchTerm) return;

            // Clear previous results
            spriteContainer.innerHTML = '';
            
            const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchTerm}`);
            if (!response.ok) throw new Error('Pokémon not found');

            const data = await response.json();

            // Update Pokémon info
            pokemonName.textContent = data.name.toUpperCase();
            pokemonId.textContent = `#${data.id}`;
            weight.textContent = `Weight: ${data.weight}`;
            height.textContent = `Height: ${data.height}`;

            // Clear and update types
            types.innerHTML = '';
            data.types.forEach(type => {
                const typeElement = document.createElement('span');
                typeElement.textContent = type.type.name.toUpperCase();
                types.appendChild(typeElement);
            });

            // Update stats
            data.stats.forEach(stat => {
                switch (stat.stat.name) {
                    case 'hp':
                        hp.textContent = stat.base_stat;
                        break;
                    case 'attack':
                        attack.textContent = stat.base_stat;
                        break;
                    case 'defense':
                        defense.textContent = stat.base_stat;
                        break;
                    case 'special-attack':
                        specialAttack.textContent = stat.base_stat;
                        break;
                    case 'special-defense':
                        specialDefense.textContent = stat.base_stat;
                        break;
                    case 'speed':
                        speed.textContent = stat.base_stat;
                        break;
                }
            });

            // Update sprite image (fixed section)
            const spriteImg = document.createElement('img');
            spriteImg.id = 'sprite';
            spriteImg.src = data.sprites.front_default;
            spriteContainer.appendChild(spriteImg);

        } catch (error) {
            alert(error.message);
        }
    });
});