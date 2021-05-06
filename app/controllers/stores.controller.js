const db = require("../models");
const Stores = db.stores;

// Create and Save a new Store

exports.createstore = (req, res) => {

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });

        return;
    }

    // Create a Stores
    var store = new Stores({
        name: req.body.name,
        category: req.body.category,
        maxclients: req.body.maxclients
    });

    // Save Stores in the database
    store
        .save(store)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Stores."
            });
        });
};


// Retrieve all Stores from the database.
exports.findAllstores = (req, res) => {
    // const name = req.query.name;
    // var condition = name ? {
    //     name: {
    //         $regex: new RegExp(name),
    //         $options: "i"
    //     }
    // } : {};
    var condition = {};

    Stores.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving stores."
            });
        });
};

// Find all allowedtoenter Stores
exports.findAllallowedtoenter = (req, res) => {
    Stores.find({
            allowedtoenter: true
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving stores."
            });
        });
};

// Find a single Store with an id in request body
exports.findOnestore = (req, res) => {
    const id = req.body.id;

    Stores.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found Stores with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving Stores with id=" + id
                });
        });
};

// Update a Store by the id in the request to increment the number of clientsand check the maximum number
exports.enterstore = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.body.id;
    const numberofusers = req.body.numberofusers;

    Stores.findByIdAndUpdate(id, {
            $inc: {
                'clients': parseInt(numberofusers)
            }
        }, {
            useFindAndModify: false,
            new: true
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Stores with id=${id}. Maybe Stores was not found!`
                });
            } else {
                res.send({
                    message: "Stores was updated successfully."
                })
            };
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Stores with id=" + id
            });
        });
};


// Update a Store by the id in the request to increment the number of clients and check the maximum number
exports.exitstore = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.body.id;
    const numberofusers = req.body.numberofusers;
    // console.log(req.body);

    Stores.findByIdAndUpdate(id, {
            $inc: {
                'clients': -1 * parseInt(numberofusers)
            }
        }, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Stores with id=${id}. Maybe Stores was not found!`
                });
            } else res.send({
                message: "Stores was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Stores with id=" + id
            });
        });
};


// // Update a Store by the id in the request
// exports.update = (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Data to update can not be empty!"
//         });
//     }

//     const id = req.params.id;

//     Stores.findByIdAndUpdate(id, req.body, {
//             useFindAndModify: false
//         })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot update Stores with id=${id}. Maybe Stores was not found!`
//                 });
//             } else res.send({
//                 message: "Stores was updated successfully."
//             });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating Stores with id=" + id
//             });
//         });
// };


// // Delete a Store with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Stores.findByIdAndRemove(id)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot delete Stores with id=${id}. Maybe Stores was not found!`
//                 });
//             } else {
//                 res.send({
//                     message: "Stores was deleted successfully!"
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Stores with id=" + id
//             });
//         });
// };

// // Delete all Stores from the database.
// exports.deleteAll = (req, res) => {
//     Stores.deleteMany({})
//         .then(data => {
//             res.send({
//                 message: `${data.deletedCount} stores were deleted successfully!`
//             });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while removing all stores."
//             });
//         });
// };