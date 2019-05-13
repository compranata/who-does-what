// ./controllers/db-metas.js
const {
  Entity,
  Unit,
  Lead,
  Icon,
  Tag,
} = require('../models/model');

// Read
exports.fetchDatas = (req, res, next) => {
  const fetch = req.params.data;
  const active = { active: true };

  function callback(error, result) {
    if (error) next(error);
    next(null, result);
  }
  switch (fetch) {
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
