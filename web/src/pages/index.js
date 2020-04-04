import React from 'react'
import {graphql} from 'gatsby'
import Image from "gatsby-image"
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import BlogPostPreviewList from '../components/blog-post-preview-list'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import styled from 'styled-components'
import Main from '../components/main'
import IndexBody, {Label} from '../components/indexBody'

const BlogPreviewContainer = styled.div`
  /* border-top: 1px solid ${props => props.theme.border.secondary}; */
  background-color: ${props => props.theme.bg.primary};
  width: 100%;
  box-sizing: border-box;
  margin: 0px auto 0 auto;
  padding: 0 10px;
`

const BlogSectionTitle = styled(Label)`
  margin: 36px 0 16px 0;
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
              <>
                <BlogSectionTitle>Latest Blog Posts</BlogSectionTitle>
                <BlogPostPreviewList
                title='Latest blog posts'
                nodes={postNodes}
                browseMoreHref='/archive/'
                />
              </>
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
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
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