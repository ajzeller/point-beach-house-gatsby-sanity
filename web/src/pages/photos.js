import React from 'react'
import {graphql} from 'gatsby'
import Image from "gatsby-image"
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import BlogPostPreviewList from '../components/blog-post-preview-list'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import ImageGallery from 'react-image-gallery';
import styled from 'styled-components'
import "react-image-gallery/styles/css/image-gallery.css";
import Main from '../components/main'

const ImageGalleryContainer = styled.div`
  
  .image-gallery-image {
    height: 100vw;
    object-fit: cover;
  }

  .image-gallery-thumbnail-image {
    object-fit: cover;
    height: 50px;
  }

  @media (min-width: 600px) {
    .image-gallery-image{
      height: 700px;
    }
  }
`

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query PhotosPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      subtitle
      description
      keywords
      heroImage{
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      heroTitle
      heroSummary
    }
    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
    images: allSanityGalleryImage {
      edges {
        node {
          title
          image {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`

const Photos = props => {
  const {data, errors} = props
  console.log(data)

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  const images = data.images.edges.map(item => ({
    original: item.node.image.asset.fluid.src,
    thumbnail: item.node.image.asset.fluid.src,
    originalTitle: item.node.title,
    // thumbnailLabel: 'label',
    description: item.node.title,
  }))

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <Main>
        <ImageGalleryContainer>
          <ImageGallery 
            items={images}
            showBullets={true} 
            thumbnailPosition={'bottom'}
            showPlayButton={false}
            showIndex={true}
            />
        </ImageGalleryContainer>
      </Main>
    </Layout>
  )
}

export default Photos
