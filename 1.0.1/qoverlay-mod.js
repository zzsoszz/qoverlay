define(["jquery/qoverlay/1.0.0/jquery.qoverlay.css"], 
function(require, exports) {
	
	/*
	  137573155@qq.com
	*/
	(function($)
	{
			
			var  defaultoptions = {
	              selector      : this.selector
	   		};
			var plugname="qoverlay";
			
			$.fn[plugname]=function()
			{
				var isMethodCall=arguments.length>0 && typeof arguments[0] === "string";
				if(isMethodCall)
				{
					//���ú���
					var methodname=arguments[0];
					var args = Array.prototype.slice.call(arguments,1);
					this.each(function() {
						var instance = $.data( this,plugname);
						if(instance && $.isFunction( instance[methodname] ))
						{
							var method=instance[methodname];
							method.apply(instance,args);
						}
					});
				}else{
					var inputoptions = arguments;
					$(this).each(
							function ()
							{
								var optionsnew = $.extend( {}, defaultoptions);
								if(inputoptions.length>0)
								{
										optionsnew=$.extend(optionsnew,inputoptions[0]);
								}
								var instance=$(this).data(plugname);
								if(instance)
								{
									instance.init(optionsnew);
								}else
								{
									var target=$(this);
									instance=new PluginObject(target);
									instance.init(optionsnew);
									$(this).data(plugname,instance);
								}
							}
						);
						return this;
				};
			}
			
			/*
			 * 根据 popbox-1.0.3 改变
			 */
			function PluginObject(target)
			{
					this.options;
					this.shandowdiv;
					this.render=function()
					{
						
						this.shandowdiv=$('<div class="shandowdiv" style="background: none repeat scroll 0% 0% rgb(66, 66, 66); opacity: 0.6;z-index: 3;">')
						this.options.messagebox.addClass("messagebox");
						$(document.body).append(this.options.messagebox);
						$(document.body).append(this.shandowdiv);
					};
					this.show=function()
					{
						var iswin=$.isWindow(target.get(0));
				        if(iswin)
				        {
				        	var winwidth=0;
					        var winheight=0;
				        	winwidth=window.innerWidth!=null?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:document.body!=null?document.body.clientWidth:null;
				        	winheight=window.innerHeight!=null?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:document.body!=null?document.body.clientHeight:null;
				        	this.shandowdiv.css(
					        		{
										'position':'fixed',
										'width':target.width()+'px',
										'height':target.height()+'px',
										'top':"0px",
										'left':"0px"
									}
					        );
				        	this.options.messagebox.css({
				        		"position":"fixed",
				        		"left":((winwidth-this.options.messagebox.width())/2)+"px",
				        		"top":((winheight-this.options.messagebox.height())/2)+"px"
				        	});
				        }
				        else
				        {
				        	this.shandowdiv.css(
					        		{
										'position':'absolute',
										'width':target.width()+'px',
										'height':target.height()+'px',
										'top':target.offset().top+"px",
										'left':target.offset().left+"px"
									}
					        );
				        	this.options.messagebox.css(
									{
										'position':'absolute',
										'top':( target.offset().top+((target.height()-this.options.messagebox.height())/2) ) +"px",
										'left':( target.offset().left+((target.width()-this.options.messagebox.width())/2) ) +"px"
									}
							);
				        }
						this.shandowdiv.show();
						this.options.messagebox.show();
					};
					this.hide=function()
					{
						this.shandowdiv.hide();
						this.options.messagebox.hide();
					};
					this.init=function(initoptions)
					{
						this.options=initoptions;
						this.options.messagebox=$("<div>").css({
							'background-image' : 'url('+this.options.url+')' ,
							'background-repeat': 'no-repeat',
							'background-position':'center center',
							'background-attachment':'scroll',
							'position':'absolute',
							'width':target.width()+'px',
							'height':target.height()+'px',
							'opacity':0.8,
							'top':'0px',
							'left':'0px',
							"z-index":"5"
						});
						this.render();
						this.hide();
					};
			}
	}
	)(jQuery);


	return jQuery;
}
);