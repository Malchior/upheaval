var API = function () {
    var self = this;
    this.extend = function (name, fn) {
        return self[name] = fn;
    }
};
