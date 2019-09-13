'use strict';

const apiKey = '060071d5c8bbe11146458f85d1ee1545'; 

function upperCase(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayStats(responseJson,searchTerm) {
  // if there are previous results, remove them
  $('#stats-list').empty();
  $('.pokemonImage').empty();
  const search=upperCase(searchTerm);
  console.log(`getStats run`);
  let id=0;
  for (let i = 0; i < responseJson.length+1; i++){
    if(i===responseJson.length){
      alert("Please enter a number between 1 & 493 or a correct pokemon name!");
      break;
    }
    if((search===responseJson[i].pokemon_name)||(search==responseJson[i].pokemon_id)){
        id=responseJson[i].pokemon_id;
        if (id<10){
            console.log(id);
            $('.pokemonImage').append(
                `<img class="resultImage" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${id}.png"></img>`
            )
        }
        else if (id<100){
            $('.pokemonImage').append(
                `<img class="resultImage" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${id}.png"></img>`
            )
        }
        else{
            $('.pokemonImage').append(
                `<img class="resultImage" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"></img>`
            )
        }
      $('#stats-list').append(
        `<li>
        <p>Name: ${responseJson[i].pokemon_name}</p>
        <p>ID: ${responseJson[i].pokemon_id}</p>
        <p>Base stamina: ${responseJson[i].base_stamina}</p>
        <p>Base attack: ${responseJson[i].base_attack}</p>
        <p>Base defense: ${responseJson[i].base_defense}</p> 
        </li>`
      )
      break;
    }
  }
  //display the results section  
  $('#results').removeClass('hidden');
  getMaxCP(search);
};

function displayType(responseJson,type) {
    // if there are previous results, remove them
    $('#type-list').empty();
    // iterate through the items array
    console.log(`getType run`);
    const searchTerm = upperCase($('#js-search-term').val());
    for (let i = 0; i < responseJson.length; i++){
        
      if((searchTerm===responseJson[i].pokemon_name)||(searchTerm==responseJson[i].pokemon_id)){
        type=responseJson[i].type;
        $('#type-list').append(
          `<li>
            <p>Type: ${responseJson[i].type}</p>
          </li>`
        )
        break;
      };
    }
    //display the results section  
  
    if(type!==""){
    displayWeatherBoost(type);
    getFastMoves(type);
    getChargedMoves(type);
    }
    else{
      $('#results').empty();
    }
};

function checkWeatherBoost(type, weatherBoost){
    if(type==="Fire" || type==="Ground" || type==="Grass"){
        weatherBoost.push(' Clear');
        weatherBoost.push(' Sunny');

    }
    else if(type==="Fairy" || type==="Fighting" || type==="Poison"){
        weatherBoost.push(' Cloudy');
    }
    else if(type==="Dark" || type==="Ghost"){
        weatherBoost.push(' Fog');
    }
    else if(type==="Normal" || type==="Rock"){
        weatherBoost.push(' Partly cloudy');
    }
    else if(type==="Water" || type==="Electric" || type==="Bug"){
        weatherBoost.push(' Rain');
    }
    else if(type==="Ice" || type==="Steel"){
        weatherBoost.push(' Snow');
    }
    else{
        weatherBoost.push(' Wind');
    }
}

function displayWeatherBoost(type) {
    // if there are previous results, remove them
    $('#weather-boost').empty();
    console.log(`get weather boost run`);
    let weatherBoost=[];
    for(let i=0;i<type.length;i++){
        checkWeatherBoost(type[i],weatherBoost);
    }
    $('#type-list').append(
        `<li>
          <p>Weather boost: ${weatherBoost} </p>
        </li>`
      
    );
    //display the results section  
    
};

function displayFastMoves(responseJson,type) {
    // if there are previous results, remove them
    $('#fastMoves').empty();
    console.log(`get fastMoves run`);
    let fastMoves=[];
    for(let j=0;j<type.length;j++){
      for(let i=0;i<responseJson.length;i++){
        if(responseJson[i].type===type[j]){
            fastMoves.push(` ${responseJson[i].name}`);
        };
      };
    };
    $('#fastMoves').append(
        `<li>
          <p>Available Fast Moves: ${fastMoves}</p>
        </li>` 
      );
    //display the results section  
    
};

function displayChargedMoves(responseJson,type) {
    // if there are previous results, remove them
    $('#chargedMoves').empty();
    console.log(`get chargedMoves run`);
    let chargedMoves=[];
    for(let j=0;j<type.length;j++){
      for(let i=0;i<responseJson.length;i++){
        if(responseJson[i].type===type[j]){
            chargedMoves.push(` ${responseJson[i].name}`);
        };
      };
    };
    $('#chargedMoves').append(
        `<li>
          <p>Available Charged Moves: ${chargedMoves}</p>
        </li>` 
      );
    //display the results section  
    
};

function displayMaxCP(responseJson,search) {
    // if there are previous results, remove them
    $('#maxCP').empty();
    console.log(`get maxCP run`);
    for (let i = 0; i < responseJson.length; i++){
        
      if((search===responseJson[i].pokemon_name)||(search==responseJson[i].pokemon_id)){
        $('#maxCP').append(
          `<li>
            <p>Max CP: ${responseJson[i].max_cp}</p>
          </li>`
        )
        break;
      };
    }
    //display the results section  
    
  };

function getStats(searchTerm) {
 fetch("https://pokemon-go1.p.rapidapi.com/pokemon_stats.json", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
    "x-rapidapi-key": "935ab9b124msh8b93394ade8e428p1fad5cjsn69a9af23101c"
  },
}, {mode: "no-cors"})
.then(response => response.json())
.then(stats => displayStats(stats,searchTerm))
.catch(err => {
	console.log(err);
}); 
}

