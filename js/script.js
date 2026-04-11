// ===== SIMPLE APP =====
let mahasiswa = [];
let dosen = [];
let products = {};
let registeredStudents = [];

// ===== LOAD DATA =====
async function loadData() {
  mahasiswa = await fetch('./data/mahasiswa.json').then(r => r.json());
  dosen = await fetch('./data/dosen.json').then(r => r.json());
  products = await fetch('./data/products.json').then(r => r.json());
}

// ===== UTILITIES =====
function showTab(tab) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab).style.display = 'block';
  event.target.classList.add('active');
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function showFilteredList(inputId, listId, dataArray) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  const val = input.value.trim().toLowerCase();
  
  if (val.length < 1) {
    list.innerHTML = '';
    list.style.display = 'none';
    return;
  }
  
  const filtered = dataArray.filter(item => item.toLowerCase().includes(val)).slice(0, 5);
  
  if (filtered.length === 0) {
    list.style.display = 'none';
    return;
  }
  
  list.innerHTML = filtered.map(item => 
    `<div onclick="selectItem('${inputId}', '${item}', '${listId}')" style="padding:8px; cursor:pointer; border-bottom:1px solid #eee;">${item}</div>`
  ).join('');
  list.style.display = 'block';
}

function selectItem(inputId, value, listId) {
  document.getElementById(inputId).value = value;
  document.getElementById(listId).style.display = 'none';
}

// ===== FORM REGISTRASI =====
function submitForm() {
  const nama = document.getElementById('nama').value.trim();
  const nim = document.getElementById('nim').value.trim();
  const semester = document.getElementById('semester').value;
  const matkul = document.getElementById('matkul').value;
  const dosen = document.getElementById('dosen-form').value.trim();
  
  if (!nama || !nim || !semester || !matkul || !dosen) {
    alert('Semua field harus diisi!');
    return;
  }
  
  if (nim.length !== 10 || isNaN(nim)) {
    alert('NIM harus 10 digit angka!');
    return;
  }
  
  registeredStudents.push({ nama, nim, semester, matkul, dosen, id: Date.now() });
  renderTable();
  
  document.getElementById('nama').value = '';
  document.getElementById('nim').value = '';
  document.getElementById('semester').value = '';
  document.getElementById('matkul').value = '';
  document.getElementById('dosen-form').value = '';
  
  alert('Mahasiswa ' + nama + ' berhasil didaftarkan!');
}

function renderTable() {
  const el = document.getElementById('student-table');
  document.getElementById('count').textContent = registeredStudents.length;
  
  if (registeredStudents.length === 0) {
    el.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#999;">Belum ada mahasiswa terdaftar</td></tr>';
    return;
  }
  
  el.innerHTML = registeredStudents.map((s, i) => `
    <tr>
      <td>${i+1}</td>
      <td>${s.nama}</td>
      <td>${s.nim}</td>
      <td>${s.semester}</td>
      <td>${s.matkul}</td>
      <td><button onclick="deleteStudent(${s.id})" style="background:red; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:3px;">Hapus</button></td>
    </tr>
  `).join('');
}

function deleteStudent(id) {
  registeredStudents = registeredStudents.filter(s => s.id !== id);
  renderTable();
}

function clearAll() {
  if (confirm('Hapus semua data?')) {
    registeredStudents = [];
    renderTable();
  }
}

// ===== POSTAL CODE =====
async function updateCity() {
  const prov = document.getElementById('provinsi').value;
  const citySelect = document.getElementById('kota');
  const districtSelect = document.getElementById('kecamatan');
  
  citySelect.innerHTML = '<option value="">-- Pilih Kota --</option>';
  districtSelect.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
  districtSelect.disabled = true;
  
  if (!prov) return;

  citySelect.innerHTML = '<option value="">Memuat...</option>';
  citySelect.disabled = true;

  try {
    const data = await fetch(`https://kodepos.vercel.app/search/?q=${encodeURIComponent(prov)}`).then(r => {
      if (!r.ok) throw new Error('Gagal mengambil data kota');
      return r.json();
    });

    const uniqueCities = [...new Set(data.map(item => item.city).filter(Boolean))].sort();

    citySelect.innerHTML = '<option value="">-- Pilih Kota --</option>';
    uniqueCities.forEach(kota => {
      const opt = document.createElement('option');
      opt.value = kota;
      opt.textContent = kota;
      citySelect.appendChild(opt);
    });
  } catch (err) {
    citySelect.innerHTML = '<option value="">-- Pilih Kota --</option>';
    alert('Gagal memuat daftar kota. Silakan coba lagi.');
  } finally {
    citySelect.disabled = false;
  }
}

