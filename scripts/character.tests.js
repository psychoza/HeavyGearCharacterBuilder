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
		/*it('must have secondaryTraitUnarmedDamage', function(){
		    expect(character.secondaryTraitUnarmedDamage !== undefined).toBe(true);		    
		    expect(character.secondaryTraitUnarmedDamage() === 15).toBe(true);
			character.attributeBuild(0);
			character.attributeFitness(2);
		    expect(character.secondaryTraitUnarmedDamage() == 25).toBe(true);
		    character.attributePsyche(2);
		    expect(character.secondaryTraitUnarmedDamage() == 30).toBe(true);
		    character.attributeWillpower(3);
		    expect(character.secondaryTraitUnarmedDamage() == 35).toBe(true);
		});*/
	});

	describe('character skills', function() {
		beforeEach(function() {
	        character = new CharacterBuilder.Character();
	    });

		it('- must have skills', function(){
			expect(character.skills !== undefined).toBe(true);
        	expect(typeof (character.skills)).toEqual('function');
        	expect(character.skills()[0] !== undefined).toBe(true);
        	expect(character.skills()[0].name === "Acrobatics").toBe(true);
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
			
		});

		it('- must be able to remove skills', function(){
			
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