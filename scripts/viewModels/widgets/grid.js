window.Widget = window.Widget || {};

(function(ns){
    ns.Grid = function(text){
        var self = this;
        self.childWidget = [];

        var getChildWidgetRenders = function(){
            var rowOutput = [];

            self.childWidget.foreach(function(row){
                var colOutput = [];
                row.foreach(function(widget){
                    colOutput.push(widget.render());
                });
                rowOutput.push(colOutput);
            });
            return rowOutput;
        };

        var getMaxWidths = function(rows){
            var widths = [];
            rows.forEach(function(row){
                for(var x = 0; x< row.length; x++) {
                    var widget = row[x][0];
                    if(!widths[x])
                        widths[x] = widget.length;
                    else
                        if(widths[x] < widget.length)
                            widths[x] = widget.length;
                }
            })
            return widths;
        };

        var getRowBorderFromWidths = function(widths){
            var border = '';
            for(var i = 0; i< widths.length; i++) {
                if(i>0)
                    border+='+';
                border+=''.pad(widths[i],'-',2);
            }
            return border;
        };

        self.render = function(){
            var output = [];
            var widgetOutputs = getChildWidgetRenders();
            var colWidths = getMaxWidths(widgetOutputs);
            var rowSeparator = getRowBorderFromWidths(colWidths);
            var x = 0;
            widgetOutputs.foreach(function(row){
                var rowOutput = '';
                for(var y = 0; y<row.length; y++){
                    var item = row[y][0];
                    if(item.length < colWidths[y]){
                        item = item.pad(colWidths[y], ' ', 2);
                    }
                    if(y>0)
                        rowOutput+='|';
                    rowOutput += item;
                }
                if(x>0)
                    output.push(rowSeparator);
                output.push(rowOutput);
                x++;
            });
            return output;
        };

        self.addWidget = function(widget, row, col){
            if(!Array.isArray(self.childWidget[row]))
                self.childWidget[row] = [];
            self.childWidget[row][col] = widget;
        };

        return self;
    };
    ns.Grid.prototype = new ns.Base();
})(window.Widget);