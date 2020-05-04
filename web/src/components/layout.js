import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import Header from './header'
import Footer from './footer'

import '../styles/layout.css'

import "../styles/index.scss"

const Content = styled.main`
  margin: 80px auto 0 auto;
  background-color: ${props => props.theme.bg.primary};
  color: ${props => props.theme.text.primary};
  min-height: calc(100vh - 80px - 235px);

  a{
    color: ${props => props.theme.text.primary};
    text-decoration: none;
  }
`

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle, subtitle, currentPage}) => (
  <ThemeProvider theme={theme} >
    <>
      <Header siteTitle={siteTitle} subtitle={subtitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} currentPage={currentPage} />
      <Content>
        {children}
      </Content>
      <Footer siteTitle={siteTitle} />
    </>
  </ThemeProvider>
)

export default Layout
