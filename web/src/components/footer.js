import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'
import Main from './main'
import Logo from '../assets/logo-2.svg'
import { FaInstagram, FaFacebook } from "react-icons/fa";

const FooterContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  border-top: 1px solid ${props => props.theme.border.secondary};
  background-color: ${props => props.theme.bg.primary};
`

const FooterGrid = styled.div`
  max-width: ${props => props.theme.contentWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 40px 40px;
  align-items: center;

  a{
    text-decoration: none;
    display: flex;
    align-items: center;
    color: ${props => props.theme.text.primary};
  }

  span {
    font-weight: 600;
    margin: 0;
    font-size: 1rem;
  }

  .bold{
    font-weight: 600;
  }

  ul{
    /* display: flex; */
    list-style-type:none;
    margin: 0;
    padding: 0;

    li{
      margin: 10px 10px 0 0px;
      a {
        color: ${props => props.theme.text.secondary};

        &:hover {
          color: ${props => props.theme.text.primary};
        }
      }
    }
  }

  @media (min-width: 600px) {
  }
`
 

const Footer = ({ siteTitle }) => {

  const linksList = (<ul>
    <li>
      <Link to='/photos'>Photos</Link>
    </li>
    <li>
      <Link to='/amenities'>Amenities</Link>
    </li>
    <li>
      <Link to='/faq'>FAQ</Link>
    </li>
    <li>
      <Link to='/blog'>Blog</Link>
    </li>
    <li>
      <Link to='/reserve'>Reserve</Link>
    </li>
  </ul>)

  return(
    <FooterContainer>
      <FooterGrid>
        <Link to='/'>
            <span className='bold' >{siteTitle}</span>
        </Link>

        <a href='https://www.instagram.com/pointbeachhouse/' target='_blank' rel="noopener" aria-label="View Instagram account">
          <FaInstagram size='20px' alt='Instagram Icon' />
        </a>
        <a href='https://www.facebook.com/pointbeachhousedoorcounty/' target='_blank' rel="noopener" aria-label="View Facebook account">
          <FaFacebook size='20px' alt='Facebook Icon' />
        </a>
        {linksList}

      </FooterGrid>
    </FooterContainer>
  )
}

export default Footer