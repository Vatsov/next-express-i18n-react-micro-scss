import micro from 'micro'

const posts = [
  {
    title: 'DE Next.js is awesome',
  },
  {
    title: 'DE API support is really great',
  },
]

export default micro((req, res) => {
  res.status(200).json(posts)
})
