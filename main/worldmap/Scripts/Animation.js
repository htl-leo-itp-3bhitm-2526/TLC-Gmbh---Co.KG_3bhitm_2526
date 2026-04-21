const rampatrap = document.getElementById("rampatrap");
const rampatrapArm = document.getElementById("rampatrapArm");
const lucia = document.getElementById("lucia");
const luciaArm = document.getElementById("luciaArm");

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

setIdel();
setLuciaIdel();
