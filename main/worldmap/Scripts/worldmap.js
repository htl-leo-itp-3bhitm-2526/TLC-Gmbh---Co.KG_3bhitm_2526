function layout() {
    const backgroundWidth = 2899.2;
    const backgroundHeight = 1449.94;

    const scene = document.getElementById("scene");

    const clientWidth = scene.clientWidth;
    const clientHeight = scene.clientHeight;

    const scale = clientHeight / backgroundHeight;

    const drawnW = backgroundWidth * scale;
    const drawnH = backgroundHeight * scale;

    const offX = (clientWidth - drawnW) / 2;
    const offY = (clientHeight - drawnH) / 2;


    const worldmap = document.getElementById("worldmap");
    const rampatrap = document.getElementById("rampatrap");
    const rampatrapArm = document.getElementById("rampatrapArm");
    const introduction = document.getElementById("introduction");

    const rampatrapRight = 1140;
    const rampatrapBottom = 1040;
    const rampatrapWidth = 100;

    const rampatrapArmRight = 1070;
    const rampatrapArmBottom = 955;
    const rampatrapArmWidth = 25;

    const introductionWidth = 550;
    const introductionTextSize = 50;
    const introductionBorderSize = 8;
    const introductionborderRadius = 8;

    const rampatrapX = backgroundWidth - rampatrapRight;
    const rampatrapY = backgroundHeight - rampatrapBottom;

    const rampatrapArmX = backgroundWidth - rampatrapArmRight;
    const rampatrapArmY = backgroundHeight - rampatrapArmBottom;


    worldmap.style.left = offX + "px";
    worldmap.style.top = offY + "px";
    worldmap.style.height = drawnH + "px";

    rampatrap.style.left = (offX + rampatrapX * scale) + "px";
    rampatrap.style.top = (offY + rampatrapY * scale) + "px";
    rampatrap.style.width = (rampatrapWidth * scale) + "px";


    rampatrapArm.style.left = (offX + rampatrapArmX * scale) + "px";
    rampatrapArm.style.top = (offY + rampatrapArmY * scale) + "px";
    rampatrapArm.style.width = (rampatrapArmWidth * scale) + "px";

    introduction.style.width = (introductionWidth * scale) + "px";
    introduction.style.fontSize = (introductionTextSize * scale) + "px";
    introduction.style.border = (introductionBorderSize * scale) + "px solid #FED880";
    introduction.style.borderRadius = (introductionborderRadius * scale) + "px";
}

addEventListener("resize", layout);
addEventListener("orientationchange", layout);
worldmap.addEventListener("load", layout);
rampatrap.addEventListener("load", layout);
introduction.addEventListener("load", layout);
layout();