/*!
 * jQuery Loading Plugin v1.0.1
 * https://github.com/ouyangjunqiu/jquery.loading
 *
 * @dependency jQuery v2.1.4
 * @dependency jQuery Templating Plugin
 *
 * Copyright 2016 oShine <oyjqdlp@126.com>
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    $.fn.extend({
        loading:function(){
            this.each(function() {

                var self = $(this);
                var tmpl = $("#" + self.data("tmpl"));
                $.ajax({
                    url: self.data("url"),
                    dataType: "json",
                    type: "get",
                    success: function (resp) {
                        self.html(tmpl.tmpl(resp));
                        self.removeClass("overlay-wrapper");
                        self.attr("load", "loaded");
                    },
                    beforeSend: function () {
                        self.html("<div class='loading-img'></div>");
                        self.addClass("overlay-wrapper");
                        self.attr("load", "loading");
                    }
                })
            });
            return this;
        }
    });

    $(document).ready(function(){

        $("[data-load=loading]").each(function(){
            var load = $(this).attr("load");
            if(load && (load == "loaded" || load == "loading") ) {

            }else {

                if ($(window).height() >= $(this).offset().top) {
                    $(this).loading();

                }else {

                    var a = $(this).offset().top;
                    var b = $(window).height() + $(window).scrollTop();

                    if (a >= $(window).scrollTop() && a <= b) {
                        $(this).loading();
                    }
                }

                $(this).one("appear", function () {
                    $(this).loading();
                });
            }
        });
    })

}));