(function () {
    if (!'speechSynthesis' in window) {
        alert('Your browser not support tha Web Speech API');
        return;
    }

    let playing = false;

    function toMimi(e) {

        e.preventDefault();

        if (playing) return;

        const input = document.querySelector('.form__input');

        input.value = input.value.replaceAll(/\s+/g, " ").trim();
        const { value } = input;

        if (!value) return;

        const result = document.querySelector('.result');
        const mimiText = value.replaceAll(/(a)|e|o/gi, "i");
        result.textContent = mimiText;
        speak(mimiText);
    }

    function speak(text) {
        const voice = new SpeechSynthesisUtterance();
        const { speechSynthesis } = window;
        voice.lang = 'es';
        voice.text = text;
        speechSynthesis.speak(voice);
        voice.onstart = () => playing = true;
        voice.onend = () => playing = false;
    }
    function clear(e) {
        if (!e.target.value) {
            document.querySelector('.result').textContent = "";
        }
    }
    document.querySelector('.form__input')
        .addEventListener('input', clear);

    document.querySelector('.form')
        .addEventListener('submit', toMimi);
})();