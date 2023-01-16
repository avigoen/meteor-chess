Rules = {
  isInCheck: function(colour, boardId)
  {
    let kingDoc = Fields.findOne({board: boardId, piece: 'king', "colour": colour});
    if (!kingDoc)
      return false;
    let attackers = null;
    if (colour === 'white')
      attackers = Fields.find({board: boardId, colour: 'black'});
    else
      attackers = Fields.find({board: boardId, colour: 'white'});
    attackers = attackers.fetch();
    for (let aDoc of attackers)
    {
    	if (Moves.allowed(aDoc._id, kingDoc._id, boardId))
    	  return true;
    }
    return false;
  }
};
