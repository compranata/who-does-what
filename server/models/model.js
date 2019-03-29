const mongoose = require('mongoose');

const { Schema } = mongoose;

const WdwSchema = new Schema({
  name: String,
  description: String,
  phone: String,
  fax: String,
  mail: String,
  sip: { provider: String, mdi: String, account: String },
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
    mail: String,
    user_id: String,
  },
  tags: { type: String },
  unit: { name: String, branding: String },
  // owner: [{ }],
  publish: Boolean,
}, { timestamps: true });

const LeadSchema = new Schema({
  accountId: Number,
  name: String,
  phone: String,
  fax: String,
  mail: String,
  sip: [{
    type: String,
    number: String,
    icon: String,
  }],
}, { timestamps: true });

const EntitySchema = new Schema({
  office: String,
  description: String,
  address: String,
  phone: String,
}, { timestamps: true });

const TagSchema = new Schema({
  type: String,
  group: String,
  tag: String,
  remarks: String,
}, { timestamps: true });

exports.Lead = mongoose.model('Lead', LeadSchema);
exports.Entity = mongoose.model('Entity', EntitySchema);
exports.Tag = mongoose.model('Tag', TagSchema);
exports.Wdw = mongoose.model('Wdw', WdwSchema);
