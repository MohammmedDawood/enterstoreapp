const db = require("../models");
const Clientslogs = db.clientslogs;

// Create and Save a new Store

exports.createclientslogs = (req, res) => {

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });

        return;
    }



    // Create a Clientslog
    var clientlog = new Clientslogs({
        name: req.body.name,
        category: req.body.category,
        numberofclients: req.body.numberofclients,
        statusInOrOut: req.body.status,
        storeId: req.body.storeId
    });
    // console.log(clientlog)

    // Save clientlog in the database
    clientlog
        .save(clientlog)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Clientslogs."
            });
        });

};


// Retrieve all Clientslogs from the database.
exports.findAllclientslogs = (req, res) => {

    // const name = req.query.name;
    // var condition = name ? {
    //     name: {
    //         $regex: new RegExp(name),
    //         $options: "i"
    //     }
    // } : {};
    var condition = {};

    Clientslogs.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving clientslogs."
            });
        });
};


// Find a single Clients Log with an id in request body
exports.findOneclientslog = (req, res) => {
    const id = req.body.id;

    Clientslogs.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found Clientslogs with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving Clientslogs with id=" + id
                });
        });
};


// Retrieve all clientslogs with store storeId
exports.findclientslogsforstoreid = (req, res) => {
    const id = req.body.storeId;
    const query = {
        storeId: req.body.storeId
    };

    Clientslogs.find(query)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not found Clientslogs with id " + id
                });
            } else if (data.length == 0) {
                res.status(404).send({
                    message: "Not found Clientslogs with id " + id
                });
            } else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving Clientslogs with id=" + id
                });
        });
};


// Retrieve all clientslogs with store storeId and timerange
exports.findclientslogsforstoreidandtimerange = (req, res) => {
    const id = req.body.storeId;
    var query = {
        storeId: id,
        // createdAt: dateRangeObject
        // createdAt: new Date('2021-05-09T05:35:45.460+00:00')
    };
    var dateRangeObject = {}
    if (req.body.dateFrom.length > 5) {

        const dateFrom = req.body.dateFrom;
        dateRangeObject.$gte = new Date(dateFrom);
    }
    if (req.body.dateTo.length > 5) {

        const dateTo = req.body.dateTo;
        dateRangeObject.$lte = new Date(dateTo);

    }

    if (Object.keys(dateRangeObject).length > 0) {
        query.createdAt = dateRangeObject;
    }


    // console.log(query);
    // console.log(dateRangeObject);
    Clientslogs.aggregate([{
                $match: query
            },
            {
                $group: {
                    // _id: "$statusInOrOut",


                    _id: {
                        "date": {
                            $dateToString: {
                                format: "%Y-%m-%d-%H",
                                // format: "%Y-%m-%d",
                                date: "$createdAt"
                            }
                        },
                        "statusInOrOut": "$statusInOrOut",


                    },
                    count: {
                        $sum: "$numberofclients"
                    }
                }
            },
            {
                $sort: {
                    "date": -1
                }
            }
        ])
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not found Clientslogs with id " + id
                });
            } else if (data.length == 0) {
                res.status(404).send({
                    message: "Not found Clientslogs with id " + id
                });
            } else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving Clientslogs with id=" + id
                });
        });
};



// Retrieve all clientslogs with store storeId and timerange
exports.findclientslogsfortimerange = (req, res) => {
    var query = {
        statusInOrOut: true
    };
    var dateRangeObject = {}
    if (req.body.dateFrom.length > 5) {

        const dateFrom = req.body.dateFrom;
        dateRangeObject.$gte = new Date(dateFrom);
    }
    if (req.body.dateTo.length > 5) {

        const dateTo = req.body.dateTo;
        dateRangeObject.$lte = new Date(dateTo);

    }

    if (Object.keys(dateRangeObject).length > 0) {
        query.createdAt = dateRangeObject;
    }


    // console.log(query);
    // console.log(dateRangeObject);
    Clientslogs.aggregate([{
                $match: query
            },
            {
                $group: {
                    // _id: "$statusInOrOut",


                    _id: {
                        "date": {
                            $dateToString: {
                                format: "%Y-%m-%d-%H",
                                // format: "%Y-%m-%d",
                                date: "$createdAt"
                            }
                        },
                        "name": "$name",
                        "statusInOrOut": "$statusInOrOut",
                    },
                    count: {
                        $sum: "$numberofclients"
                    }
                }
            },
            {
                $sort: {
                    "date": -1
                }
            }
        ])
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not found Clientslogs within this time range "
                });
            } else if (data.length == 0) {
                res.status(404).send({
                    message: "Not found Clientslogs within this time range "
                });
            } else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving Clientslogs within this time range"
                });
        });
};