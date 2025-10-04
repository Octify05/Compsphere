// Dummy data jadwal kereta
const jadwal = [
  { kereta: "Argo Parahyangan", asal: "Jakarta", tujuan: "Bandung", jam: "08:30", harga: "Rp150.000" },
  { kereta: "Argo Wilis", asal: "Surabaya", tujuan: "Yogyakarta", jam: "09:00", harga: "Rp250.000" },
  { kereta: "Taksaka Malam", asal: "Yogyakarta", tujuan: "Jakarta", jam: "22:00", harga: "Rp300.000" }
];

// Tampilkan jadwal
function loadJadwal() {
  const table = document.getElementById("jadwalTable");
  if (!table) return;
  jadwal.forEach(j => {
    const row = `<tr>
      <td>${j.kereta}</td><td>${j.asal}</td><td>${j.tujuan}</td><td>${j.jam}</td><td>${j.harga}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

// Simulasi login
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user && pass) {
    localStorage.setItem("user", user);
    window.location.href = "index.html";
  } else {
    alert("Isi username dan password!");
  }
}

// Simulasi register
function register() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user && pass) {
    alert("Registrasi berhasil, silakan login!");
    window.location.href = "login.html";
  } else {
    alert("Isi data dengan benar!");
  }
}

// Simulasi booking tiket
function booking() {
  const asal = document.getElementById("asal").value;
  const tujuan = document.getElementById("tujuan").value;
  const tanggal = document.getElementById("tanggal").value;

  if (asal && tujuan && tanggal) {
    localStorage.setItem("booking", JSON.stringify({ asal, tujuan, tanggal }));
    window.location.href = "konfirmasi.html";
  } else {
    alert("Isi semua data!");
  }
}

// Tampilkan data konfirmasi
function loadKonfirmasi() {
  const data = JSON.parse(localStorage.getItem("booking"));
  if (!data) return;
  document.getElementById("konfirmasiData").innerHTML =
    `Asal: ${data.asal}<br>Tujuan: ${data.tujuan}<br>Tanggal: ${data.tanggal}`;
}

// Load dashboard user
function loadDashboard() {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("userDashboard").innerText = user;
  }
}

// Logout
function logout() {
  localStorage.removeItem("user");
}

// Ambil semua data dari localStorage
const pnr      = localStorage.getItem("pnr") || "-";
const nama     = localStorage.getItem("nama") || "-";
const kereta   = localStorage.getItem("keretaDipilih") || "-";
const asal     = localStorage.getItem("asal") || "-";
const tujuan   = localStorage.getItem("tujuan") || "-";
const kelas    = localStorage.getItem("kelasDipilih") || "-";
const kursi    = localStorage.getItem("kursiDipilih") || "-";
const tanggal  = localStorage.getItem("tanggalBerangkat") || "-";
const jam      = localStorage.getItem("jamBerangkat") || "-";
const totalBayar = parseInt(localStorage.getItem("totalBayar") || 0);

// Isi ke tampilan
if (document.getElementById("pnr")) {
  document.getElementById("pnr").innerText = pnr;
  document.getElementById("nama").innerText = nama;
  document.getElementById("kereta").innerText = kereta;
  document.getElementById("asal").innerText = asal;
  document.getElementById("tujuan").innerText = tujuan;
  document.getElementById("kelas").innerText = kelas;
  document.getElementById("kursi").innerText = kursi;
  document.getElementById("tanggal").innerText = tanggal;
  document.getElementById("jam").innerText = jam;
  document.getElementById("totalBayar").innerText = totalBayar.toLocaleString("id-ID");
}

// QR Code isi detail lengkap
if (document.getElementById("qrcode")) {
  const qrData = `E-Tiket KAI\nPNR: ${pnr}\nNama: ${nama}\nKereta: ${kereta}\nRute: ${asal} - ${tujuan}\nKelas: ${kelas}\nKursi: ${kursi}\nTanggal: ${tanggal} ${jam}\nTotal: Rp ${totalBayar.toLocaleString("id-ID")}`;
  new QRCode(document.getElementById("qrcode"), {
    text: qrData,
    width: 150,
    height: 150
  });
}

// PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica","bold");
  doc.setFontSize(18);
  doc.text("E-Tiket KAI Inovasi", 70, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica","normal");
  doc.text("Kode Booking (PNR): " + pnr, 20, 40);
  doc.text("Nama Penumpang   : " + nama, 20, 50);
  doc.text("Kereta           : " + kereta, 20, 60);
  doc.text("Rute             : " + asal + " → " + tujuan, 20, 70);
  doc.text("Kelas / Kursi    : " + kelas + " / " + kursi, 20, 80);
  doc.text("Tanggal & Jam    : " + tanggal + " " + jam, 20, 90);
  doc.text("Total Bayar      : Rp " + totalBayar.toLocaleString("id-ID"), 20, 100);

  const qrCanvas = document.querySelector("#qrcode canvas");
  if (qrCanvas) {
    const qrImg = qrCanvas.toDataURL("image/png");
    doc.addImage(qrImg, "PNG", 150, 40, 40, 40);
  }

  doc.setFontSize(10);
  doc.text("Dicetak dari KAI Inovasi - " + new Date().toLocaleString("id-ID"), 20, 120);

  doc.save("E-Tiket-KAI.pdf");
}

// ======================= CHATBOT =======================
const toggleBtn = document.getElementById("chatbot-toggle");
const chatbot = document.getElementById("chatbot-container");
const messages = document.getElementById("chatbot-messages");
const input = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");

// Toggle buka/tutup chatbot
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    chatbot.style.display = chatbot.style.display === "block" ? "none" : "block";
  });
}

// Fungsi menambah pesan
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add(sender);
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

// Fungsi balasan chatbot
function botReply(userMsg) {
  let reply = "🤔 Maaf, saya belum mengerti. Bisa ulangi dengan kata lain?";

  // 🔍 Cari jadwal
  const hasil = jadwal.filter(j =>
    userMsg.includes(j.asal.toLowerCase()) ||
    userMsg.includes(j.tujuan.toLowerCase()) ||
    userMsg.includes(j.kereta.toLowerCase())
  );
  if (hasil.length > 0) {
    reply = "📅 Berikut jadwal yang saya temukan:\n";
    hasil.forEach(j => {
      reply += `🚆 ${j.kereta} | ${j.asal} → ${j.tujuan} | 🕒 ${j.jam} | 💳 ${j.harga}\n`;
    });
    return reply;
  }

  // ✨ Sapaan & teman ngobrol
  if (userMsg.includes("halo") || userMsg.includes("hai") || userMsg.includes("hi")) {
    reply = "👋 Halo! Senang bertemu denganmu 😊 Apa kabar hari ini?";
  } else if (userMsg.includes("selamat pagi")) {
    reply = "🌞 Selamat pagi! Semoga harimu penuh energi positif 💪";
  } else if (userMsg.includes("selamat siang")) {
    reply = "🌤️ Selamat siang! Jangan lupa makan siang ya 🍽️";
  } else if (userMsg.includes("selamat malam")) {
    reply = "🌙 Selamat malam! Waktunya istirahat biar besok segar ✨";
  } else if (userMsg.includes("apa kabar")) {
    reply = "😊 Aku baik, terima kasih sudah tanya! Kamu sendiri gimana?";
  } else if (userMsg.includes("teman")) {
    reply = "🤗 Tentu! Aku bisa jadi teman ngobrolmu. Ceritain aja bebas!";
  }

  // ✨ Mood user
  else if (userMsg.includes("sedih")) {
    reply = "😔 Jangan sedih ya... aku yakin kamu kuat 💪✨. Mau aku kasih motivasi?";
  } else if (userMsg.includes("senang") || userMsg.includes("bahagia")) {
    reply = "🎉 Wah ikut senang dengarnya! Semoga kebahagiaanmu terus berlanjut ✨";
  } else if (userMsg.includes("bosan")) {
    reply = "😅 Kalau bosan, coba dengerin musik 🎶, baca buku 📚, atau jalan-jalan sebentar 🚶.";
  }

  // ✨ Jokes
  else if (userMsg.includes("joke") || userMsg.includes("lucu")) {
    const jokes = [
      "😂 Kenapa kereta nggak pernah nyasar? 🚆 Karena dia selalu di *rel* yang benar!",
      "🤣 Apa bedanya kereta sama kamu? Kereta nunggu di stasiun, kalau kamu nungguin kepastian ❤️",
      "😆 Kenapa laptop nggak pernah naik kereta? Karena takut kena *crash*! 💻"
    ];
    reply = jokes[Math.floor(Math.random() * jokes.length)];
  }

  // ✨ Motivasi
  else if (userMsg.includes("motivasi") || userMsg.includes("semangat") || userMsg.includes("quote")) {
    const quotes = [
      "💡 Jangan menyerah, setiap langkah kecil tetap membawa kamu lebih dekat ke tujuan 💪",
      "🚆 Hidup itu ibarat naik kereta, kadang berhenti, tapi pasti sampai ke tujuan ✨",
      "🌟 Kalau capek, istirahat sebentar, jangan berhenti selamanya. Kamu hebat!"
    ];
    reply = quotes[Math.floor(Math.random() * quotes.length)];
  }

  // 🔧 Default sistem tiket
  else if (userMsg.includes("jadwal")) {
    reply = "📅 Anda bisa melihat jadwal kereta di menu 'Jadwal'.";
  } else if (userMsg.includes("tiket")) {
    reply = "🎫 Untuk pesan tiket, silakan buka menu 'Pesan Tiket'.";
  } else if (userMsg.includes("harga")) {
    reply = "💰 Harga tiket berbeda-beda, silakan cek di menu 'Jadwal'.";
  } else if (userMsg.includes("login")) {
    reply = "🔑 Silakan masuk ke halaman login dengan username dan password Anda.";
  } else if (userMsg.includes("logout")) {
    reply = "👋 Klik tombol logout di dashboard untuk keluar.";
  } else if (userMsg.includes("konfirmasi")) {
    reply = "✅ Anda bisa melihat detail konfirmasi tiket di halaman 'Konfirmasi'.";
  } else if (userMsg.includes("dashboard")) {
    reply = "📊 Dashboard menampilkan informasi akun dan pesanan Anda.";
  } else if (userMsg.includes("refund")) {
    reply = "💸 Untuk refund tiket, silakan hubungi customer service KAI.";
  } else if (userMsg.includes("stasiun")) {
    reply = "🚉 Stasiun keberangkatan dan tujuan bisa dipilih saat booking tiket.";
  }

  return reply;
}

// Kirim pesan
if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    const userMsg = input.value.trim();
    if (userMsg === "") return;
    addMessage("👤 " + userMsg, "user");
    input.value = "";

    // Simulasi bot jawab
    setTimeout(() => {
      const reply = botReply(userMsg.toLowerCase());
      addMessage("🤖 " + reply, "bot");
    }, 500);
  });
}
