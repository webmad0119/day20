function aaa(req, res, next) {
    const data = this.data
    res.render(this.template, data)
}

exports.default = aaa