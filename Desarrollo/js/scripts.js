const rootStyles = getComputedStyle(document.documentElement);
const boxShadowValue = rootStyles.getPropertyValue('--box-shadow');

// --- Selección de elementos del DOM de manera compacta ---
const elementos = {
    rgbaColors: "#rgbaColors",
    hslColors: "#hslColors",
    sixColors: "#sixColors",
    eightColors: "#eightColors",
    nineColors: "#nineColors",
    generateColor: "#generateColors"
};

// Asignación de los elementos del DOM a las variables correspondientes
for (let key in elementos) {
    window[key] = document.querySelector(elementos[key]);
}

//-- Funciones para generar colores aleatorios --
function getRandomColorRGBA() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let alpha = Math.random().toFixed(2);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function getRandomColorHSL() {
    let hue = Math.floor(Math.random() * 361);
    let saturation = Math.floor(Math.random() * 101);
    let lightness = Math.floor(Math.random() * 101);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function hslToHex(hsl) {
    const regex = /hsl\((\d+), (\d+)%?, (\d+)%?\)/; //expresión regular para verificar el formato HSL, y extraer los valores de h, s, y l.
    const match = hsl.match(regex); //verifica si la cadena de texto coincide con el formato HSL y extrae los valores de h, s y l.

    if (match) {
        let h = parseInt(match[1]);
        let s = parseInt(match[2]);
        let l = parseInt(match[3]);

        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c / 2;

        let r, g, b;

        if (h >= 0 && h < 60) {
            r = c; g = x; b = 0;
        } else if (h >= 60 && h < 120) {
            r = x; g = c; b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0; g = c; b = x;
        } else if (h >= 180 && h < 240) {
            r = 0; g = x; b = c;
        } else if (h >= 240 && h < 300) {
            r = x; g = 0; b = c;
        } else {
            r = c; g = 0; b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        const toHex = (num) => {
            const hex = num.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
}

function rgbaToHex (rgba) {
    const rgbaRegex = /^rgba\((\d+), (\d+), (\d+), [0-1](?:\.\d+)?\)$/; //análogo a HSL, pero para RGBA
    const match = rgba.match(rgbaRegex); //análogo a HSL, verifica si coindice y extrae los datos de rojo, verde, azul y alfa.

    if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);

        const toHex = (num) => {
            const hex = num.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };
}

//-- Eventos para seleccionar tipo y cantidad de colores --
rgbaColors.addEventListener("change", function() {
    if(rgbaColors.checked) {
        hslColors.checked = false; //desmarca la casilla de HSL si se selecciona RGBA
        generateColors.classList.remove("active");
    } else {
        rgbaColors.checked = true;
    }
});

hslColors.addEventListener("change", function() {
    if(hslColors.checked) {
        rgbaColors.checked = false; //desmaraca la casilla de RGBA si se selecciona HSL
        generateColors.classList.remove("active");
    } else {
        hslColors.checked = true;
    }
});

sixColors.addEventListener("change",function(){
    if(sixColors.checked) {
        eightColors.checked = false;
        nineColors.checked = false;
        generateColors.classList.remove("active");
    } else {
        sixColors.checked = true;
    }
});

eightColors.addEventListener("change",function(){
    if(eightColors.checked) {
        sixColors.checked = false;
        nineColors.checked = false;
        generateColors.classList.remove("active");
    } else {
        eightColors.checked = true;
    }
});

nineColors.addEventListener("change",function(){
    if(nineColors.checked) {
        sixColors.checked = false;
        eightColors.checked = false;
        generateColors.classList.remove("active");
    } else {
        nineColors.checked = true;
    }
});

//-- Generación de los bloques de colores --
function createColorBlock(color) {
    // Crear el contenedor para el color
    const divColor = document.createElement("div");
    divColor.classList.add("color-container");
    divColor.style.boxShadow = 'var(--box-shadow)';
    divColor.style.backgroundColor = color;

    // Crear los botones
    const btnCopy = document.createElement("button");
    btnCopy.classList.add("btn-copy");

    const btnPadlock = document.createElement("button");
    btnPadlock.classList.add("btn-padlock");

    // Crear el elemento p para mostrar el código HEX
    const p = document.createElement("p");
    p.textContent = color;
    p.classList.add("hex-code");

    // Crear contenedor para los botones
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    buttonsContainer.appendChild(btnCopy);
    buttonsContainer.appendChild(btnPadlock);

    // Crear bloque inferior (botones + HEX)
    const bottomBlock = document.createElement("div");
    bottomBlock.classList.add("color-info-block");
    bottomBlock.appendChild(p);
    bottomBlock.appendChild(buttonsContainer);

    // Crear un contenedor para el color (div + bloque inferior)
    const colorItemContainer = document.createElement("div");
    colorItemContainer.classList.add("color-item");
    colorItemContainer.appendChild(divColor);
    colorItemContainer.appendChild(bottomBlock);


    return colorItemContainer; // Retorna el bloque de color completo
}

let isGenerating = false;

generateColor.addEventListener("click", function() {
    if (isGenerating) return; // Si ya hice click una vez, no se superpone la creación
    isGenerating = true;
    
    const colorContainer = document.querySelector("#color-container");
    const bloqueados = JSON.parse(localStorage.getItem('bloqueados')) || []; // Obtener colores bloqueados
    const currentColors = Array.from(colorContainer.querySelectorAll('.color-item')); // Obtener colores actuales
    const currentColorCount = currentColors.length;
    
    let numColors;
    let color; // Variable para almacenar el color generado
    
    // Eliminar clases previas para cambiar la cantidad de columnas
    colorContainer.classList.remove("six-colors", "eight-colors");
    // Determinar la cantidad de colores a generar
    if (sixColors.checked) {
        numColors = 6;
        colorContainer.classList.add("six-colors");
    } else if (eightColors.checked) {
        numColors = 8;
        colorContainer.classList.add("eight-colors");
    } else if (nineColors.checked) {
        numColors = 9;
    } else {
        return;
    }

    // Si el número de colores a generar es menor que el actual, eliminamos los colores fuera del rango
    if (numColors < currentColorCount) {
        let toRemove = currentColorCount - numColors;

        // Eliminar los colores fuera del rango, incluso si están bloqueados
        for (let i = currentColors.length - 1; i >= numColors && toRemove > 0; i--) {
            const colorItem = currentColors[i];
            const colorHex = colorItem.querySelector('.hex-code').textContent;

            colorItem.remove();
            toRemove--;
        }
    }

    // Si necesitamos agregar más colores
    if (numColors > currentColorCount) {
        let toAdd = numColors - currentColorCount;

        for (let i = 0; i < toAdd; i++) {
            if (rgbaColors.checked) {
                color = getRandomColorRGBA();
                color = rgbaToHex(color);
                hslColors.checked = false; // Desmarcar la casilla de HSL si se selecciona RGBA
            } else {
                color = getRandomColorHSL();
                color = hslToHex(color);
                rgbaColors.checked = false; // Desmarcar la casilla de RGBA si se selecciona HSL
            }

            // Crear el bloque de color
            const colorBlock = createColorBlock(color);

            // Si el color está bloqueado, lo agregamos al principio
            if (bloqueados.includes(color)) {
                colorContainer.insertBefore(colorBlock, colorContainer.firstChild); // Insertar al principio
            } else {
                colorContainer.appendChild(colorBlock); // Agregar al final
            }
        }
    }

    // Actualización de los bloques existentes (solo los no bloqueados)
    currentColors.forEach((colorItem, index) => {
        const colorHex = colorItem.querySelector('.hex-code').textContent;

        // Si no está bloqueado, generamos un nuevo color aleatorio
        if (!bloqueados.includes(colorHex)) {
            let newColor;
            if (rgbaColors.checked) {
                newColor = getRandomColorRGBA();
                newColor = rgbaToHex(newColor);
            } else {
                newColor = getRandomColorHSL();
                newColor = hslToHex(newColor);
            }

            colorItem.querySelector('.color-container').style.backgroundColor = newColor;
            colorItem.querySelector('.hex-code').textContent = newColor; // Actualizar el código HEX
        }
    });

    // Retraso para cada nuevo color
    let delay = 0;

    // Función con retraso para añadir colores
    function addColorWithDelay(colorBlock, delay) {
        setTimeout(() => {
            colorContainer.appendChild(colorBlock);
        }, delay); // Retraso progresivo entre colores
    }

    // Añadir los bloques generados con retraso
    const colorItems = colorContainer.querySelectorAll('.color-item');
    colorItems.forEach((colorItem, index) => {
        delay += 80;
        addColorWithDelay(colorItem, delay);
    });

    // Al finalizar la generación de colores reseteo el evento "click"
    setTimeout(() => {
        isGenerating = false;
    }, 100); // Después de que se hayan generado todos los colores, reseteo el evento

    generateColor.classList.add("active");
});

//-- Función para mostrar el microfeedback (toast) --
function mostrarRetroalimentacion() {
    let toast = document.getElementById("toast");
    let mensaje = [];

    // Crear un objeto con las opciones y sus respectivos IDs de checkbox
    let opciones = {
        rgbaColors: "RGBA",
        hslColors: "HSL",
        sixColors: "6 colores",
        eightColors: "8 colores",
        nineColors: "9 colores"
    };

    // Iterar sobre el objeto "opciones" y comprobar si los checkboxes están seleccionados
    for (let id in opciones) {
        if (document.getElementById(id).checked) {
        mensaje.push(opciones[id]);
        }
    }

    // Si hay opciones seleccionadas, las mostramos en el toast
    if (mensaje.length > 0) {
        toast.innerHTML = "Has seleccionado: " + mensaje.join(", ");
    } else {
        toast.innerHTML = "";
    }

    // Mostrar el mensaje en el toast
    toast.style.display = 'block';
}

//--- Funciones auxiliares para copiar/ bloquear color y copiar paleta en localstorage ---
//Copiar color
document.querySelector("#color-container").addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("btn-copy")) {
        // Encuentra el p más cercano al botón "copiar"
        const p = event.target.closest(".color-info-block").querySelector("p");
        const colorHex = p.textContent; // Obtener el color del p

        // Crear el toast
        const copyToast = document.createElement("div");
        copyToast.classList.add("copy-toast");
        copyToast.textContent = "¡Copiado!";

        // Coloca el texto emergente sobre el botón
        const button = event.target;
        button.appendChild(copyToast); // Añadir el toast al botón

        // Hacer visible el toast
        copyToast.style.display = "block";

        // Eliminar el toast después de 2 segundos
        setTimeout(() => {
            copyToast.remove();
        }, 500);

        localStorage.setItem("copiedValue", colorHex);
    }
});


