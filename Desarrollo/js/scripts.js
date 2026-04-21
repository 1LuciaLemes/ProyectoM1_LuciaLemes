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

//evento seleccionar tipo de color
const generateColor = document.querySelector("#generateColors");

rgbColors.addEventListener("change", function() {
    if(rgbColors.checked) {
        hslColors.checked = false; //desmarca la casilla de HSL si se selecciona RGB
    }
});

hslColors.addEventListener("change", function() {
    if(hslColors.checked) {
        rgbColors.checked = false; //desmaraca la casilla de RGB si se selecciona HSL
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
    
    const colorContainer = document.querySelector("#color-container");
    // elimino todos los hijos del contenedor en caso de que existan
    while (colorContainer.firstChild){
        colorContainer.removeChild(colorContainer.firstChild);
    }
    //determinar tipo de color a generar
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
    //determinar tope de cantidad de colores a generar
    let numColors;

    if (sixColors.checked) {
        numColors = 6;
        console.log("cantidad de colores : 6");
    } else if (eightColors.checked){
        numColors = 8;
        console.log("cantidad de colores :8");
    } else if (nineColors.checked){
        numColors = 9;
        console.log("cantidad de colores : 9");
    };

    //crear y mostrar contenedor de los colores
    for (let i = 0; i < numColors; i++) {
        const div = document.createElement("div");
        div.classList.add("color-container");

        div.style.backgroundColor = color;
        div.style.borderRadius = "5px";
        div.style.border = "2px solid brown";
        // div.style.transform = "rotate(40deg)";
        console.log ("color generado");
        colorContainer.appendChild(div);
        console.log("contenedor creado");
    }
});
