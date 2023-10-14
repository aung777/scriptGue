// ==UserScript==
// @name         nhen show EN only
// @version      1.0.1
// @description  try to take over the world!
// @author       You
// @match        https://nhentai.net/*
// @icon         https://cdn-icons-png.flaticon.com/128/75/75277.png
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Membuat elemen tombol
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "show ALL";

  // Inisialisasi status tersembunyi
  let isHidden = false;
  const myInterval = setInterval(makeHidden, 1000);

  function makeHidden() {
    const elementsWithout12227 = document.querySelectorAll(
      '.gallery:not([data-tags*="12227"])'
    );

    elementsWithout12227.forEach((element) => {
      if (isHidden) {
        element.classList.add("hidden");
      } else {
        element.classList.remove("hidden");
      }
    });
  }

  // Menambahkan event listener ke tombol
  toggleButton.addEventListener("click", function () {
    // Cari semua elemen dengan kelas "gallery" yang tidak memiliki atribut "data-tags" yang berisi "12227"

    makeHidden();

    // Memperbarui status tersembunyi
    isHidden = !isHidden;

    toggleButton.innerText = isHidden ? "EN only" : "show ALL";
  });

  // Menambahkan tombol ke body halaman
  tombollist = document.querySelector(".menu.left");
  tombollist.appendChild(toggleButton);
})();
