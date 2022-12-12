const Store = require('../models/store');
const store = require('../models/store');



module.exports = {
    new: newStore,
    create,
    show,
    index,
};








function show(req, res) {
    console.log(req.user)
    console.log(req.session)

    Store.findById(req.params.id)
    .populate("items")
    .exec(function (error, storeDoc) {
        if (error) return res.send("Error locating the store.");
        console.log(storeDoc);
        res.render("stores/new", {
            name: "store name",
            store: storeDoc
        });
    });
}



function index(req, res) {

Store.find({}, function (error, storeDocs) {
    console.log(storeDocs);

    res.render("stores/new", { stores: storeDocs});
});

}

function create(req,res) {

    store.create(req.body, function (error, storeDoc) {
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