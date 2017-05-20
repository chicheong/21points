(function() {
    'use strict';

    angular
        .module('healthApp')
        .controller('BloodPressureDetailController', BloodPressureDetailController);

    BloodPressureDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'BloodPressure', 'User'];

    function BloodPressureDetailController($scope, $rootScope, $stateParams, previousState, entity, BloodPressure, User) {
        var vm = this;

        vm.bloodPressure = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('healthApp:bloodPressureUpdate', function(event, result) {
            vm.bloodPressure = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
