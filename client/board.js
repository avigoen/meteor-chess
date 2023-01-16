Template.board.created = function() {
  // If no board was selected yet, go back to board selection.
  if (Session.equals('board', undefined) || Session.equals('board', null)
    || Session.equals('board', ""))
  {
    console.log('Board is not defined, switching to board selection.');
    Router.go('boardSelection');
    return;
  }
  this.subscribe('boards');
};

Template.board.helpers({
  toMove: function(){
    let bDoc = Boards.findOne({_id: Session.get('board')});
    if (bDoc)
    {
      return bDoc.toMove;
    }
    return null;
  },
  inCheckWhite: function() {
    return Rules.isInCheck('white', Session.get('board'));
  },
  inCheckBlack: function() {
    return Rules.isInCheck('black', Session.get('board'));
  },
  winner: function() {
    let bDoc = Boards.findOne({_id: Session.get('board')});
    if(bDoc){
      return bDoc.winner;
    }
    /* if(!bDoc){
      Router.go('boardSelection');
      return null;
    }
    if (bDoc.winner)
    {
      alert(bDoc.winner.charAt(0).toUpperCase()+bDoc.winner.slice(1)+" is the winner!");
      Meteor.call('boardDelete', Session.get('board'), function(err, result) {
        if (err)
          alert('Board was NOT deleted: ' +err.reason);
        else
          Session.set('board', undefined);
          Session.set('start', undefined);
          Session.set('end', undefined);
          Router.go('boardSelection');
      });
    }
    else{
      return bDoc.winner;
    } */
  }
});
