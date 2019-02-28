// ./controllers/db-cards.js
const { Card } = require('../models/model');

// functions
function createCardObject(body) {
  const card = new Card();
  card.name = body.name;
  card.mails = [{ sensibility: 'shared', mail: 'grp@mail.com' }];
  return card;
}

// Create
exports.createCard = (req, res, next) => {
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
  const card = createCardObject(req.body);
  card.save((err, result) => {
    next(err, result);
  });
};

// Read
exports.fetchCards = (req, res, next) => {
  Card.find({}, (err, cards) => { // DEV - filter for .publish = true
    if (err) next(err);
    // DEV - any other filter, sort before passing
    // populate to join the collections
    next(null, cards);
  });
};

// Update
exports.updateCard = (req, res, next) => {
  // DEV - auth users
  const card = new Card();
  Card.updateOne({ _id: req.body.id }, card, (err, result) => {
    // preferable, update with $set, in order to avoid override
    // question is: how to multiple fields (FRONT)
    if (err) next(err);
    next(null, result);
  });
};

// Delete
exports.removeCard = (req, res, next) => {
  // DEV - AUth only own cards
  // DEV - get the value from req.body._id
  Card.updateOne({ _id: '' }, { $set: { publish: false } }, (err, card) => {
    if (err) next(err);
    // then save this object, also good to ask user to delete parmanent
    next(null, card);
  });
};

exports.destroyCard = (req, res, next) => {
  // DEV - auth owners + admin + team leads
  Card.remove({ _id: '' }, (err) => {
    next(err);
  });
};
