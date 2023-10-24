// ==UserScript==
// @name         Buka Link FB
// @version      1.2
// @grant        GM_openInTab
// @description  Menampilkan tombol "Buka" ketika teks dipilih (diblok) dan membuka tab baru dengan tautan saat tombol diklik.
// @match        https://www.facebook.com/*
// @icon         https://www.google.com/s2/favicons?domain=www.facebook.com
// @require https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant      GM.registerMenuCommand
// ==/UserScript==

GM.registerMenuCommand("Hello, world (simple)", () => alert("Hello, world!"));

(function() {
  'use strict';

  var button = document.createElement("button");
  button.innerText = "Buka";
  button.style = "position: absolute; top: -30px; left: 0; margin-left: 10px; padding: 5px 10px; background-color: yellow; color: black; border: none; border-radius: 5px; font-family: Arial, sans-serif; font-size: 12px; cursor: pointer; display: none;";

  document.body.appendChild(button);

  var isEnabled = true; // Menyimpan status on/off tombol "Buka"

  // Fungsi untuk mengubah status on/off tombol "Buka" saat menu konteks diaktifkan atau dinonaktifkan
  function toggleButtonStatus() {
    isEnabled = !isEnabled;
    if (isEnabled) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }

  // Tambahkan opsi menu konteks untuk mengaktifkan atau menonaktifkan tombol "Buka"
  GM_registerMenuCommand("Aktifkan/Tidak Aktifkan Tombol Buka", toggleButtonStatus);

  document.addEventListener("mouseup", function() {
    var selectedText = window.getSelection().toString().trim();
    if (selectedText !== "" && isEnabled) { // Hanya menampilkan tombol "Buka" jika tombol aktif
      button.style.display = "block";
      var selectionRange = window.getSelection().getRangeAt(0);
      var boundingRect = selectionRange.getBoundingClientRect();
      button.style.top = (boundingRect.top + window.pageYOffset - button.offsetHeight) + "px";
      button.style.left = (boundingRect.left + window.pageXOffset) + "px";
    } else {
      button.style.display = "none";
    }
  });

  button.addEventListener("click", function() {
    var selectedText = window.getSelection().toString().trim();
    var cleanedText = selectedText.replace(/\s/g, "").replace(/[()]/g, "");
    var linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (linkRegex.test(cleanedText)) {
      GM_openInTab(cleanedText);
      showAlert("Link telah dibuka: " + cleanedText, 2000);
    } else {
      var dummyElement = document.createElement("textarea");
      document.body.appendChild(dummyElement);
      dummyElement.value = cleanedText;
      dummyElement.select();
      document.execCommand("copy");
      document.body.removeChild(dummyElement);
      showAlert("Teks berhasil disalin: " + cleanedText, 2000);
    }
    button.style.display = "none";
  });
  function showAlert(message, duration) {
    var alertContainer = document.createElement("div");
    alertContainer.style = "position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background-color: #333; color: white; padding: 10px; border-radius: 5px; font-family: Arial, sans-serif; font-size: 14px; z-index: 9999;";
    alertContainer.textContent = message;
    document.body.appendChild(alertContainer);
    setTimeout(function() {
      document.body.removeChild(alertContainer);
    }, duration);
  }
})();
