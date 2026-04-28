const rootStyles = getComputedStyle(document.documentElement);
const boxShadowValue = rootStyles.getPropertyValue('--box-shadow');

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

//--- Funciones auxiliares para copiar/ bloquear color y copiar paleta ---
// function colorCopy {
    
// }

// function colorBlock {

// }

// function paletcopy {

// }

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

//-- Eentos para seleccionar tipo y cantidad de colores --
rgbaColors.addEventListener("change", function() {
    if(rgbaColors.checked) {
        hslColors.checked = false; //desmarca la casilla de HSL si se selecciona RGBA
        generateColors.classList.remove("active");
    }
});

hslColors.addEventListener("change", function() {
    if(hslColors.checked) {
        rgbaColors.checked = false; //desmaraca la casilla de RGBA si se selecciona HSL
        generateColors.classList.remove("active");
    }
});

sixColors.addEventListener("change",function(){
    if(sixColors.checked) {
        eightColors.checked = false;
        nineColors.checked = false;
        generateColors.classList.remove("active");
    }
});

eightColors.addEventListener("change",function(){
    if(eightColors.checked) {
        sixColors.checked = false;
        nineColors.checked = false;
        generateColors.classList.remove("active");
    }
});

nineColors.addEventListener("change",function(){
    if(nineColors.checked) {
        sixColors.checked = false;
        eightColors.checked = false;
        generateColors.classList.remove("active");
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
    bottomBlock.appendChild(buttonsContainer);
    bottomBlock.appendChild(p);

    // Crear un contenedor para el color (div + bloque inferior)
    const colorItemContainer = document.createElement("div");
    colorItemContainer.classList.add("color-item");
    colorItemContainer.appendChild(divColor);
    colorItemContainer.appendChild(bottomBlock);

    return colorItemContainer; // Retorna el bloque de color completo
}

// -- Evento boton "generar colores" --
generateColor.addEventListener("click", function() {
    let color; //Variable para almacenar el color generado
    let numColors; //Variable para almacenar la cantidad de colores a generar

    const colorContainer = document.querySelector("#color-container");

    // Eliminar clases previas para cambiar la cantidad de columnas
    colorContainer.classList.remove("six-colors", "eight-colors");

    if (!rgbaColors.checked && !hslColors.checked) {
        sixColors.checked = false;
        eightColors.checked = false;
        nineColors.checked = false;
        return;
    }

    // Determinar la cantidad de colores a generar
    if (sixColors.checked) {
        numColors = 6;
        console.log("cantidad de colores: 6");
        colorContainer.classList.add("six-colors");
    } else if (eightColors.checked) {
        numColors = 8;
        console.log("cantidad de colores: 8");
        colorContainer.classList.add("eight-colors");
    } else if (nineColors.checked) {
        numColors = 9;
        console.log("cantidad de colores: 9");
    } else {
        return;
    }

    // Elimino todos los hijos del contenedor en caso de que existan
    while (colorContainer.firstChild) {
        colorContainer.removeChild(colorContainer.firstChild);
    }

    // Si se seleccionan 6 o 8 colores, centramos los bloques
    if (numColors === 6 || numColors === 8) {
        colorContainer.classList.add("centered");
    }

    // Función para agregar bloques con retraso
    function addBlockWithDelay() {
        // Iteramos por el número de colores
        for (let i = 0; i < numColors; i++) {
            // Determinar tipo de color a generar
            if (rgbaColors.checked) {
                color = getRandomColorRGBA();
                color = rgbaToHex(color);
                console.log("Color RGBA generado: " + color);
                console.log("Tipo de color seleccionado: RGBA");
                hslColors.checked = false; //Desmarcar la casilla de HSL si se selecciona RGBA
            } else {
                color = getRandomColorHSL();
                color = hslToHex(color);
                console.log("Color HSL generado: " + color);
                console.log("Tipo de color seleccionado: HSL");
                rgbaColors.checked = false; //Desmarcar la casilla de RGBA si se selecciona HSL
            }

            // Crear el bloque para este color
            const colorBlock = createColorBlock(color);

            // Agregar el bloque con retraso
            setTimeout(() => {
                colorContainer.appendChild(colorBlock);
            }, i * 300);  // Retraso progresivo: 300ms, 600ms, 900ms++
        }
    }

    // Llamar a la función que agrega los bloques con retraso
    addBlockWithDelay();

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

// Usamos event delegation para manejar los clics en los checkboxes dentro de la sección "options-container"
document.querySelector('.options-container').addEventListener('change', function(event) {
// Verificar si el elemento clickeado es un checkbox
if (event.target && event.target.type === 'checkbox') {
    mostrarRetroalimentacion();  // Llamamos la función para mostrar el feedback
}
});

//-- Colores RGBA aleatorios cada vez que cargo la página --
document.addEventListener('DOMContentLoaded', () => {
    nineColors.checked = true;
    rgbaColors.checked = true;
    mostrarRetroalimentacion();
    
    for (let i = 0; i < 9; i++) {
        let color0 = getRandomColorRGBA();
        color0 = rgbaToHex(color0);
        const colorContainer0 = document.querySelector("#color-container");
        
        const colorBlock = createColorBlock(color0);
        colorContainer0.appendChild(colorBlock);
    }
});