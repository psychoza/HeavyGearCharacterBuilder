var Models = Models || {};
(function(){

    Models.Skill = function(data){
        var self = this;
        data=data||{};

        self.name = data.name || '';
        self.level = data.level || 0;
        self.attribute = data.attribute || '';
        self.isComplex = data.isComplex || false;
        self.bonus = data.bonus || -1;

        return self;
    };

})();
