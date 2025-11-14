import type { CollectionConfig } from 'payload'
export const Divisions: CollectionConfig = {
  slug: 'divisions',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
