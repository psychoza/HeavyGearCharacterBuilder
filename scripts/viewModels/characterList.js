var CharacterList = (function(){
    var self = {};
    self.debugme = function(){debugger;};
    self.characters = ko.observableArray();
    self.selectedCharacter = ko.observable(null);
    self.selectedCharacterASCII = ko.computed({read:function(){
            var char = self.selectedCharacter();
            if(!char)
                return '';
            var txt = Export.convertCharacterToASCII(char);
            return txt;
        }
    });
    self.isSelectedCharacterVisible = ko.computed({
        read: function(){
            return self.selectedCharacter()!=null;
    }
    });

    self.createNewCharacter = function(){
        self.Character.createNewCharacter();
    };

    self.removeCharacter = function(){
        var characterToRemove = self.selectedCharacter();

        var c = self.characters();
        c.remove(characterToRemove);
        self.characters(c);
        if(self.selectedCharacter()==characterToRemove)
            self.selectedCharacter(null);

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
        self.Character.createNewCharacter();
    };

     self.saveCharacter = function(){
       var character = new Models.Character(self.Character.getModelData());
       self.Character.saveToLocalStorage();
       self.refreshCharacters();
     };

    self.editCharacter = function(character){
        self.Character.loadFromLocalStorage(character.uuid);
        self.selectedCharacter(character);
    };

    self.refreshCharacters = function() {
      var charJSON = window.localStorage.getItem(CharacterLocalStorage);
      var charRaw = charJSON==undefined ? []: JSON.parse(charJSON);
      var charModels = charRaw.select(function(data){ return new Models.Character(data); });
      self.characters(charModels);
    }

    self.fetchCharacters = function(){
        self.refreshCharacters();
        if(self.characters().length>0)
            self.selectedCharacter(self.characters()[0]);
    };

    self.export = function(){
        var d = new Date();
        var dStr = d.getFullYear() + '-'+ d.getMonth() + '-' + d.getDay();
        var character = self.selectedCharacter();
        Export.characterToEcho(character, character.name +' '+ dStr +'.txt');
    };

    return self;
})();
