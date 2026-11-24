/* ==========================================================
   Selamat Hari Guru - data, puisi, dan animasi
   ----------------------------------------------------------
   Bagian 1 : DATA   -> hanya bagian ini yang perlu kamu ubah
   Bagian 2 : alat bantu
   Bagian 3 : fungsi-fungsi halaman
   Bagian 4 : jalankan semuanya
   ========================================================== */


/* ---------- 1. DATA (ubah di sini) ---------- */

const SCHOOL = "SDN NEGERI CABANG";
const NAMA   = "";
const PERAN  = "";

/* Nama file foto di folder assets/foto/ (kosongkan "" kalau belum ada) */
const FOTO_BERSAMA_1 = "assets/bersama-1.jpeg";
const FOTO_BERSAMA_2 = "assets/bersama-2.jpeg";

/* Lagu latar: taruh file mp3 di folder assets/audio/ (kosongkan "" kalau tidak pakai lagu) */
const LAGU = "assets/lagu.mp3";
const JUDUL_LAGU = "Manusia kuat - Tulus";

const SAPAAN =
  "Rekan-rekan yang kusayangi, sebelum kata-kata ini dimulai, izinkan aku menyapa . " +
  "Ada sesuatu yang lama kusimpan di hati, dan Hari Guru terasa seperti saat yang pas untuk menyampaikannya.";

const JUDUL = "Langkah Kita";

/* Setiap bait adalah daftar baris */
const PUISI = [
  [
    "Terima kasih, rekan seperjalanan,",
    "untuk setiap langkah yang kita tapaki bersama",
    "di lorong sekolah yang hafal bunyi sepatu kita,",
    "di pagi berembun dan siang yang menua oleh kapur.",
  ],
  [
    "Kebersamaan ini bukan hadiah yang jatuh dari langit;",
    "ia kita tenun, benang demi benang,",
    "dari sabar, dari senyum yang diam-diam saling meminjam,",
    "dari secangkir teh di ruang guru yang tak pernah sepi cerita.",
  ],
  [
    "Maafkan bila ada kata yang tergelincir,",
    "bila ada janji tertinggal di meja piket,",
    "bila lelah menjadikan hati kita singkat.",
    "Kita manusia, tempat khilaf singgah sebentar,",
    "semoga maaf menjadi pintu yang kita buka",
    "sebelum matahari terbenam.",
  ],
  [
    "Maka mari kita ukur prestasi",
    "bukan hanya dengan angka di lembar nilai,",
    "tetapi dengan sujud yang jujur dan niat yang bersih,",
    "berlandaskan iman, bertiangkan takwa,",
    "agar ilmu yang kita titipkan",
    "menjadi cahaya, bukan sekadar pengetahuan.",
  ],
  [
    "Sebab sekolah ini rumah, dan kita keluarganya.",
    "Tak ada yang berjalan sendiri, tak ada yang tertinggal.",
    "Bila satu dari kita rebah, yang lain menjadi bahu;",
    "bila satu dari kita menang, kemenangan itu milik semua.",
  ],
  [
    "Demi anak-anak yang menunggu di balik pintu kelas,",
    "dengan mata berisi bintang dan buku yang belum selesai,",
    "demi Indonesia yang kelak mereka pimpin,",
    "yang kita ajar mengeja, kita tuntun mengerti,",
    "mari bergandeng sekali lagi,",
    "melangkah, dan tak berhenti.",
  ],
];

/* Murid di animasi: [posisi x, warna baju, warna kulit, warna rambut, jeda angkat tangan (detik)] */
const MURID = [
  [48,  "#A9C9DE", "#E9C7A5", "#3E3B4A", 1],
  [104, "#E4D0A0", "#D9A982", "#2F2A33", 4],
  [160, "#C4D0E0", "#F0D3B4", "#5A3E2B", 7],
  [252, "#E4D0A0", "#C98F67", "#2F2A33", 2.5],
];


/* ---------- 2. ALAT BANTU ---------- */

const $ = (id) => document.getElementById(id);

/* Pengguna yang memilih "kurangi animasi" tidak akan melihat gerakan */
const KURANGI_ANIMASI = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Warna hati dan bintang yang melayang */
const WARNA = ["#C9A058", "#6FA8C7", "#8FB3D9", "#7FC4A0", "#E0A9B8", "#A9B8D6"];
const SIMBOL = ["♥", "★", "✦", "♥"];


