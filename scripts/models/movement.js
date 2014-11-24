var Models = Models || {};
(function(){

    Models.Movement = function(data){
        var self = this;
        data=data||{};

        self.name = data.name || '';
        self.speed = data.speed || 0;
        self.attackMod = data.attackMod || '0';
        self.defenseMod = data.defenseMod || '0';

        return self;
    };

})();
