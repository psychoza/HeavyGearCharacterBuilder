var GetQueryParams = (function(){
    var re = /[?&]?([^=]+)=([^&]*)/g;

    var self = function(url) {
        var qs = url.split('?')[1];
        if(!qs) return {};
        var params = {};
        var tokens;
        qs = qs.split("+").join(" ");

        while (tokens = re.exec(qs))
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);

        return params;
    };
    return self;
})();
