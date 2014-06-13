'use strict';

window.app.factory('Meals', function () {
	var mealList = [];
	return {
		add: function (entry) {
			mealList.push(entry);
		},
		get: function () {
			return mealList;
		},
		getLast: function () {
			return mealList[mealList.length-1];
		},
		destroy: function () {
			mealList = [];
		}
	};
});

window.app.factory('subTotal', ['tipTotal', 'tip', function (tipTotal, tip) {
	return function (meal) {
		var sub = {};
		sub.subtotal = meal.price + (meal.price * (meal.taxPerc / 100));
		sub.tip = tip(meal);
		sub.total = sub.subtotal + sub.tip;
		return sub;
	};
}]);

window.app.factory('tipTotal', function () {
	var total = 0;
	return {
		increase: function (num) {
			total += num;
		},
		get: function () {
			return total;
		},
		reset: function () {
			total = 0;
		}
	};
});

window.app.factory('tip', function () {
	return function (meal) {
		// Tip is calculated after tax
		return ( meal.price * (1 + (meal.taxPerc / 100) ) ) * (meal.tipPerc / 100);
	};
});

window.app.controller('MealCtrl', ['$scope', 'Meals', 'tipTotal', 'tip', function ($scope, Meals, tipTotal, tip) {
	$scope.data = {};
	$scope.submit = function () {
		if ($scope.detailsForm.$valid) {
			Meals.add($scope.data);
			tipTotal.increase(tip($scope.data));
			$scope.cancel();
		}
	};
	$scope.cancel = function () {
		$scope.data = {};
	};
}]);

window.app.controller('ChargesCtrl', ['$scope', 'Meals', 'subTotal', function ($scope, Meals, subTotal) {
	$scope.$watchCollection(function () {
		return Meals.getLast();
	},
	function (data) {
		$scope.meal = subTotal(data);
	});
}]);

window.app.controller('EarningsCtrl', ['$scope', 'Meals', 'tipTotal', function ($scope, Meals, tipTotal) {
	$scope.count = Meals.get().length;
	$scope.tipTot = tipTotal.get();
	
	$scope.average = function () {
		//Return 0 as a default
		return $scope.count ? ($scope.tipTot / $scope.count):0;
	};

	$scope.reset = function () {
		Meals.destroy();
		tipTotal.reset();
		$scope.count = $scope.tipTot = 0;
	};
}]);