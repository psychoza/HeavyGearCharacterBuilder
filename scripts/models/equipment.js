var Models = Models || {};
(function(){

    Models.Equipment = function(data){
        var self = this;
        data=data||{};

        self.name = data.name || '';
        self.type = data.type || null;
        self.mass = data.mass || 0;
        self.accuracy = data.accuracy || 0;
        self.damage = data.damage || 0;
        self.range = data.range || 0;
        self.ammoMax = data.ammoMax || 0;
        self.rateOfFire = data.rateOfFire || 0;
        self.armor = data.armor || 0;
        self.quantity = data.quantity || 0;

        return self;
    };

})();
