export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title in header'
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle in header'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publish an author and set a reference to them here.',
      title: 'Author',
      to: [{type: 'author'}]
    },
    {
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      description: 'Main image on home page'
    },
    {
      name: 'heroTitle',
      type: 'string',
      title: 'Hero title',
      description: 'Main title in hero'
    },
    {
      name: 'summaryText',
      type: 'text',
      title: 'Summary text',
      description: 'Summary text'
    },
    {
      name: 'secondImage',
      type: 'image',
      title: 'Image #2',
      description: 'Second image on home page'
    },
    {
      name: 'thirdImage',
      type: 'image',
      title: 'Image #3',
      description: 'Third image on home page'
    },
    {
      name: 'fourthImage',
      type: 'image',
      title: 'Image #4',
      description: 'Fourth image on home page'
    },
    {
      name: 'locationText',
      type: 'text',
      title: 'Location Text',
      description: 'Location Text'
    },
    {
      name: 'insideText',
      type: 'text',
      title: 'Inside Text',
      description: 'Inside Text'
    },
    {
      name: 'homeGallery',
      type: 'array',
      title: 'Home Gallery',
      of: [
        {
          type: 'reference',
          to: [ 
            {
              type: 'galleryImage'
            }
          ]
        }
      ]
    }
  ]
}
