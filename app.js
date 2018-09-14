// console.log('Starting app.js');

// wymagamy modułu fs
// To oznacza, ze wszystkie funkcję dostepne na tym module, będziemy mieli dostępne w stałej fs
const fs = require('fs');

// kolejny moduł 'os'
const os = require('os');

// 3rd part modules (lodash)
const _ = require('lodash');

// 3rd part modules (yargs)
// Instalacja frameworka Yargs w naszej sciezce
// npm install yargs@4.7.1 --save
// Yargs generalnie parsuję stringi w łatwy i intuicyjny sposób
const yargs = require('yargs');

// isString - to funkcja z pakietu lodash (sprawdz czy coś jest stringiem)
// console.log(_.isString(true));
// console.log(_.isString('karol'));

// teraz będziemy wymagać pliku, który sami stworzylismy
// i będziemy mogli korzystać z funkcji zapisanych w tym pliku
const notes = require('./notes.js');

// użyjemy funkcji userInfo, która pokaże dane o użytkowniku
// podajemy relatywną ścieżkę ('./') - to kieruję na obecną ścieżkę
	// var user = os.userInfo();
	// console.log(user);
// w powyższej consoli, zoabczysz ,ze userInfo(), zwróci obiekt o uzytkowniku,
// do którego mamy dostęp (np. user.username)

// Teraz użyjemy jednej z funckji modułu "fs"
// funkcja appendFile, przyjmuję dwa argumenty ('nazwa_pliku', 'tekxt ktory dodamy do pliku')
// fs.appendFileSync('greetings.txt',`Hello ${user.username}! You are ${notes.age}!`);
// Powyżej użyliśmy konkatenacji z ES6

// funckja addNote z notes.js(naszego pliku)
var res = notes.addNote();
console.log(res);

// challenge
// var sum = notes.add(9,-2);
// console.log(sum);

// USING 3rd PARTY MODULES
// w consoli instalujemy npm
// w consoli sprawdzamy czy ejst zainstalowany "npm -v"
// dalej: "npm init" - i odpowiadamy na pytania
// w pliku package.json - mamy informacje na temat zainstalowanych 3rd part modules

// na stronie npmjs.com - możemy poszukać pakietów i poczytac o nich

// zainstalujemy pakiet "lodash"
// npm install lodash --save
// możesz sprawdzic w package.json, ze lodash jest zaisntalowany

var filteredArray = _.uniq(['Andrew',1,'Andrew',1,2,3,4]);
// usunie zduplikowane elementy tablicy
console.log(filteredArray);

// instalacja nodemon
// npm install nodemon -g

// Getting input from user & Simplified Input with Yargs
// Użyjemy yargs do tego, bo przekazywanie i parsowanie tych parametrów typu title itd. bedzie dużo łatwiejsze
// w consoli możemy przekaż title np. jako title="tytuł" lub title "tytuł", obie wersje są poprawne, ale obie troche ianczej działają
// dlatego użyejmu yargs, który poradzi sobie z każdą opcją.
// const argv = yargs.argv;
// Tutaj (poniżej) ulepszymy nasz interface w konsoli.
// w .command, peirwszy argument to nazwa komendy wpisanej do consoli, drufi argment to jej opis
// póżniej w obiekcie masz odpowiednie aprametry które są wpisywane w konkretnej komendzie np "add"
// describe- opis, demand - czy jest wymagane, alias - skróty(więc wpisujać titile nie musisz wpisywać --title, tylko samo -t, jak w alias)
// .help() - metoda, która zwróci kilka użytecznych informacji wywołąmy ją w konsoli za pomocą '--help"

const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'	
}

const bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b'
}

const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: bodyOptions
		// powyżej, żeby nie powtarzać kodu zapisaliśmy całośc w zmiennych titleOption i bodyOptions 
		// title: {
		// 	describe: 'Title of note',
		// 	demand: true,
		// 	alias: 't'
		// },
		// body: {
		// 	describe: 'Body of note',
		// 	demand: true,
		// 	alias: 'b'
		// }
	})
	.command('list', 'List all notes')
	.command('read', "Read a note", {
		title: titleOptions,
		// powyżej, żeby nie powtarzać kodu zapisaliśmy całośc w zmiennych titleOption i bodyOptions 
		// title: {
		// 	describe: 'Title of note',
		// 	demnd: true,
		// 	alias: 't'
		// },
	})
	.command('remove', "Remove a note", {
		title: titleOptions,
		// powyżej, żeby nie powtarzać kodu zapisaliśmy całośc w zmiennych titleOption i bodyOptions 
		// title: {
		// 	describe: 'Title of note',
		// 	demnd: true,
		// 	alias: 't'
		// },
	})
	.help()
	.argv;


// process - to obiekt globalny w node (coś jak window)
// process.argv, to coś jak argument w js, jeśli w consoli wpiszesz node app.js chuj, to chuj będzie nowym argmentem dostepnym w process.argv
// [2] to tutaj indeks naszzego argumentu

// var command = process.argv[2];
// Tu jest 2, bo jest to index komendy, którą wpisujemy (np. add, remove itd.)
// poniżej to samo, ale lepszy zapis
var command = argv._[0];

// teraz jeśli w konsoli wpiszemy "node app.js tekst", to tekst wyświetli się w konsoli
console.log('Command: ', command);


// Poniżej w tych dwóch console.log, mozmey sprawdzić jak parsowane sa elementy
// Najlepiej widać atuty yargs w moemncie keidy podamy tzw. 'key/value pairs', np --title ='chuj'
// yargs sprasuje to w obiekt, z którego póżniej możemy łatwo korzystać 
console.log('Process: ', process.argv);
// zobaczmy jak wygląda Yargs
console.log('Yargs', argv);


if (command === 'add') {
	// console.log('Adding new notes');
	var note = notes.addNote(argv.title, argv.body);

	if (note) {
		console.log('Note Created');
		notes.logNote(note);
	} else {
		console.log('Note title taken');
	}

} else if (command === 'list') {
	// console.log('Listing all notes');
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((note) => notes.logNote(note));

} else if (command === 'read') {
	// console.log('reading notes');
	var note = notes.getNote(argv.title);	
		notes.logNote(note);
	if (note) {
		console.log('Note found');
	} else {
		console.log('Note not found');
	}

} else if (command === 'remove') {
	// console.log('removing notes');
	var noteRemoved = notes.removeNote(argv.title);
	// wyświetlimy informację na temat usunięcia notatki
	var message = noteRemoved ? 'Note was removed' : 'Note not found';
	console.log(message);	

} else {
	console.log('comment not recognize');
}

// Instalacja frameworka Yargs w naszej sciezce
// npm install yargs@4.7.1 --save
// Yargs generalnie parsuję stringi w łatwy i intuicyjny sposób
