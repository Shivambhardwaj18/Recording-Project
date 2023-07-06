const recordDb = require("../model/route.model");

exports.createCallRecord = async (req, res) => {
  try {
    const {
      callDateFrom,
      callDateTo,
      phoneNumber,
      campaignId,
      agentId,
      volunteerNumber,
    } = req.body;

    console.log("Body", req.body);

    // Assuming voice recording file is uploaded and saved with Multer

    const callRecord = new recordDb({
      callDateFrom,
      callDateTo,
      phoneNumber,
      campaignId,
      agentId,
      volunteerNumber,
      voiceRecording: req.file.path, // Assuming Multer saves the file and provides the path
    });

    await callRecord.save();

    res.status(201).json({ message: "Call record created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating call record" });
  }
};

exports.getCallRecords = async (req, res) => {
  try {
    const {
      callDateFrom,
      callDateTo,
      phoneNumber,
      campaignId,
      agentId,
      volunteerNumber,
    } = req.query;

    const query = {};

    // if (callDateFrom) query.callDateFrom = { $gte: new Date(callDateFrom) };
    // if (callDateTo) query.callDateTo = { $lte: new Date(callDateTo) };
    if (callDateFrom) query.callDateFrom = new Date(callDateFrom);
    if (callDateTo) query.callDateTo = new Date(callDateTo);
    if (phoneNumber) query.phoneNumber = phoneNumber;
    if (campaignId) query.campaignId = campaignId;
    if (agentId) query.agentId = agentId;
    if (volunteerNumber) query.volunteerNumber = volunteerNumber;

    const callRecords = await recordDb.find(query);

    res.json(callRecords);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving call records" });
  }
};
