describe('characterList - ', function(){
    it('exists', function(){
        expect(CharacterList).toBeDefined();
    });

    describe('public properties', function(){
        it('has createNewCharacter', function(){
            expect(typeof(CharacterList.createNewCharacter)).toEqual("function");
        });

        it('has showCharacter', function(){
            expect(typeof(CharacterList.showCharacter)).toEqual("function");
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
    });

    describe('createNewCharacter - ', function(){
        var navSpy;
        beforeEach(function(){
            navSpy = spyOn(window,'Redirect').and.callFake(function(){});
        });
        it('navigates to index.html', function(){
            //Arrange/Act
            CharacterList.createNewCharacter();

            //Assert
            expect(navSpy).toHaveBeenCalled();
        });
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
            CharacterList.selectedCharacter({});
            expect(CharacterList.isSelectedCharacterVisible()).toEqual(true);
        });
    });

    describe('showCharacter - ', function(){
        it('puts selected character in selectedCharacter', function(){
            //Arrange
            CharacterList.selectedCharacter(null);
            var dummyChar = {};

            //Act
            CharacterList.showCharacter(dummyChar);

            //Assert
            expect(CharacterList.selectedCharacter()).toEqual(dummyChar);
        });
    });
});
