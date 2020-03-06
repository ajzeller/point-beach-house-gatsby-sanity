export default {
  name: 'amenityGroup',
  type: 'document',
  title: 'Amenity Group',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string'
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'amenity'
            }
          ]
        }
      ]
    },
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
}
