module.exports = app => {
    const stores = require("../controllers/stores.controller.js");

    var router = require("express").Router();

    // Create a new store
    router.post("/", stores.createstore);

    // Retrieve all stores
    router.get("/", stores.findAllstores);

    // Retrieve all allowedtoenter stores
    router.get("/allowedtoenter", stores.findAllallowedtoenter);

    // Retrieve a single store with id
    router.post("/findonestore", stores.findOnestore);

    // Update a store with id and increment clients with one
    router.put("/enterstore", stores.enterstore);

    // Update a store with id and decrement client with one
    router.put("/exitstore", stores.exitstore);


    // // Update a store with id
    // router.put("/:id", stores.update);

    // // Delete a store with id
    // router.delete("/:id", stores.delete);

    // // Create a new store
    // router.delete("/", stores.deleteAll);

    app.use('/api/stores', router);
};