// Usamos event delegation para manejar los clicks en los checkboxes dentro de la sección "options-container"
document.querySelector('.options-container').addEventListener('change', function(event) {
// Verificar si el elemento clickeado es un checkbox
if (event.target && event.target.type === 'checkbox') {
    mostrarRetroalimentacion();  // Llamamos la función para mostrar el feedback
}
});

// -- Función para bloquear y desbloquear colores -- 
function bloquearColor(event) {
    const colorItem = event.target.closest('.color-item'); // Obtengo el contenedor del color
    const colorHex = colorItem.querySelector('.hex-code').textContent; // Obtengo el color HEX
    const btnPadlock = event.target;

    // Verificar si el color está bloqueado en el localStorage
    let bloqueados = JSON.parse(localStorage.getItem('bloqueados')) || [];

    if (btnPadlock.classList.contains('btn-padlock')) {
        // Cambiar imagen a "candado cerrado"
        btnPadlock.classList.remove('btn-padlock');
        btnPadlock.classList.add('btn-locked');
        bloqueados.push(colorHex); // Bloquear el color
        colorItem.classList.add('color-locked');
    } else {
        // Cambiar imagen a "candado abierto"
        btnPadlock.classList.remove('btn-locked');
        btnPadlock.classList.add('btn-padlock');
        bloqueados = bloqueados.filter(color => color !== colorHex); // Desbloquear el color
        colorItem.classList.remove('color-locked');
    }

    // Guardar el estado de los colores bloqueados en el localStorage
    localStorage.setItem('bloqueados', JSON.stringify(bloqueados));
}

