var Product_List = require('./data/Product_List');

exports.getProductList = function(req, res) {
    res.send(Product_List);
};

