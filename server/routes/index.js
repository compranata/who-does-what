// ./routes/index.js
const express = require('express');
const Mdb = require('../controllers/mdb-wdws');

const router = express.Router();

/* GET home page. */
router.post('/create', (req, res) => {
  console.log(req.body);
  Mdb.createWdw(req, res, (err, result) => {
    res.json(result);
  });
});

router.post('/wdws', (req, res) => {
  Mdb.fetchWdws(req, res, (err, result) => {
    res.json(result);
  });
});

router.post('/update', (req, res) => {
  Mdb.updateWdw(req, res, (err, result) => {
    res.json(result);
  });
});

router.post('/remove', (req, res) => {
  Mdb.removeWdw(req, res, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
});

router.post('/delete', (req, res) => {
  Mdb.destroyWdw(req, res, (err) => {
    if (err) res.json(err);
    res.json({ value: '', done: true });
  });
});

module.exports = router;
