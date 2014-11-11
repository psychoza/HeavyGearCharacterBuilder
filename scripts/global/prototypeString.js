String.prototype.ltrim = function () {
    return this.replace(String.ltrimRegex, '');
}
String.prototype.rtrim = function () {
    return this.replace(String.rtrimRegex, '');
}
String.prototype.trim = function() {
    return this.ltrim().rtrim();
};
String.prototype.pad = function(length, character, direction) {
	var self = this;
	var STR_PAD_LEFT = 1;
	var STR_PAD_RIGHT = 2;
	var STR_PAD_BOTH = 3;
    if (typeof(length) == "undefined") { var length = 0; }
    if (typeof(character) == "undefined") { var character = ' '; }
    if (typeof(direction) == "undefined") { var direction = STR_PAD_RIGHT; }

    if (length + 1 >= self.length) {
        switch (direction){
            case STR_PAD_LEFT:
                self = Array(length + 1 - self.length).join(character) + self;
            	break;
            case STR_PAD_BOTH:
                var right = Math.ceil((padlen = length - self.length) / 2);
                var left = padlen - right;
                self = Array(left+1).join(character) + self + Array(right+1).join(character);
            	break;
            default:
                self = self + Array(length + 1 - self.length).join(character);
            	break;
        }
    }
    return self;
};