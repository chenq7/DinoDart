const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Minion = require("../../models/Minion");
const validateMinionInput = require("../../validation/minion");

router.get("/", (req, res) => {
  Minion.find()
    .sort({ date: -1 })
    .then(minions => res.json(minions))
    .catch(err => res.status(404).json({ nominionsfound: "No minions found" }));
});

router.get("/:minion_id", (req, res) => {
  Minion.findById(req.params.id)
    .then(minon => res.json(minion))
    .catch(err =>
      res.status(404).json({ notminonfound: "No minion found with that ID" })
    );
});

router.get("/users/:user_id", (req, res) => {
  Minion.findByUserId(req.params.id)
    .then(minons => res.json(minions))
    .catch(err =>
      res.status(404).json({ notminonsfound: "No minion found with that ID" })
    );
});

router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
  ;
  const { errors, isValid } = validateMinionInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newMinion = new Minion({
    url: req.body.url,
    name: req.body.name,
    attack: req.body.attack,
    defense: req.body.defense,
    hp: req.body.hp,
    rarity: req.body.rarity,
    price: req.body.price,
    ability: req.body.ability,
    userId: req.body.userId
  });
  
  newMinion.save().then(minion => res.json(minion));
  }
);

router.delete("/:minion_id", (req, res) => {
  Minion.deleteOne({ _id: req.params.minion_id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;