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

// getRequestByOwnerId///////////////////
const getRequestsByOwnerId = (req, res) => {
  const _id = req.params.id;
  Request.findOne({owner: _id})
    .then((request) => {
      if (!request) {
        return res.status(404).send("No requests found");
      }
      res.status(200).send(request);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};


const closeRequest = async (req, res) => {
  try {
      const _id = req.params.id;
      const request = await Request.findById(_id)
      if (!request) 
          return res.status(404).send({ msg: `No Request found with this id: ${_id}` });
      if(!request.progress === 'close')
          return res.status(400).send({ msg: 'this request is already closed'})
      if(!request.progress === 'open')
          return res.status(400).send({ msg: 'this request is still open'})
      request.progress = 'close';
      request.save()
      res.status(200).json({ request });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


// patchRequets/////////////////////
const patchRequets = async (req, res) => {
  try {
    const _id = req.params.id;
    const request = await Request.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!request) {
      return res.status(404).send("No request is found");
    }
    if(request.progress != "open") throw new Error(`Cannot edit, this request is already ${request.progress}`)

    res.status(200).send(request);
  } catch (error) {
    res.status(400).send(error.messaga);
  }
};

// deleteRequests///////////////////
const deleteRequests = async (req, res) => {
  try {
    const _id = req.params.id;
    const request = await Request.findByIdAndDelete(_id);
    if (!request) {
      return res.status(404).send("Unable to find request");
    }
    if(request.progress != "open") res.status(400).send(`Cannot delete, this request is already ${request.progress}`)

    res.status(200).send(request);
  } catch (e) {
    res.status(500).send(e.message);
  }
}


module.exports = { postRequests, getRequests, getRequestsByID, getRequestsByOwnerId, patchRequets, deleteRequests, closeRequest };
