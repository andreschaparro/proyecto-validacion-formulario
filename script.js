// Crear una cuenta en Firebase: https://firebase.google.com/
// Crear un proyecto llamado 'validacion-formularios'
// Crear una base de datos firestore en modo de prueba
// Documentación: https://firebase.google.com/docs/firestore/quickstart

// En la configuración del proyecto crear una aplicación web y copiar el firebaseConfig
const firebaseConfig = {
    apiKey: "AIzaSyAk8S1fD5ys1zyVE8W5T2MH4G2rmFWi32M",
    authDomain: "validacion-formularios-80f9b.firebaseapp.com",
    projectId: "validacion-formularios-80f9b",
    storageBucket: "validacion-formularios-80f9b.appspot.com",
    messagingSenderId: "758955969168",
    appId: "1:758955969168:web:744fc868182f2051676615"
}

// La siguiente línea inicializa Firebase
firebase.initializeApp(firebaseConfig)

// La siguiente línea inicializa Firestore
const db = firebase.firestore()

document.getElementById('formulario').addEventListener('submit', (event) => {
    // Evita el comportamiento por defecto de HTML para poder manejarlo desde JS
    event.preventDefault()

    // Las siguientes líneas validan el campo name
    const entradaNombre = document.getElementById('name')
    const divErrorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        divErrorNombre.textContent = 'Por favor, introducí tu nombre'
        divErrorNombre.classList.add('error-messager')
    } else {
        divErrorNombre.textContent = ''
        divErrorNombre.classList.remove('error-messager')
    }

    // Las siguientes líneas validan el campo email utilizando una expresión regular
    const entradaEmail = document.getElementById('email')
    const divErrorEmail = document.getElementById('emailError')

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(entradaEmail.value)) {
        divErrorEmail.textContent = 'Por favor, introducí un mail válido'
        divErrorEmail.classList.add('error-messager')
    } else {
        divErrorEmail.textContent = ''
        divErrorEmail.classList.remove('error-messager')
    }

    // Las siguientes líneas validan el campo password utilizando una expresión regular
    const entradaPassword = document.getElementById('password')
    const divErrorPassword = document.getElementById('passwordError')

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/
    if (!passwordPattern.test(entradaPassword.value)) {
        divErrorPassword.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales'
        divErrorPassword.classList.add('error-messager')
    } else {
        divErrorPassword.textContent = ''
        divErrorPassword.classList.remove('error-messager')
    }

    // Las siguientes líneas envían el formulario únicamente si los campos son válidos
    if (divErrorNombre.textContent.length == 0 && divErrorEmail.textContent.length == 0 && divErrorPassword.textContent.length == 0) {
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: entradaEmail.value,
            password: entradaPassword.value,
        })
            .then((docRef) => {
                alert('El formulario se ha enviado con éxito', docRef.id)
                document.getElementById('formulario').reset()
            })
            .catch((error) => {
                alert(error)
            })
    }
})