const Store = require('../models/store');
const store = require('../models/store');
const items = require('../models/item');

module.exports = {
    create,
    delete: deleteItem
};


function deleteItem(req, res){
    Store.findOne({'items._id': req.params.id, 'items.user': req.user._id}, function(error, storeDoc){
        if(!storeDoc) return res.redirect('/stores');

        storeDoc.items.remove(req.params.id);

        storeDoc.save(function(error){
            if(error) return res.send('broken delete doc');
            res.redirect(`/stores/${storeDoc._id}`);
        });
    });
}


function create(req, res) {
    Store.findById(req.params.id, function(err, book) {
      // Update req.body to contain user info
      req.body.userId = req.user._id;
      req.body.userName = req.user.name;
      // Add the comment
      store.items.push(req.body);
      store.save(function(err) {
        res.redirect(`/stores/${store._id}`);
      });
    });
  }