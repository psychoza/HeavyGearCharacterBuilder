window.Widget = window.Widget || {};

(function(ns){
    ns.Text = function(text){
        var self = this;

        self.render = function(){
            return [text];
        };

        self.addWidget = function(widget){
            throw "Can't add a widget to text widget.";
        };

        return self;
    };
    ns.Text.prototype = new ns.Base();
})(window.Widget);