const functions = require('firebase-functions')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Pets = require('./Pets')

const { username, password } = functions.config().mongo

const mongoUri = `mongodb://${username}:${password}@ds231501.mlab.com:31501/rest-api`
const mongooseConfig = { useNewUrlParser: true }

mongoose.connect(mongoUri, mongooseConfig)

const app = express()

const createServer = () => {
  app.use(cors({ origin: true }))

  app.get('/pets', async (req, res) => {
    const result = await Pets.find({}).exec()

    res.send(result)
  })

  app.post('/pets', async (req, res) => {
    const { body } = req

    const pet = new Pets(JSON.parse(body))
    await pet.save()
  
    res.send(pet._id)
  })

  app.get('/pets/:id/daralta', async (req, res) => {
    const { id } = req.params

    await Pets.deleteOne({ _id: id })

    res.sendStatus(204)
  })

  return app
}

exports.api = functions.https.onRequest(createServer())
