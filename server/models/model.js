const mongoose = require('mongoose');

const { Schema } = mongoose;

const CardSchema = new Schema({
  name: String,
  // description: String,
  // phones: [{
  //   sensibility: String,
  //   phone: String,
  // }],
  // faxs: [{
  //   sensibility: String,
  //   fax: String,
  // }],
  mails: [{
    sensibility: String,
    mail: String,
  }],
  // sip: [{
  //   type: String,
  //   accountId: String,
  //   icon: String,
  // }],
  // hours: [{
  //   week: String,
  //   hour: String,
  // }],
  // entity: { type: Schema.Types.ObjectId, ref: 'Entities' },
  // lead: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  // tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
  // owner: [{ }],
  // publish: Boolean,
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
exports.Card = mongoose.model('Card', CardSchema);
