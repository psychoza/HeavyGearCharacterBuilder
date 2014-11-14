window.Widget = window.Widget || {};

(function(ns){
    ns.HorizontalContainer = function(options){
        var self = this;
        options = options || {};
        var minLeftWidth = options.minLeftWidth || 0;
        var minRightWidth = options.minRightWidth || 0;
        self.childWidget = [];

        self.render = function(){
            var output = [];
            var leftWidget = self.childWidget[0];
            var rightWidget = self.childWidget[1];

            if(!leftWidget)
                leftWidget = new Widget.Text('?');
            if(!rightWidget)
                leftWidget = new Widget.Text('?');

            var leftWidgetOutput = leftWidget.render();
            var rightWidgetOutput = rightWidget.render();

            var leftHeight = leftWidgetOutput.length;
            var leftWidth = leftWidgetOutput.max(function(row){ return row.length; }).length;
            if(leftWidth < minLeftWidth) leftWidth = minLeftWidth;
            var rightHeight = rightWidgetOutput.length;
            var rightWidth = rightWidgetOutput.max(function(row){ return row.length; }).length;
            if(rightWidth < minRightWidth) rightWidth = minRightWidth;
            var totalHeight = leftHeight >=rightHeight ? leftHeight : rightHeight;

            for(var y = 0; y<totalHeight; y++) {
                var leftRow = leftWidgetOutput[y] || '';
                leftRow = leftRow.pad(leftWidth,' ', 2);
                var rightRow = rightWidgetOutput[y] || '';
                rightRow = rightRow.pad(rightWidth,' ', 2);
                output.push(leftRow+' '+rightRow);
            }

            return output;
        };

        self.addLeftWidget = function(widget){
            self.childWidget[0]=widget;
            return widget;
        };

        self.addRightWidget = function(widget){
            self.childWidget[1]=widget;
            return widget;
        };

        self.addWidget = function(widget){
            if(self.childWidget.length==0)
                self.addLeftWidget(widget);
            else
                self.addRightWidget(widget);
            return widget;
        };

        return self;
    };
    ns.HorizontalContainer.prototype = new ns.Base();
})(window.Widget);