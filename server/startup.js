if (Meteor.isServer)
{
  Meteor.startup(function() {
    // initialize board, if there is none
    let boardDoc = Boards.findOne({});
    if (!boardDoc)
    {
      Meteor.call('boardInit');
    }

    // indices for collections
    Boards._ensureIndex({"created": 1});
    Fields._ensureIndex({"board": 1});
  });
}
