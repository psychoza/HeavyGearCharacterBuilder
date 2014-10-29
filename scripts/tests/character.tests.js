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
	        character.skills.push(new skillObject("Hand-to-Hand", 0, character.attributeAgility, false));
	    });

		it('- must have skills', function(){
			expect(character.skills !== undefined).toBe(true);
        	expect(typeof (character.skills)).toEqual('function');
        	expect(character.skills()[0] !== undefined).toBe(true);
        	expect(character.skills()[0].name === "Hand-to-Hand").toBe(true);
        	expect(character.skills()[0].level() === 0).toBe(true);
        	expect(character.skills()[0].bonus() === -1).toBe(true);
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