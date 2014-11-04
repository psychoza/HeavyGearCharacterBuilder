window.CharacterBuilder = window.CharacterBuilder || {};

describe('character - ', function () {
    var character = new window.CharacterBuilder.Character();

	it('must exist - ', function(){
		expect(character !== undefined).toBe(true);
	});
    
	describe('required properties -', function(){
		beforeEach(function() {
	        character = new CharacterBuilder.Character();
	    });

		it('must have characterName', function(){
			expect(character.characterName !== undefined).toBe(true);
		});
		it('must have characterProfession', function(){
			expect(character.characterProfession !== undefined).toBe(true);
		});
		it('must have characterRank', function(){
			expect(character.characterRank !== undefined).toBe(true);
		});
		it('must have characterNationality', function(){
			expect(character.characterNationality !== undefined).toBe(true);
		});
		it('must have characterUnit', function(){
			expect(character.characterUnit !== undefined).toBe(true);
		});
		it('must have characterExperience', function(){
		    expect(character.characterExperience !== undefined).toBe(true);
		    expect(character.characterExperience() === 0).toBe(true);
		});
		it('must have attributeAgility', function(){
		    expect(character.attributeAgility !== undefined).toBe(true);
		    expect(character.attributeAgility() === -1).toBe(true);
		});
		it('must have attributeAppearance', function(){
		    expect(character.attributeAppearance !== undefined).toBe(true);
		    expect(character.attributeAppearance() === -1).toBe(true);
		});
		it('must have attributeBuild', function(){
		    expect(character.attributeBuild !== undefined).toBe(true);
		    expect(character.attributeBuild() === -1).toBe(true);
		});
		it('must have attributeCreativity', function(){
		    expect(character.attributeCreativity !== undefined).toBe(true);
		    expect(character.attributeCreativity() === -1).toBe(true);
		});
		it('must have attributeFitness', function(){
		    expect(character.attributeFitness !== undefined).toBe(true);
		    expect(character.attributeFitness() === -1).toBe(true);
		});
		it('must have attributeInfluence', function(){
		    expect(character.attributeInfluence !== undefined).toBe(true);
		    expect(character.attributeInfluence() === -1).toBe(true);
		});
		it('must have attributeKnowledge', function(){
		    expect(character.attributeKnowledge !== undefined).toBe(true);
		    expect(character.attributeKnowledge() === -1).toBe(true);
		});
		it('must have attributePerception', function(){
		    expect(character.attributePerception !== undefined).toBe(true);
		    expect(character.attributePerception() === -1).toBe(true);
		});
		it('must have attributePsyche', function(){
		    expect(character.attributePsyche !== undefined).toBe(true);
		    expect(character.attributePsyche() === -1).toBe(true);
		});
		it('must have attributeWillpower', function(){
		    expect(character.attributeWillpower !== undefined).toBe(true);
		    expect(character.attributeWillpower() === -1).toBe(true);
		});
		it('must have secondaryTraitStrength', function(){
		    expect(character.secondaryTraitStrength !== undefined).toBe(true);
		    expect(character.secondaryTraitStrength() === -1).toBe(true);
		    character.attributeBuild(1);		    
		    expect(character.secondaryTraitStrength() === 0).toBe(true);
		    character.attributeFitness(2);
		    expect(character.secondaryTraitStrength() === 1).toBe(true);
		    character.attributeBuild(2);
		    expect(character.secondaryTraitStrength() === 2).toBe(true);
		});
		it('must have secondaryTraitHealth', function(){
		    expect(character.secondaryTraitHealth !== undefined).toBe(true);		    
		    expect(character.secondaryTraitHealth() === -1).toBe(true);
		    character.attributeFitness(2);
		    expect(character.secondaryTraitHealth() === 0).toBe(true);
		    character.attributePsyche(2);
		    expect(character.secondaryTraitHealth() === 1).toBe(true);
		    character.attributeWillpower(3);
		    expect(character.secondaryTraitHealth() === 2).toBe(true);
		    character.attributeFitness(2);
		    character.attributePsyche(0);
		    character.attributeWillpower(0);
		    expect(character.secondaryTraitHealth() === 1).toBe(true);
		});		
		it('must have secondaryTraitStamina', function(){
		    expect(character.secondaryTraitStamina !== undefined).toBe(true);		    
		    expect(character.secondaryTraitStamina() === 15).toBe(true);
			character.attributeBuild(0);
			character.attributeFitness(2);
		    expect(character.secondaryTraitStamina() == 25).toBe(true);
		    character.attributePsyche(2);
		    expect(character.secondaryTraitStamina() == 30).toBe(true);
		    character.attributeWillpower(3);
		    expect(character.secondaryTraitStamina() == 35).toBe(true);
		});
		it('must have secondaryTraitUnarmedDamage', function(){
		    expect(character.secondaryTraitUnarmedDamage !== undefined).toBe(true);		    
		    expect(character.secondaryTraitUnarmedDamage() === 1).toBe(true);
			character.attributeBuild(0);
			character.attributeFitness(0);
			expect(character.secondaryTraitUnarmedDamage() === 3).toBe(true);
			character.skills.push(new skillObject("Hand-to-Hand", 2, self.attributeAgility, false));
			expect(character.secondaryTraitUnarmedDamage() === 5).toBe(true);
		});
        it('must have saveToLocalStorage function', function(){
            expect(typeof(character.saveToLocalStorage)).toEqual("function");
        });
		it('must have secondaryTraitArmedDamage', function(){
		    expect(character.secondaryTraitArmedDamage !== undefined).toBe(true);		    
		    expect(character.secondaryTraitArmedDamage() === 1).toBe(true);
			character.attributeBuild(0);
			character.attributeFitness(0);
			expect(character.secondaryTraitArmedDamage() === 3).toBe(true);
			character.skills.push(new skillObject("Melee", 2, self.attributeAgility, false));
			expect(character.secondaryTraitArmedDamage() === 5).toBe(true);
		});
		it('must have injuryThresholdFlesh', function(){
		    expect(character.injuryThresholdFlesh !== undefined).toBe(true);		    
		    expect(character.injuryThresholdFlesh() === 8).toBe(true);
		    character.attributeBuild(0);
			character.attributeFitness(2);
		    expect(character.injuryThresholdFlesh() == 13).toBe(true);
		});
		it('must have injuryCountFlesh', function(){
		    expect(character.injuryCountFlesh !== undefined).toBe(true);		    
		    expect(character.injuryCountFlesh() === 0).toBe(true);
		});
		it('must have injuryThresholdDeep', function(){
		    expect(character.injuryThresholdDeep !== undefined).toBe(true);		    
		    expect(character.injuryThresholdDeep() === 15).toBe(true);
		    character.attributeBuild(0);
			character.attributeFitness(2);
		    expect(character.injuryThresholdDeep() == 25).toBe(true);
		});
		it('must have injuryCountDeep', function(){
		    expect(character.injuryCountDeep !== undefined).toBe(true);		    
		    expect(character.injuryCountDeep() === 0).toBe(true);
		});
		it('must have injuryThresholdInstant', function(){
		    expect(character.injuryThresholdInstant !== undefined).toBe(true);		    
		    expect(character.injuryThresholdInstant() === 30).toBe(true);
		    character.attributeBuild(0);
			character.attributeFitness(2);
		    expect(character.injuryThresholdInstant() == 50).toBe(true);
		});
		it('must have systemShockThreshold', function(){
		    expect(character.systemShockThreshold !== undefined).toBe(true);		    
		    expect(character.systemShockThreshold() === 4).toBe(true);
		    character.attributeFitness(2);
		    expect(character.systemShockThreshold() == 5).toBe(true);
		    character.attributePsyche(2);
		    expect(character.systemShockThreshold() == 6).toBe(true);
		    character.attributeFitness(-5);		    
		    character.attributePsyche(-5);
		    character.attributeWillpower(-5);
		    expect(character.systemShockThreshold() == 1).toBe(true);
		});
		it('must have movementSpeedSprint', function(){
			expect(character.movementSpeedSprint !== undefined).toBe(true);		    
		    expect(character.movementSpeedSprint() === 20).toBe(true);
		    character.attributeFitness(0);
		    expect(character.movementSpeedSprint() === 25).toBe(true);
		    character.skills.push(new skillObject("Athletics", 1, character.attributeFitness, false));
		    expect(character.movementSpeedSprint() === 30).toBe(true);
		});
		it('must have movementSpeedRun', function(){
			expect(character.movementSpeedRun !== undefined).toBe(true);
		    expect(character.movementSpeedRun() === 13).toBe(true);
		    character.attributeFitness(0);
		    expect(character.movementSpeedRun() === 17).toBe(true);
		    character.skills.push(new skillObject("Athletics", 1, character.attributeFitness, false));
		    expect(character.movementSpeedRun() === 20).toBe(true);
		});
		it('must have movementSpeedJog', function(){
			expect(character.movementSpeedJog !== undefined).toBe(true);
		    expect(character.movementSpeedJog() === 10).toBe(true);
		    character.attributeFitness(0);
		    expect(character.movementSpeedJog() === 13).toBe(true);
		    character.skills.push(new skillObject("Athletics", 1, character.attributeFitness, false));
		    expect(character.movementSpeedJog() === 15).toBe(true);
		});
		it('must have movementSpeedWalk', function(){
			expect(character.movementSpeedWalk !== undefined).toBe(true);
		    expect(character.movementSpeedWalk() === 7).toBe(true);
		    character.attributeFitness(0);
		    expect(character.movementSpeedWalk() === 8).toBe(true);
		    character.skills.push(new skillObject("Athletics", 1, character.attributeFitness, false));
		    expect(character.movementSpeedWalk() === 10).toBe(true);
		});
        it('must have uuid', function(){
            expect(character.uuid).toBeDefined();
        });
        it('must have loadFromLocalStorage', function(){
            expect(typeof(character.loadFromLocalStorage)).toEqual("function");
        });
	});

	describe('character skills', function() {
		beforeEach(function() {
	        character = new CharacterBuilder.Character();
	        character.skills.push(new skillObject("Hand-to-Hand", 0, 'agility', false));
	    });

		it('- must have skills', function(){
			expect(character.skills !== undefined).toBe(true);
        	expect(typeof (character.skills)).toEqual('function');
        	expect(character.skills()[0]).not.toEqual(undefined);
        	expect(character.skills()[0].name).toEqual("Hand-to-Hand");
        	expect(character.skills()[0].level()).toEqual(0);
        	expect(character.attributeSelector(character.skills()[0].bonus)).toEqual(-1);
		});

		it('- must be able to modify skills', function(){
			expect(character.incrementSkill !== undefined).toBe(true);
        	expect(typeof (character.incrementSkill)).toEqual('function');
        	expect(character.decrementSkill !== undefined).toBe(true);
        	expect(typeof (character.decrementSkill)).toEqual('function');
        	expect(character.skills()[0].level() === 0).toBe(true);
        	character.incrementSkill(character.skills()[0]);
        	expect(character.skills()[0].level() === 1).toBe(true);
        	character.decrementSkill(character.skills()[0]);
        	expect(character.skills()[0].level() === 0).toBe(true);
		});

		it('- must be able to insert skills', function(){
			expect(character.insertSkill !== undefined).toBe(true);
        	expect(typeof (character.insertSkill)).toEqual('function');        	
		});

		it('- must be able to remove skills', function(){
			expect(character.removeSkill !== undefined).toBe(true);
        	expect(typeof (character.removeSkill)).toEqual('function');
		});
	});

    describe('saveToLocalStorage - ', function(){
        beforeEach(function(){character = new CharacterBuilder.Character(); });
        it('can save to local storage', function(){
            //Arrange
            window.localStorage.setItem(CharacterLocalStorage, JSON.stringify([]));
            var model = new Models.Character({name: 'jim bob'});
            character.characterName(model.name);

            //Act
            character.saveToLocalStorage();
            var resultCharacter = JSON.parse(window.localStorage.getItem(CharacterLocalStorage))[0];
            model.uuid = resultCharacter.uuid;

            //Assert
            expect(JSON.stringify(resultCharacter)).toEqual(JSON.stringify(model));
        });

        it('it overwrites previous version', function(){
            //Arrange
            window.localStorage.setItem(CharacterLocalStorage, JSON.stringify([]));
            var model = new Models.Character({name: 'jim bob'});
            character.characterName(model.name);

            //Act
            character.saveToLocalStorage();
            character.saveToLocalStorage();
            var characters = JSON.parse(window.localStorage.getItem(CharacterLocalStorage));
            var resultCharacter = characters[0];
            model.uuid = resultCharacter.uuid;

            //Assert
            expect(JSON.stringify(resultCharacter)).toEqual(JSON.stringify(model));
            expect(characters.length).toEqual(1);
        });
    });

    describe('loadFromLocalStorage - ', function(){
        beforeEach(function(){character = new CharacterBuilder.Character(); });
        it('can load from local storage', function(){
            //Arrange
            window.localStorage.setItem(CharacterLocalStorage, JSON.stringify([]));
            var model = new Models.Character({
                name: 'jim bob',
                experience: '3'
            });
            character.loadFromData(model);
            //character.characterName(model.name);
            character.saveToLocalStorage();
            var uuid = character.uuid;
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.characterName()).toEqual(model.name);
            expect(character.characterExperience()).toEqual(model.experience);
        });

        it('can load characterName', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 'testy tester';
            character.characterName(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.characterName()).toEqual(value)
        });

        it('can load characterExperience', function(){
            //Arrange
            var uuid = character.uuid;
            var value = '5';
            character.characterExperience(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.characterExperience()).toEqual(value)
        });

        it('can load characterProfession', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 'cleaner';
            character.characterProfession(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.characterProfession()).toEqual(value)
        });

        it('can load characterRank', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 'MSG';
            character.characterRank(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.characterRank()).toEqual(value)
        });

        it('can load characterNationality', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 'Belter';
            character.characterNationality(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.characterNationality()).toEqual(value)
        });

        it('can load characterUnit', function(){
            //Arrange
            var uuid = character.uuid;
            var value = '2nd Plt Delta Troop 1/16 Cav Rgmt';
            character.characterUnit(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.characterUnit()).toEqual(value)
        });

        it('can load attributeAgility', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 3;
            character.attributeAgility(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.attributeAgility()).toEqual(value)
        });

        it('can load attributeAppearance', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 3;
            character.attributeAppearance(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.attributeAppearance()).toEqual(value)
        });

        it('can load attributeBuild', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 3;
            character.attributeBuild(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.attributeBuild()).toEqual(value)
        });

        it('can load attributeCreativity', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 3;
            character.attributeCreativity(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.attributeCreativity()).toEqual(value)
        });

        it('can load attributeFitness', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 3;
            character.attributeFitness(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.attributeFitness()).toEqual(value)
        });

        it('can load attributeInfluence', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 3;
            character.attributeInfluence(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.attributeInfluence()).toEqual(value)
        });

        it('can load attributeKnowledge', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 3;
            character.attributeKnowledge(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.attributeKnowledge()).toEqual(value)
        });

        it('can load attributePerception', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 3;
            character.attributePerception(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.attributePerception()).toEqual(value)
        });

        it('can load attributePsyche', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 3;
            character.attributePsyche(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.attributePsyche()).toEqual(value)
        });

        it('can load attributeWillpower', function(){
            //Arrange
            var uuid = character.uuid;
            var value = 3;
            character.attributeWillpower(value);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);

            //Assert
            expect(character.attributeWillpower()).toEqual(value)
        });

        it('can load skills', function(){
            //Arrange
            var uuid = character.uuid;
            var walkSkill = new skillObject('walk', 1, 'fitness', false);
            var talkSkill = new skillObject('talk', 1, 'knowledge', true);
            character.skills.push(walkSkill);
            character.skills.push(talkSkill);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);
            var loadedWalkSkill = character.skills().where(function(skill){return skill.name == walkSkill.name;})[0];
            var loadedTalkSkill = character.skills().where(function(skill){return skill.name == talkSkill.name;})[0];

            //Assert
            expect(loadedTalkSkill.name).toEqual(talkSkill.name);
            expect(loadedTalkSkill.level()).toEqual(talkSkill.level());
            expect(loadedTalkSkill.attribute).toEqual(talkSkill.attribute);
            expect(loadedTalkSkill.isComplex).toEqual(talkSkill.isComplex);
            expect(loadedWalkSkill.name).toEqual(walkSkill.name);
            expect(loadedWalkSkill.level()).toEqual(walkSkill.level());
            expect(loadedWalkSkill.attribute).toEqual(walkSkill.attribute);
            expect(loadedWalkSkill.isComplex).toEqual(walkSkill.isComplex);
        });

		it('can load equipment', function(){
            //Arrange
            var uuid = character.uuid;
            var gunEquipment =  new equipmentObject("gun", 'Weapon', 1, 1, 22, 50, 30, 1);
            var armorEquipment = new equipmentObject("armor", "Armor", 2, 0, 0, 0, 0, 0, 20);
            character.equipment.push(gunEquipment);
            character.equipment.push(armorEquipment);
            character.saveToLocalStorage();
            character = new CharacterBuilder.Character();

            //Act
            character.loadFromLocalStorage(uuid);
            var loadedGunEquipment = character.equipment().where(function(equipment){return equipment.name == gunEquipment.name;})[0];
            var loadedArmorEquipment = character.equipment().where(function(equipment){return equipment.name == armorEquipment.name;})[0];

            //Assert
            expect(loadedGunEquipment.name).toEqual(gunEquipment.name);
            expect(loadedGunEquipment.type).toEqual(gunEquipment.type);
            expect(loadedGunEquipment.mass).toEqual(gunEquipment.mass);
            expect(loadedGunEquipment.accuracy).toEqual(gunEquipment.accuracy);
            expect(loadedGunEquipment.damage).toEqual(gunEquipment.damage);
            expect(loadedGunEquipment.range).toEqual(gunEquipment.range);
            expect(loadedGunEquipment.ammoMax).toEqual(gunEquipment.ammoMax);
            expect(loadedGunEquipment.rateOfFire).toEqual(gunEquipment.rateOfFire);
            expect(loadedGunEquipment.armor).toEqual(gunEquipment.armor);
            expect(loadedGunEquipment.quantity()).toEqual(gunEquipment.quantity());

            expect(loadedArmorEquipment.name).toEqual(armorEquipment.name);
            expect(loadedArmorEquipment.type).toEqual(armorEquipment.type);
            expect(loadedArmorEquipment.mass).toEqual(armorEquipment.mass);
            expect(loadedArmorEquipment.accuracy).toEqual(armorEquipment.accuracy);
            expect(loadedArmorEquipment.damage).toEqual(armorEquipment.damage);
            expect(loadedArmorEquipment.range).toEqual(armorEquipment.range);
            expect(loadedArmorEquipment.ammoMax).toEqual(armorEquipment.ammoMax);
            expect(loadedArmorEquipment.rateOfFire).toEqual(armorEquipment.rateOfFire);
            expect(loadedArmorEquipment.armor).toEqual(armorEquipment.armor);
            expect(loadedArmorEquipment.quantity()).toEqual(armorEquipment.quantity());
        });
    });

	describe('equipment - ', function() {
		beforeEach(function() {
	        character = new CharacterBuilder.Character();
	        character.equipment.push(new equipmentObject("Sig 552"));
	    });

		it('must have equipment', function(){
			expect(character.equipment).not.toBe(undefined);
        	expect(typeof (character.equipment)).toEqual('function');
        	expect(character.equipment()[0]).not.toEqual(undefined);
        	expect(character.equipment()[0].name).toEqual("Sig 552");
		});

		it('- must be able to insert equipment', function(){
			expect(character.insertEquipment).not.toBe(undefined);
        	expect(typeof (character.insertEquipment)).toEqual('function');
		});

		it('- must be able to remove equipment', function(){
			expect(character.removeEquipment).not.toBe(undefined);
        	expect(typeof (character.removeEquipment)).toEqual('function');
		});

		it('- must be able to increase quantity', function(){
			expect(character.increaseQuantity).not.toBe(undefined);
        	expect(typeof (character.increaseQuantity)).toEqual('function');
        	expect(character.equipment()[0].quantity()).toEqual(1);
        	character.increaseQuantity(character.equipment()[0]);
        	expect(character.equipment()[0].quantity()).toEqual(2);
		});

		it('- must be able to decrease quantity', function(){
			expect(character.decreaseQuantity).not.toBe(undefined);
        	expect(typeof (character.decreaseQuantity)).toEqual('function');
        	expect(character.equipment()[0].quantity()).toEqual(1);
        	character.decreaseQuantity(character.equipment()[0]);
        	expect(character.equipment()[0].quantity()).toEqual(0);
		});
	});

	describe('armor rating - ', function() {
		beforeEach(function() {
	        character = new CharacterBuilder.Character();
	        character.equipment.push(new equipmentObject("Light Armor", "Armor", 2, 0, 0, 0, 0, 0, 20));
	    });

		it('must exist', function(){
			expect(character.armorRating).not.toBe(undefined);
        	expect(typeof (character.armorRating)).toEqual('function');        	
		});

		it('must return armor value', function(){
			expect(character.armorRating()).toEqual(20);			
		});

		it('must return the greatest armor value', function(){
			character.equipment.push(new equipmentObject("Medium Armor", "Armor", 2, 0, 0, 0, 0, 0, 30));
    		expect(character.armorRating()).toEqual(30);
		});
	});

	describe('helmet rating - ', function() {
		beforeEach(function() {
	        character = new CharacterBuilder.Character();
	        character.equipment.push(new equipmentObject("Helmet", "Helmet", 2, 0, 0, 0, 0, 0, 10));
	    });

		it('must exist', function(){
			expect(character.helmetRating).not.toBe(undefined);
        	expect(typeof (character.helmetRating)).toEqual('function');        	
		});

		it('must return armor value', function(){
			expect(character.helmetRating()).toEqual(10);
		});

		it('must return the greatest armor value', function(){
			character.equipment.push(new equipmentObject("Heavy Helmet", "Helmet", 2, 0, 0, 0, 0, 0, 15));
    		expect(character.helmetRating()).toEqual(15);
		});
	});

	describe('character points - ', function() {
		beforeEach(function() {
	        character = new CharacterBuilder.Character();	        
	    });

		it('must exist', function(){
			expect(character.characterPoints).not.toBe(undefined);
        	expect(typeof (character.characterPoints)).toEqual('function');        	
		});

		it('must equal 0 when all attributes are -1', function(){
			expect(character.characterPoints()).toEqual(0);
		});

		it('must equal 1 when an attribute is 0', function(){
			character.attributeCreativity(0);
    		expect(character.characterPoints()).toEqual(1);
		});

		it('must equal 4 when an attribute is 1', function(){
			character.attributeCreativity(1);
    		expect(character.characterPoints()).toEqual(4);
		});

		it('must equal -1 when an attribute is -2', function(){
			character.attributeInfluence(-2);			
    		expect(character.characterPoints()).toEqual(-1);
		});

		it('must equal -4 when an attribute is -3', function(){
			character.attributeInfluence(-3);			
    		expect(character.characterPoints()).toEqual(-4);
		});
	});

	describe('skill points - ', function() {
		beforeEach(function() {
	        character = new CharacterBuilder.Character();	        
	    });

		it('must exist', function(){
			expect(character.skillPoints).not.toBe(undefined);
        	expect(typeof (character.skillPoints)).toEqual('function');        	
		});

		it('must equal 0 when all skills are 0 or there are none', function(){
			expect(character.skillPoints()).toEqual(0);
		});

		it('must equal 1 when a skill is level 1', function(){
			character.skills.push(new skillObject("Hand-to-Hand", 1, 'agility', false));
    		expect(character.skillPoints()).toEqual(1);
		});

		it('must equal 4 when a skill is level 2', function(){
			character.skills.push(new skillObject("Hand-to-Hand", 2, 'agility', false));
    		expect(character.skillPoints()).toEqual(4);
		});

		it('must equal 8 when a skill is level 2 and complex', function(){
			character.skills.push(new skillObject("Stealth", 2, 'agility', true));
    		expect(character.skillPoints()).toEqual(8);
		});		
	});
});

