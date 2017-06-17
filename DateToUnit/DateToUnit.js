/**
 * Created by mykar on 2017/2/20.
 */
(function (window) {
    function kboy() {
        return new kboy.prototype.init(IsMs);
    };

    kboy.fn = kboy.prototype = {
        constructor: kboy,
        init:function () {
            return this;
        }
    }
    //赋值原型
    kboy.fn.init.prototype = kboy.fn;

    kboy.fn.extend = kboy.extend = function () {
        if (arguments.length === 0) return this;
        //中心思想：要完成拷贝——>将一个对象的方法、属性拷贝到另一个对象中
        var target,sources = [];
        if (arguments.length === 1) {
            target = this;
            sources.push(arguments[0]);
        } else {
            target = arguments[0];
            sources.push.apply(sources, arguments);
            sources.splice(0, 1);
        }
        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];
            for (var key in source) {
                target[key] = source[key];
            }
        }
        return target;
    };

    kboy.extend({
        /**
         * 时间秒数(毫秒)转换为日期格式
         * 参数: unit:时间(毫秒),date:输出的时间格式,不传参返回空,防止输出1970-01-01.
         * 参数: boolean:是否精确到毫秒
         * 默认输出格式:"YY年MM月DD日 h:m:s"
         * */
        UnitToDate: function (unit,date,boolean) {
            //没有参数传入或传入0直接返回空;
            if(unit == undefined || unit==0){return "";}
            //设置默认输出格式;
            date = date || "YY年MM月DD日 h:m:s";
            date = boolean?(date+":ms"):date;

            var myDate = new Date(unit);
            var Y = myDate.getFullYear(),
                M = myDate.getMonth()+1,
                D = myDate.getDate(),
                h = myDate.getHours(),
                m = myDate.getMinutes(),
                s = myDate.getSeconds(),
                ms = myDate.getMilliseconds();
            var obj = {
                'ms':ms,
                'Y':Y,
                'M':M<10? '0'+M:M,
                'D':D<10? '0'+D:D,
                'h':h<10? '0'+h:h,
                'm':m<10? '0'+m:m,
                's':s<10? '0'+s:s
            }

            for(var k in obj){
                date = date.replace(new RegExp(k+'+','g'),obj[k])
            }
            return date;
        },
        /**
         * 日期格式转换为时间秒数(毫秒)
         * 参数:支持时间格式(2017年02月21日,2017-02-21,2017/02/21,02/21/2017)
         * 输出:时间秒数(毫秒)
         * */
        DateToUnit: function (date,boolean) {
            var reg = /\d{4}\-\d{1,2}\-\d{1,2}/;
            if(reg.test(date)){
                date = date.replace(new RegExp("-","g"),"/");
            }else {
                date = date.replace(/年|月|日/g,'/');
            };
            var times = new Date(date).getTime();
            return boolean?times:parseInt(times/1000);
        },
        /**
        * 获取当前时间，输出默认格式日期
        */
        getCurrentDate: function () {
            var n = new Date();
            return kboy.UnitToDate(n.getTime());
        }
    });
    //暴露对象
    window.Jk = kboy;

})(window);