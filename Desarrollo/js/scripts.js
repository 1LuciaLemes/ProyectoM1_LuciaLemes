//función para generar colores aleatorios
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

// Convertir HSL a HEX
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

//Convertir RGBA a HEX
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

//constantes para referenciar a los elementos que contienen tipo y cantidad de color
const rgbaColors = document.querySelector("#rgbaColors");
const hslColors = document.querySelector("#hslColors");

const sixColors = document.querySelector("#sixColors");
const eightColors = document.querySelector("#eightColors");
const nineColors = document.querySelector("#nineColors");

//evento seleccionar tipo de color
const generateColor = document.querySelector("#generateColors");

rgbaColors.addEventListener("change", function() {
    if(rgbaColors.checked) {
        hslColors.checked = false; //desmarca la casilla de HSL si se selecciona RGBA
    }
});

hslColors.addEventListener("change", function() {
    if(hslColors.checked) {
        rgbaColors.checked = false; //desmaraca la casilla de RGBA si se selecciona HSL
    }
});

//evento seleccionar cantidad de colores
sixColors.addEventListener("change",function(){
    if(sixColors.checked) {
        eightColors.checked = false;
        nineColors.checked = false;
    }
});

eightColors.addEventListener("change",function(){
    if(eightColors.checked) {
        sixColors.checked = false;
        nineColors.checked = false;
    }
});

nineColors.addEventListener("change",function(){
    if(nineColors.checked) {
        sixColors.checked = false;
        eightColors.checked = false;
    }
});

//evento boton "generar colores"
generateColor.addEventListener("click", function() {
    let color; //variable para almacenar el color generado
    let numColors; //variable para almacenar la cantidad de colores a generar

    const colorContainer = document.querySelector("#color-container");

    // elimino todos los hijos del contenedor en caso de que existan
    while (colorContainer.firstChild){
        colorContainer.removeChild(colorContainer.firstChild);
    }

    if(!rgbaColors.checked && !hslColors.checked){
        sixColors.checked = false;
        eightColors.checked = false;
        nineColors.checked = false;
        alert("Por favor, seleccione el tipo de color a generar.");
    };
    
    //determinar cantidad de colores a generar
    if (sixColors.checked) {
        numColors = 6;
        console.log("cantidad de colores : 6");
    } else if (eightColors.checked){
        numColors = 8;
        console.log("cantidad de colores :8");
    } else if (nineColors.checked){
        numColors = 9;
        console.log("cantidad de colores : 9");
    }else if (!sixColors.checked && !eightColors.checked && !nineColors.checked) {
        alert("Por favor, seleccione la cantidad de colores a generar.");
    };


    //crear y mostrar contenedor de los colores
    for (let i = 0; i < numColors; i++) {
        //determinar tipo de color a generar
        if(rgbaColors.checked) {
            color = getRandomColorRGBA();
            color = rgbaToHex(color);
            console.log("Color RGBA generado: " + color);
            console.log("Tipo de color seleccionado: RGBA");
            hslColors.checked = false; //desmarcar la casilla de HSL si se selecciona RGBA
        } else {
            color = getRandomColorHSL();
            color = hslToHex(color);
            console.log("Color HSL generado: " + color);
            console.log("Tipo de color seleccionado: HSL");
            rgbaColors.checked = false; //desmarcar la casilla de RGBA si se selecciona HSL
        }

        const divColor = document.createElement("div");//creo el divColor para almacenar el color aleatoreo
        divColor.classList.add("color-container");

        divColor.style.backgroundColor = color;
        divColor.style.borderRadius = "5px";
        divColor.style.border = "2px solid brown";
        // divColor.style.transform = "rotate(40deg)";
        console.log ("color generado");
        console.log("contenedor creado");

        const p = document.createElement("p");//creo el elemento p para mostrar el código HEX del color generado.
        p.textContent = color;
        p.classList.add("hex-code");

        const colorItemContainer = document.createElement("div");//creo un contenedor para cada color, que contenga el divColor y el HEX de ese color.
        colorItemContainer.appendChild(divColor);
        colorItemContainer.appendChild(p);
        colorContainer.appendChild(colorItemContainer);
    }
});