describe('skillsObject', function () {
    var character = new window.CharacterBuilder.Character();

    describe('- skill object', function() {
    	character.attributeAgility(2);
        var randomSkill = new skillObject("skill", 0, character.attributeAgility, false);
        it('- must be a skillObject', function () {
            expect(skillObject).toBeDefined();
            expect(randomSkill.name).toBeDefined();
            expect(randomSkill.name).toBe("skill");
            expect(randomSkill.level).toBeDefined();
            expect(randomSkill.level()).toBe(0);
            expect(randomSkill.bonus).toBeDefined();
            expect(randomSkill.bonus()).toBe(2);
            expect(typeof (randomSkill)).toEqual('object');
            expect(randomSkill.isComplex).toBeDefined();
            expect(randomSkill.isComplex).toBe(false);
        });
    });
});

describe('equipmentObject', function () {
    var character = new window.CharacterBuilder.Character();

    describe('- equipment object', function() {    	
        var randomItem = new equipmentObject("item", 'Weapon', 1, 1, 22, 50, 30, 1);
        it('- must be an equipmentObject', function () {
            expect(equipmentObject).toBeDefined();
            expect(randomItem.name).toBeDefined();            
            expect(randomItem.name).toBe("item");
            expect(randomItem.type).toBeDefined();
            expect(randomItem.type).toBe('Weapon');
            expect(randomItem.mass).toBeDefined();
            expect(randomItem.mass).toBe(1);
            expect(randomItem.accuracy).toBeDefined();
            expect(randomItem.accuracy).toBe(1);
            expect(randomItem.damage).toBeDefined();
            expect(randomItem.damage).toBe(22);
            expect(randomItem.range).toBeDefined();
            expect(randomItem.range).toBe(50);
            expect(randomItem.mediumRange).toBeDefined();
            expect(randomItem.mediumRange).toBe(100);
            expect(randomItem.longRange).toBeDefined();
            expect(randomItem.longRange).toBe(200);
            expect(randomItem.extremeRange).toBeDefined();
            expect(randomItem.extremeRange).toBe(400);
            expect(randomItem.ammoMax).toBeDefined();
            expect(randomItem.ammoMax).toBe(30);
            expect(randomItem.rateOfFire).toBeDefined();
            expect(randomItem.rateOfFire).toBe(1);
            expect(randomItem.armor).toBeDefined();
            expect(randomItem.armor).toBe(0);
            expect(randomItem.quantity).toBeDefined();
            expect(randomItem.quantity()).toBe(1);
        });
    });
});