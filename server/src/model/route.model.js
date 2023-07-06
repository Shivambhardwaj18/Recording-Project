const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  callDateFrom: { type: Date, required: true },
  callDateTo: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  campaignId: { type: String, required: true },
  agentId: { type: String, required: true },
  volunteerNumber: { type: String, required: true },
  voiceRecording: { type: String, required: true },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
