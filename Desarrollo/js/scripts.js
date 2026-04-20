

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

//evento del boton "generar colores"
const generateColor = document.querySelector("#generateColors");

generateColor.addEventListener("click", function() {
    let colorRGB = getRandomColorRGB();
    console.log("Color RGB generado: " + colorRGB);
    
    //crear y mostrar contenedor de los colores
    const colorContainer = document.querySelector("#colorContainer");
    const div = document.createElement("div");
    div.classList.add("color-container");

    div.style.backgroundColor = colorRGB;
    colorContainer.appendChild(div);
});
