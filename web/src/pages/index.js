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
import styled from 'styled-components'
import "react-image-gallery/styles/css/image-gallery.css";
import Main from '../components/main'
import Summary from '../components/summary'
import VideoButton from '../components/video-button'

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

const HeroImage = styled(Image)`
  height: 600px;

  @media (max-width: 600px) {
    height: 400px;
  }
`

const HeroTitle = styled.h1`
  font-size: 2.4rem;
  color: white;
  text-align: center;
  margin: 20px auto;
  padding: 0 10px;
  /* text-align: center; */
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
  /* left: 16px; */
`

const HeroContainer = styled.div`
  position: relative;
  /* z-index: -1; */
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

  query IndexPageQuery {
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

const IndexPage = props => {
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

      <HeroContainer>
        <HeroImage fluid={data.site.heroImage.asset.fluid} />
        <HeroTitle>{data.site.heroTitle}</HeroTitle>
      </HeroContainer>
      
      <Main>
        
        <Summary heroTitle={data.site.heroTitle} heroSummary={data.site.heroSummary} />

        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          {postNodes && (
            <BlogPostPreviewList
            title='Latest blog posts'
            nodes={postNodes}
            browseMoreHref='/archive/'
            />
            )}
        </Container>
      </Main>
    </Layout>
  )
}

export default IndexPage
