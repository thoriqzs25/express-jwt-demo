const db = require("../models");

const Item = db.item;

exports.getAll = (req, res) => {
  Item.find().exec((err, itemList) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    let arr = [];
    for (let item of itemList) {
      arr.push({
        _id: item._id,
        item_name: item.item_name,
        price: item.price,
        stock: item.stock,
      });
    }

    res.status(200).send({
      data: arr,
      total_data: itemList.length,
    });
  });
};

exports.insertItem = (req, res) => {
  const item = new Item({
    item_name: req.body.item_name,
    price: req.body.price,
    stock: req.body.stock,
  });

  item.save((err, item) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (item) {
      res.send({ message: "Item was registered succesfully!" });
    }
  });
};