function getType(type) {
    fetch("https://pokemon-go1.p.rapidapi.com/pokemon_types.json", {
      
       "method": "GET",
       "headers": {
           "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
           "x-rapidapi-key": "935ab9b124msh8b93394ade8e428p1fad5cjsn69a9af23101c"
       },
   }, {mode: "no-cors"})
   .then(response => response.json())
   .then(responseJson => displayType(responseJson,type))
   .catch(err => {
       console.log(err);
   }); 
}

function getFastMoves(type) {
    fetch("https://pokemon-go1.p.rapidapi.com/fast_moves.json", {
       "method": "GET",
       "headers": {
           "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
           "x-rapidapi-key": "935ab9b124msh8b93394ade8e428p1fad5cjsn69a9af23101c"
       },
   }, {mode: "no-cors"})
   .then(response => response.json())
   .then(fastMoves => displayFastMoves(fastMoves,type))
   .catch(err => {
       console.log(err);
   }); 
}

function getChargedMoves(type) {
    fetch("https://pokemon-go1.p.rapidapi.com/charged_moves.json", {
       "method": "GET",
       "headers": {
           "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
           "x-rapidapi-key": "935ab9b124msh8b93394ade8e428p1fad5cjsn69a9af23101c"
       },
   }, {mode: "no-cors"})
   .then(response => response.json())
   .then(chargedMoves => displayChargedMoves(chargedMoves,type))
   .catch(err => {
       console.log(err);
   }); 
}

function getMaxCP(search) {
    fetch("https://pokemon-go1.p.rapidapi.com/pokemon_max_cp.json", {
       "method": "GET",
       "headers": {
           "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
           "x-rapidapi-key": "935ab9b124msh8b93394ade8e428p1fad5cjsn69a9af23101c"
       },
   }, {mode: "no-cors"})
   .then(response => response.json())
   .then(maxCP => displayMaxCP(maxCP,search))
   .catch(err => {
       console.log(err);
   }); 
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    let type="";
    getStats(searchTerm);
    getType(type);
  });
}

$(watchForm);