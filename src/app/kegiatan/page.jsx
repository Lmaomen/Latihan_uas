"use client";
import styles from './KegiatanPage.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KegiatanPage() {
  const [formVisible, setFormVisible] = useState(false);
  const [kegiatans, setKegiatans] = useState([]);
  const [organisasis, setOrganisasis] = useState([]);
  const [judul_kegiatan, setJudulKegiatan] = useState('');
  const [id_organisasi, setIdOrganisasi] = useState('');
  const [tanggal_kegiatan, setTanggalKegiatan] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [jenis_kegiatan, setJenisKegiatan] = useState('');
  const [deskripsi_singkat, setDeskripsiSingkat] = useState('');
  const [msg, setMsg] = useState('');
  const [editId, setEditId] = useState(null);
  const [errorOrg, setErrorOrg] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    const path = e.target.value;
    if (path) router.push(path);
  };

  const fetchKegiatans = async () => {
    const res = await fetch('/api/kegiatan');
    const data = await res.json();
    setKegiatans(data);
  };

  const fetchOrganisasis = async () => {
    const res = await fetch('/api/organisasi');
    const data = await res.json();
    setOrganisasis(data);
  };

  useEffect(() => {
    fetchKegiatans();
    fetchOrganisasis();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch('/api/kegiatan', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editId,
        judul_kegiatan,
        id_organisasi,
        tanggal_kegiatan,
        lokasi,
        jenis_kegiatan,
        deskripsi_singkat,
      }),
    });

    if (res.ok) {
      setMsg('Berhasil disimpan!');
      setJudulKegiatan('');
      setIdOrganisasi('');
      setTanggalKegiatan('');
      setLokasi('');
      setJenisKegiatan('');
      setDeskripsiSingkat('');
      setEditId(null);
      setFormVisible(false);
      fetchKegiatans();
    } else {
      setMsg('Gagal menyimpan data!');
    }
  };

  const handleEdit = (item) => {
    setJudulKegiatan(item.judul_kegiatan);
    setIdOrganisasi(item.id_organisasi);
    setTanggalKegiatan(item.tanggal_kegiatan ? new Date(item.tanggal_kegiatan).toISOString().split('T')[0] : '');
    setLokasi(item.lokasi);
    setJenisKegiatan(item.jenis_kegiatan);
    setDeskripsiSingkat(item.deskripsi_singkat);
    setEditId(item.id);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda Yakin?')) return;
    await fetch('/api/kegiatan', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchKegiatans();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manajemen Organisasi Kampus</h1>
      <h2 className={styles.subtitle}>Daftar Kegiatan</h2>
      <button className={styles.buttonToggle} onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Tutup Form' : 'Tambah Data'}
      </button>

      {formVisible && (
        <div className={styles.formWrapper}>
          <h3>Tambah Data</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <span>Nama Kegiatan</span>
              <input type="text" value={judul_kegiatan} onChange={(e) => setJudulKegiatan(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <span>Organisasi</span>
              {errorOrg ? (
                <p style={{ color: 'red' }}>{errorOrg}</p>
              ) : (
                <select value={id_organisasi} onChange={(e) => setIdOrganisasi(e.target.value)} required>
                  <option value="">Pilih Organisasi</option>
                  {organisasis.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.nama_organisasi}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className={styles.formGroup}>
              <span>Tanggal Kegiatan</span>
              <input type="date" value={tanggal_kegiatan} onChange={(e) => setTanggalKegiatan(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <span>Lokasi</span>
              <input type="text" value={lokasi} onChange={(e) => setLokasi(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <span>Jenis Kegiatan</span>
              <select value={jenis_kegiatan} onChange={(e) => setJenisKegiatan(e.target.value)} required>
                <option value="">Pilih Jenis</option>
                <option value="Seminar">Seminar</option>
                <option value="Bonding">Bonding</option>
                <option value="Bakti Sosial">Bakti Sosial</option>
                <option value="Lomba">Lomba</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <span>Deskripsi Singkat</span>
              <input type="text" value={deskripsi_singkat} onChange={(e) => setDeskripsiSingkat(e.target.value)} required />
            </div>
            <button type="submit">Kirim</button>
            <p>{msg}</p>
          </form>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Kegiatan</th>
              <th>Organisasi</th>
              <th>Tanggal</th>
              <th>Lokasi</th>
              <th>Jenis</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kegiatans.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.judul_kegiatan}</td>
                <td>{item.organisasi?.nama_organisasi}</td>
                <td>{new Date(item.tanggal_kegiatan).toLocaleDateString('id-ID')}</td>
                <td>{item.lokasi}</td>
                <td>{item.jenis_kegiatan}</td>
                <td>{item.deskripsi_singkat}</td>
                <td>
                  <button style={{ marginRight: '5px' }} onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
            {kegiatans.length === 0 && (
              <tr>
                <td colSpan="8">Data Tidak Tersedia</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
