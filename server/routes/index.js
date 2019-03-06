// ./routes/index.js
const express = require('express');
const Mdb = require('../controllers/mdb-cards');

const router = express.Router();

/* GET home page. */
router.post('/create', (req, res) => {
  console.log(req.body);
  Mdb.createCard(req, res, (err, result) => {
    res.json(result);
  });
});

router.post('/cards', (req, res) => {
  Mdb.fetchCards(req, res, (err, result) => {
    res.json(result);
  });
});

router.post('/update', (req, res) => {
  Mdb.updateCard(req, res, (err, result) => {
    res.json(result);
  });
});

router.post('/remove', (req, res) => {
  Mdb.removeCard(req, res, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
});

router.post('/delete', (req, res) => {
  Mdb.destroyCard(req, res, (err) => {
    if (err) res.json(err);
    res.json({ value: '', done: true });
  });
});

module.exports = router;
