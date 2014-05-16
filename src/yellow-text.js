/*!*
 * Yellow Text
 * =========================================
 * This plugin is created to make text editing
 * more fun and to make it easy for the editor.
 *
 * Version: 0.4.5
 * Author: Stefan Vermaas
 * URL: www.stefanvermaas.nl
 *
 */
;(function ($, window, document, undefined) {

    // Create an empty noop function as a placeholder
    function noob() {
    }

    // Create the defaults once
    var pluginName = "YellowText",
        defaults = {
            width: "100%",
            height: "300px",
            containerClass: "js-editor-container",
            buttonsClass: "js-editor-buttons",
            iFrameClass: "js-editor-iframe",
            cleanOnSubmit: true,
            defaultFont: "Helvetica Neue, Helvetica, arial, sans-serief",
            defaultFontSize: "1em",
            defaultFontColor: "#000000",
            defaultActions: ["bold", "underline", "italic", "strikethrough", "align-left", "align-center", "align-right", "unordered-list", "ordered-list", "link", "image"],

            // Define the callback options
            isContentChanged: noob
        };

    // The actual plugin constructor
    function YellowText(element, options) {

        // Define some default plugin options
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        // Initialize the whole plugin
        this.initialize();
    }

    /**
     * Extend the plugin prototype
     */
    YellowText.prototype = {

        /**
         * Initializing the plugin
         */
        initialize: function () {

            // Render the plugin
            this.render();

            // Grap the content and put it in the iframe
            this.setContentToEditor(this.getContentFromTextarea());

            // Listen to events and react on them
            this.events();
        },

        /**
         * Getting and setting content
         */

        // Set new content in the editor
        setContentToEditor: function (content) {
            $(this.editor).contents().find("body > div").append(content);
            return content;
        },

        // Set new content in the textarea
        setContentToTextarea: function (content) {
            $(this.element).val(content);
            return content;
        },

        // Get content from the textarea
        getContentFromTextarea: function () {
            return $(this.element).val();
        },

        // Get content from the editor
        getContentFromEditor: function () {
            return $(this.editor).contents().find("body > div").html();
        },

        /**
         * Render the plugin
         */
        render: function () {
            // Get the styles for the element, used for ensuring exact same styling in the iframe
            var styles = [];
            var $el = $(this.element);
            $.each(["background", "font", "border", "border-radius", "box-shadow", "box-sizing", "padding", "direction", "height", "width", "text-align", "text-decoration", "text-shadow", "word-spacing"], function (key, property) {
                var v = $el.css(property);
                styles.push(property + ":" + v + ";");
            });
            styles.push("margin: 0;");
            styles = styles.join("");
            // Hide the current text field
            $(this.element).hide();

            // Create a container which will hold or text editor
            this.container = $("<div />").addClass(this.options.containerClass);

            // Add the container after the element where we bind this plugin too
            $(this.element).after(this.container);

            // Create the iFrame and append to the previously created container
            this.editor = $("<iframe />").addClass(this.options.iFrameClass).css({
                "width": $el.outerWidth(),
                "height": $el.outerHeight(),
                "border": 0,
                "overflow": "hidden",
                "margin": $el.css("margin")
            }).appendTo(this.container).get(0);

            // Make the editor work in all browsers
            this.editor.contentWindow.document.open();
            this.editor.contentWindow.document.close();
            this.editor.contentWindow.document.designMode = "on";

            // Set the standard fonts etc
            console.log(styles);
            var div = $("<div />").attr("style", styles);
            $(this.editor).contents().find("body").append(div).css({
                margin: 0,
                padding: 0,
                whiteSpace: "nowrap"
            });

            // Add some css to the iFrame
            //var iFrameCSS = "<style type=\"text/css\">body{padding:2%;}p{margin:0;}</style>";
            //$( this.editor ).contents().find("head").append(iFrameCSS);

            // Build the button container
            var zIndex = $el.css("z-index");
            if (zIndex === "auto") {
                zIndex = 0;
            }
            zIndex++;
            this.buttons = $("<div />").addClass(this.options.buttonsClass).css("z-index", zIndex).prependTo(this.container);

            // Render the buttons
            this.createButtons();
        },

        createButtons: function () {

            // Loop through all the buttons
            for (var i = 0; i < this.options.defaultActions.length; i++) {

                // Create a variable to store the object in
                var button;

                // Get the right value
                switch (this.options.defaultActions[i]) {
                    case "bold" :
                        button = { content: "b", command: "bold" };
                        break;
                    case "underline" :
                        button = { content: "u", command: "underline" };
                        break;
                    case "italic" :
                        button = { content: "i", command: "italic" };
                        break;
                    case "strikethrough" :
                        button = { content: "s", command: "strikethrough" };
                        break;
                    case "align-left" :
                        button = { content: "left", command: "JustifyLeft" };
                        break;
                    case "align-center" :
                        button = { content: "center", command: "JustifyCenter" };
                        break;
                    case "align-right" :
                        button = { content: "right", command: "JustifyRight" };
                        break;
                    case "unordered-list" :
                        button = { content: "ul", command: "InsertUnorderedList" };
                        break;
                    case "ordered-list" :
                        button = { content: "ol", command: "InsertOrderedList" };
                        break;
                    case "image" :
                        button = { content: "img", command: "image" };
                        break;
                    case "link" :
                        button = { content: "link", command: "link" };
                        break;
                    default :
                        button = { content: "", command: "" };
                }

                // Build the buttons and add before the container
                $("<a />").addClass(button.command).text(button.content).data("command", button.command).appendTo(this.buttons);
            }
        },

        /**
         * Listen to events
         */
        events: function () {

            var that = this;

            // Bind to the click event on the buttons
            $("." + this.options.buttonsClass + " a").on("click", function (e) {

                // Grap the command and react on event
                var command = $(this).data("command");
                that.buttonClicked(e, command);
            });

            // Bind to the keydown event while typing
            $(this.editor).contents().find("body").on("keydown", function (e) {
                if (e.keyCode === 13) {
                    return false;
                }

                // Look for the control or command key
                if (e.ctrlKey || e.metaKey) {
                    that.shortkey(e, this);
                }
            });

            // Handle paste
            $(this.editor).contents().find("body").on("paste", function (e) {
                e.preventDefault();

                var text = e.originalEvent.clipboardData.getData("text/plain");
                var temp = document.createElement("div");
                temp.innerHTML = text;
                text = temp.textContent.replace(/\r?\n|\r/g, "");

                that.runCMD("insertText", text);
            });

            // Bind the keyup event, to check for changes
            $(this.editor).contents().find("body").on("keyup", function () {

                // Check or the text is changed
                var changed = ( $(that.editor).contents().find("body").html() !== $(that.element).text() ) ? true : false;

                // Call the callback
                that.options.isContentChanged(changed);
            });

            // Bind to the submit event of the form
            $(this.element).parents("form").on("submit", function () {

                // First clean the code
                that.cleanTheCode();

                // Put the content back in the textfield
                that.setContentToTextarea(that.getContentFromEditor());
            });
        },

        /**
         *
         * buttonClicked
         * =========================================
         * This function reacts on the fact that a
         * button is clicked. Based on the button an
         * action will be triggered
         */
        buttonClicked: function (e, command) {

            // Focus on the contentWindow
            this.editor.contentWindow.focus();

            // Take an other look at the command and look for the perfect action and execute it
            this.runCMD(command);

            // And focus back again on the contentWindow
            this.editor.contentWindow.focus();
        },

        /**
         * Use some short keys
         */
        shortkey: function (e) {

            // Define the key
            var key = e.which;

            // Check or we have on of the right keys
            if (key === 66 || key === 73 || key === 85) {

                // Focus on the content window
                this.editor.contentWindow.focus();

                // Handle the action
                switch (key) {
                    case 66:
                        this.runCMD("bold");
                        break;
                    case 73:
                        this.runCMD("italic");
                        break;
                    case 85:
                        this.runCMD("underline");
                        break;
                }

                // And focus back again on the contentWindow
                this.editor.contentWindow.focus();
            }
        },

        /**
         * Run the actual command
         */
        runCMD: function (cmd, value) {

            // Check command for special actions and run it
            if (cmd === "image") {

                var image;

                // Check for the insertImage function, this will always be true
                if (typeof this.options.setImage === "function") {
                    image = this.options.setImage.call();
                }

                // Check or a other plugin or CMS added an image to the plugin
                var url = ( typeof image !== "undefined" && image.length > 0 ) ? image : prompt("URL (example: http://www.google.com): ");

                // Insert the image in the text editor
                return this.editor.contentWindow.document.execCommand("InsertImage", false, url);
            } else if (cmd === "link") {
                var link = prompt("URL (example: http://www.google.com): ");
                return this.editor.contentWindow.document.execCommand("CreateLink", false, link);
            } else if (cmd === "insertText") {
                return this.editor.contentWindow.document.execCommand(cmd, false, value);
            } else {
                return this.editor.contentWindow.document.execCommand(cmd);
            }
        },

        /**
         * Clean the mess of the browsers
         */
        cleanTheCode: function () {

            // Remove classes from br tag
            $(this.editor).contents().find("body").find("br").removeAttr("class").unwrap();

            // Remove classes from ul tag
            $(this.editor).contents().find("body").find("ul").removeAttr("class").unwrap();

            // Remove classes from ol tag
            $(this.editor).contents().find("body").find("ol").removeAttr("class").unwrap();

            // Remove all div tags
            $(this.editor).contents().find("div").wrap("<p />").contents().unwrap();
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new YellowText(this, options));
            }
        });
    };

})(jQuery, window, document);
