//funcion para generar colores aleatorios
function getRandomColorRGB() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

function getRandomColorHSL() {
    let hue = Math.floor(Math.random() * 361);
    let saturation = Math.floor(Math.random() * 101);
    let lightness = Math.floor(Math.random() * 101);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

//dependencia del tipo y cantidad de colores
const rgbColors = document.querySelector("#rgbColors");
const hslColors = document.querySelector("#hslColors");

const sixColors = document.querySelector("#sixColors");
const eightColors = document.querySelector("#eightColors");
const nineColors = document.querySelector("#nineColors");


//evento seccionar tipo de color
const generateColor = document.querySelector("#generateColors");

rgbColors.addEventListener("change", function() {
    if(rgbColors.checked) {
        hslColors.checked = false; //desmarcar la casilla de HSL si se selecciona RGB
    }
});

hslColors.addEventListener("change", function() {
    if(hslColors.checked) {
        rgbColors.checked = false; //desmaracar la casilla de RGB si se selecciona HSL
    }
});

//TODO:evento seleccionar cantidad de colores


//TODO: evento boton "generar colores" falta completar con la funcion de cantidad de colores
generateColor.addEventListener("click", function() {
    
    const colorContainer = document.querySelector("#color-container");
    // elimino todos los hijos del contenedor en caso de que existan
    while (colorContainer.firstChild){
        colorContainer.removeChild(colorContainer.firstChild);
    }

    let color;
    if(rgbColors.checked) {
        color = getRandomColorRGB();
        console.log("Color RGB generado: " + color);
        console.log("Tipo de color seleccionado: RGB");
        hslColors.checked = false; //desmarcar la casilla de HSL si se selecciona RGB
    } else {
        color = getRandomColorHSL();
        console.log("Color HSL generado: " + color);
        console.log("Tipo de color seleccionado: HSL");
        rgbColors.checked = false; //desmarcar la casilla de RGB si se selecciona HSL
    }
    
    //crear y mostrar contenedor de los colores
    const div = document.createElement("div");
    div.classList.add("color-container");

    div.style.backgroundColor = color;
    console.log ("color generado");
    colorContainer.appendChild(div);
    console.log("contenedor creado");
});
