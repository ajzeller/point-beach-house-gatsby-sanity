import {Link} from 'gatsby'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo-2.svg'
import { IoIosMenu, IoMdClose } from "react-icons/io";

const HeaderContainer = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${props => props.theme.bg.primary};

  ul{
    list-style-type:none;
    margin: 0;
    padding: 0;

    li{
      margin: 0 10px 0 0;
      a {
        padding: 10px;
        color: ${props => props.theme.text.secondary};

        &:hover {
          color: ${props => props.theme.text.primary};
          border-bottom: 2px solid ${props => props.theme.bg.lightBlue};
        }
      }

      &.reserve {
        a{
          /* border: 2px solid ${props => props.theme.colors.blue}; */
          background-color: ${props => props.theme.colors.blue};
          color: white;
          border-radius: 5px;
          font-weight: 700;

          &:hover {
            background-color: ${props => props.theme.buttons.blueHover};
          }
        }
      }

      &.current{
        a {
          border-bottom: 2px solid ${props => props.theme.colors.blue};
        }
      }

    }
  }


  a{
    text-decoration: none;
  }
`

const Navbar = styled.nav`
  max-width: ${props => props.theme.contentWidth};
  margin: auto;
  display: grid;
  grid-template-columns: 60px auto auto;
  grid-template-rows: 1fr auto;
  align-items: center;
  padding: 15px;

  ul{
    /* display: flex; */
    list-style-type:none;
    margin: 0;
    padding: 0;

    li{
      margin: 0 10px 0 0;
      a {
        padding: 10px;
        color: ${props => props.theme.text.secondary};

        &:hover {
          color: ${props => props.theme.text.primary};
          border-bottom: 2px solid ${props => props.theme.bg.lightBlue};
        }
      }

      &.reserve {
        a{
          /* border: 2px solid ${props => props.theme.colors.blue}; */
          background-color: ${props => props.theme.colors.blue};
          color: white;
          border-radius: 5px;
          font-weight: 700;
        }
      }

      &.current{
        a {
          border-bottom: 2px solid ${props => props.theme.colors.blue};
        }
      }

    }
  }

  a{
    text-decoration: none;
  }

  .logo {
    height: 50px;
    width: 50px;
  }
`

const Menu = styled.div`
  justify-self: right;
  vertical-align: bottom;

 ul {
   display: flex;
 }

  svg {
    vertical-align: bottom;
  }

  @media (max-width: 1000px) {
    ul {
      display: none;
    }    
  }

  @media (min-width: 1000px) {
    svg {
      display: none;
    }    
  }
`

const Title = styled.div`
  display: grid;
  justify-items: left;
  color: ${props => props.theme.text.primary};

  h1 {
    font-weight: 600;
    margin: 0;
    font-size: 1.2rem;
  }

  .subtitle{
    font-size: 0.7rem;
  }
`

const Dropdown = styled.div`
  position: fixed;
  top: 80px;
  height: calc(100vh - 80px);
  width: 100vw;
  background-color: ${props => props.theme.bg.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  ul{
    li {
      text-align: center;
      margin: 25px 0;

      &.current{
          a {
            border-bottom: 0;
          }
    }
  }
}
`

const Header = ({onHideNav, onShowNav, showNav, siteTitle, subtitle, currentPage}) => {
  const [dropdownShown, setDropdownShown] = useState(false)

  const linksList = (<ul>
    <li className={currentPage == 'index' ? 'current': ''}>
      <Link to='/'>Home</Link>
    </li>
    <li className={currentPage == 'photos' ? 'current' : ''}>
      <Link to='/photos'>Photos</Link>
    </li>
    <li className={currentPage == 'amenities' ? 'current' : ''}>
      <Link to='/amenities'>Amenities</Link>
    </li>
    <li className={currentPage == 'faq' ? 'current' : ''}>
      <Link to='/faq'>FAQ</Link>
    </li>
    <li className={currentPage == 'blog' ? 'current' : ''}>
      <Link to='/blog'>Blog</Link>
    </li>
    <li className={` reserve ${currentPage == 'book' ? 'current' : ''}`}>
      <Link to='/reserve'>Reserve</Link>
    </li>
  </ul>)

  return(
    <HeaderContainer>
      <Navbar>
        <Logo className='logo'  onClick={ () => console.log('clicked')} />

          <Link to='/'>
            <Title>
              <h1>{siteTitle}</h1>
              <span className='subtitle'>{subtitle}</span>
            </Title>
          </Link>

        <Menu>
          {dropdownShown ? <IoMdClose size='30px' onClick={ () => setDropdownShown(prev => !prev)} /> : <IoIosMenu size='30px' onClick={ () => setDropdownShown(prev => !prev)} />}
          {linksList}
        </Menu>

      </Navbar>
        {dropdownShown && (<><span></span><Dropdown>
          {linksList}
          </Dropdown></>)}
    </HeaderContainer>
  )
}

export default Header
