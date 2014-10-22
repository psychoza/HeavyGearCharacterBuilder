var Models = Models || {};
(function(){

    Models.Character = function(data){
        var self = this;
        data=data||{};

        self.name = ko.observable(data.name || '');
        self.experience = ko.observable(data.experience || '0');

        return self;
    };

})();
