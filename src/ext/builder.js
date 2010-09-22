/**
 * HTMLBuilder
 *
 * A micro-library designed to make creating/mainipulating DOM Elements
 * fast and easy
 *
 * @package     HTMLBuilder
 * @author      Carlos Killpack
 * @copyright   Copyright (c) 2010 Carlos Killpack
 * @license     New BSD
 * @link        http://dev.projectbeyond.org/htmlbuilder
 *
 * Copyright (c) 2010, Carlos Killpack
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 
 * * Redistributions of source code must retain the above copyright
 * * notice, this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright
 * * notice, this list of conditions and the following disclaimer in
 * * the documentation and/or other materials provided with the
 * * distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
 * OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 * WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
var Builder = (function () {
    /*
     * Iterate over an array (in a functional style)
     *
     * @param   {Array}       array   An array to iterate over
     * @param   {Function}    action  A function to use with each item(?)
     */
    var forEach = function (array, action) {
            for (var i = 0, l = array.length; i < l; i += 1) {
                action(array[i]);
            }
        },
    /*
     * Enumerate local object members
     *
     * @param   {Object}      o   The object
     * @returns {Array}           Enumerated members
     */
        keys = function (o) {
            var key, accumulator = [];
            for (key in o) {
                if (o.hasOwnProperty(key)) {
                    accumulator.push(key);
                }
            }
            return accumulator;
        },
        /*
         * @constructor
         */
        EX = function () {
            var self = this;
            /*
             * Creates an elements, sets its properties, and inserts
             * its contents
             *
             * @param   {String}    tag         The type of element you want
             * @param   {Object}    attrs       A hash of the attributes you
             *                                  want your element to have
             * @param   {String}    content     The content
             * @param   {Function}  callback    An (optional) callback
             * @returns {Object}                The created element
             * @returns {Function}              The callback
             */
            this.build = function (hash, callback) {
                var el = document.createElement(hash.tag);
                if (!!hash.attrs) {
                    forEach(keys(hash.attrs), function (key) {
                        el.setAttribute(key, hash.attrs[key]);
                    });
                }
                if (!!hash.content) {
                    el.appendChild(document.createTextNode(hash.content));
                }
                return (!!callback) ? callback(el) : el;
            };
            /*
             * Creates multiple elements and puts them in a DocumentFragment
             *
             * defList example:
             *
             * [
             *     {"tag":"h1", "attrs":{"class":"teh_awezum"}, "content":"Belch!"},
             *     {"tag":"p", "attrs":{"id":"lolz"}, "content":"Something really groovy"}
             * ]
             *
             * @param   {Array}     defList     An array of objects defining
             *                                  the tags you want created
             * @param   {Function}  callback    An (optional) callback
             * @returns {Object}                The DocumentFragment
             * @returns {Function}              The callback
             */
            this.polyBuild = function (defList, callback) {
                var frag = document.createDocumentFragment();
                forEach(defList, function (def) {
                    frag.appendChild(self.build({
                        'tag': def.tag,
                        'attrs': def.attrs,
                        'content': def.content
                    }));
                });
                return (!!callback) ? callback(frag): frag;
            };
            /*
             * Appends a DocumentFragment (or related object) to the
             * targer elements
             *
             * @param   {Object}    target      The element we're appending
             * @param   {Object}    frag        The DocumentFragment
             * @param   {Function}  callback    The (optional) callback
             * @returns {Object}                The target element
             * @returns {Function}              The callback
             */
            this.insert = function (target, frag, callback) {
                if (!callback) {
                    return target.appendChild(frag);
                } else {
                    return callback(target.appendChild(frag));
                }
            };
            /*
             * Creates one elements and appends it to the target element
             *
             * @see #insert
             * @see #build
             */
            this.make = function (target, hash, callback) {
                return self.insert(target, self.build(hash));
            };
            /*
             * Creates multiple elements and appends them to the target element
             *
             * @see  #insert
             * @see #polyBuild
             */
            this.factory = function (defList, repeat, target, callback) {
                var frag = document.createDocumentFragment();
                return (function worker(i) {
                    if (i > 0) {
                        self.insert(frag, self.polyBuild(defList));
                        /*self.insert(frag, self.polyBuild(defList));
                        self.insert(frag, self.polyBuild(defList));
                        self.insert(frag, self.polyBuild(defList));
                        self.insert(frag, self.polyBuild(defList));*/
                        return worker(i - 1);
                    }
                    return self.insert(target, frag, callback);
                }(repeat));
            };
        };
    return EX;
}());
