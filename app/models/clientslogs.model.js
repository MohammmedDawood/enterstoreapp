const mongoose = require('mongoose');
// var ValidationError = mongoose.Error.ValidationError;
// var ValidatorError = mongoose.Error.ValidatorError;

const clientslogsModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why no store name?']
    },
    category: {
        type: String
    },
    numberofclients: {
        type: Number,
        default: 0,
        min: [0, 'Store is empty'],
        max: [200, 'Store is full'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    statusInOrOut: {
        type: Boolean,
        default: false
    },
    storeId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Stores'
        type: String,
    }

}, {
    timestamps: true
});



module.exports = mongoose => {
    const Clientslogs = mongoose.model('Clientslogs', clientslogsModel);
    return Clientslogs;
};

// clientslogsModel.pre('findOneAndUpdate', async function () {


//     const docToUpdate = await this.model.findOne(this.getQuery());

//     if (docToUpdate.clients + this._update.$inc.clients < 0) {
//         this._update.$set.clients = 0;
//         var error = new ValidationError(this);
//         return next(error);
//     }

//     if (docToUpdate.maxclients > docToUpdate.clients + this._update.$inc.clients) {


//         this._update.$set.allowedtoenter = true;
//         return true;

//     } else if (docToUpdate.maxclients == docToUpdate.clients + this._update.$inc.clients) {

//         this._update.$set.allowedtoenter = false;
//         return true;

//     } else if (docToUpdate.maxclients < docToUpdate.clients + this._update.$inc.clients) {

//         this._update.$inc.clients = 0;
//         var error = new ValidationError(this);
//         return next(error);

//     }

// });

// module.exports = mongoose.model('clientslogs', clientslogsModel);