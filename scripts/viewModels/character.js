(function(cb) {
    cb.Character = function() {
        var self = this;

        self.versionNumber = ko.observable('v 1.1.0')
        self.uuid = UUID.generate();

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

        self.characterName = ko.observable('');
        self.characterDescription = ko.observable('');
        self.characterProfession = ko.observable('');
        self.characterRank = ko.observable('');
        self.characterNationality = ko.observable('');
        self.characterUnit = ko.observable('');
        self.characterExperience = ko.observable(0);
        self.currency = ko.observable(0);
        self.currencyOnHand = ko.observable(0);
        self.emergencyDice = ko.observable(0);

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
                return self.equipment().where(function (data) {
                  return data.type.toLowerCase().trim() === "weapon";
                });
            }
        });
        self.armor = ko.computed({
            read: function(){
                return self.equipment().where(function (data) {
                  return data.type.toLowerCase().trim() === "armor" || data.type.toLowerCase().trim() === "helmet";
                });
            }
        });

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

        self.maximumCapacity = ko.computed({
            read: function() {
                var capacities = [
                  {value: -6, capacity: 9.9},
                  {value: -5, capacity: 10},
                  {value: -4, capacity: 25},
                  {value: -3, capacity: 40},
                  {value: -2, capacity: 50},
                  {value: -1, capacity: 60},
                  {value: 0, capacity: 70},
                  {value: 1, capacity: 80},
                  {value: 2, capacity: 95},
                  {value: 3, capacity: 115},
                  {value: 4, capacity: 140},
                  {value: 5, capacity: 180},
                ];

                var max = capacities.where(function (capacity) { return capacity.value === self.secondaryTraitStrength(); });
                if (max)
                    return max[0].capacity;

                return null;
            }
        });

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
            if(data.description) self.characterDescription(data.description);
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
                        equipment.ammoMax, equipment.rateOfFire, equipment.radius, equipment.secondaryRadius, equipment.armor, equipment.quantity, equipment.minimumPrice, equipment.minimumRange));
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
            var modelPhysicalStatuses = [];
            modelPhysicalStatuses.push({ injuryName: 'Flesh Wound', score: self.injuryThresholdFlesh(), armor:self.armorRating() + '/' + self.helmetRating(), penalty:'-1' });
            modelPhysicalStatuses.push({ injuryName: 'Deep Wound', score: self.injuryThresholdDeep(), armor:self.armorRating() + '/' + self.helmetRating(), penalty:'-2' });
            modelPhysicalStatuses.push({ injuryName: 'Instant Death', score: self.injuryThresholdInstant(), armor:self.armorRating() + '/' + self.helmetRating(), penalty:'Dead' });
            modelPhysicalStatuses.push({ injuryName: 'System Shock', score: self.systemShockThreshold(), armor:'', penalty:'Dead' });
            var movement = [];
            movement.push({ name: 'Sprint', speed:self.movementSpeedSprint(), attackMod:'n/a', defenseMod:'+2' });
            movement.push({ name: 'Run', speed:self.movementSpeedRun(), attackMod:'-3', defenseMod:'+2' });
            movement.push({ name: 'Jog', speed:self.movementSpeedJog(), attackMod:'-2', defenseMod:'+1' });
            movement.push({ name: 'Walk', speed:self.movementSpeedWalk(), attackMod:'-1', defenseMod:'0' });
            movement.push({ name: 'Stationary', speed:0, attackMod:'0', defenseMod:'-1' });

            var modelData = {
                uuid: self.uuid,
                name: self.characterName(),
                description: self.characterDescription(),
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
                currency: self.currency(),
                currencyOnHand: self.currencyOnHand(),
                emergencyDice: self.emergencyDice(),
                strength: self.secondaryTraitStrength(),
                health: self.secondaryTraitHealth(),
                stamina: self.secondaryTraitStamina(),
                unarmedDamage: self.secondaryTraitUnarmedDamage(),
                armedDamage: self.secondaryTraitArmedDamage(),
                skills: modelSkills,
                equipment: modelEquipment,
                physicalStatuses: modelPhysicalStatuses,
                movement: movement
            };
            return modelData;
        }

        self.saveToLocalStorage = function(){
            LocalStorage.saveCharacter(self.getModelData());
            if (!self.characterName().trim().length === 0)
              window.location = 'index.html?loadFromUUID='+self.uuid;
        };

        self.loadFromLocalStorage = function(uuid){
            self.loadFromData(LocalStorage.getCharacter(uuid));
        };

        self.goToMainPage = function() { window.location = "characterList.html"; };

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
            self.equipment.push(new equipmentObject(self.inputArmorName(), self.inputArmorType(), self.inputArmorMass(), 0, 0, 0, 0, 0, 0, 0, self.inputArmor()));
            self.sortEquipment();
            self.inputArmorName('')
            self.inputArmorType('Armor');
            self.inputArmorMass(0);
            self.inputArmor(0);
        };

        self.insertEquipment = function(){
            //check if equipment exists in standardEquipment list
            var equips = self.standardEquipment().where(function (data) { return data.name.toLowerCase().trim() === self.selectedEquipmentSuggestion().toLowerCase().trim(); });
            if(equips) {
              var equip = equips[0];
              self.equipment.push(equip);
            }
            else {
              self.equipment.push(new equipmentObject(self.inputEquipmentName(), 'Other', self.inputEquipmentMass()));
            }

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

        self.exportToASCII = function(){
            var d = new Date();
            var dStr = d.getFullYear() + '-'+ d.getMonth() + '-' + d.getDay();
            Export.characterToEcho(self.getModelData(),self.characterName() +' '+ dStr +'.txt');
        };

        self.exportToJson = function(){
          var str = JSON.stringify(self.getModelData(), null, "  ");
          var parts = [str];
          var blob = new Blob(parts, { type: 'application/json' });
          var url = URL.createObjectURL(blob);

          var a = $("#file-save-link")[0];
          a.href = url;
          a.download = "hgu_character.json";
          a.click();

          setTimeout(function () { URL.revokeObjectURL(url); }, 500);
        };

        function ui_save_file() {

        }

        self.importFromJson = function(evt) {
            // ui_clear_all();

            var files = evt.target.files;

            for (var i = 0, f; f = files[i]; i++) {
                var reader = new FileReader();

                reader.onload = function (reader) {
                    var data = JSON.parse(this.result);
                    self.loadFromData(data);
                };

                reader.readAsText(f);
            }

            // Reset file input
            $("#file-load-form")[0].reset();
        }

        self.standardEquipment = ko.observableArray([
            /*
                incomingName,
                incomingType, //Weapon Armor Other
                incomingMass,
                incomingAccuracy,
                incomingDamage,
                incomingRange,
                incomingAmmoMax,
                incomingRateOfFire,
                incomingRadius,
                incomingArmor,
                incomingQuantity
             */
             new equipmentObject("Knife","Weapon",0.5,0,(self.secondaryTraitArmedDamage() + 7),(self.secondaryTraitStrength() + 10),0,0,0,0,0,1,15),
             new equipmentObject("Machete","Weapon",1.5,0,(self.secondaryTraitArmedDamage() + 10),0,0,0,0,0,0,1,30),
             new equipmentObject("Sword","Weapon",1.5,0,(self.secondaryTraitArmedDamage() + 12),0,0,0,0,0,0,1,100),
             new equipmentObject("Hatchet","Weapon",1.5,0,(self.secondaryTraitArmedDamage() + 10),0,0,0,0,0,0,1,20),
             new equipmentObject("Club/Truncheon","Weapon",1.5,0,(self.secondaryTraitArmedDamage() + 5),0,0,0,0,0,0,1,10),
             new equipmentObject("Staff","Weapon",1.5,0,(self.secondaryTraitArmedDamage() + 7),0,0,0,0,0,0,1,10),
             new equipmentObject("Spear","Weapon",1.5,0,(self.secondaryTraitArmedDamage() + 10),(self.secondaryTraitStrength() + 20),0,0,0,0,0,1,25),
             new equipmentObject("Chainsaw","Weapon",1.5,0,(self.secondaryTraitArmedDamage() + 20),0,0,0,0,0,0,1,80),
             new equipmentObject("Vibroknife","Weapon",1.5,0,(self.secondaryTraitArmedDamage() + 9),0,30,0,0,0,0,1,150),
             new equipmentObject("Vibroknife Clip","Ammo",0.1,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Vibromachete","Weapon",1.5,0,(self.secondaryTraitArmedDamage() + 15),0,20,0,0,0,0,1,325),
             new equipmentObject("Vibromachete Clip","Ammo",0.1,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Vibrosword","Weapon",1.5,0,(self.secondaryTraitArmedDamage() + 20),0,10,0,0,0,0,1,1000),
             new equipmentObject("Vibrosword Clip","Ammo",0.1,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Light Bow","Weapon",0.5,0,7,5,0,1,0,0,0,1,150),
             new equipmentObject("Medium Bow","Weapon",1,0,10,6,0,2,0,0,0,1,200),
             new equipmentObject("Heavy Bow","Weapon",3,0,15,7,0,0,2,0,0,1,450),
             new equipmentObject("Arrow","Ammo",0.2,0,0,0,0,0,0,0,0,1,1),
             new equipmentObject("6mm Pistol","Weapon",0.5,0,10,4,30,0,0,0,0,1,200),
             new equipmentObject("6mm Pistol Clip","Ammo",0.2,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("9mm Pistol","Weapon",0.8,0,15,5,20,0,0,0,0,1,300),
             new equipmentObject("9mm Pistol Clip","Ammo",0.3,0,0,0,0,0,0,0,0,1,15),
             new equipmentObject("11mm Pistol","Weapon",1.3,0,20,5,0,0,0,0,1,400),
             new equipmentObject("11mm Pistol Clip","Ammo",0.3,0,0,0,0,0,0,0,0,1,20),
             new equipmentObject("13mm Pistol","Weapon",2,0,25,5,0,8,0,0,0,1,600),
             new equipmentObject("13mm Pistol Clip","Ammo",0.3,0,0,0,0,0,0,0,0,1,25),
             new equipmentObject("6mm Machine Pistol","Weapon",0.6,0,10,4,30,1,0,0,0,1,350),
             new equipmentObject("6mm Machine Pistol Clip","Ammo",0.3,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("9mm Machine Pistol","Weapon",1,0,15,5,20,1,0,0,0,1,500),
             new equipmentObject("9mm Machine Pistol Clip","Ammo",0.3,0,0,0,0,0,0,0,0,1,15),
             new equipmentObject("9mm Submachinegun","Weapon",2,0,15,10,50,2,0,0,0,1,600),
             new equipmentObject("9mm Submachinegun Clip","Ammo",0.6,0,0,0,0,0,0,0,0,1,40),
             new equipmentObject("11mm Submachinegun","Weapon",3,0,20,10,30,2,0,0,0,1,800),
             new equipmentObject("11mm Submachinegun Clip","Ammo",0.6,0,0,0,0,0,0,0,0,1,40),
             new equipmentObject("13mm Submachinegun","Weapon",4,0,25,10,30,2,0,0,0,1,1000),
             new equipmentObject("13mm Submachinegun Clip","Ammo",0.6,0,0,0,0,0,0,0,0,1,60),
             new equipmentObject("7mm Rifle","Weapon",3,0,22,50,20,0,0,0,0,1,400),
             new equipmentObject("7mm Rifle Clip","Ammo",0.3,0,0,0,0,0,0,0,0,1,20),
             new equipmentObject("7mm Assault Rifle","Weapon",3,0,22,50,30,1,0,0,0,1,800),
             new equipmentObject("7mm Assault Rifle Clip","Ammo",0.5,0,0,0,0,0,0,0,0,1,30),
             new equipmentObject("9mm Heavy Rifle","Weapon",4,0,30,60,10,0,0,0,0,1,600),
             new equipmentObject("9mm Heavy Rifle Clip","Ammo",0.5,0,0,0,0,0,0,0,0,1,30),
             new equipmentObject("15mm Sniper Rifle","Weapon",10,1,40,100,10,0,0,0,0,1,3000),
             new equipmentObject("15mm Sniper Rifle Clip","Ammo",1,0,0,0,0,0,0,0,0,1,50),
             new equipmentObject("Concussion Grenade","Weapon",0.1,0,30,0,10,0,9,0,0,1,12),
             new equipmentObject("Fragmentation Grenade","Weapon",0.1,0,26,0,10,0,8,30,0,0,1,10),
             new equipmentObject("Incendiary Grenade","Weapon",0.1,0,24,0,10,0,8,12,0,1,12),
             new equipmentObject("Flash Grenade","Weapon",0.1,0,8,0,10,0,3,30,0,1,8),
             new equipmentObject("Tear Gas Grenade","Weapon",0.1,0,5,0,10,0,2,15,0,1,8),
             new equipmentObject("Nerve Gas Grenade","Weapon",0.1,0,5,0,10,0,2,15,0,1,15),
             new equipmentObject("24mm Anti-HG Rifle","Weapon",15,0,5,150,3,0,0,0,0,1,10000),
             new equipmentObject("24mm Anti-HG Rifle Clip","Ammo",2,0,0,0,0,0,0,0,0,1,100),
             new equipmentObject("9mm Chaingun","Weapon",10,0,5,50,50,4,0,0,0,1,4000),
             new equipmentObject("9mm Chaingun Belt","Ammo",3,0,0,0,0,0,0,0,0,1,150),
             new equipmentObject("9mm Light Machinegun","Weapon",8,0,5,100,50,2,0,0,0,1,2000),
             new equipmentObject("9mm Light Machinegun Belt","Ammo",3,0,0,0,0,0,0,0,0,1,150),
             new equipmentObject("37mm Grenade Rifle","Weapon",6,0,5,50,4,0,0,0,0,1,3000),
             new equipmentObject("37mm Grenade Rifle Clip","Ammo",2,0,0,0,0,0,0,0,0,1,100),
             new equipmentObject("62mm Light Mortar","Weapon",2,0,5,150,1,0,15,0,0,1,5000,100),
             new equipmentObject("62mm Light Mortar Shell","Ammo",1,0,0,0,0,0,0,0,0,1,80),
             new equipmentObject("50mm Rocket Launcher","Weapon",0.5,0,5,50,1,0,5,0,0,1,10000),
             new equipmentObject("50mm Rocket","Ammo",1,0,0,0,0,0,0,0,0,1,200),
             new equipmentObject("Sniper Laser","Weapon",3,0,5,200,12,0,0,0,0,1,10000),
             new equipmentObject("Sniper Laser Backpack","Ammo",4,0,0,0,0,0,0,0,0,1,5000),
             new equipmentObject("Light Helmet","Helmet",1,0,0,0,0,0,0,0,5,1,20),
             new equipmentObject("Helmet","Helmet",2,0,0,0,0,0,0,0,10,1,40),
             new equipmentObject("Light Flak Vest","Armor",1,0,0,0,0,0,0,0,15,1,100),
             new equipmentObject("Light Flak Suit","Armor",2,0,0,0,0,0,0,0,20,1,150),
             new equipmentObject("Medium Flak Vest","Armor",3,0,0,0,0,0,0,0,25,1,250),
             new equipmentObject("Medium Flak Suit","Armor",4,0,0,0,0,0,0,0,30,1,400),
             new equipmentObject("Heavy Flak Vest","Armor",6,0,0,0,0,0,0,0,35,1,600),
             new equipmentObject("Heavy Flak Suit","Armor",8,0,0,0,0,0,0,0,40,1,900),
             new equipmentObject("Turtleshell","Armor",10,0,0,0,0,0,0,0,60,1,5000),
             new equipmentObject("Aircraft Pilot Helmet","Headgear",1,0,0,0,0,0,0,0,0,1,3000),
             new equipmentObject("Audio Receiver","Electronics",0.01,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Audio Recorder","Electronics",0.1,0,0,0,0,0,0,0,0,1,30),
             new equipmentObject("Bartender Glove","Gloves",1,0,0,0,0,0,0,0,0,1,1000),
             new equipmentObject("Binoculars","Ocular",1,0,0,0,0,0,0,0,0,1,50),
             new equipmentObject("Cap","Headgear",0.2,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Cellular Phone","Electronics",0.2,0,0,0,0,0,0,0,0,1,40),
             new equipmentObject("Summer, Designer Suit","Clothes",0.5,0,0,0,0,0,0,0,0,1,1000),
             new equipmentObject("Summer, Lower Class","Clothes",1,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Summer, Medium Class","Clothes",1,0,0,0,0,0,0,0,0,1,5),
             new equipmentObject("Summer, Upper Class","Clothes",0.5,0,0,0,0,0,0,0,0,1,250),
             new equipmentObject("Summer, Shoes, Designer","Clothes",1,0,0,0,0,0,0,0,0,1,400),
             new equipmentObject("Summer, Shoes, Normal","Clothes",1,0,0,0,0,0,0,0,0,1,35),
             new equipmentObject("Winter, Boots","Clothes",1.5,0,0,0,0,0,0,0,0,1,75),
             new equipmentObject("Winter, Boots, Designer","Clothes",1,0,0,0,0,0,0,0,0,1,800),
             new equipmentObject("Winter, Designer Suit","Clothes",0.5,0,0,0,0,0,0,0,0,1,1750),
             new equipmentObject("Winter, Lower Class","Clothes",1.5,0,0,0,0,0,0,0,0,1,25),
             new equipmentObject("Winter, Medium Class","Clothes",1.5,0,0,0,0,0,0,0,0,1,90),
             new equipmentObject("Winter, Upper Class","Clothes",1,0,0,0,0,0,0,0,0,1,475),
             new equipmentObject("Climbing Gear","Climbing Gear",10,0,0,0,0,0,0,0,0,1,250),
             new equipmentObject("Spikes and Crabs","Climbing Gear",1,0,0,0,0,0,0,0,0,1,15),
             new equipmentObject("Compressed-air Hammer","Climbing Gear",1,0,0,0,0,0,0,0,0,1,25),
             new equipmentObject("Propellant for Hammer (60)","Climbing Gear",0.5,0,0,0,0,0,0,0,0,1,2),
             new equipmentObject("Ice Axe","Climbing Gear",0.8,0,0,0,0,0,0,0,0,1,5),
             new equipmentObject("Spiked Climbing Boots","Climbing Gear",1.5,0,0,0,0,0,0,0,0,1,80),
             new equipmentObject("Oxygen Mask","Climbing Gear",0.5,0,0,0,0,0,0,0,0,1,45),
             new equipmentObject("Climbing Helmet","Climbing Gear",2,0,0,0,0,0,0,0,0,1,120),
             new equipmentObject("Small Backpack","Backpack",2,0,0,0,0,0,0,0,0,1,20),
             new equipmentObject("Large Backpack","Backpack",5,0,0,0,0,0,0,0,0,1,35),
             new equipmentObject("Combat Helmet","Headgear",0.7,0,0,0,0,0,0,0,0,1,300),
             new equipmentObject("Communications Headset","Electronics",0.03,0,0,0,0,0,0,0,0,1,200),
             new equipmentObject("Communications Rig","Electronics",2.5,0,0,0,0,0,0,0,0,1,1500),
             new equipmentObject("Cutting Torch","Tools",5,0,0,0,0,0,0,0,0,1,25),
             new equipmentObject("Cutting Torch Refill","Ammo",0.6,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Data Disks (box of 10)","Electronics",0.1,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Demolition Specialist Helmet","Headgear",0.5,0,0,0,0,0,0,0,0,1,200),
             new equipmentObject("Desert Suit, Cooler","Desert Suit",5,0,0,0,0,0,0,0,0,1,200),
             new equipmentObject("Desert Suit, Water Reclamation","Desert Suit",5,0,0,0,0,0,0,0,0,1,250),
             new equipmentObject("Diving Suit","Clothes",10,0,0,0,0,0,0,0,0,1,500),
             new equipmentObject("Drugs, Medical","Medical",0.01,0,0,0,0,0,0,0,0,1),
             new equipmentObject("Electronics Tool Kit","Electronics",2,0,0,0,0,0,0,0,0,1,600),
             new equipmentObject("Fire Suit","Clothes",6,0,0,0,0,0,0,0,0,1,800),
             new equipmentObject("First Aid Kit","Medical",0.3,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Flashlight","Tools",0.5,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Flare","Flare",0.05,0,0,0,0,0,0,0,0,1,2),
             new equipmentObject("Radio Flare","Flare",0.06,0,0,0,0,0,0,0,0,1,8),
             new equipmentObject("Smoke Flare","Flare",0.06,0,0,0,0,0,0,0,0,1,4),
             new equipmentObject("Gas Mask","Tools",0.5,0,0,0,0,0,0,0,0,1,50),
             new equipmentObject("Gas Mask Filter","Ammo",0.05,0,0,0,0,0,0,0,0,1,5),
             new equipmentObject("Gear Pilot Helmet","Headgear",1,0,0,0,0,0,0,0,0,1,3000),
             new equipmentObject("Geiger Counter","Tools",0.2,0,0,0,0,0,0,0,0,1,100),
             new equipmentObject("Stylish Goggles","Ocular",0.2,0,0,0,0,0,0,0,0,1,25),
             new equipmentObject("Hat, Felt","Headgear",0.5,0,0,0,0,0,0,0,0,1,75),
             new equipmentObject("Information Pad","Supplies",0.5,0,0,0,0,0,0,0,0,1,75),
             new equipmentObject("Journalist VR Rig","Electronics",0.5,0,0,0,0,0,0,0,0,1,300),
             new equipmentObject("Mechanical Tool Kit","Tools",5,0,0,0,0,0,0,0,0,1,400),
             new equipmentObject("Medical Belt/Scanner","Medical",1,0,0,0,0,0,0,0,0,1,1000),
             new equipmentObject("Medical Kit","Medical",1,0,0,0,0,0,0,0,0,1,100),
             new equipmentObject("MemCompass","Tools",0.1,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Metal Detector","Tools",0.3,0,0,0,0,0,0,0,0,1,100),
             new equipmentObject("Military Communicator","Electronics",0.3,0,0,0,0,0,0,0,0,1,200),
             new equipmentObject("Military Throat/Ear Comm Set","Electronics",0.02,0,0,0,0,0,0,0,0,1,400),
             new equipmentObject("NBC Suit","Clothes",12,0,0,0,0,0,0,0,1,1200),
             new equipmentObject("Nightvision Goggles","Ocular",0.5,0,0,0,0,0,0,0,0,1,200),
             new equipmentObject("Personal Assistant","Electronics",0.7,0,0,0,0,0,0,0,0,1,50),
             new equipmentObject("Personal Communicator","Electronics",0.3,0,0,0,0,0,0,0,0,1,30),
             new equipmentObject("Personal Computer","Electronics",1,0,0,0,0,0,0,0,0,1,400),
             new equipmentObject("Personal CAD Mainframe","Electronics",2.5,0,0,0,0,0,0,0,0,1,5000),
             new equipmentObject("Prospecting Tubes (3)","Supplies",0.6,0,0,0,0,0,0,0,0,1,900),
             new equipmentObject("Rope (50m)","Supplies",0.3,0,0,0,0,0,0,0,0,1,10),
             new equipmentObject("Scrambling Device","Electronics",0.01,0,0,0,0,0,0,0,0,1,700),
             new equipmentObject("Sleeping Bag","Survival",1,0,0,0,0,0,0,0,0,1,40),
             new equipmentObject("Stealth Helmet","Headgear",0.8,0,0,0,0,0,0,0,0,1,7000),
             new equipmentObject("Strider Crew Helmet","Headgear",1,0,0,0,0,0,0,0,0,1,1500),
             new equipmentObject("Surgical Field Kit","Medical",4,0,0,0,0,0,0,0,0,1,800),
             new equipmentObject("Survival Kit","Survival",5,0,0,0,0,0,0,0,0,1,70),
             new equipmentObject("Bedroll","Survival Kit",2,0,0,0,0,0,0,0,0,1,25),
             new equipmentObject("Canteen (one liter)","Survival Kit",0.1,0,0,0,0,0,0,0,0,1,5),
             new equipmentObject("Canteen (two liter)","Survival Kit",0.2,0,0,0,0,0,0,0,0,1,8),
             new equipmentObject("Compass","Survival Kit",0.1,0,0,0,0,0,0,0,0,1,15),
             new equipmentObject("Fishing Gear","Survival Kit",0.05,0,0,0,0,0,0,0,0,1,2),
             new equipmentObject("Lighter","Survival Kit",0.05,0,0,0,0,0,0,0,0,1,2),
             new equipmentObject("Ration Pack (10)","Survival Kit",0.1,0,0,0,0,0,0,0,0,1,2),
             new equipmentObject("Survival Knife","Survival Kit",0.5,0,0,0,0,0,0,0,0,1,20),
             new equipmentObject("Tech Rig","Electronics",5,0,0,0,0,0,0,0,0,1,700),
             new equipmentObject("2-Man Tent","Tent",1,0,0,0,0,0,0,0,0,1,50),
             new equipmentObject("5-Man Tent","Tent",2,0,0,0,0,0,0,0,0,1,100),
             new equipmentObject("12-Man Tent","Tent",5,0,0,0,0,0,0,0,0,1,200),
             new equipmentObject("Thermal Goggles","Ocular",0.5,0,0,0,0,0,0,0,0,1,100),
             new equipmentObject("Throat/Ear Comm Set","Electronics",0.01,0,0,0,0,0,0,0,0,1,50),
             new equipmentObject("Tracers and Bugs (150 each)","Supplies",0.001,0,0,0,0,0,0,0,0,1,150),
             new equipmentObject("Tray Data System","Electronics",0.5,0,0,0,0,0,0,0,0,1,250),
             new equipmentObject("Trid Display","Electronics",1,0,0,0,0,0,0,0,0,1,500),
             new equipmentObject("Trideo Receiver","Electronics",1,0,0,0,0,0,0,0,0,1,250),
             new equipmentObject("Trideo Recorder","Electronics",3,0,0,0,0,0,0,0,0,1,1000),
             new equipmentObject("Vacuum Suit","Clothes",10,0,0,0,0,0,0,0,0,1,10000),
             new equipmentObject("Video Receiver","Electronics",0.5,0,0,0,0,0,0,0,0,1,80),
             new equipmentObject("Video Recorder","Electronics",0.5,0,0,0,0,0,0,0,0,1,100),
             new equipmentObject("Watch","Supplies",0.05,0,0,0,0,0,0,0,0,1,5),
             new equipmentObject("Water Condenser","Supplies",2.5,0,0,0,0,0,0,0,0,1,200),
             new equipmentObject("Winter Suit","Clothes",6,0,0,0,0,0,0,0,0,1,250)
        ]);

        self.equipmentSuggestions = ko.computed( function() {
            return self.standardEquipment().where(function(eq){return eq.type.toLowerCase() !== "weapon" && eq.type.toLowerCase() !== "armor" && eq.type.toLowerCase() !== "helmet";}).map(function(e) { return e.name; });
        });

        self.weaponSuggestions = ko.computed( function() {
            return self.standardEquipment().where(function(eq){return eq.type.toLowerCase() === "weapon";}).map(function(e) { return e.name; });
        });

        self.armorSuggestions = ko.computed( function() {
            return self.standardEquipment().where(function(eq){return eq.type.toLowerCase() === "armor" || eq.type.toLowerCase() === "helmet";}).map(function(e) { return e.name; });
        });

        self.selectedEquipmentSuggestion = ko.observable(null);
        self.selectedEquipmentSuggestion.subscribe(function () {
            self.setSelectedEquipment();
        });

        self.setSelectedEquipment = function() {
            if (self.selectedEquipmentSuggestion())
            {
                var equips = self.standardEquipment().where(function (data) { return data.name.toLowerCase().trim() === self.selectedEquipmentSuggestion().toLowerCase().trim(); });
                if (equips)
                {
                    var equip = equips[0];

                    switch(equip.type.toLowerCase())
                    {
                      case "weapon":
                        self.inputWeaponName(equip.name);
                        self.inputWeaponMass(equip.mass);
                        self.inputWeaponAccuracy(equip.accuracy);
                        self.inputWeaponDamage(equip.damage);
                        self.inputWeaponRange(equip.range);
                        self.inputWeaponAmmo(equip.ammoMax);
                        self.inputWeaponRateOfFire(equip.rateOfFire);
                        self.inputWeaponRadius(equip.radius);
                        break;
                      case "armor":
                      case "helmet":
                        self.inputArmorName(equip.name)
                        self.inputArmorType(equip.type);
                        self.inputArmorMass(equip.mass);
                        self.inputArmor(equip.armor);
                        break;
                      //case "other":
                      default:
                        self.inputEquipmentName(equip.name);
                        self.inputEquipmentMass(equip.mass);
                        break;
                    }
                }
            }
        }

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

        self.skillsSuggestions = ko.computed(function() {
            return self.standardSkills().map(function(s) { return s.name; });
        });


        self.selectedSuggestion = ko.observable(null);
        self.selectedSuggestion.subscribe(function () {
            self.setSelectedSkill();
        });

        self.setSelectedSkill = function() {
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

        self.createNewCharacter = function() {
          self.uuid = UUID.generate();
          self.inputSkillName('');
          self.inputLevel(0);
          self.inputAttribute();
          self.inputComplex(false);
          self.inputEquipmentName('');
          self.inputEquipmentMass(0);
          self.inputWeaponName('');
          self.inputWeaponMass(0);
          self.inputWeaponAccuracy(0);
          self.inputWeaponDamage(0);
          self.inputWeaponRange(0);
          self.inputWeaponAmmo(0);
          self.inputWeaponRateOfFire(0);
          self.inputWeaponRadius(0);
          self.inputArmorName('')
          self.inputArmorType('Armor');
          self.inputArmorMass(0);
          self.inputArmor(0);
          self.characterName('');
          self.characterDescription('');
          self.characterProfession('');
          self.characterRank('');
          self.characterNationality('');
          self.characterUnit('');
          self.characterExperience(0);
          self.currency(0);
          self.currencyOnHand(0);
          self.emergencyDice(0);
          self.attributeAgility(-1);
          self.attributeAppearance(-1);
          self.attributeBuild(-1);
          self.attributeCreativity(-1);
          self.attributeFitness(-1);
          self.attributeInfluence(-1);
          self.attributeKnowledge(-1);
          self.attributePerception(-1);
          self.attributePsyche(-1);
          self.attributeWillpower(-1);
          self.equipment([]);
          self.skills([]);
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

var equipmentObject = function(incomingName, incomingType, incomingMass, incomingAccuracy, incomingDamage, incomingRange,
                               incomingAmmoMax, incomingRateOfFire, incomingRadius, incomingSecRadius, incomingArmor,
                               incomingQuantity, incomingMinPrice, incomingMinRange) {
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

    //Some items (like 62mm Light Mortar) have a minimumRange, most items don't have this
    if(incomingMinRange)
      self.minimumRange = incomingMinRange;
    else
      self.minimumRange = 0;

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

    //Some items (like grenades) can have secondaryRadius/Effects; Fragmentation Grenade for example has a primary radius of 8, with a secondary of 30
    if(incomingSecRadius)
      self.secondaryRadius = incomingSecRadius;
    else
      self.secondaryRadius = self.radius; //not sure if this should be 0 or set to the primary radius...

    if(incomingArmor)
        self.armor = incomingArmor;
    else
        self.armor = 0;

    if (incomingQuantity)
        self.quantity = ko.observable(incomingQuantity);
    else
        self.quantity = ko.observable(1);

    if (incomingMinPrice)
      self.minimumPrice = incomingMinPrice;
    else
      self.minimumPrice = 0; //CHEAP AS FREE!


    return self;
}
