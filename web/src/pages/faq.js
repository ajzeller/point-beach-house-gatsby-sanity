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
import IndexBody from '../components/indexBody'
import { ContainerBodyWidth, ContainerFullWidth } from '../components/indexBody'
import PortableText from '../components/portableText'


const BlogPreviewContainer = styled.div`
  border-top: 1px solid ${props => props.theme.border.secondary};
  background-color: ${props => props.theme.bg.primary};
  width: 100%;
  box-sizing: border-box;
  margin: 0px auto 0 auto;
  padding: 0 10px;
`

const Line = styled.hr`
  border-top: 1px solid ${props => props.theme.border.secondary};
`

const FaqBody = styled.div`
  padding: 0 16px;
`

const faqPage = props => {
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
    <Layout currentPage='faq'>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <ContainerBodyWidth>
        <FaqBody>
          <h1>Frequently Asked Questions</h1>
          {data.site.faqItems.map((item, i) => (
            <>
              <h3>{item.question}</h3>
              {item._rawBody && <PortableText blocks={item._rawBody} />}
              { i < data.site.faqItems.length-1 && <Line /> }
            </>
          ))}
        </FaqBody>
      </ContainerBodyWidth>
    </Layout>
  )
}

export default faqPage

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

  query faqQuery {
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
      faqItems: faqGroup {
        question
        _rawBody(resolveReferences: {maxDepth: 5})
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