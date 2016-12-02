import express from 'express';
import cors from 'cors';
import _ from 'lodash';


const app = express();
app.use(cors());

const pokemons = require('./pokemons.json');

function getPokemonNames(input_array)
{
	var pokemonNames = [];
	for (var i=0; i<input_array.length; i++)
	{
		//console.log(input_array[i].name);
		pokemonNames.push(input_array[i].name);
	}
	return pokemonNames;
}

function getPokemonWithFats(input_array)
{
	var pokemonWithFats = [];
	for (var i=0; i<input_array.length; i++)
	{
		pokemonWithFats.push({ 'name': input_array[i].name, 'fat': input_array[i].height>0 ? input_array[i].weight / input_array[i].height : 0});
	}
	console.log(pokemonWithFats);
	return pokemonWithFats;
}


app.get('/task3C', async (req, res) => {
	const sortPokemons = _.sortBy(pokemons, pokemon => pokemon.name);
	const pokemonNames = getPokemonNames(sortPokemons);
	var limit;
	var offset;
	if (req.query.limit!==undefined)
		limit = (+req.query.limit || 0);
	else
		limit = 20;

	if (req.query.offset!==undefined)
		offset = (+req.query.offset || 0);
	else
		offset = 0;
	return res.json(pokemonNames.slice(offset, offset + limit));
});

app.get('/task3C/huge', async (req, res) => {
	const sortPokemons = _.orderBy(pokemons, ['height', 'name'], ['desc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	var limit;
	var offset;
	if (req.query.limit!==undefined)
		limit = (+req.query.limit || 0);
	else
		limit = 20;

	if (req.query.offset!==undefined)
		offset = (+req.query.offset || 0);
	else
		offset = 0;
	return res.json(pokemonNames.slice(offset, offset + limit));
});

app.get('/task3C/micro', async (req, res) => {
	const sortPokemons = _.orderBy(pokemons, ['height', 'name'], ['asc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	var limit;
	var offset;
	if (req.query.limit!==undefined)
		limit = (+req.query.limit || 0);
	else
		limit = 20;

	if (req.query.offset!==undefined)
		offset = (+req.query.offset || 0);
	else
		offset = 0;
	return res.json(pokemonNames.slice(offset, offset + limit));
});

app.get('/task3C/light', async (req, res) => {
	const sortPokemons = _.orderBy(pokemons, ['weight', 'name'], ['asc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	var limit;
	var offset;
	if (req.query.limit!==undefined)
		limit = (+req.query.limit || 0);
	else
		limit = 20;

	if (req.query.offset!==undefined)
		offset = (+req.query.offset || 0);
	else
		offset = 0;
	return res.json(pokemonNames.slice(offset, offset + limit));
});

app.get('/task3C/heavy', async (req, res) => {
	const sortPokemons = _.orderBy(pokemons, ['weight', 'name'], ['desc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	var limit;
	var offset;
	if (req.query.limit!==undefined)
		limit = (+req.query.limit || 0);
	else
		limit = 20;

	if (req.query.offset!==undefined)
		offset = (+req.query.offset || 0);
	else
		offset = 0;
	return res.json(pokemonNames.slice(offset, offset + limit));
});

app.get('/task3C/angular', async (req, res) => {
	const PokemonsWithFat = getPokemonWithFats(pokemons);
	const sortPokemons = _.orderBy(PokemonsWithFat, ['fat', 'name'], ['asc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	var limit;
	var offset;
	if (req.query.limit!==undefined)
		limit = (+req.query.limit || 0);
	else
		limit = 20;

	if (req.query.offset!==undefined)
		offset = (+req.query.offset || 0);
	else
		offset = 0;
	return res.json(pokemonNames.slice(offset, offset + limit));
});

app.get('/task3C/fat', async (req, res) => {
	const PokemonsWithFat = getPokemonWithFats(pokemons);
	const sortPokemons = _.orderBy(PokemonsWithFat, ['fat', 'name'], ['desc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	var limit;
	var offset;
	if (req.query.limit!==undefined)
		limit = (+req.query.limit || 0);
	else
		limit = 20;

	if (req.query.offset!==undefined)
		offset = (+req.query.offset || 0);
	else
		offset = 0;
	return res.json(pokemonNames.slice(offset, offset + limit));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
