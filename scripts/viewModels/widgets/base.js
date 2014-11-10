window.Widget = window.Widget || {};

(function(ns){
    ns.Base = function(){
        var self = this;
    };
    var p = ns.Base.prototype;

    p.childWidget = null;

    p.render = function(){};

    p.addWidget = function(widget){
        this.childWidget = widget;
        return widget;
    };

    p.getWidth = function(rows){
        if(!Array.isArray(rows)) return;
        var width = 0;
        rows.foreach(function(row){
            width = row.length > width ? row.length : width;
        });
        return width;
    };

})(window.Widget);