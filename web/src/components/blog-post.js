import {format, distanceInWords, differenceInDays} from 'date-fns'
import React from 'react'
import styled from 'styled-components'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import Container from './container'
import AuthorList from './author-list'
import Image from "gatsby-image"
import styles from './blog-post.module.css'
import { ContainerBodyWidth, ContainerFullWidth } from './indexBody'

const PostImage = styled(Image)`
  height: 500px;
  width: 100%;
  object-fit: cover;
`

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px;

  h1{
    font-size: 2.6rem;
  }

  @media (min-width: 600px) {
    grid-template-columns: 1fr auto;
  }
`

const PostContent = styled.div`

`

const PostData= styled.div`
  grid-template-columns: 1fr;

`

function BlogPost (props) {
  console.log(props)

  const {_rawBody, authors, categories, title, mainImage, postImage, publishedAt} = props
  return (
  <>
    <ContainerBodyWidth>

      <article className={styles.root}>
        {/* {mainImage && mainImage.asset && (
          <div className={styles.mainImage}>
            <img
              src={imageUrlFor(buildImageObj(mainImage))
                .width(1200)
                .height(Math.floor((9 / 16) * 1200))
                .fit('crop')
                .auto('format')
                .url()}
              alt={mainImage.alt}
            />
          </div>
        )} */}
        {postImage && postImage.image && (
          <PostImage fluid={postImage.image.asset.fluid} />
        )}
        <PostGrid>
          <PostContent>
            <h1>{title}</h1>
            {_rawBody && <PortableText blocks={_rawBody} />}
          </PostContent>
          <PostData>

          </PostData>
        </PostGrid>
        <Container>
          <div className={styles.grid}>
            <div className={styles.mainContent}>
              <h1 className={styles.title}>{title}</h1>
              {_rawBody && <PortableText blocks={_rawBody} />}
            </div>
            <aside className={styles.metaContent}>
              {publishedAt && (
                <div className={styles.publishedAt}>
                  {differenceInDays(new Date(publishedAt), new Date()) > 3
                    ? distanceInWords(new Date(publishedAt), new Date())
                    : format(new Date(publishedAt), 'MMMM Do, YYYY')}
                </div>
              )}
              {authors && <AuthorList items={authors} title='Authors' />}
              {categories && (
                <div className={styles.categories}>
                  <h3 className={styles.categoriesHeadline}>Categories</h3>
                  <ul>
                    {categories.map(category => (
                      <li key={category._id}>{category.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </article>
    </ContainerBodyWidth>

    <article>
    </article>
  </>
  )
}

export default BlogPost
