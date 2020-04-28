var fs = require('fs');
var ejs = require('ejs');


exports.BuyList_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/BuyList_OneItem.ejs', "utf8"));
exports.BuyList_OneCategory = ejs.compile(fs.readFileSync('./Frontend/templates/BuyList_OneCategory.ejs', "utf8"));
exports.Note_Item = ejs.compile(fs.readFileSync('./Frontend/templates/Note_Item.ejs', "utf8"));
exports.Suggestion = ejs.compile(fs.readFileSync('./Frontend/templates/Suggestion.ejs', "utf8"));
exports.SuggestionItem = ejs.compile(fs.readFileSync('./Frontend/templates/SuggestionItem.ejs', "utf8"));
exports.Local_Item = ejs.compile(fs.readFileSync('./Frontend/templates/Local_Item.ejs', "utf8"));