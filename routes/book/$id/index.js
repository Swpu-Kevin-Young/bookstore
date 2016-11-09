
var Book = require(process.cwd() + "/lib").Book
var Chapter = require(process.cwd() + "/lib").Chapter
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin

//得到单本书
exports.get = [checkNotLogin, function (req, res, next) {
    var user = req.session._user
    var book_id = req.params.id
    var opt = {user: user}
    Book.fetchById(book_id)
        .then(function(book) {
            opt.book = book
            return Chapter.fetchByBook(book_id)
        })
        .then(function(data) {
            opt.chapters = data.reverse()
            res.status(200).render("book/content", opt)
        })
        .catch(function(err) {
            console.log(err)
            next(err)
        })
}]



//删除书籍
exports.delete = function (req, res) {
    var user = req.session._user
    var info = {
        authorId : user && user._id,
        _id : req.params.id
    }
    Book.removeBook(info)
        .then(function(result) {
            res.status(200).json(null)
        })
        .catch(function(err) {
            console.log(err)
            res.status(204).json(null)
        })
}