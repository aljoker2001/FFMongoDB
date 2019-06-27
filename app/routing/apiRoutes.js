module.exports = function (app) {
  var mongojs = require('mongojs')
  var mongodb = require('mongodb')
  var databaseUrl = 'frienddb'
  var collections = ['friends']
  let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/frienddb'

  // Use mongojs to hook the database to the db variable
  var db = mongojs(databaseUrl, collections)

  mongodb.MongoClient.connect(uri, {useMongoClient: true}, function (err, client) {
    if (err) throw err
    console.log(uri)
    // This makes sure that any errors are logged if mongodb runs into an issue
    db.on('error', function (error) {
      console.log('Database Error:', error)
    })
    app.get('/api/friends', function (req, res) {
      db.friends.find({}, function (err, data) {
        if (err) {
          console.log(err)
        } else {
          res.json(data)
        }
      })
    })

    app.post('/api/friends', function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of the body parsing middleware
      var newFriend = req.body
      console.log('new friend:', newFriend)
      db.friends.insert(newFriend, function (err, data) {
        if (err) {
          console.log(err)
        } else {
          res.json(data)
        }
      })
    })
    client.close()
  })
}
