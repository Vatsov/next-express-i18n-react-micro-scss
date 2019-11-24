const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware').default

const nextI18next = require('./i18n')

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams)
  }),
  send: ({ data, res }) => res.send(data)
})

app.prepare().then(() => {
  const server = express()

  server.use(nextI18NextMiddleware(nextI18next))


//  server.use('/static', express.static(__dirname + '/pages/public/locales'));

  server.get('*', (req, res) => handle(req, res))

  server.listen((port), err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
