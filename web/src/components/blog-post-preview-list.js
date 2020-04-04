import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import BlogPostPreview from './blog-post-preview'
import { IoIosArrowRoundForward } from "react-icons/io";


const BlogPostPreviewListContainer = styled.div`
  margin: 0 0 24px 0;
`

const BlogPostList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    margin: 0 0 24px 0;
  }
`

const BrowseMore = styled.div`
  a {
    display: flex;
    align-items: center;
  }
  
`

function BlogPostPreviewList (props) {
  return (
    <BlogPostPreviewListContainer>
      <BlogPostList>
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id}>
              <BlogPostPreview {...node} isInList />
            </li>
          ))}
      </BlogPostList>
      {props.browseMoreHref && (
        <BrowseMore>
          <Link to={props.browseMoreHref}>Browse more <IoIosArrowRoundForward size='24px'/></Link>
        </BrowseMore>
      )}
    </BlogPostPreviewListContainer>
  )
}

BlogPostPreviewList.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default BlogPostPreviewList
