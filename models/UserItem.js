var userItem = function(item, rating, madeIt)
{
  var itemModel = {
  item : item,
  rating : rating,
  madeIt : madeIt
};

  return itemModel;
}

module.exports = userItem;
