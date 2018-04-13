var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the user'
  },
  password: {
    type: String,
    required: 'Kindly enter the password of the user'
  },
  role: {
    type: String,
    default: ['view']
  }
});

module.exports = mongoose.model('Users', TaskSchema);