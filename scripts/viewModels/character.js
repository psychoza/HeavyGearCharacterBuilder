(function(cb) {
    cb.Character = function() {
        var self = this;

        self.versionNumber = ko.observable('v 1.0.5')
        self.uuid = UUID.generate();

        /* UI Needed Items */        
        self.inputSkillName = ko.observable('');
        self.inputLevel = ko.observable(0);
        self.inputAttributes = ko.observableArray(['Agility','Appearance','Build','Creativity','Fitness','Influence','Knowledge','Perception','Psyche','Willpower']);
        self.inputAttribute = ko.observable();
        self.inputComplex = ko.observable(false);        

        self.inputEquipmentName = ko.observable('');
        self.inputEquipmentMass = ko.observable(0);

        self.inputWeaponName = ko.observable('');
        self.inputWeaponMass = ko.observable(0);
        self.inputWeaponAccuracy = ko.observable(0);
        self.inputWeaponDamage = ko.observable(0);
        self.inputWeaponRange = ko.observable(0);
        self.inputWeaponAmmo = ko.observable(0);
        self.inputWeaponRateOfFire = ko.observable(0);
        self.inputWeaponRadius = ko.observable(0);

        self.inputArmorName = ko.observable('')
        self.inputArmorType = ko.observable('Armor');
        self.inputArmorMass = ko.observable(0);
        self.inputArmor = ko.observable(0);

        /* Descriptions */
        self.characterName = ko.observable('');
        self.characterProfession = ko.observable('');
        self.characterRank = ko.observable('');
        self.characterNationality = ko.observable('');
        self.characterUnit = ko.observable('');
        self.characterExperience = ko.observable(0);
        self.currency = ko.observable(0);
        self.currencyOnHand = ko.observable(0);
        self.emergencyDice = ko.observable(0);

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

        var calculateCharacterPoints = function(attribute){
            if (attribute < -1)
                return  ((parseInt(attribute) + 1) * (parseInt(attribute) + 1)) * (-1);
            else    
                return (parseInt(attribute) + 1) * (parseInt(attribute) + 1);
        };

        self.characterPoints = ko.computed({
            read: function(){
                var agility = calculateCharacterPoints(self.attributeAgility());
                var appearance = calculateCharacterPoints(self.attributeAppearance());
                var build = calculateCharacterPoints(self.attributeBuild());
                var creativity = calculateCharacterPoints(self.attributeCreativity());
                var fitness = calculateCharacterPoints(self.attributeFitness());
                var influence = calculateCharacterPoints(self.attributeInfluence());
                var knowledge = calculateCharacterPoints(self.attributeKnowledge());
                var perception = calculateCharacterPoints(self.attributePerception());
                var psyche = calculateCharacterPoints(self.attributePsyche());
                var willpower = calculateCharacterPoints(self.attributeWillpower());
                return agility + appearance + build + creativity + fitness + influence + knowledge + perception + psyche + willpower;                
            }
        });

        self.skills = ko.observableArray();

        var calculateSkillPoints = function(skill){
            var value = parseInt(skill.level()) * parseInt(skill.level());
            
            if (skill.isComplex)
                value = value * 2;

            return value;
        };

        self.skillPoints = ko.computed({
            read: function(){
                var total = 0;
                
                for (i = 0; i < self.skills().length; i++) { 
                   total += calculateSkillPoints(self.skills()[i]);
                }

                return total;
            }
        });

        self.equipment = ko.observableArray();
        self.weapons = ko.computed({
            read: function(){
                return self.equipment().where(function (data) { return data.type.toLowerCase().trim() === "weapon"; });
            }
        });
        self.armor = ko.computed({
            read: function(){
                return self.equipment().where(function (data) { return data.type.toLowerCase().trim() === "armor" || data.type.toLowerCase().trim() === "helmet"; });
            }
        });

        /* Secondary Traits */
        self.secondaryTraitStrength = ko.computed({
            read: function() { return Math.floor((parseInt(self.attributeBuild()) + parseInt(self.attributeFitness())) / 2 );}
        });
        self.secondaryTraitHealth = ko.computed({
            read: function() { return Math.round((parseInt(self.attributeFitness()) + parseInt(self.attributePsyche()) + parseInt(self.attributeWillpower())) / 3 );}
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
        self.armorRating = ko.computed({
            read: function() {                
                var armorArray = self.equipment().where(function (data) { return data.type.toLowerCase().trim() === "armor"; });
                armorArray.sort(function(left, right) { return parseInt(left.armor) == parseInt(right.armor) ? 0 : (parseInt(left.armor) > parseInt(right.armor) ? -1 : 1) });                
                if (armorArray.length > 0)
                    return armorArray[0].armor;
                else
                    return 0;
            }
        });
        self.helmetRating = ko.computed({
            read: function() {                            
                var helmetArray = self.equipment().where(function (data) { return data.type.toLowerCase().trim() === "helmet"; });
                helmetArray.sort(function(left, right) { return parseInt(left.armor) == parseInt(right.armor) ? 0 : (parseInt(left.armor) > parseInt(right.armor) ? -1 : 1) });                
                if (helmetArray.length > 0)
                    return helmetArray[0].armor;
                else
                    return 0;
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
            if(typeof(attribute)!="string") return;
            switch(attribute.toLowerCase()) {
                case "agility":
                    return self.attributeAgility();
                    break;
                case "appearance":
                    return self.attributeAppearance();
                    break;
                case "build":
                    return self.attributeBuild();
                    break;
                case "creativity":
                    return self.attributeCreativity();
                    break;
                case "fitness":
                    return self.attributeFitness();
                    break;
                case "influence":
                    return self.attributeInfluence();
                    break;
                case "knowledge":
                    return self.attributeKnowledge();
                    break;
                case "perception":
                    return self.attributePerception();
                    break;
                case "psyche":
                    return self.attributePsyche();
                    break;
                case "willpower":
                    return self.attributeWillpower();
                    break;
            }
            return null;
        }

        self.sortSkills = function() {
            self.skills.sort(function(left, right) { return left.name.toLowerCase() == right.name.toLowerCase() ? 0 : (left.name.toLowerCase() < right.name.toLowerCase() ? -1 : 1) });
        }

        self.insertSkill = function(){            
            self.skills.push(new skillObject(self.inputSkillName(), self.inputLevel(), self.inputAttribute(), self.inputComplex()));
            self.sortSkills();
            self.inputSkillName('');
            self.inputLevel(0);
            self.inputComplex(false);
        };

        self.removeSkill = function(incomingSkill){
            var i = self.skills.indexOf(incomingSkill);
            if(i != -1) {
                self.skills.splice(i, 1);
            }
            self.sortSkills();
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
                data.skills.foreach(function(skill){
                    self.skills.push(new skillObject(skill.name, skill.level, skill.attribute, skill.isComplex));
                });
            if(Array.isArray(data.equipment))
                data.equipment.foreach(function(equipment){
                    self.equipment.push(new equipmentObject(equipment.name, equipment.type, 
                        equipment.mass, equipment.accuracy, equipment.damage, equipment.range, 
                        equipment.ammoMax, equipment.rateOfFire, equipment.radius, equipment.armor, equipment.quantity));
                });
            if(data.currency) self.currency(data.currency);
            if(data.currencyOnHand) self.currencyOnHand(data.currencyOnHand);
            if(data.emergencyDice) self.emergencyDice(data.emergencyDice);
        }

        self.getModelData = function()
        {
            var modelSkills = [];
            self.skills().foreach(function(skill){
                modelSkills.push({name: skill.name, level: skill.level(), attribute: skill.bonus, isComplex: skill.isComplex, bonus: self.attributeSelector(skill.bonus)});
            });
            var modelEquipment = [];
            self.equipment().foreach(function(equipment){
                modelEquipment.push({name: equipment.name, type: equipment.type, mass: equipment.mass, 
                    accuracy: equipment.accuracy, damage: equipment.damage, range: equipment.range, ammoMax: equipment.ammoMax, 
                    rateOfFire: equipment.rateOfFire, radius: equipment.radius, armor: equipment.armor, quantity: equipment.quantity()});
            });
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
                skills: modelSkills,
                equipment: modelEquipment,
                currency: self.currency(),
                currencyOnHand: self.currencyOnHand(),
                emergencyDice: self.emergencyDice(),
                strength: self.secondaryTraitStrength(),
                health: self.secondaryTraitHealth(),
                stamina: self.secondaryTraitStamina(),
                unarmedDamage: self.secondaryTraitUnarmedDamage(),
                armedDamage: self.secondaryTraitArmedDamage()
            };
            return modelData;
        }

        self.saveToLocalStorage = function(){
            LocalStorage.saveCharacter(self.getModelData());
        };

        self.loadFromLocalStorage = function(uuid){
            self.loadFromData(LocalStorage.getCharacter(uuid));
        };

        self.sortEquipment = function() {
            self.equipment.sort(function(left, right) { return left.name.toLowerCase() == right.name.toLowerCase() ? 0 : (left.name.toLowerCase() < right.name.toLowerCase() ? -1 : 1) });
        }

        self.insertWeapon = function(){            
            self.equipment.push(new equipmentObject(self.inputWeaponName(), 'Weapon', self.inputWeaponMass(), self.inputWeaponAccuracy(),self.inputWeaponDamage(),self.inputWeaponRange(),self.inputWeaponAmmo(),self.inputWeaponRateOfFire(),self.inputWeaponRadius()));

            self.sortEquipment();
            self.inputWeaponName('');
            self.inputWeaponMass(0);
            self.inputWeaponAccuracy(0);
            self.inputWeaponDamage(0);
            self.inputWeaponRange(0);
            self.inputWeaponAmmo(0);
            self.inputWeaponRateOfFire(0);
            self.inputWeaponRadius(0);
        };

        self.insertArmor = function(){
            self.equipment.push(new equipmentObject(self.inputArmorName(), self.inputArmorType(), self.inputArmorMass(), 0, 0, 0, 0, 0, 0, self.inputArmor()));
            self.sortEquipment();
            self.inputArmorName('')
            self.inputArmorType('Armor');
            self.inputArmorMass(0);
            self.inputArmor(0);
        };

        self.insertEquipment = function(){            
            self.equipment.push(new equipmentObject(self.inputEquipmentName(), 'Other', self.inputEquipmentMass()));
            self.sortEquipment();
            self.inputEquipmentName('');
            self.inputEquipmentMass(0);
        };

        self.removeEquipment = function(incomingEquipment){
            var i = self.equipment.indexOf(incomingEquipment);
            if(i != -1) {
                self.equipment.splice(i, 1);
            }
            self.sortEquipment();
        };

        self.increaseQuantity = function(incomingEquipment){
            incomingEquipment.quantity(parseInt(incomingEquipment.quantity()) + 1);
        };

        self.decreaseQuantity = function(incomingEquipment){
            incomingEquipment.quantity(parseInt(incomingEquipment.quantity()) - 1);
        };

        self.debugme = function(){debugger;};

        self.exportToASCII = function(){
            var d = new Date();
            var dStr = d.getFullYear() + '-'+ d.getMonth() + '-' + d.getDay();
            Export.characterToEcho(self.getModelData(),self.characterName() +' '+ dStr +'.txt');
        };

        self.standardSkills = ko.observableArray([
            new skillObject("Acrobatics", 0, 'Agility', false),
            new skillObject("Aircraft Pilot", 0, 'Agility', true),
            new skillObject("Animal Handling", 0, 'creativity', false),
            new skillObject("Archery", 0, 'Agility', false),
            new skillObject("Athletics", 0, 'Fitness', false),
            new skillObject("Bureaucracy", 0, 'Knowledge', true),
            new skillObject("Business", 0, 'Knowledge', true),
            new skillObject("Camouflage", 0, 'Creativity', false),
            new skillObject("Combat Sense", 0, 'Perception', false),
            new skillObject("Communications", 0, 'Knowledge', true),
            new skillObject("Computer", 0, 'Knowledge', true),
            new skillObject("Cooking", 0, 'Creativity', false),
            new skillObject("Craft (jewelry)", 0, 'Creativity', false),
            new skillObject("Craft (metalwork)", 0, 'Creativity', false),
            new skillObject("Craft (woodcraft)", 0, 'Creativity', false),
            new skillObject("Craft (weaving)", 0, 'Creativity', false),
            new skillObject("Dance", 0, 'Agility', false),
            new skillObject("Demolition", 0, 'Knowledge', true),
            new skillObject("Disguise", 0, 'Creativity', false),
            new skillObject("Dodge", 0, 'Agility', false),
            new skillObject("Drive", 0, 'Agility', false),
            new skillObject("Earth Sciences", 0, 'Knowledge', true),
            new skillObject("Electronic Design", 0, 'Knowledge', true),
            new skillObject("Electronic Warfare", 0, 'Creativity', true),
            new skillObject("Electronics", 0, 'Knowledge', true),
            new skillObject("Etiquette", 0, 'Influence', false),
            new skillObject("First Aid", 0, 'Knowledge', false),
            new skillObject("Foreign Language ", 0, 'Knowledge', false),
            new skillObject("Forgery", 0, 'Creativity', true),
            new skillObject("Forward Observing", 0, 'Perception', false),
            new skillObject("G-Handling", 0, 'Fitness', false),
            new skillObject("Gambling", 0, 'Perception', false),
            new skillObject("Gunnery (air)", 0, 'Perception', true),
            new skillObject("Gunnery (ground)", 0, 'Perception', true),
            new skillObject("Gunnery (heavy gear)", 0, 'Perception', true),
            new skillObject("Gunnery (naval)", 0, 'Perception', true),
            new skillObject("Gunnery (space)", 0, 'Perception', true),
            new skillObject("Haggling", 0, 'Influence', false),
            new skillObject("Hand-to-Hand", 0, 'Agility', false),
            new skillObject("Heavy Gear Architecture", 0, 'Knowledge', true),
            new skillObject("Heavy Gear Pilot", 0, 'Agility', true),
            new skillObject("Heavy Weapons", 0, 'Agility', false),
            new skillObject("Human Perception", 0, 'Psyche', false),
            new skillObject("Interrogation", 0, 'Creativity', false),
            new skillObject("Intimidate", 0, 'Build', false),
            new skillObject("Investigation", 0, 'Perception', true),
            new skillObject("Law", 0, 'Knowledge', true),
            new skillObject("Leadership", 0, 'Influence', false),
            new skillObject("Life Sciences", 0, 'Knowledge', true),
            new skillObject("Literature", 0, 'Creativity', false),
            new skillObject("Mechanical Design", 0, 'Knowledge', true),
            new skillObject("Mechanics", 0, 'Knowledge', false),
            new skillObject("Medicine", 0, 'Knowledge', true),
            new skillObject("Melee", 0, 'Agility', false),
            new skillObject("Music", 0, 'Creativity', false),
            new skillObject("Naval Pilot", 0, 'Perception', true),
            new skillObject("Navigation (air)", 0, 'Knowledge', true),
            new skillObject("Navigation (land)", 0, 'Knowledge', true),
            new skillObject("Navigation (sea)", 0, 'Knowledge', true),
            new skillObject("Navigation (space)", 0, 'Knowledge', true),
            new skillObject("Notice", 0, 'Perception', false),
            new skillObject("Parachuting", 0, 'Agility', false),
            new skillObject("Physical Sciences", 0, 'Knowledge', true),
            new skillObject("Psychology", 0, 'Knowledge', true),
            new skillObject("Riding", 0, 'Agility', false),
            new skillObject("Security", 0, 'Knowledge', true),
            new skillObject("Sleight-of-Hand", 0, 'Agility', false),
            new skillObject("Small Arms", 0, 'Agility', false),
            new skillObject("Sniping", 0, 'Perception', false),
            new skillObject("Social Sciences", 0, 'Knowledge', true),
            new skillObject("Space Pilot", 0, 'Creativity', true),
            new skillObject("Stealth", 0, 'Agility', true),
            new skillObject("Streetwise", 0, 'Influence', false),
            new skillObject("Strider Pilot", 0, 'Agility', true),
            new skillObject("Survival", 0, 'Creativity', false),
            new skillObject("Swimming", 0, 'Fitness', false),
            new skillObject("Tactics", 0, 'Creativity', false),
            new skillObject("Teaching", 0, 'Creativity', false),
            new skillObject("Theatrics", 0, 'Influence', false),
            new skillObject("Throwing", 0, 'Agility', false),
            new skillObject("Tinker", 0, 'Creativity', true),
            new skillObject("Visual Art", 0, 'Creativity', false),
            new skillObject("Zero-G", 0, 'Agility', false)
        ]);

        self.skillsSuggestions = ko.observableArray([
            "Acrobatics",
            "Aircraft Pilot", 
            "Animal Handling", 
            "Archery", 
            "Athletics", 
            "Bureaucracy", 
            "Business", 
            "Camouflage", 
            "Combat Sense", 
            "Communications", 
            "Computer", 
            "Cooking", 
            "Craft (jewelry)", 
            "Craft (metalwork)", 
            "Craft (woodcraft)", 
            "Craft (weaving)", 
            "Dance", 
            "Demolition", 
            "Disguise", 
            "Dodge", 
            "Drive", 
            "Earth Sciences", 
            "Electronic Design", 
            "Electronic Warfare", 
            "Electronics", 
            "Etiquette", 
            "First Aid", 
            "Foreign Language ", 
            "Forgery", 
            "Forward Observing", 
            "G-Handling", 
            "Gambling", 
            "Gunnery (air)", 
            "Gunnery (ground)", 
            "Gunnery (heavy gear)", 
            "Gunnery (naval)", 
            "Gunnery (space)", 
            "Haggling", 
            "Hand-to-Hand", 
            "Heavy Gear Architecture", 
            "Heavy Gear Pilot", 
            "Heavy Weapons", 
            "Human Perception", 
            "Interrogation", 
            "Intimidate", 
            "Investigation", 
            "Law", 
            "Leadership", 
            "Life Sciences", 
            "Literature", 
            "Mechanical Design", 
            "Mechanics", 
            "Medicine", 
            "Melee", 
            "Music", 
            "Naval Pilot", 
            "Navigation (air)", 
            "Navigation (land)", 
            "Navigation (sea)", 
            "Navigation (space)", 
            "Notice", 
            "Parachuting", 
            "Physical Sciences", 
            "Psychology", 
            "Riding", 
            "Security", 
            "Sleight-of-Hand", 
            "Small Arms", 
            "Sniping", 
            "Social Sciences", 
            "Space Pilot", 
            "Stealth", 
            "Streetwise", 
            "Strider Pilot", 
            "Survival", 
            "Swimming", 
            "Tactics", 
            "Teaching", 
            "Theatrics", 
            "Throwing", 
            "Tinker", 
            "Visual Art", 
            "Zero-G"
        ]);

        self.selectedSuggestion = ko.observable(null);
        self.selectedSuggestion.subscribe(function () { 
            self.tesing(); 
        });

        self.tesing = function() {
            if (self.selectedSuggestion())
            {
                var skill = self.standardSkills().where(function (data) { return data.name.toLowerCase().trim() === self.selectedSuggestion().toLowerCase().trim(); });
                if (skill)
                {
                    self.inputSkillName(skill[0].name);
                    self.inputLevel(skill[0].level());
                    self.inputAttribute(skill[0].bonus);
                    self.inputComplex(skill[0].isComplex);
                }
            }
        }

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

var equipmentObject = function(incomingName, incomingType, incomingMass, incomingAccuracy, incomingDamage, incomingRange, incomingAmmoMax, incomingRateOfFire, incomingRadius, incomingArmor, incomingQuantity) {
    var self = this;
    
    self.name = incomingName;

    if(incomingType)
        self.type = incomingType;
    else
        self.type = 'Other';

    if(incomingMass)
        self.mass = incomingMass;
    else
        self.mass = 0;

    if(incomingAccuracy)
        self.accuracy = incomingAccuracy;
    else
        self.accuracy = 0;

    if(incomingDamage)
        self.damage = incomingDamage;
    else
        self.damage = 0;

    if(incomingRange)
        self.range = incomingRange;
    else
        self.range = 0;

    self.mediumRange = self.range * 2;
    self.longRange = self.mediumRange * 2;
    self.extremeRange = self.longRange * 2;

    if(incomingAmmoMax)
        self.ammoMax = incomingAmmoMax;
    else
        self.ammoMax = 0;

    if(incomingRateOfFire)
        self.rateOfFire = incomingRateOfFire;
    else
        self.rateOfFire = 0;

    if(incomingRadius)
        self.radius = incomingRadius;
    else
        self.radius = 0;

    if(incomingArmor)
        self.armor = incomingArmor;
    else
        self.armor = 0;

    if (incomingQuantity)
        self.quantity = ko.observable(incomingQuantity);
    else
        self.quantity = ko.observable(1);

    return self;
}