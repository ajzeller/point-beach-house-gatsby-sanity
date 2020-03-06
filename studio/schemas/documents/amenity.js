export default {
  name: 'amenity',
  type: 'document',
  title: 'Amenity',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Amenity Name'
    },
    {
      name: 'description',
      type: 'string',
      title: 'Amenity Description'
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description'
    }
  }
}
