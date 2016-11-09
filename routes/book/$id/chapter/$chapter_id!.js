var Book = require(process.cwd() + "/lib").Book
var Chapter = require(process.cwd() + "/lib").Chapter
var checkNotLogin = require(process.cwd() + "/validate").checkNotLogin

//获取章节内容
exports.get = [checkNotLogin, function (req, res, next) {
    Chapter.fetchOne({
      bookId: req.params.id,
      title: req.query.title
    })
    .then(function(chapter) {
      res.status(200).render("book/chapter", {chapter: chapter})
    })
    .catch(function(err) {
      consol.log(err)
      next(err)
    })
}]

//添加章节
exports.post = [checkNotLogin, function (req, res) {
    var user=req.session._user
    var data = req.body
    data.bookId = req.params.id
    Chapter.addChapter(data)
        .then(function(data) {
            res.status(200).json(user)
        })
        .catch(function(err) {
            console.log(err)
            next(err)
        })
}]
