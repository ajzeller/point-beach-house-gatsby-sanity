import {Link} from 'gatsby'
import React from 'react'
import BlogPostPreview from './blog-post-preview'
import { Label } from './indexBody'
import styled from 'styled-components'

import styles from './blog-post-preview-list.module.css'

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: left;
`

const SectionTitle = styled(Label)`
  margin: 0 0 16px 0;
`

function BlogPostPreviewGrid (props) {
  return (
    <div className={styles.root}>
      {props.title && <SectionTitle>{props.title}</SectionTitle>}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id}>
              <BlogPostPreview {...node} isInList />
            </li>
          ))}
      </ul>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
  )
}

BlogPostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default BlogPostPreviewGrid
