import React, { useState } from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import Image from "gatsby-image"
import { FaHome, FaUsers, FaDoorOpen, FaBath, FaWater, FaUtensils, FaSnowflake, FaWifi, FaFire, FaTshirt, FaBicycle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import VideoButton, {ButtonPrimary} from './video-button'
import Icon from './icon'
import Main from './main'

export const Panel = styled.div`
  background-color: ${props => props.theme.bg.primary};
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding: 16px;
`

const HeroTitle = styled.h2`
  margin: 20px auto;
  /* text-align: center; */
  position: absolute;
  bottom: 8px;
  left: 16px;
`

const StatsGrid = styled.div`
  /* background-color: ${props => props.theme.bg.primary}; */
  /* box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15); */
  /* padding: 10px; */
  /* margin: 20px 0 10px 0; */
  /* border-radius: 5px; */
  display: grid;
  grid-template-columns: auto;
  justify-items: left;
  align-items: center;
  grid-gap: 8px;
  width: 100%;
  box-sizing: border-box;
  max-width: 800px;
  

  @media (min-width: 600px) {
    padding: 10px 20px 10px 10px;
    /* grid-template-columns: repeat(4, auto); */
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
  margin: 0px 0 0px 0;
  padding: 0 0 40px 0;
  /* margin: 10px 0 10px 0; */
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  justify-items: center;

  /* background-color: #f7fbff; */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%23daddff' fill-opacity='0.4' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E");
  /* grid-gap: 10px; */

  /* @media (min-width: 600px) {
    grid-template-columns: auto;
    } */
`

const SummaryGrid = styled(Panel)`
  margin: 0px 0 0px 0;
  /* margin: 10px 0 10px 0; */
  display: grid;
  grid-template-columns: auto;
  align-items: start;
  grid-gap: 20px;

  @media (min-width: 600px) {
    grid-template-columns: auto auto;
    grid-gap: 20px;
    }
`

export const AmenitiesItem = ({icon, text}) => (
  <AmenitiesItemGrid>
    {icon}
    <span>{text}</span>
  </AmenitiesItemGrid>
)

export const Label = styled.h3`
  font-weight: 600;
  font-size: 0.8rem;
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
  margin: 20px auto;
  justify-self: center;
`

const SectionGrid = styled.div`
  display: grid;
  margin: 40px 0 0 0;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  width: 100%;

  p {
    margin: 5px 0 0 0;
  }

  @media (min-width: 600px) {
    margin: 40px 0 0 0;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
  }
`

const SectionImage = styled(Image)`
  height: 400px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);

  /* object-fit: cover; */

  /* @media (max-width: 600px) {
    height: 400px;
  } */
`

export const AmenitiesGrid = styled(Panel)`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: left;
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

  p{
    margin: 0;
  }
`

const LocationGrid = styled(Panel)`
  display: grid;
  grid-template-columns: auto;
  align-items: start;
  grid-gap: 24px;
`

const ImageGalleryContainer = styled.div`
  /* max-width: 1200px; */
  margin: 40px 0 0 0;

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

const IndexBody = ({ data, heroTitle, summaryText, secondImage }) => {
  const [isOpen, setIsOpen] = useState(false)
  console.log(secondImage)

  const images = data.site.gallery.map(item => ({
    original: item.image.asset.fluid.src,
    thumbnail: item.image.asset.fluid.src
  }))

  return(
    <>
      <BodyGrid>
        <Main>

          <ButtonGrid>  
            <VideoButton />
            <ButtonPrimary>
              Book your stay
            </ButtonPrimary>
          </ButtonGrid>

          <SummaryGrid>
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
          </SummaryGrid>

          

          <SectionGrid>
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

            <LocationGrid>
              <Subsection>
                <Label>Location</Label>
                <p>{data.site.locationText}</p>
              </Subsection>
              <Subsection>
                <Label>Inside</Label>
                <p>{data.site.insideText}</p>
              </Subsection>
            </LocationGrid>
          </SectionGrid>

          

          <ImageGalleryContainer>
            <ImageGallery 
                  items={images}
                  showBullets={true} 
                  thumbnailPosition={'bottom'}
                  showPlayButton={false}
                  showIndex={false}
                  showFullscreenButton={false}
                  />
          </ImageGalleryContainer>

        </Main>
       
      </BodyGrid>
    </>
  )
}

export default IndexBody