import prisma from '@/lib/prisma';

// GET: Ambil semua data organisasi
export async function GET() {
  try {
    const data = await prisma.organisasi.findMany({
      include: { kegiatan: true }, // Sertakan relasi jika ada
      orderBy: { id: 'asc' },
    });
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching organisasi:", error);
    return Response.json({ error: 'Failed to fetch organizations' }, { status: 500 });
  }
}

// POST: Tambahkan organisasi baru
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      nama_organisasi,
      ketua_organisasi,
      no_kontak,
      tahun_dibentuk,
      pembina,
    } = body;

    if (!nama_organisasi || !ketua_organisasi || !no_kontak || !tahun_dibentuk || !pembina) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    const organisasi = await prisma.organisasi.create({
      data: {
        nama_organisasi,
        ketua_organisasi,
        no_kontak,
        tahun_dibentuk: new Date(tahun_dibentuk),
        pembina,
      },
    });

    return Response.json(organisasi, { status: 201 });
  } catch (error) {
    console.error("Error creating organisasi:", error);
    return Response.json({ error: 'Failed to create organization' }, { status: 500 });
  }
}

// PUT: Update data organisasi
export async function PUT(request) {
  try {
    const body = await request.json();
    const {
      id,
      nama_organisasi,
      ketua_organisasi,
      no_kontak,
      tahun_dibentuk,
      pembina,
    } = body;

    if (!id || !nama_organisasi || !ketua_organisasi || !no_kontak || !tahun_dibentuk || !pembina) {
      return Response.json({ error: 'All fields including ID are required' }, { status: 400 });
    }

    const organisasi = await prisma.organisasi.update({
      where: { id: Number(id) },
      data: {
        nama_organisasi,
        ketua_organisasi,
        no_kontak,
        tahun_dibentuk: new Date(tahun_dibentuk),
        pembina,
      },
    });

    return Response.json(organisasi, { status: 200 });
  } catch (error) {
    console.error("Error updating organisasi:", error);
    return Response.json({ error: 'Failed to update organization' }, { status: 500 });
  }
}

// DELETE: Hapus data organisasi
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json({ error: 'ID is required to delete' }, { status: 400 });
    }

    await prisma.organisasi.delete({
      where: { id: Number(id) },
    });

    return Response.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting organisasi:", error);
    return Response.json({ error: 'Failed to delete organization' }, { status: 500 });
  }
}
