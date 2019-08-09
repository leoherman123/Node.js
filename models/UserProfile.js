//using a class to create and store data for the userProfile
class userProfile
{
  //class declaration
  constructor(i)
  {
    this.userId = i;
    this.userItemList = [];
  }

  // creating a function called addItem to add items to the user list
  addItem (item)
  {
    //if the item is
    if(this.userItemList.indexOf(item) === -1)
    {
      this.userItemList.push(item);
    }
    else
    {
      this.userItemList[this.userItemList.indexOf(item)] = item;
    };
  }

  // creating a function called removeItem to remove item from the userList
  removeItem (item)
  {
    for(var i = 0; i < this.userItemList.length; i++)
    {
      if(this.userItemList[i] === item)
      {
        this.userItemList.splice(i, i+1);
      };
    };
  }

  // creating a fucntion called updateItem to update the userItem
  updateItem (rating, madeIt)
  {
    //updating the item is not used another way was used
  }

  // creating a function called getItems to get all the items on the list
  getItems ()
  {
    //returning the
    return this.userItemList;
  }

  emptyProfile ()
  {
    //if the user empty the profile set array to empty
    this.userItemList = [];
  }
}

module.exports = userProfile;
