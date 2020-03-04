import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import Header from './header'

import '../styles/layout.css'
import styles from './layout.module.css'
import "../styles/index.scss"

const Content = styled.main`
  /* max-width: ${props => props.theme.contentWidth}; */
  margin: auto;
  background-color: ${props => props.theme.bg.secondary};
`

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle, subtitle}) => (
  <ThemeProvider theme={theme} >
    <>
      <Header siteTitle={siteTitle} subtitle={subtitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
      <Content>
        {children}
      </Content>
      {/* <div className={styles.content}>{children}</div> */}
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.siteInfo}>
            &copy; {new Date().getFullYear()}, Built with <a href='https://www.sanity.io'>Sanity</a>{' '}
            &amp;
            {` `}
            <a href='https://www.gatsbyjs.org'>Gatsby</a>
          </div>
        </div>
      </footer>
    </>
  </ThemeProvider>
)

export default Layout
