// ./controllers/db-wdws.js
const { Wdw } = require('../models/model');

// functions
function createWdwObject(body) {
  const wdw = new Wdw();
  wdw.name = body.name;
  wdw.description = body.description;
  wdw.phone = body.phone;
  wdw.fax = body.fax;
  wdw.email = body.email;
  wdw.sip = body.sip;
  wdw.remark = body.remark;
  wdw.entity = body.entity;
  wdw.lead = body.lead;
  wdw.tags = body.tags;
  wdw.unit = body.unit;
  wdw.creatorId = body.creatorId;
  wdw.publish = true;
  wdw.imageUrl = body.imageUrl;
  return wdw;
}

// Create
exports.createWdw = (req, res, next) => {
  const wdw = createWdwObject(req.body);
  wdw.save((err, result) => {
    if (err) next(err);
    next(null, result);
  });
};

// Read
exports.fetchWdws = (req, res, next) => {
  Wdw.find({ publish: true }, (err, wdws) => {
    if (err) next(err);
    // DEV - any other filter, sort before passing
    // populate to join the collections
    next(null, wdws);
  });
};

// Update
exports.updateWdw = (req, res, next) => {
  // DEV - auth users
  Wdw.findOneAndUpdate({ _id: req.body._id }, req.body.query, { new: true }, (err, result) => {
    // preferable, update with $set, in order to avoid override
    // question is: how to multiple fields (FRONT)
    if (err) next(err);
    next(null, result);
  });
};

// Delete
exports.removeWdw = (req, res, next) => {
  // DEV - AUth only own cards
  // DEV - get the value from req.body._id
  Wdw.updateOne({ _id: req.body._id }, { $set: { publish: false } }, (err, wdw) => {
    if (err) next(err);
    // then save this object, also good to ask user to delete parmanent
    next(null, wdw);
  });
};

exports.destroyWdw = (req, res, next) => {
  // DEV - auth owners + admin + team leads
  Wdw.remove({ _id: '' }, (err) => {
    // also remove the picture
    next(err);
  });
};
