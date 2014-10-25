var Models = Models || {};
(function(){

    Models.Character = function(data){
        var self = this;
        data=data||{};

        self.name = data.name || '';
        self.experience = data.experience || '0';
        self.profession = data.profession || '';
        self.uuid = data.uuid || null;

        return self;
    };

})();
