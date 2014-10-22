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
});
