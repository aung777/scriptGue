// ==UserScript==
// @name         nhen show other pages
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  try to take over the world!
// @author       aing
// @downloadURL https://raw.githubusercontent.com/aung777/scriptGue/main/nhen%20show%20other%20pages.js
// @updateURL   https://raw.githubusercontent.com/aung777/scriptGue/main/nhen%20show%20other%20pages.js
// @match        https://nhentai.net/tag/*
// @match        https://nhentai.net/search/*
// @icon         https://www.freeiconspng.com/thumbs/details-icon/details-icon-png-cc-by-3-0--it-1.png
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function () {
    'use strict';

    const style = `
    button#loadmore {
        position: fixed;
        left: 0;
        bottom: 2rem;
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
    span.innerHTML = '➕ : ';
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
    function amountElementInPage() {
        var elemen = document.querySelectorAll(".gallery");
        return elemen.length;
    }
    function loadOtherPage(urlpage, pagenumber) {
        GM_xmlhttpRequest({
            method: "GET",
            url: urlpage + pagenumber,
            onload: function (response) {
                // DO ALL RESPONSE PROCESSING HERE...
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(response.responseText, "text/html");
                const sections = Array.from(htmlDocument.querySelectorAll(".gallery"));

                if(!document.querySelector(".textCurrent")){
                    var btnthis = document.querySelector('.btnplus')
                    appendtext(btnthis, "textCurrent" ,currentpage())
                    appendtext(btnthis, "textTO" ,"")
                    var temptext = "/"+ lastpage();
                    appendtext(btnthis, "textMax" , temptext)
                    var temptext2 = " ▶️ "+ amountElementInPage();
                    appendtext(btnthis, "elemenInPage" , temptext2)
                }




                // document.querySelector('.index-container').appendChild(document.createElement("h1").appendChild(document.createTextNode('Page : ' + pagenumber)));

                if (sections.length < 1) {
                    console.log(
                        "url: " +
                        urlpage ,"\n" +

                        "section length : " +
                        sections.length ,"\n"
                         +"isi respon : " +
                         response.responseText ,"\n"
                    );
                    document.querySelector('.textTO').textContent = "- " + pagenumber + "error" ;

                }else {
                    sections.forEach((section) => {
                        document.querySelector('.index-container').appendChild(section);
                    })
                    document.querySelector('.textTO').textContent = "-" + pagenumber;
                    document.querySelector('.elemenInPage').textContent = " ▶️ "+ amountElementInPage();

                    // console.log(

                    //     " GM_xmlhttpRequest() response is:\n",
                    //     sections.forEach((section) => {
                    //         section;
                    //     })
                    // );
                    reloadImage();
                    console.log(
                        "berhasil load page: ",
                        pagenumber
                    );

                }

            }
        });
    }
    var pageLoadNow = currentpage();

    function appendtext(parentElement,className,text) {
        var span = document.createElement('span');
        span.setAttribute('class', className);
        span.innerHTML = text;
        parentElement.appendChild(span);

    }

    document.querySelector('.btnplus').addEventListener('click', () => {
        if (pageLoadNow++ <= lastpage()) {
            loadOtherPage(getlinkweb(), (pageLoadNow))
            // console.log(
            //     "berhasil load page: ",
            //     pageLoadNow
            // );
        }

    })

})();