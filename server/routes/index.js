// ./routes/index.js
const express = require('express');
const Mdb = require('../controllers/mdb-wdws');
const Meta = require('../controllers/mdb-metas');

const router = express.Router();

/* GET home page. */

router.post('/wdws', (req, res) => {
  Mdb.fetchWdws(req, res, (err, result) => {
    res.json(result);
  });
});

router.post('/wdws/create', (req, res) => {
  Mdb.createWdw(req, res, (err, result) => {
    res.json(result);
  });
});

router.post('/wdws/update', (req, res) => {
  Mdb.updateWdw(req, res, (err, result) => {
    res.json(result);
  });
});

router.post('/wdws/remove', (req, res) => {
  Mdb.removeWdw(req, res, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
});

router.post('/wdws/delete', (req, res) => {
  Mdb.destroyWdw(req, res, (err) => {
    if (err) res.json(err);
    res.json({ value: '', done: true });
  });
});

router.post('/datas/:data', (req, res) => {
  Meta.fetchDatas(req, res, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
});

router.post('/datas/create/:data', (req, res) => {
  Meta.createDatas(req, res, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
});

router.post('/datas/update/:data', (req, res) => {
  Meta.updateDatas(req, res, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
});

router.post('/datas/remove/:data', (req, res) => {
  Meta.removeDatas(req, res, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
});

module.exports = router;
