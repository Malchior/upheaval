/*!
 * HTMLBuilder
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
sys.builder = new function () {
    var self = this,
        forEach = util.forEach,
        keys = util.keys;
    this.version = 1.0;
    /*
     * Creates an elements, sets its properties, and inserts
     * its contents. Takes the following hash/object literal
     * as an argument: (everything is optional)
     * 
     * {
     *     'tag': <tagname>,
     *     'attrs': {<key>: <value>},
     *     'content': <content>
     * }
     * 
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
     * Creates multiple elements and puts them in a
     * DocumentFragment. A defList looks like this:
     *
     * [
     *     {
     *          "tag": <tagname>,
     *          "attrs": {<key>: <value>},
     *          "content": <content>
     *     }, ...
     * ]
     *
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
     * Appends a DocumentFragment (or similar object) to the
     * target elements.
     */
    this.insert = function (target, frag, callback) {
        if (!callback) {
            return target.appendChild(frag);
        } else {
            return callback(target.appendChild(frag));
        }
    };
    /*
     * Creates one element and appends it to the target element.
     * (A shortcut for build and insert)
     */
    this.make = function (target, hash, callback) {
        return self.insert(target, self.build(hash));
    };
    /*
     * Creates multiple elements and appends them to the target
     * element. (A shortcut for polyBuild and insert)
     */
    this.factory = function (defList, repeat, callback) {
        var frag = document.createDocumentFragment();
        return (function worker(i) {
            if (i > 0) {
                self.insert(frag, self.polyBuild(defList));
                return worker(i - 1);
            }
            return (!!callback) ? callback(frag) : frag;
        }(repeat));
    };
};
