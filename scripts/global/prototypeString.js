String.prototype.ltrim = function () {
    return this.replace(String.ltrimRegex, '');
}
String.prototype.rtrim = function () {
    return this.replace(String.rtrimRegex, '');
}
String.prototype.trim = function() {
    return this.ltrim().rtrim();
};
String.prototype.pad = function(string, length, character, direction) {
	var STR_PAD_LEFT = 1;
	var STR_PAD_RIGHT = 2;
	var STR_PAD_BOTH = 3;
    if (typeof(length) == "undefined") { var length = 0; }
    if (typeof(character) == "undefined") { var character = ' '; }
    if (typeof(direction) == "undefined") { var direction = STR_PAD_RIGHT; }

    if (length + 1 >= string.length) {
        switch (direction){
            case STR_PAD_LEFT:
                string = Array(length + 1 - string.length).join(character) + string;
            	break;
            case STR_PAD_BOTH:
                var right = Math.ceil((padlen = length - string.length) / 2);
                var left = padlen - right;
                string = Array(left+1).join(character) + string + Array(right+1).join(character);
            	break;
            default:
                string = string + Array(length + 1 - string.length).join(character);
            	break;
        }
    }
    return string;
}