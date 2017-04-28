const contentful = require('contentful');

module.exports = function(req, res) {
  const client = contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN
  })
  client.getEntry(process.env.ABOUT_ENTRY_ID)
    .then((response) => {
      res.json(response.fields)
    })
    .catch((error) => {
      res.json(error)
    })
}
