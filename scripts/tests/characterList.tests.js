describe('characterList - ', function(){
    it('exists', function(){
        expect(CharacterList).toBeDefined();
    });

    describe('public properties', function(){
        it('has createNewCharacter', function(){
            expect(typeof(CharacterList.createNewCharacter)).toEqual("function");
        });

        it('has list of characters', function(){
            expect(ko.isObservable(CharacterList.characters)).toEqual(true);
            expect(Array.isArray(CharacterList.characters())).toEqual(true);
        });

        it('has fetchCharacters', function(){
            expect(typeof(CharacterList.fetchCharacters)).toEqual("function");
        });

        it('has isSelectedCharacterVisible', function(){
            expect(ko.isObservable(CharacterList.isSelectedCharacterVisible)).toEqual(true);
        });

        it('has removeCharacter', function(){
            expect(typeof(CharacterList.removeCharacter)).toEqual("function");
        });

        it('has editCharacter', function(){
            expect(typeof(CharacterList.editCharacter)).toEqual("function");
        })
    });

    describe('fetchCharacters - ', function(){
        it('can fetch characters from storage', function(){
            //Arrange
            var charModels = [
                new Models.Character({name:'joe'}),
                new Models.Character({name:'bob'}),
                new Models.Character({name:'sue'}),
            ];
            window.localStorage.setItem(CharacterLocalStorage, JSON.stringify(charModels));
            CharacterList.characters([]);

            //Act
            CharacterList.fetchCharacters();

            //Assert
            expect(CharacterList.characters()).toEqual(charModels);
        });
    });

    describe('isSelectedCharacterVisible - ', function(){
        it('returns false when no character selected', function(){
            CharacterList.selectedCharacter(null);
            expect(CharacterList.isSelectedCharacterVisible()).toEqual(false);
        });
        it('returns true when character selected', function(){
            CharacterList.selectedCharacter( new Models.Character() );
            expect(CharacterList.isSelectedCharacterVisible()).toEqual(true);
        });
    });


    describe('removeCharacter - ', function(){
        it('can remove a character', function(){
            //Arrange
            var charModels = [
                new Models.Character({name:'joe'}),
                new Models.Character({name:'bob'}),
                new Models.Character({name:'sue'}),
            ];
            window.localStorage.setItem(CharacterLocalStorage, JSON.stringify(charModels));
            CharacterList.fetchCharacters();

            //Act
            CharacterList.removeCharacter(CharacterList.characters()[1]);
            var rawCharacterStorage = JSON.parse(window.localStorage.getItem(CharacterLocalStorage));

            //Assert
            expect(CharacterList.characters().length).toEqual(2);
            expect(rawCharacterStorage.length).toEqual(2);
        });

        it('sets selected to null if deleting selected', function(){
            //Arrange
            var charModels = [
                new Models.Character({name:'joe'}),
                new Models.Character({name:'bob'}),
                new Models.Character({name:'sue'}),
            ];
            window.localStorage.setItem(CharacterLocalStorage, JSON.stringify(charModels));
            CharacterList.fetchCharacters();
            CharacterList.selectedCharacter(CharacterList.characters()[1]);

            //Act
            CharacterList.removeCharacter(CharacterList.characters()[1]);
            var rawCharacterStorage = JSON.parse(window.localStorage.getItem(CharacterLocalStorage));

            //Assert
            expect(CharacterList.selectedCharacter()).toEqual(null);
        });
    });
});
