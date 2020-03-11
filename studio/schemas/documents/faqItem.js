export default {
  name: 'faqItem',
  type: 'document',
  title: 'FAQ Item',
  fields: [
    {
      name: 'question',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body'
    }
  ],
  preview: {
    select: {
      title: 'question',
    }
  }
}
