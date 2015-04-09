var Main = window.NBack.Main;

Main.service("MainHelpers", function() {
  return {
    getNxNNullCells: function getNxNNullCells(size) {
      var cells = [];
      for (var i = size - 1; i >= 0; i--) {
        cells[i] = [];
        for (var j = size - 1; j >= 0; j--) {
          cells[i][j] = null;
        }
      }
      return cells;
    },
    callMethodOnReceivedMessage: function callMethodOnReceivedMessage(message, scope, obj) {
      scope.$on(message, function(event, broadcastedData) {
        var command = broadcastedData.shift(0);
        obj[command](broadcastedData[0]);
      });
    }
  };
});
