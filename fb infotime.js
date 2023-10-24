// ==UserScript==
// @name         video scroll and timeInfo
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/reel/*
// @icon         https://cdn.iconscout.com/icon/premium/png-512-thumb/file-time-info-3538395-2961069.png?f=avif&w=256
// @grant       GM.setValue
// @grant       GM.getValue
// @grant      GM.registerMenuCommand

// ==/UserScript==

// (async () => {
//   let getawal = await GM.getValue("status", true);

//   // Note awaiting the set -- required so the next get sees this set.
//   await GM.setValue("status", false);

//   // Get the value again, just to demonstrate order-of-operations.
//   let isiGM = await GM.getValue("status");

//   console.log("isi GM value", isiGM, " nah");
// })();
GM.registerMenuCommand("Zoom video (default = 1)", () => {
  var zoomNumber = prompt("Default 1 ");
  if (zoomNumber >= 1) {
    document.querySelector('[tabindex="-1"]:has(video)').style.zoom = zoomNumber;
  }else if (zoomNumber == null) {
    document.querySelector('[tabindex="-1"]:has(video)').style.zoom = 1;
    
  }
});

(function () {
  "use strict";

  // Gaya CSS untuk tombol toggle switch
  const style = `
.ishidden {
display: none;
}

.sliderContainer span {
margin: auto;
}

.scrollCheckCointainer {
bottom: 15%;
left: 1%;
padding: 0.5rem;
}
.sliderContainer {
width: 500px;
}

.slider-control {
-webkit-appearance: none;
width: 100%;
height: 25px;
background: #d3d3d3;
outline: none;
opacity: 0.5;
-webkit-transition: .2s;
transition: opacity .2s;
}

.slider-control:hover {
opacity: 1;
}
.scrollCheckCointainer:hover {
  background: #0866ffa8;
}

.slider-control::-webkit-slider-thumb {
-webkit-appearance: none;
appearance: none;
width: 25px;
height: 25px;
background: #0866ff;
cursor: pointer;
}

.slider-control::-moz-range-thumb {
width: 25px;
height: 25px;
background: #0866ff;
cursor: pointer;
}

[type="checkbox"] {
vertical-align: middle;
}
.scrollCheckCointainer * {
  color: azure;
}
    `;

  // Menambahkan gaya CSS ke head dokumen
  const styleElement = document.createElement("style");
  styleElement.innerHTML = style;
  document.head.appendChild(styleElement);

  const scrollCheckCointainer = document.createElement("div");
  scrollCheckCointainer.className = "scrollCheckCointainer";
  scrollCheckCointainer.innerHTML = `
    

      <div for="opsi1">
          <input type="checkbox" id="opsi1" class="checkbox" name="opsi1">
          <label class = "ishidden">Opsi 1</label>
      </div>

      <div for="opsi2">
          <input type="checkbox" id="opsi2" class="checkbox" name="opsi2">
          <label class = "ishidden">Opsi 2</label>
      </div>


      <div for="opsi3">
          <input type="checkbox" id="cb1" class="checkbox"  name="opsi3">
          <label class = "ishidden">Auto Next</label>
      </div>
    `;
  scrollCheckCointainer.style.zIndex = "999";
  scrollCheckCointainer.style.position = "fixed";

  document.body.appendChild(scrollCheckCointainer);

  const toggleSwitch = document.createElement("div");
  toggleSwitch.className = "toggle-switch";
  toggleSwitch.innerHTML = `
      <input type="checkbox" id="autoscroll-toggle" class="checkbox" checked>
      <span class="toggle-slider">
        <p>ON</p>
        <div class="slider-ball"></div>
        <p>OFF</p>
      </span>
    `;

  const scrollCheckbox = document.querySelector("#cb1");
  // Ketika status checkbox berubah
  scrollCheckbox.addEventListener("change", function () {
    if (scrollCheckbox.checked) {
      // Aktifkan fungsi scroll di sini
      GM.setValue("status", true);
      statusNextVideo = true;
      console.log("Fungsi scroll diaktifkan.");
    } else {
      // Matikan fungsi scroll di sini
      GM.setValue("status", false);
      statusNextVideo = false;
      console.log("Fungsi scroll dinonaktifkan.");
    }
  });

  const ckbox = document.querySelector(".scrollCheckCointainer");
  ckbox.addEventListener("mouseover", mouseOver);
  ckbox.addEventListener("mouseout", mouseOut);

  const labels = document.querySelectorAll(".scrollCheckCointainer label");

  function mouseOver() {
    document
      .querySelector(".scrollCheckCointainer label")
      .classList.add("ishidden");
    for (const label of labels) {
      label.classList.remove("ishidden");
    }
  }

  function mouseOut() {
    for (const label of labels) {
      label.classList.add("ishidden");
    }
  }

  const sliderContainer = document.createElement("div"); // Membuat elemen div sebagai elemen induk
  sliderContainer.className = "sliderContainer";
  //sliderContainer.textContent = "0:00"
  sliderContainer.style.display = "flex";
  sliderContainer.style.position = "fixed";
  sliderContainer.style.bottom = "0";
  sliderContainer.style.left = "50%";
  sliderContainer.style.transform = "translateX(-50%)";
  sliderContainer.style.zIndex = "9999";
  document.body.appendChild(sliderContainer); // Menambahkan elemen induk ke dalam dokumen

  const rangeSlider = document.createElement("input");
  rangeSlider.className = "slider-control";
  rangeSlider.type = "range";
  rangeSlider.min = "0";
  rangeSlider.max = "100";
  rangeSlider.value = "1"; // Nilai awal slider

  // Gaya slider range sesuai kebutuhan Anda
  //rangeSlider.style.width = "100%"; // Lebar slider
  //rangeSlider.style.height = "20px"; // Tinggi slider
  //rangeSlider.style.position = "fixed"; // Atur posisi menjadi fixed
  //rangeSlider.style.bottom = "0"; // Tempatkan di bagian bawah
  //rangeSlider.style.left = "50%"; // Pusat horizontal
  //rangeSlider.style.transform = "translateX(-50%)"; // Pusat horizontal
  //rangeSlider.style.zIndex = "999"; // Z-index untuk memastikan tampil di atas elemen lain

  // Buat elemen untuk menampilkan current time
  const currentTimeDisplay = document.createElement("span");
  currentTimeDisplay.textContent = "0:00";
  currentTimeDisplay.style.fontSize = "15px";
  currentTimeDisplay.id = "TXcurrentTime";
  // Gaya display waktu sesuai kebutuhan Anda
  currentTimeDisplay.style.color = "white"; // Ubah warna teks menjadi putih

  // $('[tabindex="-1"]:has(video)').style.zoom = 2

  //currentTimeDisplay.style.position = "fixed";
  // currentTimeDisplay.style.bottom = "5px"; // Sesuaikan dengan posisi slider
  // currentTimeDisplay.style.left = "calc(50% - 215px)"; // Tempatkan di tengah horizontal
  //currentTimeDisplay.style.transform = "translateX(-50%)"; // Pusat horizontal
  //currentTimeDisplay.style.zIndex = "1000"; // Pastikan tampil di atas slider

  // Buat elemen untuk menampilkan durasi
  const durationDisplay = document.createElement("span");
  durationDisplay.textContent = "0:00"; // Nilai awal durasi
  durationDisplay.id = "TXduration";

  // Gaya display durasi sesuai kebutuhan Anda
  durationDisplay.style.color = "white"; // Ubah warna teks menjadi putih
  durationDisplay.style.fontSize = "15px";
  //durationDisplay.style.position = "fixed";
  //durationDisplay.style.bottom = "5px"; // Sesuaikan dengan posisi slider
  //durationDisplay.style.right = "calc(50% - 255px)"; // Atur di sebelah kanan slider
  //durationDisplay.style.transform = "translateX(-50%)"; // Pusat horizontal
  //durationDisplay.style.zIndex = "1000"; // Pastikan tampil di atas slider

  // Sisipkan slider range ke dalam elemen <body>
  sliderContainer.appendChild(currentTimeDisplay);
  sliderContainer.appendChild(rangeSlider);
  sliderContainer.appendChild(durationDisplay);

  function secToText(secs) {
    let Minutes = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    let Seconds = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return Minutes + ":" + Seconds;
  }
  var statusNextVideo = true;

  // ketika sudah load
  window.onload = (event) => {
    // hilangkan muted
    // if (document.querySelector("video[playsinline]").currentTime > 0.1) {
    //   setTimeout(function() {
    //     //your code to be executed after 1 second
    //    document.querySelector("video[playsinline]").muted = false ;

    //   }, 1000);
    // }
    // GM.setValue("status", true);
    (async () => {
      // await GM.setValue("status", false);

      statusNextVideo = await GM.getValue("status");
      scrollCheckbox.checked = await GM.getValue("status");

      // console.log("isi GM value", isiGM, " nah");
      console.log("isi GM di load: " + statusNextVideo);
    })();

    if (document.querySelector('[aria-label="Batalkan senyap"]')) {
      document.querySelector('[aria-label="Batalkan senyap"]').click();
    }
  };

  function setupVideoEventListener(video) {
    video.addEventListener("timeupdate", info);
    video.addEventListener("ended", myHandler, false);
    // Tambahkan event listener "change" ke slider
    rangeSlider.addEventListener("input", function () {
      // Hitung waktu yang sesuai dengan nilai slider yang dipilih
      const setcurrentTime = (video.duration / 100) * this.value;

      // Atur waktu pemutaran video
      if (
        !isNaN(setcurrentTime) &&
        setcurrentTime >= 0 &&
        setcurrentTime <= video.duration
      ) {
        // Atur waktu pemutaran video
        video.currentTime = setcurrentTime;
      }
    });
    window.addEventListener("resize", function (event) {
      console.log(video.parentElement.clientWidth);
    });

    function info() {
      // console.log(
      //   "timeInfo " +
      //     secToText(video.currentTime) +
      //     "/" +
      //     secToText(video.duration)
      // );
      document.querySelector("#TXcurrentTime").textContent = secToText(
        video.currentTime
      );
      document.querySelector("#TXduration").textContent = secToText(
        video.duration
      );
      rangeSlider.value = 100 * (video.currentTime / video.duration);
    }

    function myHandler(e) {
      //console.log("selesai : " + this.duration)
      if (statusNextVideo) {
        document.querySelector('[aria-label="Kartu Berikutnya"]').click();
      }
    }
  }

  function handleVideoChanges() {
    // Cari semua elemen video
    const videos = document.querySelectorAll("video[playsinline]");

    // Atur event listener untuk setiap video
    videos.forEach((video) => {
      setupVideoEventListener(video);
    });
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

  // Panggil fungsi pertama kali untuk menangani video yang sudah ada saat halaman dimuat
  handleVideoChanges();
})();
