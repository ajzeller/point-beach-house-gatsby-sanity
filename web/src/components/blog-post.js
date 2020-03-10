import {format, distanceInWords, differenceInDays} from 'date-fns'
import React from 'react'
import styled from 'styled-components'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import Container from './container'
// import AuthorList from './author-list'
import Image from "gatsby-image"
import styles from './blog-post.module.css'
import { ContainerBodyWidth, ContainerFullWidth } from './indexBody'

const PostImage = styled(Image)`
  height: 300px;
  width: 100%;
  object-fit: cover;

  @media (min-width: 600px) {
    height: 500px;
  }
`

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1000px;
  margin: 0px auto 0 auto;
  padding: 16px;
  grid-gap: 40px;

  h1{
    font-size: 2.6rem;
    margin: 0;
  }

  @media (min-width: 600px) {
    grid-template-columns: 1fr auto;
    margin: 50px auto 0 auto;
  }
`

const PostContent = styled.div`

`

const PostMeta= styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  justify-items: left;
  grid-gap: 20px;
  border-top: 1px solid ${props => props.theme.border.secondary};

  @media (min-width: 600px) {
    grid-gap: 40px;
  }
`

const PublishedDate = styled.div`
  margin: 20px 0 0 0;
`

const MetaLabel = styled.span`
  font-weight: 700;
`

const MetaItemGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
  align-content: start;
  grid-gap: 10px;
`

const AuthorItem = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  grid-gap: 10px;
`

const AuthorImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`

const CategoryItem = styled.span`
  padding: 5px 10px;
  background-color: ${props => props.theme.border.secondary};
  border-radius: 100px;
`

const AuthorList = ({ items, title }) => {
  console.log(items)

  return(
    <MetaItemGrid>
      <MetaLabel>{title}</MetaLabel>
      {items.map( ( item, i) => (
        <AuthorItem key={`${item.author}-${i}`}>
          {item.author && item.author.image && item.author.image.asset && (
            <>
              <AuthorImage fluid={item.author.image.asset.fluid} />
              <span>{item.author.name}</span>
            </>
          )}
          {/* <AuthorImage fluid={author.image.asset.fluid} /> */}
        </AuthorItem>
      ))}
    </MetaItemGrid>
  )
}

const Categories = ( {categories} ) => {

  return(
    <MetaItemGrid>
      {categories.map( (item, i) => (
        <CategoryItem key={`${item.name}-${i}`}>{item.title}</CategoryItem>
      ))}
    </MetaItemGrid>
  )
}

function BlogPost (props) {
  console.log(props)

  const {_rawBody, authors, categories, title, mainImage, postImage, publishedAt} = props
  return (
  <>
    <ContainerBodyWidth>

      <article className={styles.root}>
        {postImage && postImage.image && (
          <PostImage fluid={postImage.image.asset.fluid} />
        )}
        <PostGrid>
          <PostContent>
            <h1>{title}</h1>
            {_rawBody && <PortableText blocks={_rawBody} />}
          </PostContent>

          <PostMeta>
            <PublishedDate>
              {differenceInDays(new Date(publishedAt), new Date()) > 3
                ? distanceInWords(new Date(publishedAt), new Date())
                : format(new Date(publishedAt), 'MMMM Do, YYYY')}
            </PublishedDate>

            {authors && <AuthorList items={authors} title='Authors' />}

            {categories && <Categories categories={categories} /> }
          </PostMeta>
        </PostGrid>

        {/* <Container>
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
        </Container> */}
      </article>
    </ContainerBodyWidth>

    <article>
    </article>
  </>
  )
}

export default BlogPost
