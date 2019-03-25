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
exports.Wdw = mongoose.model('Wdw', WdwSchema);
