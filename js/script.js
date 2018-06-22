class Pokemon {
    constructor(id, name, image, types, height, weight, stats, moves) {
        this._id = id;
        this._name = name;
        this._image = image;
        this._types = types;
        this._height = height;
        this._weight = weight;
        this._stats = stats;
        this._moves = moves;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name
    }

    getImage() {
        return this._image;
    }

    getTypes() {
        return this._types;
    }

    getHeight() {
        return this._height;
    }

    getWeight() {
        return this._weight;
    }

    getStats() {
        return this._stats;
    }

    getMoves() {
        return this._moves;
    }


    toString() {
        return this._name + "! A pokemon of " + this._types.map(a => a.getName()) + " type!";
    }
}

class Type {
    constructor() {

    }

    setName(name) {
        this._name = name;
    }

    getName() {
        return this._name;
    }
}

class Stats {
    constructor(speed, specialDefense, specialAttack, defense, attack, hp, accuracy, evasion) {

        this._speed = speed;
        this._specialDefense = specialDefense;
        this._specialAttack = specialAttack;
        this._defense = defense;
        this._attack = attack;
        this._hp = hp;
        this._accuracy = accuracy;
        this._evasion = evasion;
    }

    getEvasion() {
        return this._evasion;
    }

    getAccuracy() {
        return this._accuracy;
    }

    getSpeed() {
        return this._speed;
    }

    getSpecialDefense() {
        return this._specialDefense;
    }

    getSpecialAttack() {
        return this._specialAttack;
    }

    getDefense() {
        return this._defense;
    }

    getAttack() {
        return this._attack;
    }

    getHP() {
        return this._hp;
    }

    setEvasion(evasion) {
        this._evasion = evasion;
    }

    setAccuracy(accuracy) {
        this._accuracy = accuracy;
    }
}

class Move {
    constructor(name, accuracy, pp, priority, power, statChanges) {
        this._name = name;
        this._accuracy = accuracy;
        this._pp = pp;
        this._priority = priority;
        this._power = power;
        this._statChanges = statChanges; //type is Stats
    }

    getName() {
        return this._name;
    }

    getAccuracy() {
        return this._accuracy;
    }

    getPP() {
        return this._pp;
    }

    getPriority() {
        return this._priority;
    }

    getPower() {
        return this._power;
    }

    getStatChanges() {
        return this._statChanges;
    }

}

//const $pokemons = $("#pokemons");
const addPokemon = (pokemon) => {
    document.getElementById("idpokemon").innerHTML = "#" + pokemon.getId();
    document.getElementById("pokename").innerHTML = pokemon.getName();
    document.getElementById("pokeimage").src = pokemon.getImage();
    document.getElementById("type").innerHTML = pokemon.getTypes().map(a => a.getName());
    document.getElementById("height").innerHTML = pokemon.getHeight();
    document.getElementById("weight").innerHTML = pokemon.getWeight();
    document.getElementById("hp").innerHTML = pokemon.getStats().getHP();
    document.getElementById("attack").innerHTML = pokemon.getStats().getAttack();
    document.getElementById("defense").innerHTML = pokemon.getStats().getDefense();
    document.getElementById("spattack").innerHTML = pokemon.getStats().getSpecialAttack();
    document.getElementById("spdefense").innerHTML = pokemon.getStats().getSpecialDefense();
    document.getElementById("speed").innerHTML = pokemon.getStats().getSpeed();

    //responsiveVoice.speak(pokemon.toString());
};

const searchPokemon = (event) => {
    event.preventDefault();
    var param = document.getElementById("pokenumber").value;
    var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + param;

    $.ajax({
        url: pokeURL,
        dataType: 'json',
        cache: true,
    }).then(data => {
        const types = createArrayType(data.types);

        const stats = new Stats(data.stats[0].base_stat,
            data.stats[1].base_stat,
            data.stats[2].base_stat,
            data.stats[3].base_stat,
            data.stats[4].base_stat,
            data.stats[5].base_stat, 0, 0);
        //var moves= [];
        for (var i = 0; i < 4; i++) {
            searchMove(data.moves[Math.floor(0 + Math.random() * data.moves.length)].move.url);
        }

        const pokemon = new Pokemon(
            data.id,
            data.name.toUpperCase(),
            data.sprites.front_default,
            types,
            data.height,
            data.weight,
            stats,
            0);

        addPokemon(pokemon);
    }).catch(e => console.log(e));


}

const searchMove = (url) => {

    $.ajax({
        url: url,
        dataType: 'json',
    }).then(data => {
        //name,accuracy,pp,priority,power,statChanges
        var stat_changes = createStatChanges(data.stat_changes);
        let move = new Move(data.name,
            data.accuracy,
            data.pp,
            data.priority,
            data.power,
            stat_changes);
        console.log(move.getName());

    }).catch(e => console.log(e));

}

function createArrayType(data) {
    var types = [];
    var type = new Type();
    data.forEach(function(element) {
        type.setName(element.type.name);
        types.push(type);
        type = new Type();
    });
    return types;
}

function createStatChanges(data) {
    let stats = new Stats(0, 0, 0, 0, 0, 0, 0, 0);
    for (var i = 0; i < data.length; i++) {
        if (data[i].stat.name == "evasion") {
            stats.setEvasion(data[i].change);
        }
        if (data[i].stat.name == "accuracy") {
            stats.setAccuracy(data[i].change)
        }
    }
}
window.onload = function() {
	document.getElementById("pokeform").addEventListener('submit', searchPokemon);
}