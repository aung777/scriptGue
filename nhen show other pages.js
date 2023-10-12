// ==UserScript==
// @name         nhen show other pages
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  try to take over the world!
// @author       You
// @downloadURL https://gitlab.com/skrip1/skripgue/-/raw/main/add%20elemen.js?ref_type=heads
// @updateURL https://gitlab.com/skrip1/skripgue/-/raw/main/add%20elemen.js?ref_type=heads
// @match        https://nhentai.net/tag/*
// @icon         https://www.freeiconspng.com/thumbs/details-icon/details-icon-png-cc-by-3-0--it-1.png
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function () {
    'use strict';

    const style = `
    button#loadmore {
        position: fixed;
        left: 0;
        bottom: 0;
    }
        `;
    
      // Menambahkan gaya CSS ke head dokumen
      const styleElement = document.createElement("style");
      styleElement.innerHTML = style;
      document.head.appendChild(styleElement);

    // var gatepage = function (url,callback) {
    //     GM_xmlhttpRequest({
    //         method: 'GET',
    //         url:    url,
    //         onload: callback
    //     })
    // }
    var button = document.createElement('button');
    button.setAttribute('class', 'btnplus');
    button.setAttribute('style', 'margin-left: 10px;');
    button.setAttribute('id', 'loadmore');
    var span = document.createElement('span');
    span.setAttribute('class', 'plus');
    span.innerHTML = '+ : ';
    button.appendChild(span);

    document.querySelector('.pagination').prepend(button);


    function reloadImage() {
        // Mendapatkan semua elemen gambar dengan kelas "lazyload"
        const lazyLoadImages = document.querySelectorAll(".lazyload");

        // Iterasi melalui setiap elemen gambar
        lazyLoadImages.forEach((image) => {
            // Mengganti atribut "src" dengan nilai dari atribut "data-src"
            image.src = image.getAttribute("data-src");
        });
    }
    function lastpage() {
        return document.querySelector('.last').href.split('=')[1];
    }
    function currentpage() {
        return document.querySelector('.page.current').href.split('=')[1]
    }
    function getlinkweb() {
        return document.querySelector('.page').href.split('=')[0] + '=';
    }
    function loadOtherPage(urlpage, pagenumber) {
        GM_xmlhttpRequest({
            method: "GET",
            url: urlpage + pagenumber,
            onload: function (response) {
                // DO ALL RESPONSE PROCESSING HERE...
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(response.responseText, "text/html");
                const sections = htmlDocument.documentElement.querySelectorAll(".gallery");

                var span = document.createElement('span');
                span.setAttribute('class', 'textplus');
                span.innerHTML = pagenumber + ', ';
                document.querySelector('.btnplus').appendChild(span);

                // document.querySelector('.index-container').appendChild(document.createElement("h1").appendChild(document.createTextNode('Page : ' + pagenumber)));


                sections.forEach((section) => {
                    document.querySelector('.index-container').appendChild(section);
                })

                console.log(
                    "GM_xmlhttpRequest() response is:\n",
                    sections.forEach((section) => {
                        section.textContent;
                    })
                );
                reloadImage();
                console.log(
                    "berhasil load page: ",
                    pagenumber
                );
            }
        });
    }
    var pageLoadNow = currentpage();

    document.querySelector('.btnplus').addEventListener('click', () => {
        if (pageLoadNow++ <= lastpage()) {
            loadOtherPage(getlinkweb(), (pageLoadNow))
            console.log(
                "berhasil load page: ",
                pageLoadNow
            );
        }

    })

})();