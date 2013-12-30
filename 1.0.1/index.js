/**
 * @fileoverview 
 * @author wb-majun<wb-majun@taobao.com>
 * @module touchCrop
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class TouchCrop
     * @constructor
     * @extends Base
     */
    function TouchCrop(comConfig) {
        var self = this;
        //调用父类构造函数
        TouchCrop.superclass.constructor.call(self, comConfig);
    }
    S.extend(TouchCrop, Base, /** @lends TouchCrop.prototype*/{

    }, {ATTRS : /** @lends TouchCrop*/{

    }});
    return TouchCrop;
}, {requires:['node', 'base']});



