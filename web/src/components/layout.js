import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import Header from './header'
import Footer from './footer'

import '../styles/layout.css'
import styles from './layout.module.css'
import "../styles/index.scss"

const Content = styled.main`
  /* max-width: ${props => props.theme.contentWidth}; */
  margin: auto;
  background-color: ${props => props.theme.bg.primary};
  /* background-color: ${props => props.theme.bg.secondary}; */
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
      {/* <div className={styles.content}>{children}</div> */}
      <Footer siteTitle={siteTitle} />

      {/* <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.siteInfo}>
            &copy; {new Date().getFullYear()}, Built with <a href='https://www.sanity.io'>Sanity</a>{' '}
            &amp;
            {` `}
            <a href='https://www.gatsbyjs.org'>Gatsby</a>
          </div>
        </div>
      </footer> */}
    </>
  </ThemeProvider>
)

export default Layout
