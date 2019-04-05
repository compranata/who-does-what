// ./controllers/db-metas.js
const {
  Icon,
  Unit,
  Entity,
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
    case 'icons':
      return Icon.find(active, callback);
    case 'units':
      return Unit.find(active, callback);
    case 'entity':
      return Entity.find(active, callback);
    case 'tag':
      return Tag.find(active, callback);
    default:
      return false;
  }
};
