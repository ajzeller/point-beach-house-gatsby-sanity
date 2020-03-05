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
import SleepingLayout from '../assets/svg/sleeping_layout.svg'
import { Panel, AmenitiesItem, AmenitiesGrid, Label } from '../components/indexBody'
import Icon from '../components/icon'

const Title = styled.h2`
  font-size: 1.6rem;
  margin: 0;
`

const BedroomLayout = styled.div`
  display: grid;
  justify-items: center;

  h2{
    margin: 5px 0;
  }
`

const AmenitiesBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  margin: 10px 0 0px 0;
  padding: 0 0 20px 0;
`

const AmenitiesGridFeatured = styled(AmenitiesGrid)`
  /* border: 2px solid ${props => props.theme.colors.blue}; */
`

const LabelFeatured = styled(Label)`
  color: ${props => props.theme.colors.blue};
`

const AmenityText = styled.span`
  width: 100%;
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

  query AmenitiesPageQuery {
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

const Amenities = props => {
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
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />

    <Main>
      <AmenitiesBody>
        <Title>Amenities</Title>

        <AmenitiesGrid>
          <Label>Overview</Label>
          <AmenitiesItem icon={<Icon symbol='house' />} text='Entire home &middot; 2500 sq ft' />
          <AmenitiesItem icon={<Icon symbol='people' />} text='10 Guests' />
          <AmenitiesItem icon={<Icon symbol='bed' />} text='4 Bedrooms' />
          <AmenitiesItem icon={<Icon symbol='bath' />} text='2.5 Bathrooms' />
        </AmenitiesGrid>

        <AmenitiesGridFeatured>
          <LabelFeatured>Featured</LabelFeatured>
          <AmenitiesItem icon={<Icon symbol='sunset' />} text='Waterfront view with dock' />
          <AmenitiesItem icon={<Icon symbol='hotpot' />} text='Modern fully-equipped kitchen' />
          <AmenitiesItem icon={<Icon symbol='snowflake' />} text='A/C' />
          <AmenitiesItem icon={<Icon symbol='laptop' />} text='High-speed WiFi' />
          <AmenitiesItem icon={<Icon symbol='fireplace' />} text='Fireplace' />
          <AmenitiesItem icon={<Icon symbol='washer' />} text='Washer & Dryer' />
          <AmenitiesItem icon={<Icon symbol='bike' />} text='Bikes' />
          <AmenitiesItem icon={<Icon symbol='kayak' />} text='Kayaks' />
        </AmenitiesGridFeatured>

        {/* <AmenitiesGrid>
          <Label>Basic</Label>
          <AmenityText>Air conditioning</AmenityText>
          <AmenityText>Washer and dryer</AmenityText>
          <AmenityText>Essentials</AmenityText>
          <AmenityText>Beach Essentials</AmenityText>
          <AmenityText>Indoor fireplace</AmenityText>
          <AmenityText>Indoor fireplace</AmenityText>
        </AmenitiesGrid> */}

        <Title>Sleeping Arrangements</Title>
        <BedroomLayout>
          <SleepingLayout />
        </BedroomLayout>
      </AmenitiesBody>
    </Main>

    </Layout>
  )
}

export default Amenities
// 