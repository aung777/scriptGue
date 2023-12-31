// ==UserScript==
// @name     Youtube Shorts Autoscroll [chatgpt]
// @version  1.0.1
// @author   Subhrajit Prusty and chatgpt and me
// @icon     https://www.shareicon.net/download/2016/06/18/595989_scrolling.ico
// @description Autoscroll through YouTube Shorts with toggle button
// @match    https://www.youtube.com/shorts/*
// @exclude  https://www.youtube.com/watch*
// @grant GM_addStyle
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

(function () {
  // Gaya CSS untuk tombol toggle switch
  const style = `
  button.yt-spec-button-shape-next.yt-spec-button-shape-next--filled.yt-spec-button-shape-next--overlay.yt-spec-button-shape-next--size-m {
  height: 10px;
}
  ytd-reel-player-header-renderer {
  padding: 0 !important;
  margin: 0 !important;
}

ytd-reel-player-header-renderer * {
  padding: 0 !important;
  margin: 0 !important;
  font-size: xx-small !important;
  height: 20px;
  opacity: 95%;
}
  .toggle-switch {
    position: fixed;
    z-index: 9999;
    cursor: pointer;
    font-size: 12px;
    user-select: none;
  }
  .isHidden {
  visibility: hidden;
  }

  .toggle-switch input {
    display: none;
  }

  .toggle-slider {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60px;
    height: 30px;
    background-color: #ccc;
    border-radius: 15px;
    transition: background-color 0.3s;
    padding: 2px;
  }

  .toggle-slider p {
    margin: 0;
    margin-left: 4px;
    margin-right: 1px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: white;
  }

  .slider-ball {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }

  .toggle-switch input:checked + .toggle-slider {
    background-color: green;
  }

  .toggle-switch input:checked + .toggle-slider .slider-ball {
    transform: translateX(100%);
  }
`;

  // Menambahkan gaya CSS ke head dokumen
  const styleElement = document.createElement("style");
  styleElement.innerHTML = style;
  document.head.appendChild(styleElement);
  const toggleQS = document.querySelector(".toggle-switch");

  let autoscrollEnabled = true;

  // Membuat tombol toggle switch
  const toggleSwitch = document.createElement("label");
  toggleSwitch.className = "toggle-switch";
  toggleSwitch.innerHTML = `
    <input type="checkbox" id="autoscroll-toggle" class="checkbox" checked>
    <span class="toggle-slider">
      <p>ON</p>
      <div class="slider-ball"></div>
      <p>OFF</p>
    </span>
  `;
  toggleSwitch.style.position = "fixed";
  toggleSwitch.style.bottom = "7%";
  toggleSwitch.style.right = "0.1%";
  toggleSwitch.style.paddingRight = "1em";
  toggleSwitch.style.zIndex = "9999";

  document.body.appendChild(toggleSwitch);

  // Mengambil elemen input, slider, dan bola
  const toggleInput = toggleSwitch.querySelector("input");
  const toggleSlider = toggleSwitch.querySelector(".toggle-slider");
  const sliderBall = toggleSwitch.querySelector(".slider-ball");
  // (async () => {
  //   autoscrollEnabled = await GM.getValue('autoscrollEnabled', true);
  // console.log("======== value ======= " + GM.getValue('autoscrollEnabled'));
  //
  //})();

  // Fungsi untuk mengubah status autoscroll saat toggle diubah
  toggleInput.addEventListener("input", function () {
    autoscrollEnabled = !autoscrollEnabled;
    changeColor();
    // console.log("keklik");
  });


  setInterval(function () {
    if (!autoscrollEnabled) {
      return;
    }

    let player = document.querySelector(".html5-video-player");
    if (!player) {
      console.log("======== Tidak ada pemutar aktif, melewati ======= ");
      return;
    }

    let video = player.querySelector("video"); // Mendapatkan video
    let down = document.querySelector("#navigation-button-down");
    video.loop = false;

    if (
      video.currentTime === video.duration &&
      !isNaN(video.duration) &&
      !isNaN(video.currentTime)
    ) {
      let actualButton = down.getElementsByClassName("style-scope ytd-shorts");
      if (actualButton.length > 0) {
        actualButton[0].click();
        console.log("======== Memutar video berikutnya ======= ");
      }
    }
  }, 1000);

  //cek pathname
  function handleVideoChanges() {
    if (window.location.pathname.includes("shorts")) {
      //   console.log("GM getvalue : " + GM.getValue("gmstatus", "false"));

      toggleQS.style.display = "block";
      // console.log('masuk ke if');
    } else {
      toggleQS.style.display = "none";
    }
  }
  //   function work switch toggle
  function changeColor() {
    // console.log("autoscrollEnabled : " + autoscrollEnabled);
    if (autoscrollEnabled) {
      toggleSlider.style.backgroundColor = "green";
      sliderBall.style.transform = "translateX(100%)";
    } else {
      toggleSlider.style.backgroundColor = "red";
      sliderBall.style.transform = "translateX(0)";
    }
  }

  // Atur event listener untuk mendeteksi perubahan di subtree dokumen
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        // Terdeteksi perubahan di subtree, cek apakah ada perubahan video
        handleVideoChanges();
      }
    }
  });

  // Mulai memantau subtree dokumen
  observer.observe(document, { subtree: true, childList: true });

  window.onload = (event) => {
    
    changeColor();
  };
  //setInterval(function() {
  //  console.log("curret time : " + document.querySelector(".html5-video-player").querySelector("video").currentTime
  //            + "|\n" + "durasi : " + document.querySelector(".html5-video-player").querySelector("video").duration);
  //}, 100);
})();
