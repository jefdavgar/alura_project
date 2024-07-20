var encriptar = document.getElementById("bttn-encriptar");
var desencriptar = document.getElementById("bttn-desencriptar");
var inputUser = document.getElementById("userInput");
var contentFirst = document.getElementById("content-first");
var outputUser = document.getElementById("output-user");
var textOutput = document.getElementById("textOutput");
var copyMessage = document.getElementById("copy-message");

// Función para encriptar el mensaje
function encriptarMensaje(mensaje) {
  const reemplazos = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
  };

  let mensajeEncriptado = '';
  for (let i = 0; i < mensaje.length; i++) {
    const char = mensaje[i];
    mensajeEncriptado += reemplazos[char] || char;
  }

  return mensajeEncriptado;
}

// Función para desencriptar el mensaje
function desencriptarMensaje(mensaje) {
  const reemplazos = {
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'
  };

  // Reemplazo en orden inverso para evitar conflictos en reemplazos múltiples
  let mensajeDesencriptado = mensaje;
  for (const [clave, valor] of Object.entries(reemplazos)) {
    const regex = new RegExp(clave, 'g');
    mensajeDesencriptado = mensajeDesencriptado.replace(regex, valor);
  }

  return mensajeDesencriptado;
}

// Manejador para encriptar el mensaje
encriptar.addEventListener("click", function () {
  var inputValue = inputUser.value;
  var regex = /^[a-z\s]+$/; // Permite letras minúsculas y espacios
  
  if (regex.test(inputValue)) {
    this.classList.toggle("activo");
    contentFirst.classList.add("hidden");
    outputUser.classList.add("visible");

    // Proceso de encriptación
    var mensajeEncriptado = encriptarMensaje(inputValue);
    textOutput.textContent = mensajeEncriptado;
    console.log(mensajeEncriptado);

    inputUser.value = ""; // Vacía el input
  } else {
    alert("Por favor, ingresa solo letras minúsculas y espacios.");
  }
});

// Manejador para desencriptar el mensaje
desencriptar.addEventListener("click", function () {
  var inputValue = inputUser.value;
  var regex = /^[a-z\s]*(enter|imes|ai|ober|ufat)*$/; // Permite letras minúsculas, espacios y encriptado
  
  if (regex.test(inputValue)) {
    this.classList.toggle("activo");
    contentFirst.classList.add("hidden");
    outputUser.classList.add("visible");

    // Proceso de desencriptación
    var mensajeDesencriptado = desencriptarMensaje(inputValue);
    textOutput.textContent = mensajeDesencriptado;
    console.log(mensajeDesencriptado);

    inputUser.value = ""; // Vacía el input
  } else {
    alert("Por favor, ingresa solo texto válido para desencriptar.");
  }
});

// Manejador para copiar el mensaje al portapapeles
copyMessage.addEventListener("click", function () {
  // Obtener el texto encriptado o desencriptado
  var mensajeParaCopiar = textOutput.textContent;

  // Usar la API Clipboard para copiar al portapapeles
  navigator.clipboard.writeText(mensajeParaCopiar)
    .then(function() {
      console.log("Texto copiado al portapapeles: " + mensajeParaCopiar);
      alert("Texto copiado al portapapeles.");
    })
    .catch(function(error) {
      console.error("Error al copiar el texto: ", error);
      alert("No se pudo copiar el texto.");
    });
});
