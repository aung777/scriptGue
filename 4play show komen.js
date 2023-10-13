// ==UserScript==
// @name         4play button komen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @downloadURL https://raw.githubusercontent.com/aung777/scriptGue/main/4play%20show%20komen.js
// @updateURL   https://raw.githubusercontent.com/aung777/scriptGue/main/4play%20show%20komen.js
// @match        https://4play.to/koleksi/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=4play.to
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const style = `
    .editing p {
        position: fixed;
        right: 2%;
        bottom: 20%;
        font-size: 4rem;
        width: 21rem;
        z-index: -91;
    }
    #floatingButton {
    position: fixed;
    bottom: 1%;
    right: 40%;
    z-index: 9999; /* Atur z-index agar tombol selalu berada di atas konten lain */
}
    #floatingButtonKomen {
    position: fixed;
    bottom: 1%;
    right: 30%;
    z-index: 9999; /* Atur z-index agar tombol selalu berada di atas konten lain */
}

    `;

    // Menambahkan gaya CSS ke head dokumen
    const styleElement = document.createElement("style");
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);

    window.onload = function () {
        // Buat elemen tombol
        var button = document.createElement('button');
        button.id="floatingButtonKomen"
        button.textContent = 'auto komen';

        // Tambahkan event listener untuk menangani klik tombol
        button.addEventListener('click', function () {
            var element = document.querySelector('.SplitDropdown-button.hasIcon');
            element.click();

            // Daftar kalimat acak
            var randomSentences = [
                "Izi. Comot gan",
                "Ijin lihat min.",
                "yang banyak min wwkwk.",
                "Ijin donwload.",
                "Cek dulu suhu.",
                "mantap bro, makasih",
                "thank u kontennya!",
                "Izin cekidot gan"
            ];

            // Pilih kalimat acak dari daftar
            var randomIndex = Math.floor(Math.random() * randomSentences.length);
            var randomSentence = randomSentences[randomIndex];

            // Temukan textarea dengan kelas "TextEditor-editor" dan isi dengan kalimat acak
            var textarea = document.querySelector('.TextEditor-editor');
            if (textarea) {
                textarea.value = randomSentence;

                const inputEvent = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                });

                textarea.dispatchEvent(inputEvent);

            } else {
                console.error('Textarea dengan kelas "TextEditor-editor" tidak ditemukan.');
            }


        });

        // Temukan elemen dengan kelas ".Scrubber"
        var scrubberElement = document.querySelector('.item-scrubber');

        // Pastikan elemen ".Scrubber" ditemukan sebelum menambahkan tombol
        document.body.appendChild(button);
        // if (scrubberElement) {
        //     scrubberElement.appendChild(button);
        // } else {
        //     console.error('Elemen dengan kelas ".Scrubber" tidak ditemukan.');
        // }
    }

    function keAtas() {
        var keatas = document.querySelector('.Scrubber-first');
        keatas.click();
    }


    var carikomen = document.querySelector('.item-submit');

    var btnKomen = document.createElement('button');
    btnKomen.id="floatingButton"
    btnKomen.textContent = 'kirim komen';
    // if (carikomen) {
    document.body.appendChild(btnKomen);
    // }
    btnKomen.addEventListener('click', function () {
        document.querySelector('[itemclassname="App-primaryControl"]').click();

        keAtas();
    
        setTimeout(() => {
            keAtas();

            location.replace(location.href);
            keAtas();
        }, 3010);
        keAtas();
    })

    // Sisipkan tombol ke dalam dokumen
    //document.body.appendChild(button);

})();