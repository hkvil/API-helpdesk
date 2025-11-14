import type { CollectionConfig } from 'payload'

export const Tickets: CollectionConfig = {
  slug: 'tickets',
  admin: {
    useAsTitle: 'title',
  },
  timestamps: true, // otomatis menambah createdAt dan updatedAt
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText', // richText lebih baik dari textarea
      required: true,
    },
    {
      name: 'requester', // Siapa yang membuat tiket
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      // Otomatis isi dengan user yang sedang login saat membuat
      defaultValue: ({ user }) => user?.id,
    },
    // --- Ini adalah bagian penting untuk alur multi-divisi ---
    {
      name: 'division', // Tiket ini untuk divisi mana
      type: 'relationship',
      relationTo: 'divisions',
      required: true,
      hasMany: false,
    },
    {
      name: 'category', // Kategori masalah
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
      // ✨ MAGIC: Filter pilihan kategori berdasarkan divisi yang dipilih
      filterOptions: ({ data }) => {
        if (data.division) {
          const divisionId = typeof data.division === 'object' ? data.division.id : data.division

          return {
            division: {
              equals: divisionId,
            },
          }
        }

        // Tidak ada division → sembunyikan dropdown
        return false
      },
    },
    {
      name: 'assignee', // Agent yang ditugaskan
      type: 'relationship',
      relationTo: 'users',
      hasMany: false, // Hanya 1 agent per tiket
      // ✨ MAGIC: Filter pilihan assignee
      filterOptions: ({ data }) => {
        const filters: any = {
          role: {
            equals: 'agent', // Hanya user dengan role 'agent'
          },
        }

        // dan... dari divisi yang sesuai dengan tiket ini
        if (data.division) {
          const divisionId = typeof data.division === 'object' ? data.division.id : data.division
          filters.division = {
            equals: divisionId,
          }
        } else {
          // Jika divisi tiket belum dipilih, jangan tampilkan agent sama sekali
          filters.id = { equals: null }
        }

        return filters
      },
    },
    // -----------------------------------------------------------
    {
      name: 'status',
      type: 'select',
      options: ['open', 'in_progress', 'pending', 'resolved', 'closed'],
      defaultValue: 'open',
      required: true,
    },
    {
      name: 'priority',
      type: 'select',
      options: ['low', 'medium', 'high', 'urgent'],
      defaultValue: 'medium',
      required: true,
    },
    {
      name: 'attachments', // Untuk lampiran
      type: 'relationship',
      relationTo: 'media', // Relasi ke koleksi Media
      hasMany: true,
    },
  ],
}
