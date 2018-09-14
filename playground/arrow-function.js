// var square = (x) => {
// 	var result = x * x;
// 	return result;
// };

// skrócona wersja 
// var square = (x) => x*x;
// najkórótsza wersja dla funckji z jendym argumentem
var square = x => x*x;
// jesli masz wiecej niż jeden argument, lub nie pdoajesz wcale argumentów, to muszą być nawiasy
console.log(square(9));

var user = {
	name: 'Karol',
	sayHi: () => {
// dla arrow function "arguments", będzie keirowała na globalne arguments, a nie argumenty które przekazuejmy do funkcji czyli (1,2,3)
		console.log(arguments);
// w arrow function, słowo "this" nie keiruje na obiekt, tylko do rodizca, w naszym przypadku będize to globalny obiekt "this"
		console.log(`Hi, I'm ${this.name}`);
	},
// Poniżej inna funkcja z ES6, zauważ , ze zapis jest inny nie ma ":". 
// W tej funkcji słowo kluczowe this, keiruje normlanie na obiekt, a "arguments", to argumenty naszej funkcji (czyli normalnie)
	sayHiAlt () {
		console.log(arguments);
		console.log(`Hi, I'm ${this.name}`);
	}
};

// user.sayHi(1,2,3);
// user.sayHi();
user.sayHiAlt(1,2,3);
user.sayHiAlt();