var Export = (function(){
    var self = {};

    var canExportValue = ko.observable(null);
    self.isEnabled = ko.computed({read: function(){
        var canExport = canExportValue();

        if(canExport==null) {
            $.support.cors = true;
            canExport = false;
            canExportValue(canExport);
            $.ajax({
                type: 'GET',
                url: 'http://tageverything.org/za/server/isAlive.php',
                dataType: 'jsonp',
                contentType: 'application/json; charset=utf-8'
            })
                .done(function(data){canExportValue(true);})
                .fail(function(){
                    //Intentionally ignored.  This just means we cannot reach the API server
                });
            return false;
        }
        return canExport;
    }});

    return self;
})();
