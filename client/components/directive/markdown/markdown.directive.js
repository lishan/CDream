'use strict';

angular.module('cdreamApp')
    .directive('markdown', function ($http, notificationService, markdownPro, hotkeys) {
        return {
            restrict: 'E',
            template: '<textarea data-provide="markdown"><div ng-bind-html="message"></div></textarea>',
            scope: {
                model: '=ngModel',
                readonly: '@readonly',
                height: '@height'
            },
            link: function (scope, element, attrs) {
                console.log(scope.model);
                var $textarea = element.find("textarea");
                if (scope.height !== undefined) {
                    $textarea.attr("data-height", scope.height);
                }
                if (scope.readonly !== undefined && scope.readonly === 'true') {
                    $textarea.attr("readonly", "true");
                    $textarea.markdown();
                    scope.message = markdownPro.changeHtml(scope.model.info);
                } else {
                    $textarea.markdown({
                        onBlur: function (e) {
                            $http.put('/api/dreams/' + scope.model._id, {info: scope.model.info}).success(function () {
                                notificationService.success("保存" + scope.model.name + "成功");
                            }).error(function () {
                                notificationService.success("保存" + scope.model.name + "失败");
                            });
                        }
                    });
                }
            }
        };
    });
