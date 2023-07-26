const { Request } = require("../Models/mentorRequestModel");

// postRequests////////////////////////
const postRequests = (req, res) => {
  const request = new Request({ ...req.body, owner: req.user._id });
  request
    .save()
    .then((request) => {
      res.status(200).send(request);
    })
    .catch((e) => {
      res.status(400).send(e.message);
    });
};

// getRequests////////////////////////
const getRequests = (req, res) => {
  Request.find({})
    .then((request) => {
      if (!request) {
        return res.status(404).send("Unable to find user");
      }
      res.status(200).send(request);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

// getRequestByID///////////////////
const getRequestsByID = (req, res) => {
  const _id = req.params.id;
  Request.findById(_id)
    .then((request) => {
      if (!request) {
        return res.status(404).send("Unable to find user");
      }
      res.status(200).send(request);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};


// patchRequets/////////////////////
const patchRequets = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findOneAndUpdate({ _id: id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true });
    if (!request) {
      return res.status(404).send("No request is found");
    }
    if (request.progress != "open") throw new Error(`Cannot edit, this request is already ${request.progress}`)

    res.status(200).send(request);
  } catch (error) {
    res.status(400).send(error.messaga);
  }
};


// deleteRequests///////////////////
const deleteRequests = async (req, res) => {
  try {
    const _id = req.params.id;
    const request = await Request.findOneAndDelete(_id);
    if (!request) {
      return res.status(404).send("Unable to find request");
    }
    if (request.progress != "open") res.status(400).send(`Cannot delete, this request is already ${request.progress}`)

    res.status(200).send(request);
  } catch (e) {
    res.status(500).send(e.message);
  }
}


module.exports = { postRequests, getRequests, getRequestsByID, patchRequets, deleteRequests };
