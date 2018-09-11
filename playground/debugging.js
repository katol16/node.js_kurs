var person = {
	name: 'Karol'
};

person.age = 25;
debugger;
person.name = 'Mike';

console.log(person);

// Tu masz zwykły skypt i możesz go odpalic zwyczajnie w consoli za pomocą 'node debugging.js'
// Jednak jeśli chcesz zrobić debugowanie bledów to robisz 'node inspect debugging.js'
// Wtedy wyskoczy cos takiego: 

	// < Debugger listening on ws://127.0.0.1:9229/c21d38cb-24a7-4bc7-bcb3-935ab318bb19
	// < For help see https://nodejs.org/en/docs/inspector
	// < Debugger attached.
	// Break on start in debugging.js:1
	// > 1 (function (exports, require, module, __filename, __dirname) { var person = {
	//   2 	name: 'Karol'
	//   3 };
	// debug> 

// Pierwsze 3 linie możemy zignrowoać, bo tylko mówią o tym, ze debugger się odpalił i działa, wiec nie są ważne

// Tutaj mamy trochę ogólnego kodu i swojego
	// > 1 (function (exports, require, module, __filename, __dirname) { var person = {
	//   2 	name: 'Karol'
	//   3 };


// to że mamy włączony tryb debud, widzimy w lini 'debug>' to oznacza, ze teraz ozemy pisać debugowy kod, bo odpaliliśmy nasz skrypt w "debug mode"

// w trybie debud, mozęmy wpisać 'list(10)', to pokaże nam 10 lini naszego kodu, ale w taki sposób jak generuje to node,
// czyli będziemy mieli jeszcze opleciony nasz kod w funkcję node, która olatana każdą linie kody napisaną w node

// w debug mamy komendy np: 'n' czyli przejscie do następnej lini kodu i zatrzymanie wykonywania programu w danej linii
// 'c' bedzie kontynuowało program, aż całość się wykona

// wpisujac 'repl', wejdziemy w inny tryb, ktora działa podobnie jak console w google chrome, wtedy mozęµy sie odwołac do person, person.age

// oczywiście wpisywanie 'n' czyli rpzejście do nastepnej lini jest słabe, bo co jeśli mamy 1000 lini kodu
// dlatego używamy w nszym kodzie 'debugger;' i wtedy uzywajac 'c' czyli 'conitnue', dojdziemy aż do meisjca gdzie jest zapisany debugger, 
// to jest najbardziej pwoszechna metoda

// Jesli chcemy zoabczyć isnektor w google chrome to w consoli wpsiujemy to :  'node --inspect-brk debugging.js'
// Póżniej w gogole chrome wpisujemy chrome://inspect i pozniej kilkamy na 'Open dedicated DevTools'
// aby uruchomić z poziomu tego narzędzia nasz program, klkimay na niebieską strzałkę