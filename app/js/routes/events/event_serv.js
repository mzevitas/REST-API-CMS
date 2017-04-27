
  app.service('EventsService', ['SERVER', '$http',
    function (SERVER, $http) {

      var endpoint = SERVER.URL;
      // var api = '?apiKey=ZV5Qc-g5yNbRuU15JzBfdYGGEbrpMS_c';
      this.getEvent = function (res) {
        return $http.get(endpoint + '/events', {params: {apiKey: SERVER.CONFIG.apiKey}});

    };
  }]);
