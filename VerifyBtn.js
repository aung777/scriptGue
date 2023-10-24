// ==UserScript==
// @name         bypass with VerifyBtn : rontymobile, jomeramankahe.in, tinsukiacollege.org
// @namespace    aung
// @version      1.2
// @description  Add a floating button to the center of the page on rontymobile
// @author       Your Name
// @match        https://rontymobile.in/*
// @match        https://jomeramankahe.in/*
// @match        https://tinsukiacollege.org/*
// @match        https://mangareleasedate.com/*
// @match        https://netflixrelease.com/*
// @match        https://kojnews.com/*
// @match        https://therisingera.in/*
// @icon         https://cdn-icons-png.flaticon.com/256/1004/1004319.png
// @grant          GM_addStyle
// @grant          GM_registerMenuCommand
// ==/UserScript==

GM_addStyle(`#VerifyBtn {
    zoom: 6;
    float: right;
    position: fixed;
    top: 5%;
    }
    #myTimerDiv {
      position: fixed;
      top: 10px;
      left: 50%;
      background: white;
      scale: 5;
  }
  #StepInfo {
    position: fixed;
      bottom: 5%;
      left: 2%;
      zoom: 6;
  }
  `);
  GM_addStyle(`#NextBtn {
    position: fixed;
    top: 20%;
    zoom: 5;
    height: 5rem;
  }`);
  
  const klik_verify = GM_registerMenuCommand("klik_verify", () => {
    const verifyButton = document.getElementById("VerifyBtn");
    if (verifyButton) {
      verifyButton.click();
    }
  });
  const klik_continue = GM_registerMenuCommand("klik_continue", () => {
    const nextButton = document.getElementById("NextBtn");
    if (nextButton) {
      nextButton.click();
    }
    console.log("udah keklik klik_continue");
  });
  
  (function () {
    "use strict";
  
    // Buat elemen tombol "continue" dengan ID NextBtn
    // const continueButton = document.getElementById('NextBtn');
    // if (continueButton) {
    //   document.body.prepend(continueButton);
    //   continueButton.style.position = 'fixed';
    //   continueButton.style.top = '50%';
    //   continueButton.style.left = '40%';
    //   continueButton.style.transform = 'translate(-50%, -50%)';
    //   continueButton.style.zIndex = '9';
    //   continueButton.style.transform = 'scale(6)';
    //   continueButton.style.textAlign = "center";
  
    //   const blurElement = document.createElement('div');
    //   blurElement.style.filter = 'blur(10px)'; // Atur tingkat blur sesuai kebutuhan
    //   blurElement.style.width = '100%';
    //   blurElement.style.height = '100%'; // Sesuaikan tinggi sesuai kebutuhan
    //   blurElement.style.position = 'fixed';
    //   blurElement.style.zIndex = '8';
    //   blurElement.style.background = '#ffffffe8';
  
    // }
  
    // Ubah properti CSS display menjadi block untuk tombol VerifyBtn
    const verifyButton = document.getElementById("VerifyBtn");
    if (verifyButton) {
      verifyButton.style.display = "block";
    }
  
    function clickVerifyButton() {
      const verifyButton = document.getElementById("VerifyBtn");
      if (verifyButton) {
        verifyButton.click();
      }
    }
  
    // Panggil fungsi untuk mengklik tombol
    //setInterval(clickVerifyButton, 3000);
  
    function clickNextButton() {
      const nextButton = document.getElementById("NextBtn");
      if (nextButton) {
        nextButton.click();
      }
    }
  
    // Jalankan fungsi untuk mengklik tombol setiap detik
    //setInterval(clickNextButton, 3000); // Setiap 1000ms (1 detik)
  
    // Fungsi untuk menghapus elemen div-gpt-ad
    function removeElementsWithPrefix(prefix) {
      const elements = document.querySelectorAll(`[id^="${prefix}"]`);
      elements.forEach((element) => {
        element.remove();
      });
    }
  
    // Jalankan fungsi untuk menghapus elemen setiap detik
    //setInterval(() => {
    //  removeElementsWithPrefix('div-gpt');
    //}, 3000); // Setiap 1000ms (1 detik)
  
    // Dapatkan semua elemen <center> dalam dokumen
    // var centerElements = document.querySelectorAll('center');
  
    // Loop melalui elemen-elemen tersebut
    // centerElements.forEach(function(centerElement) {
    //   // Dapatkan semua elemen di dalam elemen <center>
    //   var childElements = centerElement.children;
  
    //   // Loop melalui elemen-elemen anak
    //   for (var i = 0; i < childElements.length; i++) {
    //     var child = childElements[i];
  
    //     // Periksa apakah elemen bukan <button> atau <a>
    //     if (child.tagName !== 'BUTTON' && child.tagName !== 'A') {
    //       // Hapus elemen anak tersebut
    //       centerElement.removeChild(child);
    //     }
    //   }
    // });
  
    // Ambil semua elemen <p>, <h2>, dan <h4> dari halaman
    const paragraphs = document.querySelectorAll("p");
    const headings2 = document.querySelectorAll("h2");
    const headings4 = document.querySelectorAll("h4");
    const nav = document.querySelectorAll("nav");
  
    // Hapus semua elemen <p>
    // paragraphs.forEach(paragraph => {
    //   paragraph.remove();
    // });
  
    // // Hapus semua elemen <h2>
    // headings2.forEach(heading => {
    //   heading.remove();
    // });
  
    // // Hapus semua elemen <h4>
    // headings4.forEach(heading => {
    //   heading.remove();
    // });
    // // Hapus semua elemen nav
    // nav.forEach(nav => {
    //   nav.remove();
    // });
  })();
  