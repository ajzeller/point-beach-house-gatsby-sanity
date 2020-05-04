export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e5c69dd47370fadf6b049ca',
                  title: 'Admin Dashboard (Sanity Studio)',
                  name: 'visiteggharboradmin',
                  apiId: '9810b3d8-43f2-4eb4-a5e9-9aff66e1e9a9'
                },
                {
                  buildHookId: '5e5c69ddd2a6049f5e094bc5',
                  title: 'Live Website',
                  name: 'visiteggharbor',
                  apiId: '5004f276-fba2-465b-9fde-fa710921b5a2'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ajzeller/point-beach-house-gatsby-sanity',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://visiteggharbor.com', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