// -- Evento de click para bloquear/desbloquear colores -- 
document.querySelector('#color-container').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('btn-padlock') || event.target.classList.contains('btn-locked')) {
        bloquearColor(event);

        // Verificar si ya hay un toast de "bloqueado" visible y eliminarlo si es necesario
        const existingLockedToast = document.querySelector(".locked-toast");
        if (existingLockedToast) {
            existingLockedToast.remove(); // Eliminar el toast anterior
        }

        // Crear el toast
        const lockedToast = document.createElement("div");
        lockedToast.classList.add("locked-toast");
        
        const button = event.target;
        button.appendChild(lockedToast);
        
        lockedToast.style.display = "block";
        
        if (event.target.classList.contains('btn-locked')){
            lockedToast.textContent = "¡Bloqueado!";
        } else {
            lockedToast.textContent = "¡Desbloqueado!";
        }

        setTimeout(() => {
            lockedToast.remove();
        }, 500);
    }
});

// -- Función para verificar si un color está bloqueado -- 
function verificarColoresBloqueados() {
    const bloqueados = JSON.parse(localStorage.getItem('bloqueados')) || []; // Obtener colores bloqueados
    const colorItems = document.querySelectorAll('.color-item'); // Obtener todos los divs de colores

    // Iteramos sobre todos los colores
    colorItems.forEach(colorItem => {
        const colorHex = colorItem.querySelector('.hex-code').textContent;
        const btnPadlock = colorItem.querySelector('.btn-padlock');

        // Si el color está bloqueado, cambiamos el estado del candado
        if (bloqueados.includes(colorHex)) {
            btnPadlock.classList.remove('btn-padlock');
            btnPadlock.classList.add('btn-locked'); // Mostrar candado cerrado
        }
    });
}

