const express = require('express');
const mongoose = require('mongoose');
const requiredAuth = require('../middlewares/requiredAuth');

const Tracks = mongoose.model('Tracks');

const router = express.Router();
router.use(requiredAuth);

router.get('/tracks', async (req, res) => {

    const tracks = await Tracks.find({ userId: req.user._id })
    console.log('LIST OF TRACKS');
    res.status(200).send(tracks)
})

router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;
    if (!name || !locations) {
        return res.status(422).send({ error: "YOU HAVE TO PROVIDE NAME AND LOCATION" })
    }

    try {
        const track = new Tracks({
            name,
            locations,
            userId: req.user._id,
        })
        await track.save();
        res.send(track);
    } catch (err) {
        res.status(422).send({ error: err.message })
    }
})

module.exports = router;