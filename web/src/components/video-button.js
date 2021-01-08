import React, { useState } from 'react'
import styled from 'styled-components'
import ModalVideo from 'react-modal-video'

import { FaVideo } from "react-icons/fa";

export const Button = styled.button`
  margin: 0 auto;
  display: flex;
  /* background-color: ${props => props.theme.colors.blue}; */
  /* color: white; */
  font-weight: 700;
  text-transform: uppercase;
  padding: 0px 15px;
  align-items: center;
  border: none;
  border-radius: 5px;
  /* box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15); */
  font-size: 0.75rem;
  height: 36px;

  svg {
    margin: 0 0 0 10px;
  }

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline:0;
  }
`

export const ButtonPrimary  = styled(Button)`
  background-color: ${props => props.theme.colors.blue};
  color: white;
  margin: 0;

  &:hover {
    background-color: ${props => props.theme.buttons.blueHover};
  }
`

export const ButtonSecondary = styled(Button)`
  background-color: white;
  color: ${props => props.theme.colors.blue};
  /* border: 1px solid ${props => props.theme.border.secondary}; */
  margin: 0;

  border: 1px solid ${props => props.theme.colors.blue};

  &:hover {
    background-color: ${props => props.theme.buttons.whiteHover};
  }
`


const VideoButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return(
    <>
      <ModalVideo channel='youtube' isOpen={isOpen} videoId='oeWmkwPfvuI' onClose={() => setIsOpen(false)} />
      <ButtonSecondary onClick={() => setIsOpen(true)}>Video tour <FaVideo size='16px' /></ButtonSecondary>
    </>
  )
}

export default VideoButton

