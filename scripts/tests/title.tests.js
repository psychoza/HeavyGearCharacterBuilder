describe('Title - ', function(){
    it('exists', function(){
        expect(Title).toBeDefined();
    });

    describe('public properties - ', function(){
        it('has text', function(){
            expect(ko.isObservable(Title.text)).toEqual(true);
        });
        it('has watchCharacterName', function(){
            expect(typeof(Title.watchCharacterName)).toEqual("function");
        });
    });

    describe('text - ', function(){
        it('has default text', function(){
            expect(Title.text()).toEqual('Heavy Gear Character Builder');
        });
    });

    describe('watchCharacterName - ', function(){
        it('updates text when passed in observable changes', function(){
            //Arrange
            var name = ko.observable('');
            Title.watchCharacterName(name);
            var beforeChange = Title.text();

            //Act
            name('new name');
            var afterChange = Title.text();

            //Assert
            expect(beforeChange).toEqual('Heavy Gear Character Builder');
            expect(afterChange).toEqual(name() + ' :: Heavy Gear Character Builder')
        });
    });
});