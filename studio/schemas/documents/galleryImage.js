export default {
  name: 'galleryImage',
  type: 'document',
  title: 'GalleryImage',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long'
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image'
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
}
