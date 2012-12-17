(function(e){e.fn.texteditor=function(t){var n=e.extend({width:"400px",height:"200px",containerClass:"js-editor-container",buttonsClass:"js-editor-buttons",iFrameClass:"js-editor-iframe",formID:"js-editor-form",cleanOnSubmit:!0,defaultFont:"Bitstream Vera Sans Mono, Consolas, Courier, monospace",defaultFontSize:"1em",defaultFontColor:"#000000",defaultActions:"bold, underline, italic, strikethrough, align-left, align-center, align-right, unorderd-list, ordered-list, link, image"},t);return this.each(function(){var t=e(this);t.hide();var r=e("<div />").addClass(n.containerClass).css({"float":"left",width:n.width,border:"1px solid #ccc"});t.after(r);var s=e("<iframe />").addClass(n.iFrameClass).css({"float":"left",width:n.width,height:n.height,border:"0",overflow:"hidden"}).appendTo(r).get(0);s.contentWindow.document.open();s.contentWindow.document.close();s.contentWindow.document.designMode="on";e(s).contents().find("body").css({"word-wrap":"break-word","font-family":n.defaultFont,"font-size":n.defaultFontSize,color:n.defaultFontColor});var o='<style type="text/css">body{padding: 2%;} p { margin: 0; }</style>';e(s).contents().find("head").append(o);e("."+n.buttonsClass+" a").live("click",function(){var t=e(this).attr("data-command");s.contentWindow.focus();u(t);s.contentWindow.focus();return!1});var u=function(e){switch(e){case"image":var t=prompt("URL (example: http://www.google.com): ");return s.contentWindow.document.execCommand("InsertImage",!1,t);case"link":var n=prompt("URL (example: http://www.google.com): ");return s.contentWindow.document.execCommand("CreateLink",!1,n);default:return s.contentWindow.document.execCommand(e)}},a=function(t){e("<a />").addClass(t.command).text(t.content).attr("data-command",t.command).appendTo(f)},f=e("<div />").addClass(n.buttonsClass).css({"float":"left",width:n.width}).prependTo(r),l=n.defaultActions.split(/, ?/);for(i=0;i<l.length;i++){var c;switch(l[i]){case"bold":c={content:"b",command:"bold"};break;case"underline":c={content:"u",command:"underline"};break;case"italic":c={content:"i",command:"italic"};break;case"strikethrough":c={content:"s",command:"strikethrough"};break;case"align-left":c={content:"left",command:"JustifyLeft"};break;case"align-center":c={content:"center",command:"JustifyCenter"};break;case"align-right":c={content:"right",command:"JustifyRight"};break;case"unorderd-list":c={content:"ul",command:"InsertUnorderedList"};break;case"ordered-list":c={content:"ol",command:"InsertOrderedList"};break;case"image":c={content:"img",command:"image"};break;case"link":c={content:"link",command:"link"};break;default:c={content:"",command:""}}a(c)}var h=t.text();e(s).contents().find("body").append(h);var p=function(){var t=e(s).contents().find("body");t.find("div").each(function(){var t=e(this).attr("style")?!0:!1;e(this).parent("p").not("p")&&(t?e(this).wrap('<p style="'+e(this).attr("style")+'"></p>'):e(this).wrap("<p></p>"));e(this).contents().unwrap()});t.find("br").unwrap();var n=t.contents()[0];t.find(n).not("p")&&t.find(n).wrap("p")};e("#"+n.formID).submit(function(){n.cleanOnSubmit&&p();var r=e(s).contents().find("body").html();t.html(r)})})}})(jQuery);