/* ---------- 3. FUNGSI HALAMAN ---------- */

/* Mengisi nama sekolah, nama pengirim, sapaan, dan judul */
function isiTeks() {
  document.querySelectorAll(".sch").forEach((el) => (el.textContent = SCHOOL));
  document.querySelectorAll(".nm").forEach((el) => (el.textContent = NAMA));
  $("peran").textContent = PERAN;
  $("sapa").textContent = SAPAAN;
  $("jd").textContent = JUDUL;
}

/* Menampilkan dua foto bersama.
   Kalau file foto belum ada, tampil kotak kosong berisi keterangan. */
function tampilkanFotoBersama() {
  [FOTO_BERSAMA_1, FOTO_BERSAMA_2].forEach((src, i) => {
    const kotak = $("fb" + (i + 1));
    const label = "Foto guru bersama-sama " + (i + 1);
    const kosong = () => (kotak.innerHTML = `<span class="hand placeholder">${label}</span>`);

    kotak.setAttribute("aria-label", label);
    if (!src) return kosong();

    const foto = new Image();
    foto.alt = label;
    foto.onerror = kosong;
    foto.src = src;
    kotak.replaceChildren(foto);
  });
}

/* Menulis puisi; tiap bait muncul pelan-pelan saat digulir ke layar */
function tampilkanPuisi() {
  $("pz").innerHTML = PUISI.map(
    (bait) => `<p class="st">${bait.map((baris) => `<i>${baris}</i>`).join("")}</p>`
  ).join("");

  const pengamat = new IntersectionObserver(
    (daftar) => {
      daftar.forEach((entri) => {
        if (entri.isIntersecting) {
          entri.target.classList.add("in");
          pengamat.unobserve(entri.target);
        }
      });
    },
    { threshold: 0.35 }
  );
  document.querySelectorAll(".st").forEach((bait) => pengamat.observe(bait));
}

/* Tulisan "Selamat Hari Guru" muncul huruf demi huruf seperti ditulis kapur */
function tulisJudul() {
  const baris1 = "Selamat";
  const baris2 = "Hari Guru";
  const total = baris1.length + baris2.length;
  let n = 0;

  const selesai = () => {
    $("car").remove();
    $("msg").classList.add("on");
    $("dt").classList.add("on");
  };

  if (KURANGI_ANIMASI) {
    $("a").textContent = baris1;
    $("b").textContent = baris2;
    selesai();
    return;
  }

  function langkah() {
    if (n < baris1.length) {
      $("a").textContent = baris1.slice(0, ++n);
    } else if (n < total) {
      const j = ++n - baris1.length;
      $("b").textContent = baris2.slice(0, j);
      if (j === 1) $("b").after($("car")); /* kursor pindah ke baris kedua */
    } else {
      setTimeout(selesai, 350);
      return;
    }
    setTimeout(langkah, 110);
  }
  langkah();
}

/* Hati dan bintang yang melayang naik di dalam sebuah canvas.
   Mengembalikan fungsi untuk memicu "ledakan" hati. */
function taburanHati(canvas, jumlah) {
  const ctx = canvas.getContext("2d");
  const partikel = [];
  let lebar, tinggi;

  function ukur() {
    const kotak = canvas.parentElement.getBoundingClientRect();
    lebar = canvas.width = kotak.width;
    tinggi = canvas.height = kotak.height;
  }
  ukur();
  addEventListener("resize", ukur);

  function buat(ledakan) {
    return {
      x: ledakan ? lebar / 2 : Math.random() * lebar,
      y: ledakan ? tinggi * 0.6 : tinggi + 20 + Math.random() * tinggi,
      vx: ledakan ? (Math.random() - 0.5) * 7 : (Math.random() - 0.5) * 0.4,
      vy: ledakan ? -2 - Math.random() * 6 : -0.4 - Math.random() * 0.7,
      ukuran: 14 + Math.random() * 20,
      warna: WARNA[Math.floor(Math.random() * WARNA.length)],
      simbol: SIMBOL[Math.floor(Math.random() * SIMBOL.length)],
      umur: 1,
      ledakan,
    };
  }

  for (let i = 0; i < jumlah; i++) partikel.push(buat(false));

  function gambar() {
    ctx.clearRect(0, 0, lebar, tinggi);

    for (let i = partikel.length - 1; i >= 0; i--) {
      const p = partikel[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.ledakan) {
        p.vy += 0.12; /* gravitasi */
        p.umur -= 0.012;
        if (p.umur <= 0) {
          partikel.splice(i, 1);
          continue;
        }
      } else if (p.y < -30) {
        Object.assign(p, buat(false), { y: tinggi + 20 }); /* muncul lagi dari bawah */
      }

      ctx.globalAlpha = p.ledakan ? p.umur : 0.55;
      ctx.fillStyle = p.warna;
      ctx.font = p.ukuran + "px sans-serif";
      ctx.fillText(p.simbol, p.x, p.y);
    }
    requestAnimationFrame(gambar);
  }
  gambar();

  return () => {
    for (let i = 0; i < 60; i++) partikel.push(buat(true));
  };
}

