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
        Redirect('index.html');
    };

    self.removeCharacter = function(){
        throw "Not implemented";
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