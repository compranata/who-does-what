// ./controllers/db-cards.js
const { Wdw } = require('../models/model');

// functions
function createWdwObject(body) {
  const wdw = new Wdw();
  wdw.name = body.name;
  wdw.description = body.description;
  wdw.phone = body.phone;
  wdw.fax = body.fax;
  wdw.mail = body.email;
  wdw.sip = body.sip;
  wdw.remark = body.remark;
  wdw.entity = body.entity;
  wdw.lead = body.lead;
  wdw.tags = body.tags;
  wdw.unit = body.unit;
  wdw.publish = true;
  return wdw;
}

// Create
exports.createWdw = (req, res, next) => {
  // DEV - required a method to built the object to pass mongoose
  // const card = new Card({
  //   name: 'test name',
  //   description: 'test description',
  //   phones: [{ sensibility: 'shared', phone: '111' }],
  //   faxs: [{ sensibility: 'shared', fax: '111' }, { sensibility: 'private', fax: '222' }],
  //   mails: [{ sensibility: 'shared', mail: '111' }],
  //   hours: [{ week: '0111110', hour: '09:00-13:00' }, { week: '0111110', hour: '14:00-18:00' }],
  //   publish: true,
  // });
  const wdw = createWdwObject(req.body);
  wdw.save((err) => {
    if (err) next(err);
    next(null, true);
  });
};

// Read
exports.fetchWdws = (req, res, next) => {
  Wdw.find({}, (err, wdws) => { // DEV - filter for .publish = true
    if (err) next(err);
    // DEV - any other filter, sort before passing
    // populate to join the collections
    next(null, wdws);
  });
};

// Update
exports.updateWdw = (req, res, next) => {
  // DEV - auth users
  const wdw = new Wdw();
  Wdw.updateOne({ _id: req.body.id }, wdw, (err, result) => {
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
  Wdw.updateOne({ _id: '' }, { $set: { publish: false } }, (err, wdw) => {
    if (err) next(err);
    // then save this object, also good to ask user to delete parmanent
    next(null, wdw);
  });
};

exports.Wdw = (req, res, next) => {
  // DEV - auth owners + admin + team leads
  Wdw.remove({ _id: '' }, (err) => {
    next(err);
  });
};
