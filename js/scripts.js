// Menambahkan event listener di tombol submit agar data baru akan diproses JS setelah user menekan tombol submit
document
  .getElementById("form-bmi")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Mengambil data-data dari form HTML menggunakan Id masing-masing input
    const weight = parseFloat(
      document.getElementById("input-berat-badan").value
    );
    const height =
      parseFloat(document.getElementById("input-tinggi-badan").value) / 100;
    const age = parseFloat(document.getElementById("input-usia").value);
    console.log(`${weight} kg, ${height * 100} cm, ${age} Tahun`);

    // Spesifik untuk gender, memproses input radio button dari HTML
    let gender = "";

    if (document.getElementById("selection-man").checked) {
      gender = "Pria";
    } else if (document.getElementById("selection-women").checked) {
      gender = "Wanita";
    }

    // Melakukan perhitungan BMI menggunakan formula yang sudah ditentukan
    if (
      !isNaN(weight) &&
      !isNaN(height) &&
      height > 0 &&
      age > 0 &&
      gender != ""
    ) {
      const bmi = (weight / (height * height)).toFixed(1);
      const ideal = `Berat badan ideal: ${
        Math.round(height * height * 18.5) + 1
      } kg - ${Math.round(height * height * 24.9) - 1} kg`;
      if (bmi > 0 && bmi <= 100) {
        displayResult(bmi, ideal, weight, height, age, gender);
      } else {
        alert("Masukkan tinggi dan berat badan yang valid!");
      }
    } else if (age < 0) {
      alert("Masukkan usia, tinggi dan berat badan yang valid!");
    } else if (gender == "") {
      alert("Pilih jenis kelamin anda!");
    } else {
      alert("Masukkan tinggi dan berat badan yang valid!");
    }
  });

// Button reset yang akan mengkosongkan form dan juga menghilangkan result sebelumnya jika ada
document
  .querySelector('button[type="reset"]')
  .addEventListener("click", function () {
    document.getElementById("result-container").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

// Back to top button (tombol yang jika dipencet akan membawa user ke top of page)
window.addEventListener("scroll", function () {
  const backToTopButton = document.getElementById("back-to-top");
  if (window.scrollY > 100) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

// Function scroll to top yang menjadi function yang di run saat button back to top di klik
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Function untuk menampilkan hasil dari perhitungan BMI
function displayResult(bmi, ideal, weight, height, age, gender) {
  const resultContainer = document.getElementById("result-container");
  const bmiValueElement = document.getElementById("bmi-value");
  const resultLabelElement = document.querySelector(".resultLabel");
  const resultDescriptionElement = document.querySelector(".resultDescription");
  const detailedDescriptionElement = document.getElementById(
    "result-detailed-description"
  );
  const idealDescriptionElement = document.getElementById("result-bb-ideal");

  let resultLabel = "";
  let resultDescription = "";
  let detailedDescription = "";

  if (bmi < 18.5) {
    resultLabel = "Kekurangan Berat Badan";
    resultDescription = "Anda memiliki berat badan kurang.";
    detailedDescription =
      "Anda berada dalam kategori kekurangan berat badan. Disarankan untuk meningkatkan asupan kalori dan menjalani pola makan sehat untuk mencapai berat badan yang normal.";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    resultLabel = "Normal (Sehat)";
    resultDescription = "Anda memiliki berat badan normal (sehat).";
    detailedDescription =
      "Anda berada dalam kategori berat badan normal. Pertahankan pola makan seimbang dan rutin berolahraga untuk menjaga kesehatan.";
  } else if (bmi >= 25 && bmi < 29.9) {
    resultLabel = "Berat Badan Lebih";
    resultDescription = "Anda memiliki berat badan berlebih.";
    detailedDescription =
      "Anda berada dalam kategori berat badan berlebih. Disarankan untuk mengatur pola makan dan rutin berolahraga untuk menurunkan berat badan ke batas normal.";
  } else if (bmi >= 30) {
    resultLabel = "Obesitas";
    resultDescription = "Anda memiliki obesitas.";
    detailedDescription =
      "Anda berada dalam kategori obesitas. Sangat disarankan untuk berkonsultasi dengan ahli gizi dan dokter untuk rencana penurunan berat badan yang sehat.";
  }

  bmiValueElement.textContent = bmi;
  resultLabelElement.textContent = resultLabel;
  resultDescriptionElement.textContent = resultDescription;
  detailedDescriptionElement.textContent = detailedDescription;
  idealDescriptionElement.textContent = ideal;

  resultContainer.style.display = "block";
  resultContainer.scrollIntoView({ behavior: "smooth" });

  // Attach download event
  document
    .querySelector(".downloadButton")
    .addEventListener("click", function () {
      generatePDF(weight, height, age, gender, bmi, resultLabel);
    });
}

function generatePDF(weight, height, age, gender, bmi, resultLabel) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Nama: Guest", 10, 10);
  doc.text(`Jenis Kelamin: ${gender}`, 10, 20);
  doc.text(`Tinggi Badan: ${height * 100} cm`, 10, 30);
  doc.text(`Berat Badan: ${weight} kg`, 10, 40);
  doc.text(`Usia: ${age} Tahun`, 10, 50);
  doc.text(`BMI: ${bmi}`, 10, 60);
  doc.text(`Kategori: ${resultLabel}`, 10, 70);

  doc.save("hasil_bmi.pdf");
}

document
  .querySelector(".button konsultasi")
  .addEventListener("click", function () {
    window.open(
      "https://ilmugiziku.com/2021/11/30/berbagai-aplikasi-gizi-mahasiswa-gizi-wajib-tahu/",
      "_blank"
    );
  });

document
  .querySelector(".button registrasi")
  .addEventListener("click", function () {
    window.open(
      "https://www.halodoc.com/artikel/chat-dokter-spesialis-gizi-online-pengertian-dan-cara-kerjanya",
      "_blank"
    );
  });

// Menambahkan event listener ke semua input untuk mendeteksi jika ada perubahan di salah satu input
const inputs = document.querySelectorAll(
  "#input-berat-badan, #input-tinggi-badan, #input-usia, #selection-man, #selection-women"
);
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    document.getElementById("result-container").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
