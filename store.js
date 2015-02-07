var items = []

var notifyComponents = function() {
  $(ListStore).trigger('storeHasChanged')
}

var findItemById = function(id) {
  return items.filter(function(item) {
    return item.id === id
  })[0]
},

ListStore = {

  getItems: function() {
    return items
  },

  loadItems: function() {
    var loadRequest = $.ajax({
      type: 'GET',
      url: 'https://listalous.herokuapp.com/lists/mhuerster'
    });
    loadRequest.done(function(dataFromServer) {
      items = dataFromServer.items;
      notifyComponents();
    });
  },
  addItem: function(itemDescription) {
    var creationRequest = $.ajax({
      type: 'POST',
      url: 'http://listalous.herokuapp.com/lists/mhuerster/items',
      data: { description: itemDescription, completed: false }
    });

    creationRequest.done(function(itemDataFromServer) {
      items.push(itemDataFromServer);
      notifyComponents();
    });
  },
  toggleCompleteness: function(itemId) {
    var item = findItemById(itemId);
    var currentCompletedValue = item.completed;

    var updateRequest = $.ajax({
      type: 'PUT',
      url: 'http://listalous.herokuapp.com/lists/mhuerster/items/' + itemId,
      data: { completed: !currentCompletedValue }
    });

    updateRequest.done(function(itemData) {
      item.completed = itemData.completed;
      notifyComponents();
    });
  },
  deleteItem: function(itemId) {
    var deleteRequest = $.ajax({
      type: 'POST',
      url: 'http://listalous.herokuapp.com/lists/mhuerster/items/' + itemId,
      data: { '_method': 'delete'}
    });

    deleteRequest.done(function(itemData) {
      for(i=0;i<items.length;i++){
        if (items[i].id === itemId) {
          items.splice(i,1);
        }
      }
      notifyComponents();
    });
  }
}