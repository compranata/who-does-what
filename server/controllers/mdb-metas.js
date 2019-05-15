// ./controllers/db-metas.js
const {
  Entity,
  Unit,
  Lead,
  Icon,
  Tag,
  Wdw,
} = require('../models/model');

// Read
exports.fetchDatas = (req, res, next) => {
  const target = req.params.data;
  const active = { active: true };

  function callback(error, result) {
    if (error) next(error);
    next(null, result);
  }
  switch (target) {
    case 'entities':
      return Entity.find(active, callback);
    case 'units':
      return Unit.find(active, callback);
    case 'leads':
      return Lead.find(active, callback);
    case 'icons':
      return Icon.find(active, callback);
    case 'tags':
      return Tag.find(active, callback);
    default:
      return false;
  }
};

exports.createDatas = (req, res, next) => {
  const target = req.params.data;

  function callback(error, result) {
    if (error) next(error);
    next(null, result);
  }
  switch (target) {
    case 'entities':
      return new Entity({
        name: req.body.name,
        address: req.body.address,
        country: req.body.country,
        phone: req.body.phone,
        active: true,
      }).save(callback);
    case 'units':
      return new Unit({
        name: req.body.name,
        branding: req.body.branding,
        active: true,
      }).save(callback);
    case 'leads':
      return new Lead({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        user_id: req.body.user_id,
        active: true,
      }).save(callback);
    case 'icons':
      return new Icon({
        provider: req.body.provider,
        mdi: req.body.mdi,
        active: true,
      }).save(callback);
    case 'tags':
      return new Tag({
        name: req.body.name,
        group: req.body.group,
        label: req.body.label,
        active: true,
      }).save(callback);
    default:
      return false;
  }
};

exports.updateDatas = (req, res, next) => {
  const target = req.params.data;
  const query = [
    { _id: req.body._id },
    req.body,
    { new: true },
  ];

  function callback(error, result) {
    if (error) next(error);
    next(null, result);
  }
  switch (target) {
    case 'entities':
      return Entity.findOneAndUpdate(...query, callback);
    case 'units':
      return Unit.findOneAndUpdate(...query, callback);
    case 'leads':
      return Lead.findOneAndUpdate(...query, callback);
    case 'icons':
      return Icon.findOneAndUpdate(...query, callback);
    case 'tags':
      return Tag.findOneAndUpdate(...query, callback);
    default:
      return false;
  }
};

exports.removeDatas = (req, res, next) => {
  const target = req.params.data;
  const query = [
    { _id: req.body._id },
    { $set: { active: false } },
    { new: true },
  ];
  // issue - if wdw still has _id, crash at rendering.
  function callback(error, result) {
    if (error) next(error);
    next(null, result);
  }
  switch (target) {
    case 'entities':
      return Entity.findOneAndUpdate(...query, callback);
    case 'units':
      return Unit.findOneAndUpdate(...query, callback);
    case 'leads':
      return Lead.findOneAndUpdate(...query, callback);
    case 'icons':
      return Icon.findOneAndUpdate(...query, callback);
    case 'tags':
      return Tag.findOneAndUpdate(...query, callback);
    default:
      return false;
  }
};
