/*!
 * Upheaval Game Engine v@VERSION
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function (window, undefined) {
"use strict";
var meta = {
    'version': '@VERSION'
},
util = {
    cloneObject : (typeof Object.create === 'function') ?
        Object.create :
        function (o) {
            var F = function () {};
            F.prototype = o;
            return new F();
        },
    forEach : (typeof Array.prototype.forEach === 'function') ?
        function (array, action) {
            array.forEach(action);
        } :
        function (array, action) {
            for (var i = 0, l = array.length; i < l; i += 1) {
                action(array[i]);
            }
        },
    keys : (typeof Object.getOwnPropertyNames === 'function') ?
        function (o) {
            return Object.getOwnPropertyNames(o);
        } :
        function (o) {
            var key, accumulator = [];
            for (key in o) {
                if (o.hasOwnProperty(key)) {
                    accumulator.push(key);
                }
            }
            return accumulator;
        },
    extend : function (target, name, fn) {
        return (target[name] = fn);
    }
},
ModuleProto = new function () {
    var self = this;
    this.dir = function () {
        return util.keys(self);
    };
};
