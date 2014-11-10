window.Widget = window.Widget || {};

(function(ns){
    ns.Border = function(){
        var self = this;

        self.childWidget = new ns.Text('?');

        self.render = function(){
            var childRows = [];
            var borderRows = [];
            if(self.childWidget)
                childRows = self.childWidget.render();
            var childWidth = self.getWidth(childRows);

            var topBorder = '';
            topBorder+="/";
            for(var i=0; i<childWidth; i++)
                topBorder+="-";
            topBorder+="\\";
            borderRows.push(topBorder);

            childRows.foreach(function(childRow){
                //border+="|"+childText+"|";
                var midBorder = '|' + childRow;
                for(var i=0; i<(childWidth - childRow.length); i++)
                    midBorder+=" ";
                midBorder += "|";
                borderRows.push(midBorder);
            });

            var bottomBorder = '';
            bottomBorder+="\\";
            for(var i=0; i<childWidth; i++)
                bottomBorder+="-";
            bottomBorder+="/";
            borderRows.push(bottomBorder);

            return borderRows;
        };
    };
    ns.Border.prototype = new ns.Base();
})(window.Widget);