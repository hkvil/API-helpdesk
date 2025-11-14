import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'division'], // Tampilkan kolom divisi di list
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'division',
      type: 'relationship',
      relationTo: 'divisions',
      required: true, // Kategori harus punya divisi
      hasMany: false,
    },
  ],
}
