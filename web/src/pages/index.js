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
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Main from '../components/main'
import IndexBody from '../components/indexBody'
import VideoButton from '../components/video-button'
import Sunset from '../assets/svg/sunset_graphic.svg'

const ImageGalleryContainer = styled.div`
  /* max-width: 1200px; */
  /* margin: 0 auto; */

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
    height: 300px;
  }
`

const HeroTitle = styled.div`
  color: white;
  text-align: center;
  /* margin: 20px auto; */
  /* padding: 0 10px; */
  /* text-align: center; */
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 1);

  h1{
    font-size: 2.4rem;
    margin: 0 auto 10px auto;
  }

  h2{
    font-size: 1rem;
    /* text-transform: uppercase; */
    margin: 0 auto;
  }
  /* left: 16px; */
`

const HeroContainer = styled.div`
  position: relative;
  
  svg{
    width: 100%;
  }
`

const BlogPreviewContainer = styled.div`
  border-top: 1px solid ${props => props.theme.border.secondary};
  background-color: ${props => props.theme.bg.primary};
  width: 100%;
  box-sizing: border-box;
  margin: 0px auto 0 auto;
  padding: 0 10px;
`

const Title = styled.h1`
  text-align: center;
  margin: 75px auto 30px;
`

const Hero = styled.div`
  display: grid;
  background-color: ${props => props.theme.bg.primary};
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

  const images = data.site.gallery.map(item => ({
    original: item.image.asset.fluid.src,
    thumbnail: item.image.asset.fluid.src
  }))

  return (
    <Layout currentPage='index'>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      
        <IndexBody 
          data={data}
          heroTitle={data.site.heroTitle} 
          summaryText={data.site.summaryText} 
          secondImage={data.site.secondImage.asset.fluid} 
          thirdImage={data.site.thirdImage.asset.fluid} 
          fourthImage={data.site.fourthImage.asset.fluid} 
        />

        <BlogPreviewContainer>
          <Main>

            <h1 hidden>Welcome to {site.title}</h1>
            {postNodes && (
              <BlogPostPreviewList
              title='Latest blog posts'
              nodes={postNodes}
              browseMoreHref='/archive/'
              />
              )}
          </Main>
        </BlogPreviewContainer>
    </Layout>
  )
}

export default IndexPage

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
        image{
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        alt
        }
      }
      heroTitle
      summaryText
      locationText
      insideText
      secondImage{
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      thirdImage{
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      fourthImage{
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      gallery: homeGallery{
        image {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
          alt
        }
      }
      reviews: reviews {
        reviewerName
        reviewText
        reviewDate
        reviewerImage {
          asset {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
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