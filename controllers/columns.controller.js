const mongoose = require("mongoose");
const Column = require("../models/column.model");
const Card = require("../models/card.model");

module.exports.create = (req, res, next) => {
  const column = new Column(req.body);
  
  column.save()
    .then(column => res.status(201).json(column))
    .catch(err => next(err)); 
}

module.exports.list = (req, res, next) => {
  Column.find()
    .populate("cards")
    .then(columns => res.json(columns))
    .catch(next => next(err));
}

module.exports.get = (req, res, next) => {
  Column.findById(req.params.id)
    .populate("cards")  
    .then(column => {
      if (!column) {
        throw createError(404, "Column not found")
      } else {
        res.json(column);
      }
      })
    .catch(next => next(err));
}

module.exports.update = (req, res, next) => {
  Column.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(column => {
      if (!column) {
        throw createError(404, "Column not found")
      } else {
        res.json(column);
      }
    })
    .catch(next => next(err));
}

module.exports.delete = (req, res, next) => {
  Promise.all([
    Column.findByIdAndDelete(req.params.id),
    Card.deleteMany({column: req.params.id})
  ])
    .then((column, cards) => { 
      if (!column) {
        throw createError(404, "Column not found")
      } else {
        res.status(204).json(column);
      }
    })
    .catch(err => next(err));
};
