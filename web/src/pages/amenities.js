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
import Main from '../components/main'
import SleepingLayout from '../assets/svg/sleeping_layout.svg'
import { AmenitiesItem, Label } from '../components/indexBody'
import Icon from '../components/icon'

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
  margin: 10px auto 0px auto;
  padding: 0 0 20px 0;
  align-items: start;

  @media (min-width: 1000px) {
      grid-template-columns: repeat(2, 1fr);
    /* grid-template-columns: 1fr; */
  }
`

const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`

const AmenitiesSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 5px;
  padding: 16px;
  border: 1px solid ${props => props.theme.border.primary};
  justify-items: left;
  align-content: start;
  grid-gap: 12px;

  &.featured{
    background-color: ${props => props.theme.bg.secondary};
    border: 1px solid ${props => props.theme.colors.blue};
  }
`

const AmenitiesGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  justify-items: left;

  @media (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
`

const LabelFeatured = styled(Label)`
  color: ${props => props.theme.colors.blue};
`

const Sleeping = styled.div`
  display: grid;
  grid-gap: 12px;
  justify-items: center;
`

const AmenityName = styled.span`
  font-size: 1rem;
`

const AmenityDescription = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.text.tertiary};
`

const AmenityItemGrid = styled.div`
  display: grid;

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

  return (
    <Layout currentPage='amenities'>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />

    <Main>
      <AmenitiesBody>
        <Column>
          <Sleeping>
            <Label>Sleeping Arrangements</Label>
            <BedroomLayout>
              <SleepingLayout />
            </BedroomLayout>
          </Sleeping>

          <AmenitiesSection>
            <Label>Overview</Label>
            <AmenitiesGrid>
              <AmenitiesItem icon={<Icon symbol='house' />} text='Entire home &middot; 2500 sq ft' />
              <AmenitiesItem icon={<Icon symbol='people' />} text='10 Guests' />
              <AmenitiesItem icon={<Icon symbol='bed' />} text='4 Bedrooms' />
              <AmenitiesItem icon={<Icon symbol='bath' />} text='2.5 Bathrooms' />
            </AmenitiesGrid>
          </AmenitiesSection>



          <AmenitiesSection className='featured'>
            <LabelFeatured>Featured</LabelFeatured>
            <AmenitiesGrid>
              <AmenitiesItem icon={<Icon symbol='sunset' />} text='Waterfront view with dock' />
              <AmenitiesItem icon={<Icon symbol='hotpot' />} text='Modern fully-equipped kitchen' />
              <AmenitiesItem icon={<Icon symbol='snowflake' />} text='A/C' />
              <AmenitiesItem icon={<Icon symbol='laptop' />} text='High-speed WiFi' />
              <AmenitiesItem icon={<Icon symbol='fireplace' />} text='Fireplace' />
              <AmenitiesItem icon={<Icon symbol='washer' />} text='Washer & Dryer' />
              <AmenitiesItem icon={<Icon symbol='bike' />} text='Bikes' />
              <AmenitiesItem icon={<Icon symbol='kayak' />} text='Kayaks' />
            </AmenitiesGrid>
          </AmenitiesSection>
        </Column>

        <Column>
          {data.site.amenities.map(item => (
            <AmenitiesSection key={item.name}>
              <Label>{item.name}</Label>
              <AmenitiesGrid>
                {item.amenities.map(amenity => (
                  <AmenityItemGrid key={amenity.name}>
                    <AmenityName>{amenity.name}</AmenityName>
                    <AmenityDescription>{amenity.description}</AmenityDescription>
                  </AmenityItemGrid>
                ))}
              </AmenitiesGrid>

            </AmenitiesSection>
          ))}
        </Column>

      </AmenitiesBody>
    </Main>

    </Layout>
  )
}

export default Amenities

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
      amenities: amenityGroups {
        name
        amenities {
          description
          name
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