/* Menggambar murid-murid di animasi guru mengajar */
function gambarMurid() {
  $("stu").innerHTML = MURID.map(([x, baju, kulit, rambut, jeda]) => `
    <g>
      <rect x="${x - 12}" y="148" width="24" height="24" rx="9" fill="${baju}"/>
      <circle cx="${x}" cy="138" r="9" fill="${kulit}"/>
      <path d="M${x - 9} 136a9 9 0 0 1 18 0c-5-3-13-3-18 0z" fill="${rambut}"/>
      <circle cx="${x - 3.5}" cy="138.5" r="1.2" fill="#2A3A48"/>
      <circle cx="${x + 3.5}" cy="138.5" r="1.2" fill="#2A3A48"/>
      <path d="M${x - 3} 142q3 3 6 0" stroke="#2A3A48" stroke-width="1.1" fill="none" stroke-linecap="round"/>
      <g class="hd" style="animation-delay:${jeda}s">
        <line x1="${x + 10}" y1="150" x2="${x + 16}" y2="126" stroke="${baju}" stroke-width="5" stroke-linecap="round"/>
        <circle cx="${x + 16}" cy="123" r="4" fill="${kulit}"/>
      </g>
      <rect x="${x - 20}" y="152" width="40" height="6" rx="3" fill="var(--yellow)"/>
      <line x1="${x - 15}" y1="158" x2="${x - 15}" y2="176" stroke="var(--muted)" stroke-width="2"/>
      <line x1="${x + 15}" y1="158" x2="${x + 15}" y2="176" stroke="var(--muted)" stroke-width="2"/>
    </g>`).join("");
}


/* Pemutar lagu: tombol putar / jeda.
   Browser tidak mengizinkan lagu langsung main sendiri, jadi lagu baru
   berbunyi setelah tombol ditekan. */
function pasangPemutar() {
  const pemutar = $("player");
  const tombol = $("playBtn");
  const judul = $("songTitle");

  const nonaktif = () => {
    pemutar.classList.add("off");
    tombol.disabled = true;
    judul.textContent = "Lagu belum ditambahkan";
  };

  if (!LAGU) return nonaktif();
  judul.textContent = JUDUL_LAGU;

  const audio = new Audio();
  audio.loop = true;
  audio.preload = "metadata";
  audio.src = LAGU;

  audio.addEventListener("error", nonaktif); /* file lagu tidak ditemukan */

  /* tampilan tombol selalu mengikuti kondisi lagu yang sebenarnya */
  const atur = (sedangMain) => {
    pemutar.classList.toggle("playing", sedangMain);
    tombol.setAttribute("aria-pressed", String(sedangMain));
    tombol.setAttribute("aria-label", sedangMain ? "Jeda lagu" : "Putar lagu");
  };
  audio.addEventListener("play", () => atur(true));
  audio.addEventListener("pause", () => atur(false));

  tombol.onclick = () => {
    if (audio.paused) audio.play().catch(() => atur(false));
    else audio.pause();
  };
}


/* ---------- 4. JALANKAN ---------- */

isiTeks();
tampilkanFotoBersama();
tampilkanPuisi();
gambarMurid();
tulisJudul();
pasangPemutar();

if (!KURANGI_ANIMASI) taburanHati($("c1"), 26);

const ledakanHati = KURANGI_ANIMASI ? () => {} : taburanHati($("c2"), 0);

$("send").onclick = () => {
  ledakanHati();
  $("ok").textContent = "Aamiin. Terima kasih sudah membaca. 💛";
};
