var LocalStorage = (function(){
    var self = {};

    var verifyCharacterLocalStorage = function(){
        if(!CharacterLocalStorage)
            throw "CharacterLocalStorage must be defined to call LocalStorage.saveCharacter";
    };

    self.saveCharacter = function(modelData){
        verifyCharacterLocalStorage();
        var charactersJSON = window.localStorage.getItem(CharacterLocalStorage) || JSON.stringify([]);
        var charactersRaw = JSON.parse(charactersJSON);
        if(!Array.isArray(charactersRaw))
            charactersRaw = [];
        var index;
        var found = false;
        for(index = 0; index<charactersRaw.length; index++)
            if(charactersRaw[index].uuid == modelData.uuid)
            {found = true; break;}
        if(!found)
            charactersRaw.push( new Models.Character(modelData) );
        else
            charactersRaw[index] = new Models.Character(modelData)
        window.localStorage.setItem(CharacterLocalStorage, JSON.stringify(charactersRaw));
    };

    self.getCharacter = function(uuid){
        var charactersJSON = window.localStorage.getItem(CharacterLocalStorage) || JSON.stringify([]);
        var charactersRaw = JSON.parse(charactersJSON);
        if(!Array.isArray(charactersRaw))
            charactersRaw = [];
        var characterToReturn = null;
        charactersRaw.foreach(function(c){
            if(c.uuid == uuid)
                characterToReturn = c;
        });
        if(characterToReturn==null)
            console.log('Warning: Could not find character UUID='+uuid);
        return characterToReturn;
    };

    return self;
})();
