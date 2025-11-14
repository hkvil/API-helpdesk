import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Requester', value: 'requester' },
        { label: 'Agent', value: 'agent' },
        { label: 'Admin', value: 'admin' },
      ],
      required: true,
      defaultValue: 'requester',
      admin: { position: 'sidebar' },
    },
    {
      name: 'division',
      type: 'relationship',
      relationTo: 'divisions',
      admin: {
        condition: (data: any) => data?.role === 'agent',
        description: 'Wajib diisi jika role adalah "Agent".',
      },
      validate: (value: unknown, { data }: { data: any }) => {
        if (data?.role === 'agent' && !value) {
          return 'Agent harus ditugaskan ke sebuah divisi.'
        }
        return true
      },
    },
  ],
}
