module.exports = app => {
    const clientslogs = require("../controllers/clientslogs.controller.js");

    var router = require("express").Router();

    // Create a new clientslogs
    router.post("/", clientslogs.createclientslogs);

    // Retrieve all clientslogs
    router.get("/", clientslogs.findAllclientslogs);


    // Retrieve a single clientslogs with id
    router.post("/findoneclientslogs", clientslogs.findOneclientslog);

    // Retrieve all clientslogs with store id
    router.post("/findclientslogsforstoreid", clientslogs.findclientslogsforstoreid);

    // Retrieve all clientslogs with store storeId and timerange
    router.post("/findclientslogsforstoreidandtimerange", clientslogs.findclientslogsforstoreidandtimerange);


    // Retrieve all clientslogs with store storeId and timerange
    router.post("/findclientslogsfortimerange", clientslogs.findclientslogsfortimerange);





    app.use('/api/clientslogs', router);
};