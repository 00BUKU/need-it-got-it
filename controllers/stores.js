const Store = require('../models/store');
const store = require('../models/store');
const items = require('../models/item');



module.exports = {
    new: newStore,
    create,
    show,
    index,
    delete: deleteStore,
    update
};








function show(req, res) {
    console.log(req.user)
    console.log(req.session)

    Store.findById(req.params.id)
    .exec(function (error, storeDoc) {
        if (error) return res.send("Error locating the store.");
        console.log(storeDoc);

        res.render("stores/show", {
            name: "store name",
            store: storeDoc
        });
    });
}



function index(req, res) {

Store.find({}, function (error, storeDocs) {
    console.log(storeDocs);

    res.render("stores/index", { stores: storeDocs});
});

}

function create(req,res) {

    Store.create(req.body, function (error, storeDoc) {
        if (error) {
            return res.send("error creating, check terminal.");
        }
        console.log(storeDoc);

        res.redirect(`/stores/${storeDoc._id}`);
    });

}

function newStore(req,res) {
    res.render("stores/new");
  }


  function deleteStore(req, res) {
    Store.findOneAndDelete(
      {_id: req.params.id, userRecommending: req.user._id}, function(err) {
        res.redirect('/stores');
      }
    );
  }


  function update(req, res) {
    store.findOneAndUpdate(
      {_id: req.params.id, userRecommending: req.user._id},
      req.body,
      {new: true},
      function(err, store) {
        if (err || !store) return res.redirect('/stores');
        res.redirect(`/stores/${store._id}`);
      }
    );
  }