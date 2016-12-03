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

function getOutputIndexes(offset, limit)
{
	const defaultOffset = 0;
	const defaultLimit = 20;
	var cur_offset;
	var cur_limit;
	var indexes = {};

	if (offset!==undefined)
		cur_offset = (+offset || 0);
	else
		cur_offset = defaultOffset;

	if (limit!==undefined)
		cur_limit = (+limit || 0);
	else
		cur_limit = defaultLimit;

	indexes['startIndex'] = cur_offset;
	indexes['finishIndex'] = cur_offset + cur_limit;
	console.log(indexes);
	return indexes;
}

app.get('/task3C', async (req, res) => {
	const sortPokemons = _.sortBy(pokemons, pokemon => pokemon.name);
	const pokemonNames = getPokemonNames(sortPokemons);
	const outputIndexes = getOutputIndexes(req.query.offset, req.query.limit);
	return res.json(pokemonNames.slice(outputIndexes.startIndex, outputIndexes.finishIndex));
});

app.get('/task3C/huge', async (req, res) => {
	const sortPokemons = _.orderBy(pokemons, ['height', 'name'], ['desc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	const outputIndexes = getOutputIndexes(req.query.offset, req.query.limit);
	return res.json(pokemonNames.slice(outputIndexes.startIndex, outputIndexes.finishIndex));
});

app.get('/task3C/micro', async (req, res) => {
	const sortPokemons = _.orderBy(pokemons, ['height', 'name'], ['asc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	const outputIndexes = getOutputIndexes(req.query.offset, req.query.limit);
	return res.json(pokemonNames.slice(outputIndexes.startIndex, outputIndexes.finishIndex));
});

app.get('/task3C/light', async (req, res) => {
	const sortPokemons = _.orderBy(pokemons, ['weight', 'name'], ['asc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	const outputIndexes = getOutputIndexes(req.query.offset, req.query.limit);
	return res.json(pokemonNames.slice(outputIndexes.startIndex, outputIndexes.finishIndex));
});

app.get('/task3C/heavy', async (req, res) => {
	const sortPokemons = _.orderBy(pokemons, ['weight', 'name'], ['desc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	const outputIndexes = getOutputIndexes(req.query.offset, req.query.limit);
	return res.json(pokemonNames.slice(outputIndexes.startIndex, outputIndexes.finishIndex));
});

app.get('/task3C/angular', async (req, res) => {
	const PokemonsWithFat = getPokemonWithFats(pokemons);
	const sortPokemons = _.orderBy(PokemonsWithFat, ['fat', 'name'], ['asc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	const outputIndexes = getOutputIndexes(req.query.offset, req.query.limit);
	return res.json(pokemonNames.slice(outputIndexes.startIndex, outputIndexes.finishIndex));
});

app.get('/task3C/fat', async (req, res) => {
	const PokemonsWithFat = getPokemonWithFats(pokemons);
	const sortPokemons = _.orderBy(PokemonsWithFat, ['fat', 'name'], ['desc', 'asc']);
	const pokemonNames = getPokemonNames(sortPokemons);
	const outputIndexes = getOutputIndexes(req.query.offset, req.query.limit);
	return res.json(pokemonNames.slice(outputIndexes.startIndex, outputIndexes.finishIndex));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
