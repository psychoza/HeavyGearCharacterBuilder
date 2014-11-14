window.Widget = window.Widget || {};

(function(ns){
    ns.VerticalContainer = function(options){
        var self = this;
        options = options || {};
        //var minWidth = options.minWidth || 0;
        self.childWidget = [];

        self.render = function(){
            var output = [];
            var topWidget = self.childWidget[0];
            var bottomWidget = self.childWidget[1];

            if(!topWidget)
                topWidget = new Widget.Text('?');
            if(!bottomWidget)
                topWidget = new Widget.Text('?');

            var topWidgetOutput = topWidget.render();
            var bottomWidgetOutput = bottomWidget.render();
            var topWidth = topWidgetOutput.max(function(row){ return row.length; }).length;
            var bottomWidth = bottomWidgetOutput.max(function(row){ return row.length; }).length;
            var containerWidth = topWidth >= bottomWidth ? topWidth : bottomWidth;

            topWidgetOutput.foreach(function(row){
                if(row.length < containerWidth)
                    row = row.pad(containerWidth, ' ', 2);
                output.push(row);
            });
            bottomWidgetOutput.foreach(function(row){
                if(row.length < containerWidth)
                    row = row.pad(containerWidth, ' ', 2);
                output.push(row);
            });

            return output;
        };

        self.addTopWidget = function(widget){
            self.childWidget[0]=widget;
            return widget;
        };

        self.addBottomWidget = function(widget){
            self.childWidget[1]=widget;
            return widget;
        };

        self.addWidget = function(widget){
            if(self.childWidget.length==0)
                self.addTopWidget(widget);
            else
                self.addBottomWidget(widget);
            return widget;
        };

        return self;
    };
    ns.VerticalContainer.prototype = new ns.Base();
})(window.Widget);