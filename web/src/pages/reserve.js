import React, { useEffect } from 'react'
import {graphql} from 'gatsby'
import Image from "gatsby-image"
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
  useScript
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
import { ContainerBodyWidth, ContainerFullWidth } from '../components/indexBody'
import VideoButton, {ButtonPrimary, ButtonSecondary} from '../components/video-button'
import Sunset from '../assets/svg/sunset_graphic.svg'
import copy from 'copy-to-clipboard';

const CalendarGrid = styled.div`
  display: grid;
  margin: 50px 0;
  grid-template-columns: 1fr;
  align-items: left;
  padding: 0 12px;

  /* @media (min-width: 600px) {
    grid-template-columns: 350px 1fr;
  } */
`

const FullWidthBackground = styled(ContainerFullWidth)`
  background-color: ${props => props.theme.bg.secondary};
  border-top: 1px solid ${props => props.theme.border.primary};
  padding: 50px 0;
`

const HeroImage = styled(Image)`
  display: block;
  height: 400px;

  @media (min-width: 600px) {
    display: block;
  }
`

const CalendarWidget = styled.iframe`
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  height: 321px;
  border: 0;
  /* border: 1px solid ${props => props.theme.border.primary}; */
  padding: 20px;
  border-radius: 5px;
`

const FormWidget = styled.iframe`
  /* display: block; */
  width: 100%;
  margin: 0 auto;
  /* max-width: 600px; */
  border: 0px;
  height: 1050px;
  /* border: 1px solid ${props => props.theme.border.primary}; */
  /* background-color: ${props => props.theme.bg.secondary}; */
  padding: 20px;
  /* border-radius: 5px; */
  box-sizing: border-box;
  /* overflow-y: scroll; */

  @media (min-width: 600px) {
    height: 900px;
    padding: 0px;
  }
`

const FormContainer = styled.div`
  margin: 0 auto;
  max-width: 600px;
`

const Title = styled.h2`
  /* text-align: center; */
  /* color: ${props => props.theme.colors.blue}; */
`

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  button{
    margin: 12px 12px 0 0;
  }
`

const Reserve = props => {
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
    <Layout currentPage='reserve'>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />

      <ContainerBodyWidth>

        <CalendarGrid>
          {/* <div>
            <Title>Availability</Title>
            <CalendarWidget src="https://secure.ownerreservations.com/widgets/f68fb359a8de404a83caf96e0a236d55?seq=0&amp;propertyKey=cdfd55b69b49464199cb424075a49f4b" frameborder="0" scrolling="no" seamless="seamless" allowtransparency="true" ></CalendarWidget>
          </div> */}

          <div>
            <Title>Make a Reservation</Title>
              <p>
                We offer direct booking via email to give you the lowest nightly rate.
                Please tell us a bit about the details of your stay and we'll get back to you with a confirmation.
                You don't have to pay yet.
              </p>

              <ButtonGroup>
                <a href="mailto:pointbeachdoorcounty@gmail.com" target="_blank">
                  <ButtonPrimary>
                    Email us at pointbeachdoorcounty@gmail.com
                  </ButtonPrimary>
                </a>

                <ButtonSecondary onClick={() => copy('pointbeachdoorcounty@gmail.com')}>
                  Copy email address to clipboard
                </ButtonSecondary>
              </ButtonGroup>




              <p>And please include:</p>

              <ul>
                <li>Name</li>
                <li>Phone number</li>
                <li>Number of adults</li>
                <li>Number of children</li>
                <li>Date of arrival and date of departure</li>
              </ul>

              <a href="https://www.vrbo.com/4728373ha?noDates=true&unitId=5700929" target="_blank">
                <ButtonPrimary style={{marginTop: '40px'}}>
                  View Listing on VRBO
                </ButtonPrimary>
              </a>
          </div>

        </CalendarGrid>
      </ContainerBodyWidth>

      <FullWidthBackground>
        <ContainerBodyWidth>
            <HeroImage fluid={data.site.heroImage.image.asset.fluid} alt={data.site.heroImage.image.alt} />
          {/* <FormContainer>
            <Title>Make a reservation</Title>
            <p>Please tell us a bit about the details of your stay and we'll get back to you with a confirmation. You don't have to pay yet.</p>
            <FormWidget src="https://secure.ownerreservations.com/widgets/1fa1c03d88ba434aafd6185297086259?seq=0&amp;propertyKey=cdfd55b69b49464199cb424075a49f4b" scrolling="yes" frameborder="0" seamless="seamless" allowtransparency="true" ></FormWidget>
          </FormContainer> */}
        </ContainerBodyWidth>
      </FullWidthBackground>


    </Layout>
  )
}

export default Reserve

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

  query ReserveQuery {
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
