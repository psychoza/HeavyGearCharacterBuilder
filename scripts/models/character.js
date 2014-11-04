var Models = Models || {};
(function(){

    Models.Character = function(data){
        var self = this;
        data=data||{};

        self.name = data.name || '';
        self.experience = data.experience || '0';
        self.profession = data.profession || '';
        self.uuid = data.uuid || null;
        self.rank = data.rank || '';
        self.nationality = data.nationality || '';
        self.unit = data.unit || '';
        self.agility = data.agility || -1;
        self.appearance = data.appearance || -1;
        self.build = data.build || -1;
        self.creativity = data.creativity || -1;
        self.fitness = data.fitness || -1;
        self.influence = data.influence || -1;
        self.knowledge = data.knowledge || -1;
        self.perception = data.perception || -1;
        self.psyche = data.psyche || -1;
        self.willpower = data.willpower || -1;
        self.skills = [];
        self.equipment = [];
        if(Array.isArray(data.skills))
            data.skills.forEach(function(skill){ self.skills.push(new Models.Skill(skill)); });
        if(Array.isArray(data.equipment))
            data.equipment.forEach(function(item){self.equipment.push(new Models.Equipment(item)); });
        return self;
    };

})();
