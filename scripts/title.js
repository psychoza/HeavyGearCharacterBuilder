var Title = (function(){
    var self = {};

    var baseText = 'Heavy Gear Character Builder';

    self.text = ko.observable(baseText);
    self.watchCharacterName = function(characterName){
        characterName.subscribe(function(name){
            if(name.length > 0) {
                self.text(name + ' :: ' + baseText);
                return;
            }
            self.text(baseText);
        });
    };

    return self;
})();
