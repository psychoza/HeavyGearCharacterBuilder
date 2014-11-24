var Models = Models || {};
(function(){

    Models.PhysicalStatus = function(data){
        var self = this;
        data=data||{};

        self.injuryName = data.injuryName || '';
        self.score = data.score || 0;
        self.armor = data.armor || '0/0';
        self.penalty = data.penalty || '';

        return self;
    };

})();
