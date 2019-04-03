const mongoose = require('mongoose');

const { Schema } = mongoose;

const WdwSchema = new Schema({
  name: String,
  description: String,
  phone: String,
  fax: String,
  email: String,
  sip: {
    _id: String,
    provider: String,
    mdi: String,
    account: String,
  },
  remark: String,
  entity: {
    _id: String,
    name: String,
    address: String,
    country: String,
    phone: String,
  },
  lead: {
    _id: String,
    name: String,
    phone: String,
    email: String,
    user_id: String,
  },
  tags: { type: String },
  unit: {
    _id: String,
    name: String,
    branding: String,
  },
  // owner: [{ }],
  publish: Boolean,
  imageUrl: String,
  creatorId: String,
}, { timestamps: true });

const UnitSchema = new Schema({
  name: String,
  branding: String,
}, { timestamps: true });

const IconSchema = new Schema({
  provider: String,
  mdi: String,
}, { timestamps: true });

const EntitySchema = new Schema({
  name: String,
  address: String,
  country: String,
  phone: String,
}, { timestamps: true });

const TagSchema = new Schema({
  name: String,
  group: String,
  label: String,
}, { timestamps: true });

exports.Unit = mongoose.model('Unit', UnitSchema);
exports.Icon = mongoose.model('Icon', IconSchema);
exports.Entity = mongoose.model('Entity', EntitySchema);
exports.Tag = mongoose.model('Tag', TagSchema);
exports.Wdw = mongoose.model('Wdw', WdwSchema);
