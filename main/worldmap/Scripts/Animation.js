const rampatrap = document.getElementById("rampatrap");
const rampatrapArm = document.getElementById("rampatrapArm");

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

setIdel();
