// WIP:
// Needs to import exported file!!!!

(function(cb) {
    cb.Character = function() {
        var self = this;
        self.characterName = ko.observable('');
        self.characterClass = ko.observable('');
        self.characterAlignment = ko.observable('');
        self.characterBackground = ko.observable('');
        self.characterRace = ko.observable('');
        self.characterExperience = ko.observable(0);
        var levelArray = {
            "0": 1, "300": 2, "900": 3, "2700": 4, "6500": 5,
            "14000": 6, "23000": 7, "34000": 8, "48000": 9, "64000": 10,
            "85000": 11, "100000": 12, "120000": 13, "140000": 14, "165000": 15,
            "195000": 16,"225000": 17, "265000": 18, "305000": 19, "355000": 20,
        };

        self.characterLevel = ko.computed({
            read: function () {
                var curxp = parseInt(self.characterExperience());
                var curlvl = 1;

                for (var key in levelArray) {
                    if (curxp >= key) {
                        curlvl = levelArray[key];
                    } else {
                        return curlvl;
                    }
                }

                return curlvl;
            },
            write: function (lvl) {
                if (lvl == self.characterLevel())
                    return;
                if (lvl > 20)
                    lvl = 20;
                else if (lvl < 1)
                    lvl = 1;

                for (var key in levelArray) {
                    if (lvl == levelArray[key]) {
                        self.characterExperience(parseInt(key));
                    } 
                }
            }
        });
        
        var modifierCalculation = function (abilityScore) { return ( Math.floor(abilityScore / 2) - 5); }
        self.abilityStrength = ko.observable(10);
        self.abilityStrengthModifier = ko.computed({ read: function() { return modifierCalculation(self.abilityStrength()); } });
        self.abilityDexterity = ko.observable(10);
        self.abilityDexterityModifier = ko.computed({ read: function () { return modifierCalculation(self.abilityDexterity()); } });
        self.abilityConstitution = ko.observable(10);
        self.abilityConstitutionModifier = ko.computed({ read: function () { return modifierCalculation(self.abilityConstitution()); } });
        self.abilityIntelligence = ko.observable(10);
        self.abilityIntelligenceModifier = ko.computed({ read: function () { return modifierCalculation(self.abilityIntelligence()); } });
        self.abilityWisdom = ko.observable(10);
        self.abilityWisdomModifier = ko.computed({ read: function () { return modifierCalculation(self.abilityWisdom()); } });
        self.abilityCharisma = ko.observable(10);
        self.abilityCharismaModifier = ko.computed({ read: function () { return modifierCalculation(self.abilityCharisma()); } });

        self.savingThrowStrength = new modifierProficiency(self.abilityStrengthModifier);
        self.savingThrowDexterity = new modifierProficiency(self.abilityDexterityModifier);
        self.savingThrowConstitution = new modifierProficiency(self.abilityConstitutionModifier);
        self.savingThrowIntelligence = new modifierProficiency(self.abilityIntelligenceModifier);
        self.savingThrowWisdom = new modifierProficiency(self.abilityWisdomModifier);
        self.savingThrowCharisma = new modifierProficiency(self.abilityCharismaModifier);

        self.skillAcrobatics = new modifierProficiency(self.abilityDexterityModifier);
        self.skillAnimalHandling = new modifierProficiency(self.abilityWisdomModifier);
        self.skillArcana = new modifierProficiency(self.abilityIntelligenceModifier);
        self.skillAthletics = new modifierProficiency(self.abilityStrengthModifier);
        self.skillDeception = new modifierProficiency(self.abilityCharismaModifier);
        self.skillHistory = new modifierProficiency(self.abilityIntelligenceModifier);
        self.skillInsight = new modifierProficiency(self.abilityWisdomModifier);
        self.skillIntimidation = new modifierProficiency(self.abilityCharismaModifier);
        self.skillInvestigation = new modifierProficiency(self.abilityIntelligenceModifier);
        self.skillMedicine = new modifierProficiency(self.abilityWisdomModifier);
        self.skillNature = new modifierProficiency(self.abilityIntelligenceModifier);
        self.skillPerception = new modifierProficiency(self.abilityWisdomModifier);
        self.skillPerformance = new modifierProficiency(self.abilityCharismaModifier);
        self.skillPersuasion = new modifierProficiency(self.abilityCharismaModifier);
        self.skillReligion = new modifierProficiency(self.abilityIntelligenceModifier);
        self.skillSleightOfHand = new modifierProficiency(self.abilityDexterityModifier);
        self.skillStealth = new modifierProficiency(self.abilityDexterityModifier);
        self.skillSurvival = new modifierProficiency(self.abilityWisdomModifier);

        self.armorClass = '';
        self.initiative = '';
        self.speed = '';
        self.maxHitPoints = '';
        self.currentHitPoints = '';
        self.tempHitPoints = '';
        self.personalityTraits = '';
        self.ideals = '';
        self.bonds = '';
        self.flaws = '';
        self.age = '';
        self.height = '';
        self.weight = '';
        self.eyes = '';
        self.skin = '';
        self.hair = '';
        self.totalHitDice = '';
        self.currentHitDice = '';
        return this;
    };
})(window.CharacterBuilder = window.CharacterBuilder || {});

