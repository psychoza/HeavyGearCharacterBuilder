window.Widget = window.Widget || {};

(function(ns){
    ns.Grid = function(text){
        var self = this;
        self.childWidget = [];

        self.render = function(){
            var output = [];
            for(var y = 0; y< self.childWidget.length; y++)
            {
                var rowOutput = '';
                for(var x=0; x<self.childWidget[y].length; x++)
                {
                    if(x>0)
                        rowOutput+='|'
                    rowOutput+=self.childWidget[y][x].render();
                }
                if(y>0)
                {
                    var borderOutput = '';
                    for(var x=0; x<self.childWidget[y].length; x++)
                    {
                        if(x>0)
                            borderOutput+='+'
                        for(var dash=0; dash<(self.childWidget[y][x].render()).length; dash++);
                            borderOutput+='-';
                    }
                    output.push(borderOutput);
                }
                output.push(rowOutput);
            }
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