import React, { useState } from 'react'
import styled from 'styled-components'
import ModalVideo from 'react-modal-video'
import { FaHome, FaUsers, FaDoorOpen, FaBath } from "react-icons/fa";
import VideoButton, {ButtonPrimary} from './video-button'

const HeroTitle = styled.h2`
  margin: 20px auto;
  /* text-align: center; */
  position: absolute;
  bottom: 8px;
  left: 16px;
`

const StatsGrid = styled.div`
  /* background-color: ${props => props.theme.bg.secondary}; */
  /* border: 1px solid ${props => props.theme.border.secondary}; */
  padding: 10px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: auto;
  justify-items: left;
  align-items: center;
  grid-gap: 8px;
  border-right: 1px solid ${props => props.theme.border.secondary};

  @media (min-width: 600px) {
      padding: 10px 20px 10px 10px;
    }
`

const StatsItemGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-gap: 5px;
`

const SectionGrid = styled.div`
  margin: 20px 0 10px 0;
  /* margin: 10px 0 10px 0; */
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  grid-gap: 10px;

  @media (min-width: 600px) {
    grid-template-columns: auto;
    }
`

const SummaryGrid = styled.div`
  margin: 20px 0 0px 0;
  /* margin: 10px 0 10px 0; */
  display: grid;
  grid-template-columns: auto;
  align-items: start;
  grid-gap: 10px;
  background-color: ${props => props.theme.bg.primary};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding: 10px;

  @media (min-width: 600px) {
    grid-template-columns: auto auto;
    grid-gap: 20px;
    }
`

const StatsItem = ({icon, text}) => (
  <StatsItemGrid>
    {icon}
    <span>{text}</span>
  </StatsItemGrid>
)

const Label = styled.h2`
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin: 10px 0 5px 0;
`

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  max-width: 400px;
  justify-self: center;
`

const Summary = ({ heroTitle, heroSummary }) => {
  const [isOpen, setIsOpen] = useState(false)

  return(
    <>
      <SectionGrid>
        <ButtonGrid>  
          <VideoButton />
          <ButtonPrimary>
            Book your stay
          </ButtonPrimary>
        </ButtonGrid>

        <SummaryGrid>

      
          <StatsGrid>
            <StatsItem icon={<FaHome />} text='Entire home &middot; 1800 sq ft' />
            <StatsItem icon={<FaUsers />} text='10 Guests' />
            <StatsItem icon={<FaDoorOpen />} text='4 Bedrooms' />
            <StatsItem icon={<FaBath />} text='2.5 Bathrooms' />
          </StatsGrid>

          <div>
            <Label>Summary</Label>
            <p>{heroSummary}</p>
          </div>
        </SummaryGrid>
      </SectionGrid>
    </>
  )
}

export default Summary