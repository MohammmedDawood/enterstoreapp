const mongoose = require('mongoose');

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
        // max: [0, 'Store is full'],
    },
    maxclients: {
        type: Number,
        // min: [0, 'Store is empty'],
        max: [50, 'Store is full'],
    },
    allowedtoenter: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});


// storesModel.pre('findOneAndUpdate', async function () {
//     const docToUpdate = await this.model.findOne(this.getQuery())
//     console.log(docToUpdate); // The document that `findOneAndUpdate()` will modify

//     console.log(this._update);
//     // console.log(docToUpdate.maxclients > this._update.clients);
//     // console.log(docToUpdate.maxclients == this._update.clients);
//     // console.log(docToUpdate.maxclients < this._update.clients);
//     if (docToUpdate.maxclients < this._update.clients) {
//         //   const newPassword = await hash(this._update.password, 10)

//         this._update.clients = docToUpdate.maxclients
//     }
// })

// storesModel.pre('findOneAndUpdate', async function () {
//     const docToUpdate = await this.model.findOne(this.getQuery());
//     console.log(docToUpdate); // The document that `findOneAndUpdate()` will modify

//     // if (docToUpdate.maxclients >= docToUpdate.clients) {
//     //     docToUpdate.allowedtoenter = true;
//     //     return true;
//     // } else {
//     //     docToUpdate.allowedtoenter = false;
//     //     return false;
//     // }
//     console.log(docToUpdate.maxclients > docToUpdate.clients);
//     console.log(docToUpdate.maxclients == docToUpdate.clients);
//     console.log(docToUpdate.maxclients < docToUpdate.clients);
//     if (docToUpdate.maxclients > docToUpdate.clients) {
//         docToUpdate.allowedtoenter = true;
//         return true;
//     } else if (docToUpdate.maxclients == docToUpdate.clients) {
//         docToUpdate.allowedtoenter = false;
//         return true;
//     } else if (docToUpdate.maxclients < docToUpdate.clients) {
//         docToUpdate.allowedtoenter = false;
//         return false;
//     }

// });


storesModel.path('clients').validate(function (value) {
    // When running in `validate()` or `validateSync()`, the
    // validator can access the document using `this`.
    // Does **not** work with update validators.

    // console.log(value);
    // console.log(this.clients);
    // console.log(this.maxclients);

    if (this.maxclients > value) {
        this.allowedtoenter = this.maxclients > value;
        return true;
    } else if (this.maxclients == value) {
        this.allowedtoenter = false;
        return true;
    } else {
        this.allowedtoenter = false;
        return false;
    }



});

// module.exports = mongoose.model('Stores', storesModel);

module.exports = mongoose => {
    const Stores = mongoose.model('Stores', storesModel);
    return Stores;
};