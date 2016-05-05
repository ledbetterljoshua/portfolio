var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  url: String,
  slug: String,
  desc: String,
  title: String, 
  image: String,
  private: Boolean,
  created_at: Date,
	updated_at: Date
});

// on every save, add the date
postSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

var Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;