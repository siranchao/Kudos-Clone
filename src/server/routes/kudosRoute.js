const express = require("express")
const { isObjectIdOrHexString } = require("mongoose")
const router = express.Router()

const Kudo = require("../models/kudoSchema")

//---------------GET REQUESTS---------------
router.get("/", async (req, res) => {
  console.log("Retreiving all Kudos")
  try {
    const kudos = await Kudo.find().sort({ _id: -1 })
    res.json(kudos)
  } catch (err) {
    res.json({ message: err })
  }
})

//Return sorted by date and page amount
router.get("/top/:amount", async (req, res) => {
  console.log(`Retreiving ${req.params.amount} Kudos`)
  try {
    const kudos = await Kudo.find().sort({ _id: -1 }).limit(req.params.amount)
    res.json(kudos)
  } catch (err) {
    res.json({ message: err })
  }
})

//Retrieving amount and To/From Query
router.get("/top/:amount/:query", async (req, res) => {
  console.log(`Retreiving ${req.params.amount} Kudos With ${req.params.query}`)
  try {
    const kudos = await Kudo.find({
      $or: [
        {
          to: { $regex: `${req.params.query}`, $options: "i" },
        },
        { from: { $regex: `${req.params.query}`, $options: "i" } },
      ],
    })
      .sort({ _id: -1 })
      .limit(req.params.amount)
    res.json(kudos)
  } catch (err) {
    res.json({ message: err })
  }
})

//Return by ID
router.get("/id/:id", async (req, res) => {
  console.log(`Retreiving Kudo with ID: ${req.params.id}`)
  try {
    const kudos = await Kudo.findById(req.params.id)
    res.json(kudos)
  } catch (err) {
    res.json({ message: err })
  }
})
//Count total Kudos
router.get("/count", async (req, res) => {
  console.log(`Counting KUDOS`)
  try {
    const kudos = await Kudo.find().count()
    res.json(kudos)
  } catch (err) {
    res.json({ message: err })
  }
})

//Count queried Kudos
router.get("/count/:query", async (req, res) => {
  console.log(`Counting queried KUDOS`)
  try {
    const kudos = await Kudo.find({
      $or: [
        {
          to: { $regex: `^{req.params.query}`, $options: "i" },
        },
        { from: { $regex: `^{req.params.query}`, $options: "i" } },
      ],
    }).count()
    res.json(kudos)
  } catch (err) {
    res.json({ message: err })
  }
})

//get user's sent kudos
router.get("/sent/:user", async (req, res) => {
  console.log("getting user's sent kudos")
  console.log(req.params.user)
  try {
    const kudos = await Kudo.find({
      from: req.params.user,
    })
    console.log(kudos)
    res.json(kudos)
  } catch (err) {
    res.json({ message: err })
  }
})

//get user's received kudos
router.get("/received/:user", async (req, res) => {
  console.log("getting user's received kudos")
  try {
    const kudos = await Kudo.find({
      to: req.params.user,
    })
    console.log(kudos)
    res.json(kudos)
  } catch (err) {
    res.json({ message: err })
  }
})

//get user's saved kudos
router.get("/saved", async (req, res) => {})
//---------------POST REQUEST---------------
router.post("/", async (req, res) => {
  console.log("NEW KUDO CREATED")
  const kudo = new Kudo({
    to: req.body.to,
    from: req.body.from,
    kudosType: req.body.kudosType,
    kudosMessage: req.body.kudosMessage,
    kudoGif: req.body.kudoGif,
  })

  try {
    const savedKudo = await kudo.save()
    res.json(savedKudo)
  } catch (err) {
    res.json({ message: err })
  }
})

//---------------PATCH REQUESTS---------------
router.patch("/like/:id/:user", async (req, res) => {
  console.log(`Patching KUDO with ID: ${req.params.id}`)
  console.log(`Patching KUDO with USER: ${req.params.user}`)
  try {
    let kudo = await Kudo.findById(req.params.id)
    if (!(req.params.user in kudo.kudosLikes)) {
      let address = `kudosLikes.${req.params.user}`
      kudo = await Kudo.findByIdAndUpdate(req.params.id, {
        $set: { [address]: true },
      })
    } else {
      let address = `kudosLikes.${req.params.user}`
      kudo = await Kudo.findByIdAndUpdate(req.params.id, {
        $unset: { [address]: true },
      })
    }
    const update = await kudo.save()
    res.json(update)
  } catch (err) {
    res.json({ message: err.message })
  }
})

//---------------DELETE REQUESTS---------------

router.delete("/:id", async (req, res) => {
  console.log(`Deleting KUDO with ID: ${req.params.id}`)
  try {
    const kudo = await Kudo.findByIdAndDelete(req.params.id)
    res.json(kudo)
  } catch (err) {
    res.json({ message: err.message })
  }
})
module.exports = router
