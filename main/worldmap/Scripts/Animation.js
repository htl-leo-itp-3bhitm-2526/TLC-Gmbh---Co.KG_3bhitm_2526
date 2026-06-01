const rampatrap = document.getElementById("rampatrap");
const rampatrapArm = document.getElementById("rampatrapArm");
const lucia = document.getElementById("lucia");
const luciaArm = document.getElementById("luciaArm");
const jose = document.getElementById("jose");
const joseArm = document.getElementById("joseArm");
const sailosi = document.getElementById("sailosi");
const sailosiArm = document.getElementById("sailosiArm");

function setGretting() {
    rampatrap.src = "SVGs/rampatrapNoArm.svg";
    rampatrapArm.style.display = "block";

    setTimeout(setIdel, 2000);
}

function setIdel() {
    rampatrap.src = "SVGs/rampatrap.svg";
    rampatrapArm.style.display = "none";

    const delay = 5000 + Math.random() * 2000;
    setTimeout(setGretting, delay);
}

function setLuciaGretting() {
    lucia.src = "SVGs/LuciaNoArm.svg";
    luciaArm.style.display = "block";

    setTimeout(setLuciaIdel, 2000);
}

function setLuciaIdel() {
    lucia.src = "SVGs/Lucia.svg";
    luciaArm.style.display = "none";

    const delay = 5000 + Math.random() * 2000;
    setTimeout(setLuciaGretting, delay);
}

function setJoseGretting() {
    jose.src = "../José/SVGs/JoséWithoutArm.svg";
    joseArm.style.display = "block";

    setTimeout(setJoseIdel, 2000);
}

function setJoseIdel() {
    jose.src = "../José/SVGs/José.svg";
    joseArm.style.display = "none";

    const delay = 5000 + Math.random() * 2000;
    setTimeout(setJoseGretting, delay);
}

function setSailosiGreeting() {
    sailosi.src = "../Sailosi/SVGs/SailosiNoArm.svg";
    sailosiArm.style.display = "block";

    setTimeout(setSailosiIdel, 2000);
}

function setSailosiIdel() {
    sailosi.src = "../Sailosi/SVGs/Sailosi.svg";
    sailosiArm.style.display = "none";

    const delay = 5000 + Math.random() * 2000;
    setTimeout(setSailosiGreeting, delay);
}

setIdel();
setLuciaIdel();
setJoseIdel();
setSailosiIdel();
