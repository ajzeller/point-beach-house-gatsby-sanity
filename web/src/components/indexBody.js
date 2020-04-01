import React, { useState } from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import Image from "gatsby-image"
import { FaHome, FaUsers, FaDoorOpen, FaBath, FaWater, FaUtensils, FaSnowflake, FaWifi, FaFire, FaTshirt, FaBicycle } from "react-icons/fa";
import { IoIosArrowForward, IoMdStar } from "react-icons/io";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import VideoButton, {ButtonPrimary} from './video-button'
import Icon from './icon'
import Main from './main'

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-items: left;
  align-items: center;
  grid-gap: 8px;
  width: 100%;
  box-sizing: border-box;
  max-width: 800px;
  

  @media (min-width: 600px) {
    padding: 0px 20px 0px 0px;
    border-right: 1px solid ${props => props.theme.border.secondary};
  }
`

const AmenitiesItemGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-gap: 10px;

  svg{
      width: 18px;
      height: 18px;
      vertical-align: bottom;
    }
`

const BodyGrid = styled.div`
  margin: 0;
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  justify-items: center;
`



export const AmenitiesItem = ({icon, text}) => (
  <AmenitiesItemGrid>
    {icon}
    <span>{text}</span>
  </AmenitiesItemGrid>
)

export const Label = styled.h3`
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin: 0px 0 0px 0;
  color: ${props => props.theme.text.secondary};

`

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  max-width: 400px;
  margin: 0px auto;
  justify-self: center;
`

const SectionGrid = styled.div`
  display: grid;
  margin: 40px 0;
  padding: 0 16px;
  grid-template-columns: 1fr;
  align-content: start;

  grid-gap: 40px;
  width: 100%;
  box-sizing: border-box;

  p {
    margin: 5px 0 0 0;
  }

  &.reviews {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  &.summary {
    grid-gap: 40px;

    @media (min-width: 600px) {
      grid-template-columns: auto auto;
      grid-gap: 20px;
    }
  }

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;

    &.amenities{
      grid-template-columns: auto 1fr;
    }

  }
`

export const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: left;
  align-content: start;
  grid-gap: 12px;

  svg {
    width: 25px;
    height: 25px;
  }

  a{
    justify-self: left;

    svg{
      width: 18px;
      height: 18px;
      vertical-align: bottom;
    }
  }
`

const Subsection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: left;
  grid-gap: 8px;
  align-content: start;

  p{
    margin: 0;
  }
`

const ImageGalleryContainer = styled.div`
  /* max-width: 1200px; */
  margin: 0px 0 0 0;

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
      height: 500px;
    }
  }
`

export const ContainerBodyWidth = styled.div`
  max-width: ${props => props.theme.contentWidth};
  margin: 0px auto;
`

export const ContainerFullWidth = styled.div`
  width: 100%;

  &.secondary{
    background-color: ${props => props.theme.bg.lightBlue};
  }

  &.anchors{
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%23afd2e8' fill-opacity='0.4' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E");
  }
`

const Title = styled.h1`
  text-align: center;
  margin: 0 auto;
`

const Hero = styled.div`
  display: grid;
  grid-gap: 30px;
  background-color: ${props => props.theme.bg.primary};
  margin: 0px auto 30px;
  padding: 30px 0 0 0;

  @media (min-width: 600px) {
    margin: 125px auto 30px;
  }
`

const HeroContainer = styled.div`
  position: relative;
  
  svg{
    width: 100%;
  }
`

const HeroImage = styled(Image)`
  height: 600px;

  @media (max-width: 600px) {
    height: 300px;
  }
`

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  
  @media (min-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const ReviewItem = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 16px;
  grid-gap: 16px;
  background-color: ${props => props.theme.bg.primary};
  border-radius: 5px;
  align-content: space-between;	
  font-size: 0.9rem;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.15);
`

const ReviewerImage = styled(Image)`
  border-radius: 100%;
  width: 60px;
`

const ReviewerInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 16px;
  align-items: center;
`

const ReviewNameDate = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  justify-content: left;

  .bold{
    font-weight: 600;
  }

  .date{
    color: ${props => props.theme.text.secondary}
  }
`

const Rating = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 5px;
  align-items: center;
  justify-self: center;
`

const Stars = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  padding: 0 0 2px 0;
`

const MapFrame = styled.iframe`
  height: 500px;
  width: 100%;
  border: 0px;
`

const MapContainer = styled.div`
  display: block;
`

