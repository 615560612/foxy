<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String version = System.currentTimeMillis() + "";
%>
<base href="<%=basePath%>"/>
<script type="text/javascript" src="js/lib/require.js?v=<%=version%>"></script>
<script type="text/javascript" src="js/lib/jquery-1.7.2.js?v=<%=version%>"></script>
<script type="text/javascript" src="js/lib/underscore.js?v=<%=version%>"></script>
<script type="text/javascript" src="js/ext/include-ext.js?v=<%=version%>"></script>
<script type="text/javascript" src="js/ext/options-toolbar.js?v=<%=version%>"></script>
<script type="text/javascript" src="api-debug.js?apiNs=RemoteNs&actionNs=Foxy.direct&remotingApiVar=REMOTEAPI&pollingUrlsVar=POLLURLS"></script>
<script type="text/javascript">
	Ext.namespace('Foxy', 'Foxy.constants');
	Foxy.constants.path = "<%=basePath%>";
	Version = "<%=version%>";
	Ext.define("MessageBus",{
		mixins : {
			observable : "Ext.util.Observable"
		},
		constructor : function(c){
			this.mixins.observable.constructor.call(this,c);
		}
	});
	var registerRequirejsAdapter = function(scope,urlRoot,config){
		if(urlRoot[urlRoot.length - 1] != "/"){
			urlRoot += '/';
		}
		if(null == scope.raw_require){
			scope.raw_require = scope.require;
		}
		if(null == scope.raw_define){
			scope.raw_define = scope.define;
		}
		(function(){
			var fix_url = function(url){
				while(url != url.replace('//','/')){
					url = url.replace('//','/');
				}
			};
			var build_url = function(url){
				return fix_url(urlRoot + '/' + url + '?r=' + Version);
			};
			var find_shim = function(url){
				for(var shim in (config.shim || {})){
					if(url === shim){
						return shim;
					}
				}
				for(var path in (config.paths || {})){
					if(url === path){
						return config.paths[path] + '.js';
					}
				}
			};
			var find_raw_files = function(url){
				var ret = [],shim;
				if(shim = find_shim(url)){
					ret = [shim];
				}else{
					if(url.substr(url.length - 3, 3) != '.js'){
						url += '.js';
					}
					var path = build_url(url);
					ret.push(path);
				}
				return ret;
			}
			var get_require_files = function(files){
				if(!(files instanceof Array)){
					files = [files];
				}
				require_files = [];
				for(var i = 0; i < files.length; i++){
					var url = find_raw_files(files[i]);
					require_files = require_files.concat(url);
				}
				return require_files;
			}
			scope.require = function(files,func){
				require_files = get_require_files(files);
				var inner = function(files){
					if(files.length > 1){
						scope.raw_require([files[0]],function(){
							inner(files.slice(1));
						});
					}else{
						scope.raw_require([files[0]],func);
					}
				}
				inner(require_files);
			}
			scope.define = function(files,func){
				if(arguments.length == 2){
					require_files = get_require_files(files);
					scope.raw_define(require_files,func);
				}else{
					scope.raw_define.apply(this,arguments);
				}
			}
		})();
		requirejs.config(config);
	}
	require.config({
		baseUrl : Foxy.constants.path,
		map: {
	        '*': {
	            'css': Foxy.constants.path + 'css/'
	        }
	    },
	});
	/* var webRoot = Foxy.constants.path + 'js/';
	registerRequirejsAdapter(window,webRoot,{
		shim : {
			'jquery' : {
				exports : 'jQuery'
			},
		},
		paths : {
			jquery : webRoot + 'lib/jquery-1.7.2'
		}
	}); */
	require(['js/app'],function(){
    	Ext.direct.Manager.addProvider(RemoteNs.REMOTEAPI);
    	Foxy.direct.userController.getUser(function(result){
    		console.info('result',result);
    	});
	});
</script>
