var app = angular.module("myapp", ['ngRoute', 'ngResource', 'angularUtils.directives.dirPagination']);

var appBootstrapper = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind any events that are required on startup.
    bindEvents: function() {
        $(document).ready(this.onReady);
    },

    onReady: function() {
        //bootstrap foundation
        $(document).foundation();

        $(".off-canvas-list a").on("click.toggleCanvas", function() {
            $(".exit-off-canvas").click();
        });
    }
};
