//se necesitan estas líneas para que funcione en Node
const readline = require('readline').createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
)
//hasta acá


//acá registramos pasajeros (con un par predefinidos)
let pasajeros = [
    {
        nombre: 'Papá',
        dni: 12965274,
        historial:[]
    },
    {
        nombre: 'Mamá',
        dni: 14674319,
        historial:[]
    }
]

//acá registramos las ciudades (para escalabilidad)
let ciudades=['MDQ', 'IGU']

//acá registramos los vuelos (para escalabilidad)
let vuelos=[
    {
        numero:308,
        origen:'MDQ',
        destino:'IGU',
        pasajeros:[],
        capacidad:20
    },
    {
        numero:309,
        origen:'IGU',
        destino:'MDQ',
        pasajeros:[],
        capacidad:20
    }
]


//funciones!
let registrarPasajero = (nombre, dni) => {
    pasajeros.push(
        {
            nombre: nombre,
            dni: dni,
            historial:[]
        }
    )
}

let agregarPasajero = (posVuelo, pasajero) => {
    if(vuelos[posVuelo].pasajeros.length < vuelos[posVuelo].capacidad){
        vuelos[posVuelo].pasajeros.push(pasajero)
        console.log('Se registró correctamente a '+ pasajero.nombre + ' en el vuelo.')
        pasajero.historial.push(
            {
                vuelo: vuelos[posVuelo].numero,
                fecha: Date.now()
            }
        )
    }else{
        console.log('El vuelo está lleno! Ya salió hacia su destino. No se puede registrar al pasajero.')
        vuelos[posVuelo].pasajeros = []
    }
}

let sacarPasajero = (posVuelo, pasajero) => {
    vuelos[posVuelo].pasajeros.splice(vuelos[posVuelo].pasajeros.indexOf(pasajero),1)
    console.log('El pasajero '+ pasajero.nombre +' se dio de baja correctamente.')
}

//ejecución principal
let chau = false
while(!chau){
    console.log('Flaibondi system. X para salir')
    readline.question('1 para registrar pasajeros, 2 para reservar un vuelo, 3 para cancelar reserva, 4 para ver historial', entrada =>{
        if(entrada=='X'){
            chau=true
        }else{
            switch(entrada){
                case 1:
                    let nombre = ''
                    readline.question('Ingrese el nombre del pasajero', entrada =>
                    {
                        nombre = entrada
                    }
                    )
                    let dni = 0
                    readline.question('Ingrese su DNI', entrada =>
                        {
                            dni = entrada
                        }
                        )
                    registrarPasajero(nombre, dni)
                    break
                case 2:
                    let vuelo;
                    console.log('Vuelo 0: MDQ>IGU. Vuelo 1: IGU>MDQ.')
                    readline.question('Que vuelo quiere reservar?', entrada =>
                        {
                            vuelo = entrada
                        }
                        )
                    console.log('El vuelo tiene ', vuelos[vuelo].capacidad-vuelos[vuelo].pasajeros.length, ' lugares libres. Quién quiere que viaje?')
                    let nombrePasajero = ''
                    readline.question('Ingrese el nombre del pasajero (debe estar registrado)', entrada =>
                        {
                            nombrePasajero = entrada
                        }
                        )
                    let dniPasajero = ''
                    readline.question('Ingrese el DNI del pasajero (debe estar registrado)', entrada =>
                        {
                            dniPasajero = entrada
                        }
                        )
                    agregarPasajero(nombrePasajero, dniPasajero)
                    break
                case 3:
                    let vueloBaja;
                    console.log('Vuelo 0: MDQ>IGU. Vuelo 1: IGU>MDQ.')
                    readline.question('Ingrese el numero del vuelo:', entrada =>
                        {
                            vueloBaja = entrada
                        }
                        )
                    let nombrePasajeroBaja = ''
                    readline.question('Ingrese el nombre del pasajero (debe estar registrado)', entrada =>
                        {
                            nombrePasajeroBaja = entrada
                        }
                        )
                    let dniPasajeroBaja = ''
                    readline.question('Ingrese el DNI del pasajero (debe estar registrado)', entrada =>
                        {
                            dniPasajeroBaja = entrada
                        }
                        )
                    if(vueloBaja > 0 && vueloBaja < vuelos.length){
                        sacarPasajero(vueloBaja, {nombre:nombrePasajeroBaja, dni:dniPasajeroBaja})
                    }else{
                        console.log('Entrada inválida. Intente nuevamente')
                    }   
                    break
                case 4:
                    let nombrePasajeroHist = ''
                    readline.question('Ingrese el nombre del pasajero (debe estar registrado)', entrada =>
                        {
                            nombrePasajeroHist = entrada
                        }
                        )
                    let dniPasajeroHist = ''
                    readline.question('Ingrese el DNI del pasajero (debe estar registrado)', entrada =>
                        {
                            dniPasajeroHist = entrada
                        }
                        )
                    if(pasajeros.find({nombre:nombrePasajeroHist, dni:dniPasajeroHist}) != undefined){
                        console.log(pasajeros.find({nombre:nombrePasajeroHist, dni:dniPasajeroHist}).historial.toString())
                    }else{
                        console.log('Entrada inválida. Intente nuevamente')
                    }
                    break
                default:
                    console.log('Entrada inválida. Intente nuevamente')
                    break
            }
        }
        readline.close()
        }
    )
}