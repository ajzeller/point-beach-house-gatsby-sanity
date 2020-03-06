import {Link} from 'gatsby'
import React, { useContext, useState } from 'react'
import styled, {ThemeContext} from 'styled-components'
import Logo from '../assets/logo-2.svg'
import { IoIosMenu } from "react-icons/io";

const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${props => props.theme.bg.primary};
  /* border-bottom: 1px solid ${props => props.theme.border.secondary}; */
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

  @media (max-width: 600px) {
    ul {
      display: none;
    }    
  }

  @media (min-width: 600px) {
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
  ul{
    li {
      margin: 15px 0;

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
  console.log(dropdownShown)

  const themeContext = useContext(ThemeContext);
  console.log(themeContext)

  console.log(currentPage)

  const linksList = (<ul>
    <li className={currentPage == 'index' && 'current'}>
      <Link to='/'>Home</Link>
    </li>
    <li className={currentPage == 'photos' && 'current'}>
      <Link to='/photos'>Photos</Link>
    </li>
    <li className={currentPage == 'amenities' && 'current'}>
      <Link to='/amenities'>Amenities</Link>
    </li>
    {/* <li className={currentPage == 'location' && 'current'}>
      <Link to='/location'>Location</Link>
    </li> */}
    <li className={currentPage == 'blog' && 'current'}>
      <Link to='/blog'>Blog</Link>
    </li>
    <li className={` reserve ${currentPage == 'book' && 'current'}`}>
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
          {/* <button onClick={ () => setDropdownShown(prev => !prev)} style={{padding: 0}}>
            <Icon symbol='menu' />
          </button> */}
          <IoIosMenu size='30px' onClick={ () => setDropdownShown(prev => !prev)} />
          {linksList}
        </Menu>

        {dropdownShown && (<><span></span><Dropdown>
          {linksList}
          </Dropdown></>)}
      </Navbar>
    </HeaderContainer>
  )
}

export default Header
