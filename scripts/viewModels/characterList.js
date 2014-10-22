var CharacterList = (function(){
    var self = {};

    self.characters = ko.observableArray();

    self.createNewCharacter = function(){
        Redirect('index.html');
        //window.location.assign('index.html');
    };

    self.showCharacter = function(character){
        alert('not implemented');
    };

    return self;
})();