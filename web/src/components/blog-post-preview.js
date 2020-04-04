import {format, distanceInWords, differenceInDays} from 'date-fns'
import {Link} from 'gatsby'
import React from 'react'
import Img from "gatsby-image"
import {buildImageObj, cn, getBlogUrl} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'

import styled from 'styled-components'

const Image = styled(Img)`
  width: 100%;
  height: 200px;
`

const BlogPostGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 16px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  &:hover {
    h4{
      text-decoration: underline;
    }
  }
`

const BlogPostData = styled.div`
`

const BlogPostTitle = styled.h4`
  font-size: 1.6rem;
  margin: 12px 0;
`

const PublishedDate = styled.p`
  margin: 6px 0;
`

function BlogPostPreview (props) {
  return (
    <Link to={getBlogUrl(props.publishedAt, props.slug.current)}>
      <BlogPostGrid>
        {props.mainImage && props.mainImage.asset && (
          <Image fluid={props.mainImage.asset.fluid} />
        )}
        <BlogPostData>
          <BlogPostTitle>{props.title}</BlogPostTitle>
          <PortableText blocks={props._rawExcerpt} />
          <PublishedDate>
            {props.publishedAt && (
              differenceInDays(new Date(), new Date(props.publishedAt)) <= 14
                ? `Updated ${distanceInWords(new Date(props.publishedAt), new Date())} ago`
                : format(new Date(props.publishedAt), 'MMMM Do YYYY')
            )}
          </PublishedDate>
        </BlogPostData>
      </BlogPostGrid>
    </Link>
  )
}

export default BlogPostPreview
