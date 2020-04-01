// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-46643989-10",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Visit Egg Harbor - Point Beach House`,
        short_name: `Point Beach House`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#5B9BF9`,
        display: `standalone`,
        icon: `src/assets/icon.svg`
      },
    },
    `gatsby-plugin-offline`
  ]
}
