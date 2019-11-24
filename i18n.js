const NextI18Next = require('next-i18next').default

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  localeSubpaths: {
    de: 'german',
    en: 'eng',
  },
//  localePath: 'pages/public/locales'
})
