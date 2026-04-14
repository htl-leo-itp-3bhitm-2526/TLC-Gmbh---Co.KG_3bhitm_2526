// Globale Lautstärke-Steuerung via localStorage
// Wird auf allen Seiten eingebunden – überschreibt HTMLMediaElement.play()
(function () {
    const KEY = 'siteVolume';

    function getVol() {
        const v = localStorage.getItem(KEY);
        return v !== null ? parseFloat(v) : 0.8;
    }

    // Jedes audio.play() bekommt automatisch die gespeicherte Lautstärke
    const origPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
        this.volume = getVol();
        return origPlay.call(this);
    };

    window.getSiteVolume = function () {
        return getVol();
    };

    window.setSiteVolume = function (value) {
        const vol = Math.max(0, Math.min(1, parseFloat(value)));
        localStorage.setItem(KEY, vol.toString());
        // Laufende Medien sofort anpassen
        document.querySelectorAll('audio, video').forEach(function (el) {
            el.volume = vol;
        });
    };
})();
