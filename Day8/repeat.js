var app = angular.module('listApp', []); 

app.controller('ListCtrl', function($scope) {
  $scope.todos = [];
  
  $scope.addTodo = function() {
    var newTodo = {
      name: $scope.todoName,
      dueDate: $scope.dueDate
    };
    $scope.todos.push(newTodo);
    $scope.todoName = "";
    $scope.dueDate = "";
  };
});