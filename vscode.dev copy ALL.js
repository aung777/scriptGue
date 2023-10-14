// ==UserScript==
// @name         vscode.dev copy ALL tes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vscode.dev/github/aung777/scriptGue
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vscode.dev
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
  "use strict";

  // Buat elemen tombol
  const button = document.createElement("button");
  button.textContent = "🛒";

  // Gaya tombol
  button.style.position = "fixed";
  button.style.bottom = "20%"; // Atur jarak dari bawah
  button.style.left = "0%"; // Atur jarak dari kanan
  button.style.zIndex = "999"; // Atur z-index untuk menampilkan di atas elemen lain

  // Tambahkan event listener ke tombol
  button.addEventListener("click", function () {
    // Logika salin ke clipboard di sini
    const textToCopy = document.querySelector('.editor-instance .view-lines').innerText;
    // navigator.clipboard
    //   .writeText(textToCopy)
    //   .then(function () {
    //     console.log("Teks berhasil disalin ke clipboard.");
    //   })
    //   .catch(function (error) {
    //     console.error("Gagal menyalin teks: ", error);
    //   });
    // const textToClipboard = textToCopy.replace(/\n/g, '\r\n');
    // navigator.clipboard.writeText(textToClipboard).then(function () {
    //   console.log("Teks berhasil disalin ke clipboard.");
    // }).catch(function (error) {
    //   console.error("Gagal menyalin teks: ", error);
    // });

    GM_setClipboard(textToCopy, "text");
  });

  // Tambahkan tombol ke dokumen
  document.body.appendChild(button);
})();
