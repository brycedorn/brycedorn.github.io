var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  openMenu: function(item){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_MENU
    });
  },
  closeMenu: function(item){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CLOSE_MENU
    });
  },
  resizeElements: function(item){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RESIZE_ELEMENTS
    });
  }
}

module.exports = AppActions
