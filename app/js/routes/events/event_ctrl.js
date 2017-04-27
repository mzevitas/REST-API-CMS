

  app.controller('EventsCtrl', ['$scope', '$http', 'EventsService', 'SERVER',
   function($scope, $http, EventsService, SERVER) {

     var vm = this;
      vm.state = {event:[]};
      vm.getEvent = function (res) {
       EventsService.getEvent(res).then(function(res){
       $scope.events = res.data;
       console.log(res.data);
        });
      };
      vm.getEvent({res:''});

   }
  ]);
