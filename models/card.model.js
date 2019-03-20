const mongoose = require('mongoose');

const LABELS = ['Learning Unit', 'Lab', 'Example', 'Extra', 'Kata'];

const cardSchema = new mongoose.Schema({
  
  position : {
    type: Number,                
    required: true,
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  label: {
    type: String,
    enum: LABELS
  },
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
    required: true
  }
}, {timestamps: true,
  toJSON: {
    transform: (doc, ret) => {  //ret es de return
      ret.id = doc._id;
      delete ret._id;  //esto es para borrar campos que no quiero mostrar
      delete ret.__v;
      return ret;
    }
  }
})

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;