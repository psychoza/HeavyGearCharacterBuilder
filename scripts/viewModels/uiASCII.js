var conthunktor = function(Constructor) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {

        var Temp = function(){}, // temporary constructor
            inst, ret; // other vars

        // Give the Temp constructor the Constructor's prototype
        Temp.prototype = Constructor.prototype;

        // Create a new instance
        inst = new Temp;

        // Call the original Constructor with the temp
        // instance as its context (i.e. its 'this' value)
        ret = Constructor.apply(inst, args);

        // If an object has been returned then return it otherwise
        // return the original instance.
        // (consistent with behaviour of the new operator)
        return Object(ret) === ret ? ret : inst;
    }
}

var WidgetType = (function(){
    var self = {};
    var enumCounter = 0;

    self.horizontalCellPair = enumCounter++;
    self.verticalCellPair = enumCounter++;
    self.borderCell = enumCounter++;
    self.table = enumCounter++;
    self.text = enumCounter++;

    return self;
})();

var WidgetBorder = (function(){
    var widget = function(){
        var self = this;

        self.childWidget = null;

        self.render = function(){
            var childText = '';
            var border = '';
            if(self.childWidget)
                childText = self.childWidget.render();

            border+="/";
            for(var i=0; i<childText.length; i++)
                border+="-";
            border+="\\";
            border+="|"+childText+"|";
            border+="\\";
            for(var i=0; i<childText.length; i++)
                border+="-";
            border+="/";
            return border;
        };

        self.addWidget = function(widget){
            self.childWidget = widget;
            return widget;
        };

        return self;
    };
    return widget;
})();

var WidgetText = (function(){
    var widget = function(text){
        var self = this;

        self.render = function(){
            return text;
        };

        self.addWidget = function(widget){
            throw "Can't add a widget to text widget.";
        };

        return self;
    };
    return widget;
})();

var UIASCII = (function(){
    var vm = function(){
        var self = this;

        var widgets = [];

        self.addWidget = function(widget){
            widgets.push(widget);
            return widget;
        };

        self.render = function(){
            var str = '';
            widgets.foreach(function(w){
                str+= w.render()+'\n';
            });
            return str;
        };

    };
    return vm;
})();