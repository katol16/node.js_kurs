	// var obj = {
	// 	name: 'Karol'
	// };

// Zamieni nam obiekt js, w obiekt json, 
// który będzie miał pare szczegółów, zwiaznych z jsonem
// np: będzie wszystko w "cydzysłowie", czyli tak {"name":"Karol"}
	// var stringObj = JSON.stringify(obj);

// zwróci typ "string"
	// console.log(typeof stringObj);
	// console.log(stringObj);

// mamy string, który jest troche bezużyteczny, bo to nie obiekt tylko zwykły string
// NIE MOŻEMY się tutaj odowołać do personString.name
	// var personString = '{"name": "Karol", "age": 26}';
// teraz zrobimy coś odwrotnego do stringify, czyli ze stringa zrobimy obiekt
// generalnie metoda parse, przywróci daną zmienną do orignalnej formy 
// (może to być np. tablica lub obiekt)
	//var person = JSON.parse(personString);

	// console.log(typeof person);
	// console.log(person);

// potrzebujemy fs, zeby meic metody readFileSync i writeFileSync
const fs = require('fs');

// przykąłdowy obiekt
var originalNote = {
	title: 'Some title',
	body: 'Some body'
};

// orignalNoteString - czyli obiekt originalNote zameiniony na JSON
var orignalNoteString = JSON.stringify(originalNote);
// zapiszemy w pliku notes.json, nasz json
fs.writeFileSync('notes.json', orignalNoteString);

// odczytamy wartośc pliku notes.json
var noteString = fs.readFileSync('notes.json');

// zameinimy wartośc zmeinnej noteString na obiekt (wczesniej było stringiem)
var note = JSON.parse(orignalNoteString);

// pogdląd w consoli
console.log(typeof note);
console.log(note.title);

