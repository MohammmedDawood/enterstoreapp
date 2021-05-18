const mongoose = require('mongoose');
var ValidationError = mongoose.Error.ValidationError;
// var ValidatorError = mongoose.Error.ValidatorError;

const storesModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no store name?']
    },
    category: {
        type: String
    },
    clients: {
        type: Number,
        default: 0,
        min: [0, 'Store is empty'],
        max: [200, 'Store is full'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    maxclients: {
        type: Number,
        min: [0, 'Store is empty'],
        max: [200, 'Store is full'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    allowedtoenter: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});




storesModel.pre('findOneAndUpdate', async function () {


    const docToUpdate = await this.model.findOne(this.getQuery());

    if (docToUpdate.clients + this._update.$inc.clients < 0) {
        this._update.$set.clients = 0;
        var error = new ValidationError(this);
        return next(error);
    }

    if (docToUpdate.maxclients > docToUpdate.clients + this._update.$inc.clients) {


        this._update.$set.allowedtoenter = true;
        return true;

    } else if (docToUpdate.maxclients == docToUpdate.clients + this._update.$inc.clients) {

        this._update.$set.allowedtoenter = false;
        return true;

    } else if (docToUpdate.maxclients < docToUpdate.clients + this._update.$inc.clients) {

        this._update.$inc.clients = 0;
        var error = new ValidationError(this);
        return next(error);

    }

});

// module.exports = mongoose.model('Stores', storesModel);

module.exports = mongoose => {
    const Stores = mongoose.model('Stores', storesModel);
    return Stores;
};