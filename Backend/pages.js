exports.listPage = function(req, res) {
    res.render('listPage', {
        pageTitle: 'Create list'
    });
};
exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'Main page'
    });
};
exports.aboutPage = function(req, res) {
    res.render('aboutPage', {
        pageTitle: 'About us'
    });
};
exports.contactPage = function(req, res) {
    res.render('contactPage', {
        pageTitle: 'Contact us'
    });
};
exports.titlePage = function(req, res) {
    res.render('titlePage', {
        pageTitle: 'Create your list'
    });
};