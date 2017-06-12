import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  _id: { type: String, required: true },
  provider: { type: String, required: true },
  providerId: { type: String, required: true },
  email: { type: String, required: true },
  username: String,
  displayName: String,
  photo: String,
  gender: String,
  profileUrl: String,
  joinedAt: { type: Date, default: Date.now },
  lastConnected: { type: Date, default: Date.now }
})

userSchema.statics.findOrCreateByAuth = function findOrCreateByAuth (profile, done) {
console.log('+++', profile.emails,  '+++')
  this.update(
    { _id: `${profile.provider}_${profile.id}` },
    {
      $set: {
        _id: `${profile.provider}_${profile.id}`,
        provider: profile.provider,
        providerId: profile.id,
        email: profile.emails[0].value,
        username: profile.username,
        displayName: profile.displayName,
        photo: profile.photos[0].value,
        gender: profile.gender,
        profileUrl: profile.profileUrl,
        lastConnected: Date.now()
      },
      $setOnInsert: { joinedAt: Date.now() }
    },
    { upsert: true },
    (err) => done(err, profile)
  )
}

const Model = mongoose.model('User', userSchema)

export default Model
