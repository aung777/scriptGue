// ==UserScript==
// @name         4play show image
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  try to take over the world!
// @author       aing
// @match        https://4play.to/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=4play.to
// @updateURL   https://raw.githubusercontent.com/aung777/scriptGue/main/4play%20show%20image.js
// @downloadURL https://raw.githubusercontent.com/aung777/scriptGue/main/4play%20show%20image.js
// @require     https://code.jquery.com/jquery-3.7.1.slim.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function () {
  var button = document.createElement("button");
  button.setAttribute("class", "loadmore");
  // button.setAttribute('style', 'margin-left: 10px;');
  button.setAttribute("id", "loadmore");
  button.textContent = "🧩";

  var textload = document.createElement("span");
  textload.setAttribute("class", "textload");
  textload.innerHTML = "0";
  button.appendChild(textload);

  var slash = document.createElement("span");
  slash.innerHTML = " / ";
  button.appendChild(slash);

  var span = document.createElement("span");
  span.setAttribute("id", "totalpage");
  span.innerHTML = "0";
  button.appendChild(span);

  document.querySelector(".Header-primary").appendChild(button);

  document.querySelector(".loadmore").addEventListener("click", () => {
    showImages();
  });

  ("use strict");
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
    var loadsuccess = 0;

    // var imageBlock = document.querySelectorAll(".textError");
    // if (imageBlock) {
    //   imageBlock.forEach((elemen) => {
    //     elemen.remove();
    //   });
    // }

    var elemensBlock = document.querySelectorAll(
      '[role="article"] a.DiscussionListItem-main'
    );
    // elemensBlock.forEach((elemen)=>{
    //   removeChild(elemen,'.textError')
    // })


    document.querySelector("#totalpage").innerHTML = elemensBlock.length;

    // elemensBlock.forEach((linkPerElement) => {
    //     // Mengganti atribut "src" dengan nilai dari atribut "data-src"
    //     // console.log(linkPerElement.href);
    //         getImage(linkPerElement.href, linkPerElement);

    //     document.querySelector('.totalpage').textContent = ++elemenLoad;
    // });
    function processElement(index) {
      if (index < elemensBlock.length) {
        var linkPerElement = elemensBlock[index];
        var delay = 0;

        if (elemensBlock[index].querySelector(".textError")) {
        removeChild(linkPerElement,".textError")
        removeChild(linkPerElement,".imageAdd")
          
        }
        if (!elemensBlock[index].querySelector(".imageAdd")) {
          // .height > 0
          getImage(linkPerElement.href, linkPerElement);
          delay = 1000;
          document.querySelector(".textload").innerHTML = ++loadsuccess;
        }

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
  function removeChild(parentnode,childremove) {
    var childsremove = parentnode.querySelectorAll(childremove);
    if (childsremove) {
      childsremove.forEach((elemen) => {
        elemen.remove();
      });
    }

    
  }
  function handleImageError() {
    // Fungsi ini akan dijalankan saat terjadi kesalahan saat memuat gambar.

    // console.log('Kesalahan saat memuat gambar.');
    console.log(
      "error load image  : \n" +
        this.parentNode.querySelector("h2").textContent +
        "\n" +
        this.src
    );
    var text = document.createElement("span");
    text.setAttribute("class", "textError");
    text.innerHTML = this.src + "<br> \n";
    this.parentNode.appendChild(text);

    this.remove();
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
        var elemens = doc.querySelectorAll(".Post-body img");
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
        if (elemens.length > 0) {
          elemens.forEach((elemen) => {
            elemen.classList.add("imageAdd");
            elemen.onerror = handleImageError;
            elemen.setAttribute("loading", "lazy");
            section.appendChild(elemen);
            // section.parentNode.innerHTML;
            // console.dir(section)
            // console.log("length : " + elemens.length);
          });
          // section.querySelector('.item-terminalPost').textContent = "["+elemens.length+"]";
          section.parentNode.querySelector('.DiscussionListItem-count span:not(.visually-hidden)').textContent = "["+elemens.length+"]";

        } else {
          section.parentNode.querySelector('.DiscussionListItem-count span:not(.visually-hidden)').textContent = "[0]";
          console.log("kosong : \n" +
          section.querySelector(".DiscussionListItem-title").textContent 
          + response.responseText);
        }

        // console.log(
        //     "GM_xmlhttpRequest() response is:\n",

        // );
      },
      onerror: function (response) {
        console.error(
          "error : \n" +
            section.querySelector(".DiscussionListItem-title").textContent +
            "\n" +
            response.readyState +
            "\n" +
            response.responseHeaders +
            "\n" +
            response.responseText +
            "\n" +
            response.status +
            "\n" +
            response.statusText +
            "\n"
        );
      },
    });
  }
})();
