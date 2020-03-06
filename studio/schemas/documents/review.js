export default {
  name: 'review',
  type: 'document',
  title: 'Review',
  fields: [
    {
      name: 'reviewText',
      type: 'text',
      title: 'Review Text'
    },
    {
      name: 'reviewerName',
      type: 'string',
      title: 'Reviewer Name'
    },
    {
      name: 'reviewDate',
      type: 'string',
      title: 'Review Date'
    },
    {
      name: 'reviewerImage',
      type: 'image',
      title: 'Reviewer Image'
    }
  ],
  preview: {
    select: {
      title: 'reviewerName',
      media: 'reviewerImage'
    }
  }
}
