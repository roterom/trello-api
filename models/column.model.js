const mongoose = require('mongoose');
const Card = require('../models/card.model');

const columnSchema = new mongoose.Schema({
  
  position : {
    type: Number,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  
}, {timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {  //ret es de return
        ret.id = doc._id;
        delete ret._id;  //esto es para borrar campos que no quiero mostrar
        delete ret.__v;
        return ret;
      }
    }
  })

columnSchema.virtual('cards', {
  ref: Card.modelName,
  localField: '_id',
  foreignField: 'column',
  options: { sort: { position: -1 } }
})


const Column= mongoose.model('Column', columnSchema);

module.exports = Column;