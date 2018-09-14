// console.log("Starting notes.js");

// module - w plikach node, mamy dostęp do obiektu "module"
// console.log(module);

// Przykłady
module.exports.age = 25;

// Nasza funkcja (challenge)
module.exports.add = (a,b) => {
	return a+b;
}

// teraz zrobimy eksport funkcji
module.exports.addNote = () => {
	console.log('addNote');
	return 'New note';
};


// Do aplikacji! 

const fs = require('fs');

// funckja do łapania ntoatek
var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);		
	} catch (e) {
		return [];
	}
	// UWAGA! Jeśli plik "notes-data.json" nie istnieje, to wyjebie błąd
	// dlatego zrobimy to w bloku try, catch

};

// funkcja do zapisywania notatek
var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
	// console.log('Adding note', title, body);

	var notes = fetchNotes();
	var note = {
		title,
		body
	};



	// Teraz sprawdizimy czy istnieją takie same tytuły naszych notatek. 
	// Najpierw utworzymy zmienną, która utworzy tablicę metodę filter,
	// w której będą takie same tytuły
	var duplicateNotes = notes.filter((note) => note.title === title );

	// Jezeli w powyższej tablicy nie bedzie elementów, to znaczy, ze żaden tytuł się nie powtarza,
	// więc możemy robić pusha
	if ( duplicateNotes.length === 0 ) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
	// console.log('Gettind all notes');

	// tutaj wystarczy tylko zwrócić funkcję
	return fetchNotes();
};

var getNote = (title) => {
	// console.log('Reading notes', title);

	var notes = fetchNotes();

	var selectedNotes = notes.filter((note) => note.title === title);
	saveNotes(selectedNotes);

	return selectedNotes[0];
};

var removeNote = (title) => {
	// console.log('Removing notes', title);

	var notes = fetchNotes();
	// z jakiegoś powodu trzeba tutaj utworzyć nową zmienną filteredNotes, zeby to zadziałało
	var filteredNotes = notes.filter((note) => note.title !== title );
	saveNotes(filteredNotes);

	// zwrócimy false lub true, zeby srpawdzić czy cos zostało usunięte
	return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
	// debugger;
	console.log('--');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
};

module.exports = {
	// addNote: addNote
	// powyższy zapis możesz zapisać jako samo addNote (bo tak samo się nazywają)
	addNote,

	// getAll: getAll
	// to samo poniżej
	getAll,
	getNote,
	removeNote,
	logNote
};