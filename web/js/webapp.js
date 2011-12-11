//set up the theme switcher on the homepage
$('div').live('pagecreate',function(event){
	if( !$(this).is('.ui-dialog')){ 
		var appendEl = $(this).find('.ui-footer:last');
		
		if( !appendEl.length ){
			appendEl = $(this).find('.ui-content');
		}
		
		if( appendEl.is("[data-position]") ){
			return;
		}
		
		$('<a href="#themeswitcher" data-'+ $.mobile.ns +'rel="dialog" data-'+ $.mobile.ns +'transition="pop">Switch theme</a>')
			.buttonMarkup({
				'icon':'gear',
				'inline': true,
				'shadow': false,
				'theme': 'd'
			})
			.appendTo( appendEl )
			.wrap('<div class="jqm-themeswitcher">')
			.bind( "vclick", function(){
				$.themeswitcher();
			});
	}	

});

//collapse page navs after use
$(function(){
	$('body').delegate('.content-secondary .ui-collapsible-content', 'click',  function(){
		$(this).trigger("collapse")
	});
});

function setDefaultTransition(){
	var winwidth = $( window ).width(),
		trans ="slide";
		
	if( winwidth >= 1000 ){
		trans = "none";
	}
	else if( winwidth >= 650 ){
		trans = "fade";
	}

	$.mobile.defaultPageTransition = trans;
}


$(function(){
	setDefaultTransition();
	$( window ).bind( "throttledresize", setDefaultTransition );
});


$(function() {
   // find any notification and display it as a popup
   // will disperse them 100px apart
   $(".notification").each(function(i) {
      var $me = $(this);
      if( $me.hasClass("success")) aclass = "ui-body-suc";
      if( $me.hasClass("error")) aclass = "ui-body-err";
      if( $me.hasClass("info")) aclass = "ui-body-info";
      if( $me.hasClass("warning")) aclass = "ui-body-e";
      $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+ $(this).text() +"</h1></div>").css({ 
         "display": "block", 
         "opacity": 0.96, 
         "top": $(window).scrollTop() + 100 + (100 * i)
      }).addClass(aclass).appendTo('body').delay( 1800 + (400 * i) ).fadeOut( 1400 + (400*i), function(){
         $(this).remove();
      });
      $me.remove();  
   });
});