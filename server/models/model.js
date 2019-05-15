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
    type: Schema.Types.ObjectId,
    ref: 'Entity',
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
    type: Schema.Types.ObjectId,
    ref: 'Unit',
  },
  publish: Boolean,
  imageUrl: String,
  creatorId: String,
}, { timestamps: true });


const EntitySchema = new Schema({
  name: String,
  address: String,
  country: String,
  phone: String,
  active: Boolean,
}, { timestamps: true });

const UnitSchema = new Schema({
  name: String,
  branding: String,
  active: Boolean,
}, { timestamps: true });

const LeadSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  user_id: String,
  active: Boolean,
}, { timestamps: true });

const IconSchema = new Schema({
  provider: String,
  mdi: String,
  active: Boolean,
}, { timestamps: true });

const TagSchema = new Schema({
  name: String,
  group: String,
  label: String,
  active: Boolean,
}, { timestamps: true });

exports.Entity = mongoose.model('Entity', EntitySchema);
exports.Unit = mongoose.model('Unit', UnitSchema);
exports.Lead = mongoose.model('Lead', LeadSchema);
exports.Icon = mongoose.model('Icon', IconSchema);
exports.Tag = mongoose.model('Tag', TagSchema);
exports.Wdw = mongoose.model('Wdw', WdwSchema);
