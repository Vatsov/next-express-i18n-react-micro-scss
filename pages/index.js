import React from 'react'
import PropTypes from 'prop-types'

import { i18n, Link, withTranslation } from '../i18n'

import Header from '../components/Header'
import Footer from '../components/Footer'

import fetch from 'isomorphic-unfetch'

const Homepage = ({t, posts}) => {
  return (
  <React.Fragment>
    <main>
      <Header title={t('h1')} />

      <ul>
        {posts.map((post, i) => (
          <li key={i}>{post.title}</li>
        ))}
      </ul>

      <div>
        <button
          type='button'
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en')}
        >
          {t('change-locale')}
        </button>
        <Link href='/second-page'>
          <button
            type='button'
          >
            {t('to-second-page')}
          </button>
        </Link>
      </div>
    </main>
    <Footer />
  </React.Fragment>
)}

Homepage.getInitialProps = async ({ req }) => {
  const currentLanguage = req ? req.language : i18n.language
  const response = await fetch(process.env.ARTICLES_URI + '/' + currentLanguage);
  const posts = await response.json();

  return {
    namespacesRequired: ['common', 'footer'],
    posts: posts
  }
}

Homepage.propTypes = async () => {
  return {
    t: PropTypes.func.isRequired,
  }
}

export default withTranslation('common')(Homepage)
