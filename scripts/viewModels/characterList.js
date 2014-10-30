var CharacterList = (function(){
    var self = {};

    self.characters = ko.observableArray();
    self.selectedCharacter = ko.observable(null);
    self.isSelectedCharacterVisible = ko.computed({
        read: function(){
            return self.selectedCharacter()!=null;
    }
    });

    self.createNewCharacter = function(){
        Redirect('editCharacter.html');
    };

    self.removeCharacter = function(characterToRemove){
        var c = self.characters();
        c.remove(characterToRemove);
        self.characters(c);

        var charactersJSON = window.localStorage.getItem(CharacterLocalStorage) || JSON.stringify([]);
        var charactersRaw = JSON.parse(charactersJSON);
        if(!Array.isArray(charactersRaw))
            charactersRaw = [];
        var index;
        var found = false;
        for(index = 0; index<charactersRaw.length; index++)
            if(charactersRaw[index].uuid == characterToRemove.uuid)
            {found = true; break;}
        if(found)
            charactersRaw.splice(index,1);
        window.localStorage.setItem(CharacterLocalStorage, JSON.stringify(charactersRaw));
    };

    self.editCharacter = function(character){
        Redirect('editCharacter.html?loadFromUUID='+character.uuid);
    };

    self.showCharacter = function(character){
        self.selectedCharacter(character);
    };

    self.fetchCharacters = function(){
        var charJSON = window.localStorage.getItem(CharacterLocalStorage);
        var charRaw = charJSON==undefined ? []: JSON.parse(charJSON);
        var charModels = charRaw.select(function(data){ return new Models.Character(data); });
        self.characters(charModels);
    };

    return self;
})();