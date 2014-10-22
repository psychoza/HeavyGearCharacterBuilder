(function(cb) {
    cb.Character = function() {
        var self = this;
        self.skills = ko.observableArray();

        self.characterName = ko.observable('');        
        self.characterExperience = ko.observable(0);
        self.attributeAgility = ko.observable(-1);
        self.attributeAppearance = ko.observable(-1);
        self.attributeBuild = ko.observable(-1);
        self.attributeCreativity = ko.observable(-1);
        self.attributeFitness = ko.observable(-1);
        self.attributeInfluence = ko.observable(-1);
        self.attributeKnowledge = ko.observable(-1);
        self.attributePerception = ko.observable(-1);
        self.attributePsyche = ko.observable(-1);
        self.attributeWillpower = ko.observable(-1);
        
        self.secondaryTraitStrength = ko.computed({
            read: function() { return Math.floor((parseInt(self.attributeBuild()) + parseInt(self.attributeFitness())) / 2 );}
        });
        self.secondaryTraitHealth = ko.computed({
            read: function() { return Math.floor((parseInt(self.attributeFitness()) + parseInt(self.attributePsyche()) + parseInt(self.attributeWillpower())) / 3 );}
        });
        self.secondaryTraitStamina = ko.computed({
            read: function() { 
                var value = (5 * (parseInt(self.attributeBuild()) + parseInt(self.secondaryTraitHealth())) + 25);

                if (value < 10)
                    return 10;
                else
                    return value;
            }            
        });
        self.secondaryTraitUnarmedDamage = ko.computed({
            read: function() {
                var handToHandSkill = self.skills().where(function (data) { return data.name.toLowerCase().trim() === "hand-to-hand"; }).firstOrNull();
                var handToHandSkillLevel = handToHandSkill === null ? 0 : parseInt(handToHandSkill.level());
                var value = (3 + handToHandSkillLevel + parseInt(self.attributeBuild()) + parseInt(self.secondaryTraitStrength()));

                if (value < 1)
                    return 1;
                else
                    return value;
            }            
        });

        self.incrementSkill = function(incomingSkill){            
            incomingSkill.level(parseInt(incomingSkill.level()) + 1);
        };

        self.decrementSkill = function(incomingSkill){
            incomingSkill.level(parseInt(incomingSkill.level()) - 1);
        };

        self.attributeSelector = function(attribute){
            switch(attribute) {
                case "agility":
                    return self.attributeAgility;
                    break;
                case "appearance":
                    return self.attributeAppearance;
                    break;
                case "build":
                    return self.attributeBuild;
                    break;
                case "creativity":
                    return self.attributeCreativity;
                    break;
                case "fitness":
                    return self.attributeFitness;
                    break;
                case "influence":
                    return self.attributeInfluence;
                    break;
                case "knowledge":
                    return self.attributeKnowledge;
                    break;
                case "perception":
                    return self.attributePerception;
                    break;
                case "psyche":
                    return self.attributePsyche;
                    break;
                case "willpower":
                    return self.attributeWillpower;
                    break;
            }
            return null;
        }

        self.insertSkill = function(){
            var skillName = $("#inputSkillName")[0].value;
            var level = $("#inputLevel")[0].value;
            var attribute = self.attributeSelector($("#inputAttribute")[0].selectedOptions[0].value);
            var isComplex = $("#inputComplex")[0].checked;

            self.skills.push(new skillObject(skillName, level, attribute, isComplex));
        };

        self.removeSkill = function(incomingSkill){
            var i = self.skills.indexOf(incomingSkill);
            if(i != -1) {
                self.skills.splice(i, 1);
            }            
        };

        return this;
    };
})(window.CharacterBuilder = window.CharacterBuilder || {});

var skillObject = function(incomingName, incomingLevel, affectingAttribute, isComplex) {
    var self = this;
    
    self.name = incomingName;
    self.level = ko.observable(incomingLevel);    
    self.bonus = affectingAttribute;
    self.isComplex = isComplex;

    return self;
}