import models from '../models'
import passport from 'passport'
import { Router } from 'express'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { Strategy as VKontakteStrategy } from 'passport-vkontakte'

import User from '../models/User'


passport.use(new TwitterStrategy({
  consumerKey: '16FUYqdxNvpICVxrHJ7LcLsjZ',
  consumerSecret: 'UrU1krEK98aqiZYxaLlxrMi5YkzKZwM6SPtzSjI5lgQWbPSx9l',
  callbackURL: '/users/auth/twitter/callback',
  includeEmail: true,
  profileFields: ['id', 'displayName', 'photos', 'emails']
}, (token, tokenSecret, profile, done) => {
  console.log(profile)
  User.findOrCreateByAuth(profile, done)
}))

passport.use(new FacebookStrategy({
  clientID: '1882882331970659',
  clientSecret: '5b0727c31e6fefaf2e32fa096d909313',
  callbackURL: '/users/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'profileUrl', 'birthday', 'gender', 'photos', 'emails']
}, (token, tokenSecret, profile, done) => {
    User.findOrCreateByAuth(profile, done)
}))

passport.use(new VKontakteStrategy({
  clientID: '6049883',
  clientSecret: '80jMbDhDxoTJATmwMg9S',
  callbackURL: '/users/auth/vkontakte/callback',
  scope: ['email'],
  profileFields: ['email']
}, (token, tokenSecret, params, profile, done) => {
    profile.emails = new Array({value: params.email})
    User.findOrCreateByAuth(profile, done)
}))

passport.serializeUser((profile, done) => {
  done(null, `${profile.provider}_${profile.id}`)
})

passport.deserializeUser((id, done) => {
    User.findById(id, done)
})

const router = new Router()

for (const provider of ['twitter', 'facebook', 'vkontakte']) {
  router.get(`/login/${provider}`, passport.authenticate(provider, { scope: 'email' }))
  router.get(`/auth/${provider}/callback`, passport.authenticate(provider, {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  }))
}

router.get('/logout', logout)

function logout (req, res) {
  // `req.logout()` est injectée par le middleware principal de Passport,
  // ce n'est pas une méthode fournie par Express…
  req.logout()
  req.flash('success', 'You have been disconnected well')
  res.redirect('/')
}

export default router
