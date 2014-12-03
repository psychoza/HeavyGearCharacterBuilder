var Title = (function(){
    var self = {};

    var baseText = 'Heavy Gear Character Builder';

    self.text = ko.observable(baseText);
    var updateName = function(name){
        if(name.length > 0) {
            self.text(name + ' :: ' + baseText);
            return;
        }
        self.text(baseText);
    };
    self.watchCharacterName = function(characterName){
        characterName.subscribe(updateName);
        updateName(characterName());
    };

    return self;
})();