var saveCharacter = function (character) {
    window.localStorage.setItem('5ECharacterBuilder', ko.toJSON(character));
};

var loadCharacter = function (character) {
    var loadedCharacter = window.localStorage.getItem('5ECharacterBuilder');

    if (loadedCharacter != undefined) {
        var parsed = JSON.parse(loadedCharacter);
        setCharacterInformation(character, parsed);
    }
};

var setCharacterInformation = function(character, parsedJSON) {
    character.characterName(parsedJSON.characterName);
    character.characterClass(parsedJSON.characterClass);
    character.characterAlignment(parsedJSON.characterAlignment);
    character.characterBackground(parsedJSON.characterBackground);
    character.characterExperience(parsedJSON.characterExperience);

    character.abilityStrength(parsedJSON.abilityStrength);
    character.abilityDexterity(parsedJSON.abilityDexterity);
    character.abilityConstitution(parsedJSON.abilityConstitution);
    character.abilityIntelligence(parsedJSON.abilityIntelligence);
    character.abilityWisdom(parsedJSON.abilityWisdom);
    character.abilityCharisma(parsedJSON.abilityCharisma);

    character.skillAcrobatics.proficient(parsedJSON.skillAcrobatics.proficient);
    character.skillAnimalHandling.proficient(parsedJSON.skillAnimalHandling.proficient);
    character.skillArcana.proficient(parsedJSON.skillArcana.proficient);
    character.skillAthletics.proficient(parsedJSON.skillAthletics.proficient);
    character.skillDeception.proficient(parsedJSON.skillDeception.proficient);
    character.skillHistory.proficient(parsedJSON.skillHistory.proficient);
    character.skillInsight.proficient(parsedJSON.skillInsight.proficient);
    character.skillIntimidation.proficient(parsedJSON.skillIntimidation.proficient);
    character.skillInvestigation.proficient(parsedJSON.skillInvestigation.proficient);
    character.skillMedicine.proficient(parsedJSON.skillMedicine.proficient);
    character.skillNature.proficient(parsedJSON.skillNature.proficient);
    character.skillPerception.proficient(parsedJSON.skillPerception.proficient);
    character.skillPerformance.proficient(parsedJSON.skillPerformance.proficient);
    character.skillPersuasion.proficient(parsedJSON.skillPersuasion.proficient);
    character.skillReligion.proficient(parsedJSON.skillReligion.proficient);
    character.skillSleightOfHand.proficient(parsedJSON.skillSleightOfHand.proficient);
    character.skillStealth.proficient(parsedJSON.skillStealth.proficient);
    character.skillSurvival.proficient(parsedJSON.skillSurvival.proficient);

    character.savingThrowStrength.proficient(parsedJSON.savingThrowStrength.proficient);
    character.savingThrowDexterity.proficient(parsedJSON.savingThrowDexterity.proficient);
    character.savingThrowConstitution.proficient(parsedJSON.savingThrowConstitution.proficient);
    character.savingThrowIntelligence.proficient(parsedJSON.savingThrowIntelligence.proficient);
    character.savingThrowWisdom.proficient(parsedJSON.savingThrowWisdom.proficient);
    character.savingThrowCharisma.proficient(parsedJSON.savingThrowCharisma.proficient);
}

var exportCharacter = function (character) {
    window.open('data:text,' + escape(ko.toJSON(character)));
};

var importCharacter = function() {

};
//    document.getElementById('file').addEventListener('change', readFile, false);

//function readFile(evt) {
//    var files = evt.target.files;
//    var file = files[0];
//    var reader = new FileReader();
            
//    reader.onload = function () {
//        debugger;
//        var list = $('#list');
//        list.text(this.result);
//        console.log(this.result);
//    }

//    reader.readAsText(file);
//}

var availableClasses = ['Cleric', 'Fighter', 'Rogue', 'Wizard'];

var availableAlignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good',
                           'Lawful Neutral', 'Neutral', 'Chaotic Neutral',
                           'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];

var modifierProficiency = function(abilityModifier) {
    var self = this;

    self.proficient = ko.observable(false);
    self.bonus = abilityModifier;
    
    return this;
};