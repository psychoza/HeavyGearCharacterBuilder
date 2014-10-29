(function(cb) {
    cb.Character = function() {
        var self = this;

        self.uuid = UUID.generate();

        /* Descriptions */
        self.characterName = ko.observable('');
        self.characterProfession = ko.observable('');
        self.characterRank = ko.observable('');
        self.characterNationality = ko.observable('');
        self.characterUnit = ko.observable('');
        self.characterExperience = ko.observable(0);

        /* Attributes */
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
        self.skills = ko.observableArray();

        /* Secondary Traits */
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
        self.secondaryTraitArmedDamage = ko.computed({
            read: function() {
                var meleeSkill = self.skills().where(function (data) { return data.name.toLowerCase().trim() === "melee"; }).firstOrNull();
                var meleeSkillLevel = meleeSkill === null ? 0 : parseInt(meleeSkill.level());
                var value = (3 + meleeSkillLevel + parseInt(self.attributeBuild()) + parseInt(self.secondaryTraitStrength()));

                if (value < 1)
                    return 1;
                else
                    return value;
            }
        });

        /* Physical Status */
        self.injuryThresholdFlesh = ko.computed({
            read: function() {                
                return Math.round(self.secondaryTraitStamina() / 2);
            }
        });
        self.injuryCountFlesh = ko.observable(0);
        self.injuryThresholdDeep = ko.computed({
            read: function() {                
                return self.secondaryTraitStamina();
            }
        });
        self.injuryCountDeep = ko.observable(0);
        self.injuryThresholdInstant = ko.computed({
            read: function() {                
                return self.secondaryTraitStamina() * 2;
            }
        });
        self.systemShockThreshold = ko.computed({
            read: function() {                            
                var value = (5 + parseInt(self.secondaryTraitHealth()));

                if (value < 1)
                    return 1;
                else
                    return value;
            }
        });

        /* Movement Speed */
        self.movementSpeedSprint = ko.computed({
            read: function() {
                var athleticsSkill = self.skills().where(function (data) { return data.name.toLowerCase().trim() === "athletics"; }).firstOrNull();
                var athleticsSkillLevel = athleticsSkill === null ? 0 : parseInt(athleticsSkill.level());
                var value = (25 + (5 * (athleticsSkillLevel + parseInt(self.attributeFitness())) ));
                return value;
            }
        });
        self.movementSpeedRun = ko.computed({
            read: function() {                
                return Math.round(self.movementSpeedSprint() * 0.6666666);
            }
        });
        self.movementSpeedJog = ko.computed({
            read: function() {                
                return Math.round(self.movementSpeedSprint() * 0.5);
            }
        });
        self.movementSpeedWalk = ko.computed({
            read: function() {                
                return Math.round(self.movementSpeedSprint() * 0.3333333);
            }
        });

        /* Character Functions */
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
            $("#inputSkillName")[0].value = "";
            $("#inputLevel")[0].value = "";
            //self.attributeSelector($("#inputAttribute")[0].selectedOptions[0].value);
            //$("#inputComplex")[0].checked;
        };

        self.removeSkill = function(incomingSkill){
            var i = self.skills.indexOf(incomingSkill);
            if(i != -1) {
                self.skills.splice(i, 1);
            }            
        };

        self.loadFromData = function(data)
        {
            if(data.uuid) self.uuid = data.uuid;
            if(data.name) self.characterName(data.name);
            if(data.experience) self.characterExperience(data.experience);
            if(data.profession) self.characterProfession(data.profession);
            if(data.rank) self.characterRank(data.rank);
            if(data.nationality) self.characterNationality(data.nationality);
            if(data.unit) self.characterUnit(data.unit);
            if(data.agility) self.attributeAgility(data.agility);
            if(data.appearance) self.attributeAppearance(data.appearance);
            if(data.build) self.attributeBuild(data.build);
            if(data.creativity) self.attributeCreativity(data.creativity);
            if(data.fitness) self.attributeFitness(data.fitness);
            if(data.influence) self.attributeInfluence(data.influence);
            if(data.knowledge) self.attributeKnowledge(data.knowledge);
            if(data.perception) self.attributePerception(data.perception);
            if(data.psyche) self.attributePsyche(data.psyche);
            if(data.willpower) self.attributeWillpower(data.willpower);
            if(Array.isArray(data.skills))
                data.skills.forEach(function(skill){
                    self.skills.push(new skillObject(skill.name, skill.level, skill.attribute, skill.isComplex));
                });

        }

        self.getModelData = function()
        {
            var modelSkills = [];
            self.skills().forEach(function(skill){
                modelSkills.push({name: skill.name, level: skill.level(), attribute: skill.bonus, isComplex: skill.isComplex});
            });
            self.skills
            var modelData = {
                uuid: self.uuid,
                name: self.characterName(),
                experience: self.characterExperience(),
                profession: self.characterProfession(),
                rank: self.characterRank(),
                nationality: self.characterNationality(),
                unit: self.characterUnit(),
                agility: self.attributeAgility(),
                appearance: self.attributeAppearance(),
                build: self.attributeBuild(),
                creativity: self.attributeCreativity(),
                fitness: self.attributeFitness(),
                influence: self.attributeInfluence(),
                knowledge: self.attributeKnowledge(),
                perception: self.attributePerception(),
                psyche: self.attributePsyche(),
                willpower: self.attributeWillpower(),
                skills: modelSkills
            };
            return modelData;
        }

        self.saveToLocalStorage = function(){
            LocalStorage.saveCharacter(self.getModelData());
        };

        self.loadFromLocalStorage = function(uuid){
            self.loadFromData(LocalStorage.getCharacter(uuid));
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