// -- Llamada para verificar colores bloqueados al cargar la página -- 
document.addEventListener('DOMContentLoaded', verificarColoresBloqueados);

// Copiar toda la paleta de colores y mostrar miniaturas
document.querySelector("#btn-copy-all").addEventListener("click", function() {
    // Obtener todos los elementos de color en el contenedor de colores
    const colorItems = document.querySelectorAll("#color-container .color-item");

    // Crear un array para almacenar los colores
    const colorHexArray = [];

    // Recorrer todos los elementos de color y obtener su código HEX
    colorItems.forEach((colorItem) => {
        const colorHex = colorItem.querySelector('.hex-code').textContent;
        colorHexArray.push(colorHex); // Agregar cada color al array
    });

    // Verificar si ya existe un "toast" visible y eliminarlo
    const existingCopyPaletToast = document.querySelector(".copy-toast");
    if (existingCopyPaletToast) {
        existingCopyPaletToast.remove(); // Eliminar el toast anterior si existe
    }

    // Crear el texto emergente (toast) para indicar que la paleta fue copiada
    const copyPaletToast = document.createElement("div");
    copyPaletToast.classList.add("copy-toast"); // Agregar la clase al toast
    copyPaletToast.textContent = "¡Paleta copiada!"; // Mensaje que aparecerá

    // Coloca el toast sobre el botón
    const button = document.querySelector("#btn-copy-all");
    button.appendChild(copyPaletToast);
    copyPaletToast.style.display = "block";
    setTimeout(() => {
        copyPaletToast.remove();
    }, 500);

    // Guardar la paleta de colores completa en el localStorage (como un string JSON)
    localStorage.setItem("copiedPalette", JSON.stringify(colorHexArray));
});

// -- Colores RGBA aleatorios cada vez que carga la página --
document.addEventListener('DOMContentLoaded', () => {
    isGenerating = true;
    const colorContainer0 = document.querySelector("#color-container");

    eightColors.checked = true;
    rgbaColors.checked = true;
    mostrarRetroalimentacion();

    colorContainer0.classList.add("eight-colors");

    for (let i = 0; i < 8; i++) {
        let color0 = getRandomColorRGBA();
        color0 = rgbaToHex(color0);

        // Crear el bloque de color
        const colorBlock = createColorBlock(color0);

        setTimeout(() => {
            colorContainer0.appendChild(colorBlock);
        }, i * 100);
    }

    setTimeout(() => {
        isGenerating = false;
    }, 8 * 100);
});