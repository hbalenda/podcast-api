const contentful = require('contentful');

module.exports = function(req, res) {
  const client = contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN
  })

  const contentfulArrayToObject = (array) =>
    array.reduce((obj, item) => {
    if (item.sys.contentType.sys.id == "text") {
      obj[item.fields.id] = {
        "body": item.fields.body || null
      }
    } else if (item.sys.contentType.sys.id == "textMulti") {
      obj[item.fields.id] = {
        "headline": item.fields.headline || null,
        "body": item.fields.body || null
      }
    } else {
      console.log("Failure")
    }
    return obj
    }, {})
  client.getEntries()
  .then(function(response) {
    const restructuredData = contentfulArrayToObject(response.items);
    res.json(restructuredData);
  })
  .catch((error) => res.json(error))
}