async function updateDistrict() {
  const prov = document.getElementById('provinsi').value;
  const kota = document.getElementById('kota').value;
  const districtSelect = document.getElementById('kecamatan');
  
  districtSelect.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
  districtSelect.disabled = true;
  
  if (!kota) return;

  try {
    const data = await fetch(`https://kodepos.vercel.app/search/?q=${encodeURIComponent(kota)}`).then(r => {
      if (!r.ok) throw new Error('Gagal mengambil data kecamatan');
      return r.json();
    });

    const filtered = data.filter(item =>
      item.city === kota && (!prov || item.province === prov)
    );

    const uniqueDistricts = [...new Set(filtered.map(item => item.district).filter(Boolean))].sort();

    uniqueDistricts.forEach(kec => {
      const opt = document.createElement('option');
      opt.value = kec;
      opt.textContent = kec;
      districtSelect.appendChild(opt);
    });
  } catch (err) {
    alert('Gagal memuat daftar kecamatan. Silakan coba lagi.');
  } finally {
    districtSelect.disabled = false;
  }
}

async function searchPostal() {
  const prov = document.getElementById('provinsi').value;
  const kota = document.getElementById('kota').value;
  const kec = document.getElementById('kecamatan').value;
  
  if (!prov || !kota) {
    alert('Pilih Provinsi dan Kota!');
    return;
  }
  
  const resultDiv = document.getElementById('postal-result');
  const tableDiv = document.getElementById('postal-table');

  resultDiv.innerHTML = '<p>Memuat data kode pos...</p>';
  tableDiv.innerHTML = '';

  try {
    const query = kec || kota;
    const data = await fetch(`https://kodepos.vercel.app/search/?q=${encodeURIComponent(query)}`).then(r => {
      if (!r.ok) throw new Error('Gagal mengambil data kode pos');
      return r.json();
    });

    const filtered = data.filter(item => {
      const matchProv = item.province === prov;
      const matchCity = item.city === kota;
      const matchDistrict = kec ? item.district === kec : true;
      return matchProv && matchCity && matchDistrict;
    });

    if (filtered.length === 0) {
      resultDiv.innerHTML = '<p>Data kode pos tidak ditemukan.</p>';
      tableDiv.innerHTML = '';
      return;
    }

    if (kec) {
      if (filtered.length === 1) {
        const k = filtered[0];
        resultDiv.innerHTML = `
          <p><strong>Kode Pos: ${k.kodepos}</strong></p>
          <p>Kelurahan: ${k.village}, ${kec}, ${kota}, ${prov}</p>
        `;
        tableDiv.innerHTML = '';
      } else {
        tableDiv.innerHTML = `
          <table style="width:100%; border-collapse:collapse;">
            <tr style="background:#f0f0f0;">
              <th style="padding:8px; border:1px solid #ddd;">Kelurahan</th>
              <th style="padding:8px; border:1px solid #ddd;">Kode Pos</th>
            </tr>
            ${filtered.map(k => `<tr><td style="padding:8px; border:1px solid #ddd;">${k.village}</td><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">${k.kodepos}</td></tr>`).join('')}
          </table>
        `;
        resultDiv.innerHTML = `<p>Ditemukan ${filtered.length} kode pos</p>`;
      }
    } else {
      tableDiv.innerHTML = `
        <table style="width:100%; border-collapse:collapse;">
          <tr style="background:#f0f0f0;">
            <th style="padding:8px; border:1px solid #ddd;">Kecamatan</th>
            <th style="padding:8px; border:1px solid #ddd;">Kelurahan</th>
            <th style="padding:8px; border:1px solid #ddd;">Kode Pos</th>
          </tr>
          ${filtered.map(k => `<tr><td style="padding:8px; border:1px solid #ddd;">${k.district}</td><td style="padding:8px; border:1px solid #ddd;">${k.village}</td><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">${k.kodepos}</td></tr>`).join('')}
        </table>
      `;
      resultDiv.innerHTML = `<p>Ditemukan ${filtered.length} kode pos di ${kota}</p>`;
    }
  } catch (err) {
    resultDiv.innerHTML = '<p>Gagal mengambil data kode pos. Silakan coba lagi.</p>';
    tableDiv.innerHTML = '';
  }
}

function resetPostal() {
  document.getElementById('provinsi').value = '';
  document.getElementById('kota').value = '';
  document.getElementById('kecamatan').value = '';
  document.getElementById('postal-result').innerHTML = '';
  document.getElementById('postal-table').innerHTML = '';
}

// ===== PRODUCTS DROPDOWN =====
function updateBrand() {
  const jenis = document.getElementById('jenis').value;
  const brandSelect = document.getElementById('merek');
  const serieSelect = document.getElementById('seri');
  
  brandSelect.innerHTML = '<option value="">-- Pilih Merek --</option>';
  serieSelect.innerHTML = '<option value="">-- Pilih Seri --</option>';
  serieSelect.disabled = true;
  
  if (!jenis) return;
  
  Object.entries(products[jenis].merek).forEach(([key, val]) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = val.label;
    brandSelect.appendChild(opt);
  });
}

function updateSerie() {
  const jenis = document.getElementById('jenis').value;
  const merek = document.getElementById('merek').value;
  const serieSelect = document.getElementById('seri');
  
  serieSelect.innerHTML = '<option value="">-- Pilih Seri --</option>';
  
  if (!merek) return;
  
  Object.keys(products[jenis].merek[merek].seri).forEach(seriName => {
    const opt = document.createElement('option');
    opt.value = seriName;
    opt.textContent = seriName;
    serieSelect.appendChild(opt);
  });
  
  serieSelect.disabled = false;
}

function showProducts() {
  const jenis = document.getElementById('jenis').value;
  const merek = document.getElementById('merek').value;
  const seri = document.getElementById('seri').value;
  
  if (!seri) {
    document.getElementById('product-list').innerHTML = '';
    return;
  }
  
  const productList = products[jenis].merek[merek].seri[seri].products;
  
  document.getElementById('product-list').innerHTML = `
    <h4>Produk di ${seri}</h4>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:10px;">
      ${productList.map(p => `
        <div style="border:1px solid #ddd; padding:10px; border-radius:5px;">
          <div style="font-size:30px; margin-bottom:5px;">${p.icon}</div>
          <strong>${p.name}</strong>
          <p style="color:#0066cc; margin:5px 0;"><strong>${p.price}</strong></p>
          <p style="font-size:12px; color:#666;">${p.spec}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// ===== INIT =====
(async function() {
  await loadData();
  const provinces = ['Aceh', 'Bali', 'Banten', 'Bengkulu', 'DI Yogyakarta', 'DKI Jakarta',
    'Gorontalo', 'Jambi', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur',
    'Kalimantan Barat', 'Kalimantan Selatan', 'Kalimantan Tengah',
    'Kalimantan Timur', 'Kalimantan Utara', 'Kepulauan Bangka Belitung',
    'Kepulauan Riau', 'Lampung', 'Maluku', 'Maluku Utara', 'Nusa Tenggara Barat',
    'Nusa Tenggara Timur', 'Papua', 'Papua Barat', 'Riau', 'Sulawesi Barat',
    'Sulawesi Selatan', 'Sulawesi Tengah', 'Sulawesi Tenggara', 'Sulawesi Utara',
    'Sumatera Barat', 'Sumatera Selatan', 'Sumatera Utara'];

  document.getElementById('provinsi').innerHTML = '<option value="">-- Pilih Provinsi --</option>' + provinces.map(p => `<option value="${p}">${p}</option>`).join('');
  document.getElementById('jenis').innerHTML = '<option value="">-- Pilih Jenis --</option>' + Object.keys(products).map(j => `<option value="${j}">${j.charAt(0).toUpperCase() + j.slice(1)}</option>`).join('');
})();
