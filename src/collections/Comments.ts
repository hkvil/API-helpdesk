import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  timestamps: true, // Otomatis createdAt
  fields: [
    {
      name: 'ticket', // Terhubung ke tiket mana
      type: 'relationship',
      relationTo: 'tickets',
      required: true,
      hasMany: false,
    },
    {
      name: 'author', // Siapa yang berkomentar
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      defaultValue: ({ user }) => user?.id,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'attachments', // Lampiran di dalam komentar
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}
