var Export = (function(){
    var self = {};

    var canExportValue = ko.observable(null);
    self.isEnabled = ko.computed({read: function(){
        var canExport = canExportValue();

        if(canExport==null) {
            $.support.cors = true;
            canExport = false;
            canExportValue(canExport);
            $.ajax({
                type: 'GET',
                url: 'http://tageverything.org/za/server/isAlive.php',
                dataType: 'jsonp',
                contentType: 'application/json; charset=utf-8'
            })
                .done(function(data){canExportValue(true);})
                .fail(function(){
                    //Intentionally ignored.  This just means we cannot reach the API server
                });
            return false;
        }
        return canExport;
    }});

    self.dataToEcho = function(fileData, fileName){
        $.support.cors = true;
        $.ajax({
            type: 'POST',
            url: 'http://tageverything.org/za/server/characterExport/toEcho.php',
            data: { fileName: fileName, fileData: fileData }
        })
            .done(function(){
                location.assign('http://tageverything.org/za/server/characterExport/fetchTxt.php?fileName='+fileName);
            })
            .fail(function(){
                console.log('fail echo');
            });
    };

    self.characterToEcho = function(character, fileName){
        var ui = new UIASCII();
        var emptyRow = new Widget.Text('');

        //Character Details
        var nameRow = new Widget.HorizontalContainer({minLeftWidth:18});
        nameRow.addLeftWidget(new Widget.Text('Name:'));
        nameRow.addRightWidget(new Widget.Text(character.name));
        ui.addWidget(nameRow);

        var professionRow = new Widget.HorizontalContainer({minLeftWidth:18});
        professionRow.addLeftWidget(new Widget.Text('Profession:'));
        professionRow.addRightWidget(new Widget.Text(character.profession));
        ui.addWidget(professionRow);

        var rankRow = new Widget.HorizontalContainer({minLeftWidth:18});
        rankRow.addLeftWidget(new Widget.Text('Rank:'));
        rankRow.addRightWidget(new Widget.Text(character.rank));
        ui.addWidget(rankRow);

        var natRow = new Widget.HorizontalContainer({minLeftWidth:18});
        natRow.addLeftWidget(new Widget.Text('Nationality:'));
        natRow.addRightWidget(new Widget.Text(character.nationality));
        ui.addWidget(natRow);

        var unitRow = new Widget.HorizontalContainer({minLeftWidth:18});
        unitRow.addLeftWidget(new Widget.Text('Unit:'));
        unitRow.addRightWidget(new Widget.Text(character.unit));
        ui.addWidget(unitRow);

        var xpRow = new Widget.HorizontalContainer({minLeftWidth:18});
        xpRow.addLeftWidget(new Widget.Text('Experience:'));
        xpRow.addRightWidget(new Widget.Text(character.experience));
        ui.addWidget(xpRow);

        var currencyRow = new Widget.HorizontalContainer({minLeftWidth:18});
        currencyRow.addLeftWidget(new Widget.Text('Currency:'));
        currencyRow.addRightWidget(new Widget.Text(character.currency));
        ui.addWidget(currencyRow);

        var currencyOnHandRow = new Widget.HorizontalContainer({minLeftWidth:18});
        currencyOnHandRow.addLeftWidget(new Widget.Text('Currency on hand:'));
        currencyOnHandRow.addRightWidget(new Widget.Text(character.currencyOnHand));
        ui.addWidget(currencyOnHandRow);

        var eDiceRow = new Widget.HorizontalContainer({minLeftWidth:18});
        eDiceRow.addLeftWidget(new Widget.Text('Emergency dice:'));
        eDiceRow.addRightWidget(new Widget.Text(character.emergencyDice));
        ui.addWidget(eDiceRow);

        ui.addWidget(emptyRow);
        ui.addWidget(emptyRow);

        //Attributes
        var attrib = new Widget.Grid({align:'center'});
        attrib.addWidget(new Widget.Text('AGI'),0,0);
        attrib.addWidget(new Widget.Text('APP'),0,1);
        attrib.addWidget(new Widget.Text('BLD'),0,2);
        attrib.addWidget(new Widget.Text('CRE'),0,3);
        attrib.addWidget(new Widget.Text('FIT'),0,4);

        attrib.addWidget(new Widget.Text(character.agility),1,0);
        attrib.addWidget(new Widget.Text(character.appearance),1,1);
        attrib.addWidget(new Widget.Text(character.build),1,2);
        attrib.addWidget(new Widget.Text(character.creativity),1,3);
        attrib.addWidget(new Widget.Text(character.fitness),1,4);

        attrib.addWidget(new Widget.Text('INF'),2,0);
        attrib.addWidget(new Widget.Text('KNO'),2,1);
        attrib.addWidget(new Widget.Text('PER'),2,2);
        attrib.addWidget(new Widget.Text('PSY'),2,3);
        attrib.addWidget(new Widget.Text('WIL'),2,4);

        attrib.addWidget(new Widget.Text(character.influence),3,0);
        attrib.addWidget(new Widget.Text(character.knowledge),3,1);
        attrib.addWidget(new Widget.Text(character.perception),3,2);
        attrib.addWidget(new Widget.Text(character.psyche),3,3);
        attrib.addWidget(new Widget.Text(character.willpower),3,4);

        //Secondary Traits
        var secondaryTraits = new Widget.Grid({align:'center'});
        secondaryTraits.addWidget(new Widget.Text('STR'),0,0);
        secondaryTraits.addWidget(new Widget.Text('HEA'),0,1);
        secondaryTraits.addWidget(new Widget.Text('STA'),0,2);
        secondaryTraits.addWidget(new Widget.Text('UD '),0,3);
        secondaryTraits.addWidget(new Widget.Text('AD '),0,4);
        secondaryTraits.addWidget(new Widget.Text(character.strength),1,0);
        secondaryTraits.addWidget(new Widget.Text(character.health),1,1);
        secondaryTraits.addWidget(new Widget.Text(character.stamina),1,2);
        secondaryTraits.addWidget(new Widget.Text(character.unarmedDamage),1,3);
        secondaryTraits.addWidget(new Widget.Text(character.armedDamage),1,4);

        var attribHeaderContainer = new Widget.VerticalContainer();
        var attributeHeader = new Widget.Text('Attributes');
        var attribWithBorder = new Widget.Border({left:false, right: false});
        attribWithBorder.addWidget(attrib);
        attribHeaderContainer.addTopWidget(attributeHeader);
        attribHeaderContainer.addBottomWidget(attribWithBorder);

        var traitContainer = new Widget.VerticalContainer();
        var traitHeader = new Widget.Text('Secondary Traits');
        var traitWithBorder = new Widget.Border({left:false, right: false});
        traitWithBorder.addWidget(secondaryTraits);
        traitContainer.addTopWidget(traitHeader);
        traitContainer.addBottomWidget(traitWithBorder);

        var traitContainerWithLeftSpacer = new Widget.HorizontalContainer({minLeftWidth:3});
        traitContainerWithLeftSpacer.addLeftWidget(emptyRow);
        traitContainerWithLeftSpacer.addRightWidget(traitContainer);

        var attribAndTraitContainer = new Widget.HorizontalContainer();
        attribAndTraitContainer.addLeftWidget(attribHeaderContainer);
        attribAndTraitContainer.addRightWidget(traitContainerWithLeftSpacer);

        ui.addWidget(attribAndTraitContainer);
        ui.addWidget(emptyRow);
        ui.addWidget(emptyRow);

        //Skills
        var skills = new Widget.Grid();
        skills.addWidget(new Widget.Text('Name'),0,0);
        skills.addWidget(new Widget.Text('Complexity'),0,1);
        skills.addWidget(new Widget.Text('Level'),0,2);
        skills.addWidget(new Widget.Text('Attribute'),0,3);
        skills.addWidget(new Widget.Text('Bonus'),0,4);

        for(var i = 0; i<character.skills.length; i++) {
            var skill = character.skills[i];
            skills.addWidget(new Widget.Text(skill.name),i+1,0);
            skills.addWidget(new Widget.Text(skill.isComplex ? 'Complex' : 'Simple'),i+1,1);
            skills.addWidget(new Widget.Text(skill.level),i+1,2);
            skills.addWidget(new Widget.Text(skill.attribute),i+1,3);
            skills.addWidget(new Widget.Text(skill.bonus),i+1,4);
        }

        var skillContainer = new Widget.VerticalContainer();
        var skillHeader = new Widget.Text('Skills');
        var skillWithBorder = new Widget.Border({left:false, right: false});
        skillWithBorder.addWidget(skills);
        skillContainer.addTopWidget(skillHeader);
        skillContainer.addBottomWidget(skillWithBorder);

        ui.addWidget(skillContainer);
        ui.addWidget(emptyRow);
        ui.addWidget(emptyRow);

//        //Physical Status
//        var phyStatus = new Widget.Grid({align:'center'});
//        phyStatus.addWidget(new Widget.Text('STR'),0,0);
//        phyStatus.addWidget(new Widget.Text('HEA'),0,1);
//        phyStatus.addWidget(new Widget.Text('STA'),0,2);
//        phyStatus.addWidget(new Widget.Text('UD '),0,3);
//        phyStatus.addWidget(new Widget.Text('AD '),0,4);
//        phyStatus.addWidget(new Widget.Text(character.strength),1,0);
//        phyStatus.addWidget(new Widget.Text(character.health),1,1);
//        phyStatus.addWidget(new Widget.Text(character.stamina),1,2);
//        phyStatus.addWidget(new Widget.Text(character.unarmedDamage),1,3);
//        phyStatus.addWidget(new Widget.Text(character.armedDamage),1,4);
//        ui.addWidget(emptyRow);
//        ui.addWidget(emptyRow);
//
//
//        //Movement
//
//        ui.addWidget(emptyRow);
//        ui.addWidget(emptyRow);

        var txt = ui.render();
        self.dataToEcho(txt, fileName);
    };

    return self;
})();
