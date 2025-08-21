
// -------------------------------
// Cajero Bancario en Consola
// Proyecto de Clase  
// Rafael Uraneta
// Santiago Velez
// --------------------------------

// "Base de datos" en memoria (sin usuarios precargados)
let usuarios = [];

// -------------------------------
// Funciones principales del sistema
// -------------------------------

// Registrar un nuevo usuario
function registrarUsuario() {
    let nombre = prompt("Ingrese su nombre de usuario:");
    if (!nombre) {
        console.log("Registro cancelado.");
        return;
    }

    // Validar si ya existe
    if (usuarios.some(u => u.usuario === nombre)) {
        console.log("Ese nombre ya está registrado, intenta con otro.");
        return;
    }

    let clave = prompt("Cree una contraseña:");
    if (!clave) {
        console.log("Registro cancelado.");
        return;
    }

    usuarios.push({ usuario: nombre, clave: clave, saldo: 0, movimientos: [] });
    console.log(`Usuario '${nombre}' creado con éxito. Ya puedes iniciar sesión.`);
}

// Iniciar sesión con máximo 3 intentos
function iniciarSesion() {
    if (usuarios.length === 0) {
        console.log("No hay usuarios registrados. Registra uno primero.");
        return;
    }

    let intentos = 3;

    while (intentos > 0) {
        let nombre = prompt("Usuario:");
        let clave = prompt("Contraseña:");

        let cuenta = usuarios.find(u => u.usuario === nombre && u.clave === clave);

        if (cuenta) {
            console.log(`Bienvenido, ${nombre}!`);
            menuPrincipal(cuenta);
            return;
        } else {
            intentos--;
            console.log(`Usuario o clave incorrectos. Intentos restantes: ${intentos}`);
        }
    }

    console.log("Cuenta bloqueada por 24 horas, comunícate con tu banco.");
}

// Menú principal tras iniciar sesión
function menuPrincipal(cuenta) {
    let opcion;
    do {
        opcion = prompt(
`----- MENÚ PRINCIPAL -----
1. Retirar dinero
2. Consignar dinero
3. Consultar saldo
4. Ver historial de movimientos
5. Cambiar contraseña
6. Cerrar sesión`
        );

        switch (opcion) {
            case "1": retirar(cuenta); break;
            case "2": consignar(cuenta); break;
            case "3": consultarSaldo(cuenta); break;
            case "4": consultarMovimientos(cuenta); break;
            case "5": cambiarClave(cuenta); break;
            case "6": console.log("Sesión cerrada."); break;
            default: console.log("Opción no válida, intenta de nuevo.");
        }
    } while (opcion !== "6");
}

// Retiro de dinero
function retirar(cuenta) {
    let monto = parseFloat(prompt("Ingrese el monto a retirar:"));
    if (isNaN(monto) || monto <= 0) {
        console.log("Monto inválido.");
        return;
    }
    if (monto > cuenta.saldo) {
        console.log("No tienes suficiente saldo para este retiro.");
        return;
    }

    cuenta.saldo -= monto;
    cuenta.movimientos.push(`Retiro de $${monto} - ${new Date().toLocaleString()}`);
    console.log(`Retiro realizado. Saldo actual: $${cuenta.saldo}`);
}

// Consignar dinero
function consignar(cuenta) {
    let monto = parseFloat(prompt("Ingrese el monto a consignar:"));
    if (isNaN(monto) || monto <= 0) {
        console.log("Monto inválido.");
        return;
    }

    cuenta.saldo += monto;
    cuenta.movimientos.push(`Consignación de $${monto} - ${new Date().toLocaleString()}`);
    console.log(`Consignación exitosa. Saldo actual: $${cuenta.saldo}`);
}

// Consultar saldo
function consultarSaldo(cuenta) {
    console.log(`Tu saldo disponible es: $${cuenta.saldo}`);
}

// Consultar movimientos
function consultarMovimientos(cuenta) {
    console.log("Historial de movimientos:");
    if (cuenta.movimientos.length === 0) {
        console.log("Aún no has realizado movimientos.");
        return;
    }
    cuenta.movimientos.forEach((mov, i) => console.log(`${i + 1}. ${mov}`));
}

// Cambiar clave
function cambiarClave(cuenta) {
    let nueva = prompt("Ingresa tu nueva contraseña:");
    if (!nueva) {
        console.log("Cambio cancelado.");
        return;
    }
    cuenta.clave = nueva;
    console.log("Contraseña actualizada con éxito.");
}

// -------------------------------
// Programa principal
// -------------------------------
function iniciarPrograma() {
    let opcion;
    do {
        opcion = prompt(
`===== BIENVENIDO AL CAJERO =====
1. Registrar usuario
2. Iniciar sesión
3. Salir`
        );

        switch (opcion) {
            case "1": registrarUsuario(); break;
            case "2": iniciarSesion(); break;
            case "3": console.log("Gracias por usar nuestro cajero. ¡Hasta pronto!"); break;
            default: console.log("Opción no válida.");
        }
    } while (opcion !== "3");
}

// Arrancar el programa
iniciarPrograma();
