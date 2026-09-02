/*

let
var
const


if
else

*/

/*

let number = 18


if (number >= 18) {
    console.log('Si es mayor')
} else {
    console.log('No es menor')
}



let edad = 20

if (edad > 70) {
    console.log('Que viejo.')

} else if (edad >= 18) {
    console.log('Eres mayor de edad')

} else {
    console.log ('Eres un bebé.')

}


let edad = 18
let sacarCarnet = edad >= 18 ? true : false 

console.log(edad >= 18 ? 'Si, es mayor' : 'No, es menor')
console.log(sacarCarnet ? 'Se puede sacar el carnet' : 'No se puede sacar el carnet')

*/

let edad = 21
let tieneEntrada = true

if (edad >= 18 && tieneEntrada){
    console.log('Si, puedes entrar al concierto')
} else {
    console.log('No, no puedes entrar al concierto')
}

function saludar() {
    alert('Hola')
}

let cantidadProducto = 1

function sumar() {
    cantidadProducto++
}

function restar() {
    cantidadProducto--
}