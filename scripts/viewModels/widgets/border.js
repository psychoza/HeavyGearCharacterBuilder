window.Widget = window.Widget || {};

(function(ns){
    ns.Border = function(options){
        var self = this;

        self.childWidget = new ns.Text('?');

        options = options || {};
        options.style = options.style || 'circle';
        options.left = options.left == undefined ? true : options.left;
        options.right = options.right == undefined ? true : options.right;
        options.bottom = options.bottom == undefined ? true : options.bottom;
        options.top = options.top == undefined ? true : options.top;

        var getTopLeftCorner = function(){
            if(options.style == 'circle') return '/';
            if(options.style == 'square') return '+';
            return '?';
        };
        var getTopRightCorner = function(){
            if(options.style == 'circle') return '\\';
            if(options.style == 'square') return '+';
            return '?';
        };
        var getBottomLeftCorner = getTopRightCorner;
        var getBottomRightCorner = getTopLeftCorner;

        self.render = function(){
            var borderRows = [];
            var childRows = self.childWidget.render();
            var childWidth = self.getWidth(childRows);

            if(options.top) {
                var topBorder = '';
                if(options.left) topBorder+=getTopLeftCorner();
                for(var i=0; i<childWidth; i++)
                    topBorder+="-";
                if(options.right) topBorder+=getTopRightCorner();
                borderRows.push(topBorder);
            }

            childRows.foreach(function(childRow){
                var midBorder = '';
                if(options.left) midBorder += '|'
                midBorder += childRow;
                for(var i=0; i<(childWidth - childRow.length); i++)
                    midBorder+=" ";
                if(options.right) midBorder += "|";
                borderRows.push(midBorder);
            });

            if(options.bottom) {
                var bottomBorder = '';
                if(options.left) bottomBorder+=getBottomLeftCorner();
                for(var i=0; i<childWidth; i++)
                    bottomBorder+="-";
                if(options.right) bottomBorder+=getBottomRightCorner();
                borderRows.push(bottomBorder);
            }

            return borderRows;
        };
    };
    ns.Border.prototype = new ns.Base();
})(window.Widget);