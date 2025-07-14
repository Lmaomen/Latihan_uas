-- CreateTable
CREATE TABLE "organisasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_organisasi" TEXT NOT NULL,
    "ketua_organisasi" TEXT NOT NULL,
    "no_kontak" TEXT NOT NULL,
    "tahun_dibentuk" DATETIME NOT NULL,
    "pembina" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kegiatan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul_kegiatan" TEXT NOT NULL,
    "id_organisasi" INTEGER NOT NULL,
    "tanggal_kegiatan" DATETIME NOT NULL,
    "lokasi" TEXT NOT NULL,
    "jenis_kegiatan" TEXT NOT NULL,
    "deskripsi_singkat" TEXT NOT NULL,
    CONSTRAINT "kegiatan_id_organisasi_fkey" FOREIGN KEY ("id_organisasi") REFERENCES "organisasi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
