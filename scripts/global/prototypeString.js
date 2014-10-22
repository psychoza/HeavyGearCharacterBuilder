String.prototype.ltrim = function () {
    return this.replace(String.ltrimRegex, '');
}
String.prototype.rtrim = function () {
    return this.replace(String.rtrimRegex, '');
}
String.prototype.trim = function() {
    return this.ltrim().rtrim();
};
