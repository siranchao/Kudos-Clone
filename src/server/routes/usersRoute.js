const express = require("express")
const router = express.Router()
const User = require("../models/userSchema")
const fs = require('fs');
const multer = require('multer');

//multer middleware
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, './')
  }, filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/findByEmail/:user', async(req, res) => {
  try{
    const user = await User.find({email: req.params.user})
    console.log("user name", user)
    res.json(user[0].name)
  }catch(err){
    console.log(err)
  }
})

router.get('/find/:user', async (req, res) => {
  try {
    const user = await User.find({ name: req.params.user })
    console.log("user", user[0].name)
    res.json(user[0].photo)
  } catch (err) {
    res.json({ message: err })
  }
})

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    team: req.body.team,
  })

  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (err) {
    res.json({ message: err })
  }
})

//Patch request
router.patch("/save/:user/:id", async (req, res) => {
  console.log(`Patching USER with ID: ${req.params.id}`)
  console.log(`Patching USER with USER: ${req.params.user}`)
  try {
    let user = await User.findById(req.params.user)
    if (!(req.params.id in user.savedKudos)) {
      let address = `savedKudos.${req.params.id}`
      user = await User.findByIdAndUpdate(req.params.user, {
        $set: { [address]: true },
      })
    } else {
      let address = `savedKudos.${req.params.id}`
      user = await User.findByIdAndUpdate(req.params.user, {
        $unset: { [address]: true },
      })
    }
    const update = await user.save()
    res.json(update)
  } catch (err) {
    res.json({ message: err.message })
  }
})

//get user's saved kudos
router.get("/saved/:user", async (req, res) => {
  try {
    const user = await User.find({
      email: req.params.user
    })
    //console.log(user)
    console.log("saved kudos", user[0].savedKudos)
    res.json(user[0].savedKudos)
  } catch (err) {

  }

})



router.patch("/update", async (req, res) => {
  console.log("updating profile")

  try {
    //console.log(req.body)

    const filter = { email: req.body.email }
    const update = { pronouns: req.body.pronouns, team: req.body.team }
    let result = await User.findOneAndUpdate(filter, update)
    //console.log(result)

    let result2 = await User.find(filter)
    //console.log(result2)

  } catch (err) {
    res.json({ message: err.message })
  }

})

router.patch("/updatePhoto/:user", upload.single('myImage'), async (req, res) => {
  try {
    console.log("uploading photo")
    const filter = { email: req.params.user }

    var img = fs.readFileSync(req.file.path)
    var imgBase64 = img.toString('base64')
    var imgFinal = Buffer.from(imgBase64, 'base64')
    const update = { photo: imgFinal }

    
    let result = await User.findOneAndUpdate(filter, update)
    //console.log("upload result", result)
  } catch (err) {
    res.json({ message: err })
  }
})


module.exports = router