const IndexBody = ({ data }) => {

  const images = data.site.gallery.map(item => ({
    original: item.image.asset.fluid.src,
    thumbnail: item.image.asset.fluid.src,
    originalAlt: item.image.alt,
    thumbnailAlt: item.image.alt,
  }))

  return(
    <>
      <Hero>
        <Title>{data.site.heroTitle}</Title>

        <ButtonGrid>  
          <VideoButton />
          <Link to='/reserve'>
            <ButtonPrimary>
              Book your stay 
            </ButtonPrimary>
          </Link>
        </ButtonGrid>
      </Hero>

      <HeroContainer>
        <HeroImage fluid={data.site.heroImage.image.asset.fluid} alt={data.site.heroImage.image.alt} />
      </HeroContainer>

      <BodyGrid>

        <ContainerBodyWidth>
          <SectionGrid className="summary">
            <StatsGrid>
              <AmenitiesItem icon={<Icon symbol='house' />} text='Entire home &middot; 2500 sq ft' />
              <AmenitiesItem icon={<Icon symbol='people' />} text='10 Guests' />
              <AmenitiesItem icon={<Icon symbol='bed' />} text='4 Bedrooms' />
              <AmenitiesItem icon={<Icon symbol='bath' />} text='2.5 Bathrooms' />
            </StatsGrid>

            <Subsection>
              <Label>Summary</Label>
              <p>{data.site.summaryText}</p>
            </Subsection>
          </SectionGrid>
        </ContainerBodyWidth>
          
        <ContainerFullWidth className='secondary'>
          <ContainerBodyWidth>
            <SectionGrid className='amenities'>
              <AmenitiesGrid>
                <Label>Amenities</Label>
                <AmenitiesItem icon={<Icon symbol='sunset' />} text='Waterfront view with dock' />
                <AmenitiesItem icon={<Icon symbol='hotpot' />} text='Modern fully-equipped kitchen' />
                <AmenitiesItem icon={<Icon symbol='snowflake' />} text='A/C' />
                <AmenitiesItem icon={<Icon symbol='laptop' />} text='High-speed WiFi' />
                <AmenitiesItem icon={<Icon symbol='fireplace' />} text='Fireplace' />
                <AmenitiesItem icon={<Icon symbol='washer' />} text='Washer & dryer' />
                <AmenitiesItem icon={<Icon symbol='bike' />} text='Bikes' />
                <AmenitiesItem icon={<Icon symbol='kayak' />} text='Kayaks' />
                <Link to='/amenities'>
                  <AmenitiesItemGrid style={{gridGap: '3px'}}>
                    View all amenities 
                    <IoIosArrowForward /> 
                  </AmenitiesItemGrid>
                </Link>
              </AmenitiesGrid>

              <ImageGalleryContainer>
                <ImageGallery 
                      items={images}
                      showBullets={true} 
                      thumbnailPosition={'bottom'}
                      showPlayButton={false}
                      showIndex={false}
                      showFullscreenButton={false}
                      lazyLoad={true}
                      />
              </ImageGalleryContainer>
            </SectionGrid>
          </ContainerBodyWidth>
        </ContainerFullWidth>

        <ContainerBodyWidth>
          <SectionGrid>
            <Subsection>
              <Label>Location</Label>
              <p>{data.site.locationText}</p>
            </Subsection>
            <Subsection>
              <Label>Inside</Label>
              <p>{data.site.insideText}</p>
            </Subsection>
          </SectionGrid>          
        </ContainerBodyWidth>

        <ContainerFullWidth className='secondary anchors'>
          <ContainerBodyWidth>

            <SectionGrid className='reviews'>
              <Rating>
                
                <Label>Our average guest rating:</Label>
                <Stars>
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                  <IoMdStar />
                </Stars>
              </Rating>
              <ReviewsGrid>
                {data.site.reviews.map(item => (
                  <ReviewItem key={item.reviewerName}>
                    <span>{item.reviewText}</span>
                    <ReviewerInfo>
                      <ReviewerImage fluid={item.reviewerImage.asset.fluid} />
                      <ReviewNameDate>
                        <span className='bold' >{item.reviewerName}</span>
                        <span className='date' >{item.reviewDate}</span>
                      </ReviewNameDate>
                    </ReviewerInfo>
                  </ReviewItem>
                ))}
              </ReviewsGrid>
            </SectionGrid>
          </ContainerBodyWidth>
        </ContainerFullWidth>

        <ContainerFullWidth>
        <MapContainer>

        <MapFrame frameborder="0"
src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJv4paW1RJTU0R7UZrAS6IH_Y&key=${process.env.GATSBY_API_KEY_MAPS}`} allowfullscreen></MapFrame>
        </MapContainer>
        </ContainerFullWidth>

      </BodyGrid>
    </>
  )
}

export default IndexBody