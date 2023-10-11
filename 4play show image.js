// ==UserScript==
// @name         4play show image
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  try to take over the world!
// @author       You
// @match        https://4play.to/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=4play.to
// @updateURL  https://gitlab.com/skrip1/skripgue/-/raw/main/4play%20show%20image.js
// @downloadURL https://gitlab.com/skrip1/skripgue/-/raw/main/4play%20show%20image.js
// @require     https://code.jquery.com/jquery-3.7.1.slim.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function () {
    var button = document.createElement('button');
    button.setAttribute('class', 'loadmore');
    // button.setAttribute('style', 'margin-left: 10px;');
    button.setAttribute('id', 'loadmore');
    button.textContent = '🧩'
    var span = document.createElement('span');
    span.setAttribute('class', 'amountPages');
    span.innerHTML = '0';
    button.appendChild(span);

    document.querySelector('.Header-primary').appendChild(button);

    document.querySelector('.loadmore').addEventListener('click', () => {
        showImages();

    })

    'use strict';
    const style = `
.DiscussionListItem-main img {
width:50%;
}

    `;

    // Menambahkan gaya CSS ke head dokumen
    const styleElement = document.createElement("style");
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);

    function showImages() {
        var elemenLoad = 0;
        document.querySelector('.amountPages').textContent = elemenLoad;

        // var imageBlock = document.querySelectorAll('.imageAdd');
        // imageBlock.forEach((elemen) => {
        //     elemen.remove()
        // })

        var elemensBlock = document.querySelectorAll('[role="article"] a.DiscussionListItem-main');
        // elemensBlock.forEach((linkPerElement) => {
        //     // Mengganti atribut "src" dengan nilai dari atribut "data-src"
        //     // console.log(linkPerElement.href);
        //         getImage(linkPerElement.href, linkPerElement);


        //     document.querySelector('.amountPages').textContent = ++elemenLoad;
        // });
        function processElement(index) {
            if (index < elemensBlock.length) {
                var linkPerElement = elemensBlock[index];
                var delay = 0;
                if (!elemensBlock[index].querySelector('.imageAdd')) {
                    getImage(linkPerElement.href, linkPerElement);
                    delay = 1000;
                }
                document.querySelector('.amountPages').textContent = ++elemenLoad;

                // if (elemensBlock.length >= 25) {
                //     setTimeout(function() {
                //         processElement(index - 1); // Panggil fungsi processElement untuk elemen sebelumnya setelah 1 detik
                //     }, 1000);
                // } else {
                setTimeout(function () {
                    processElement(index + 1); // Panggil fungsi processElement untuk elemen berikutnya setelah 1 detik
                }, delay);
                // }
            }
        }

        processElement(0);

    }




    function getImage(urlpage, section) {
        GM_xmlhttpRequest({
            method: "GET",
            url: urlpage,
            onload: function (response) {
                // DO ALL RESPONSE PROCESSING HERE...
                // const parser = new DOMParser();
                // const htmlDocument = parser.parseFromString(response.responseText, "text/html");
                // const sections = htmlDocument.documentElement.querySelectorAll('.PostStream-item .Post-body img');

                var parser = new DOMParser();
                var doc = parser.parseFromString(response.responseText, "text/html");
                var elemens = doc.querySelectorAll('.Post-body img');
                // var span = document.createElement('span');
                // span.setAttribute('class', 'textplus');
                // span.innerHTML = pagenumber + ', ';
                // document.querySelector('.btnplus').appendChild(span);

                // document.querySelector('.index-container').appendChild(document.createElement("h1").appendChild(document.createTextNode('Page : ' + pagenumber)));

                // sections.forEach((section) => {
                //     document.querySelector('.index-container').appendChild(section);
                // })
                // console.log(
                //     "GM_xmlhttpRequest() response is:\n" +
                //     elemens.length

                // );
                // var areaImage = document.createElement('di');
                // areaImage.setAttribute('class', 'areaImage');
                // section.appendChild(areaImage);
                if (elemens) {
                    elemens.forEach((elemen) => {
                        elemen.classList.add("imageAdd");
                        section.appendChild(elemen)
                        // section.parentNode.innerHTML;
                        // console.dir(section)
                    })
                } else {

                    console.log('kosong : ' + response.responseText);
                }


                // console.log(
                //     "GM_xmlhttpRequest() response is:\n",

                // );
            },
            onerror: function (response) {
                console.error("error : \n"
                    + section.querySelector('.DiscussionListItem-title').textContent + '\n'
                    + response.readyState + '\n'
                    + response.responseHeaders + '\n'
                    + response.responseText + '\n'
                    + response.status + '\n'
                    + response.statusText + '\n'
                );

            }
        });
    }

})();