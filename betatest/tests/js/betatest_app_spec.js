// OpenCraft -- tools to aid developing and hosting free software projects
// Copyright (C) 2015 OpenCraft <xavier@opencraft.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

(function() {
'use strict';

// Tests //////////////////////////////////////////////////////////////////////

describe('BetaTestApp', function() {
    var $scope,
        httpBackend,
        errors;

    beforeEach(function() {
        angular.mock.module('BetaTestApp');
    });

    describe('Registration controller', function() {
        beforeEach(inject(function($controller, $rootScope, $httpBackend) {
            $scope = $rootScope.$new();
            $scope.form = {};
            $scope.registration = {};
            httpBackend = $httpBackend;
            errors = {};
            $controller('Registration', {
                $scope: $scope,
                djangoForm: {
                    setErrors: function(form, err) {
                        errors = err;
                    }
                }
            });
        }));

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('displays server validation', function(done) {
            var response = {username: ['This username is already taken.']};
            httpBackend.whenGET('/api/v1/beta/register/validate/').respond(response);
            $scope.form.username = {$dirty: true};
            $scope.validate();
            setTimeout(function() {
                httpBackend.flush();
                expect(errors).toEqual(response);
                done();
            }, 501);
        });

        ['subdomain', 'username', 'email', 'password', 'password_confirmation'].forEach(function(field) {
            it('triggers server-side validation when ' + field + ' changes', function(done) {
                spyOn($scope, 'validate');
                $scope.registration[field] = 'changed';
                $scope.form[field] = {$dirty: true};
                $scope.$digest();
                setTimeout(function() {
                    expect($scope.validate).toHaveBeenCalled();
                    done();
                }, 501);
            });
        });
    });
});

})();
