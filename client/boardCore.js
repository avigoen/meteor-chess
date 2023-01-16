Template.boardCore.created = function() {
  this.subscribe('boards');
  this.subscribe('fields');
};

Template.boardCore.events({
  'click td': function(event) {
    if (event.currentTarget.id.startsWith('field_'))
    {
      let fieldID = event.currentTarget.id.substr(6);
      if (Session.equals('start', undefined))
      {
        let dbField = Fields.findOne({_id: fieldID, board: Session.get('board')});
        if (dbField && dbField.piece !== 'empty')
              //Getting start position
          Session.set('start', fieldID);
      }
      else if (Session.equals('start', fieldID))
      {
        Session.set('start', undefined);
        Session.set('end', undefined);
      }
      else if (Session.equals('end', fieldID))
      {
        Session.set('end', undefined);
      }
      else if (!Session.equals('start', undefined))
      {
        //Setting End Position
        Session.set('end', fieldID);
        Meteor.call('performMove', Session.get('start'), Session.get('end'), 'queen', function(err, result){
          if (err)
          {
            Session.set('end', undefined);
            Session.set('start', undefined);
            alert('Move could not be performed: ' + err.reason);
          }
          else if (result)
          {
            Session.set('end', undefined);
            Session.set('start', undefined);
          }
          else
          {
            Session.set('end', undefined);
            Session.set('start', undefined);
            alert('Move could not be performed, because it is against the rules.');
          }
        });
      }
    }
  }
});

Template.boardCore.helpers({
  rows: function(){
    var res = [];
    for (let i = 8; i>= 1; --i)
    {
      let data = Fields.find({row: i, board: Session.get('board')}, {sort: {column: 1}});
      let f = data.fetch();
      res.push({fields: f});
    }

    var light = true;
    for(let i = 0; i < 8; ++i)
    {
      for (let j = 0; j < res[i].fields.length; ++j)
      {
        // determine background colour of field
        if (light)
        {
          res[i].fields[j].background = '#cccccc';
        }
        else
        {
          res[i].fields[j].background = '#999999';
        }
        light = !light;
        // check whether field is start or end field
        if (Session.equals('start', res[i].fields[j]._id) || Session.equals('end', res[i].fields[j]._id))
        {
          res[i].fields[j].background = '#5cb85c';
        }
        // change rook to tower, because that is the name of the glyphicon
        if (res[i].fields[j].piece == 'rook')
        {
          res[i].fields[j].piece = 'tower';
        }
      }
      light = !light;
    }

    return res;
  }
});
