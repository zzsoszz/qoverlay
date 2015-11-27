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
		
		function PluginObject(target)
		{
				this.options;
				this.wrapdiv;
				this.shandowdiv;
				this.render=function()
				{
					this.shandowdiv=$('<div style="position:absolute; top:0px;left: 0px;background: none repeat scroll 0% 0% rgb(17, 17, 17); opacity: 0.5;z-index: 10000;">').css("width",target.width()+'px').css("height",target.height()+'px');
					this.wrapdiv=$("<div>").css({
					'background-image' : 'url('+this.options.url+')' ,
					'background-repeat': 'no-repeat',
					'background-position':'center center',
					'background-attachment':'scroll',
					'position':'absolute',
					'width':target.width()+'px',
					'height':target.height()+'px',
					'opacity':0.8,
					'top':'0px',
					'left':'0px'
					});
					this.shandowdiv.append(this.wrapdiv);
					target.append(this.shandowdiv);
				};
				this.show=function()
				{
					this.shandowdiv.show();
					this.wrapdiv.show();
				};
				this.hide=function()
				{
					this.shandowdiv.hide();
					this.wrapdiv.hide();
				};
				this.init=function(initoptions)
				{
					this.options=initoptions;
					this.render();
					this.hide();
				};
		}
}
)(jQuery);