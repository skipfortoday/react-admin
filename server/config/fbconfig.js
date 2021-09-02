var firebase = require("firebase-admin");

var serviceAccount = require("./sa.json");


firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
//   databaseURL: "https://sample-project-e1a84.firebaseio.com"
})

// module.exports.firebase = firebase
module.exports = firebase