(function() {
	function getQueryParam(name) {
		var regex = RegExp('[?&]' + name + '=([^&]*)');

		var match = regex.exec(location.search) || regex.exec(path);
		return match && decodeURIComponent(match[1]);
	}

	function hasOption(opt, queryString) {
		var s = queryString || location.search;
		var re = new RegExp('(?:^|[&?])' + opt + '(?:[=]([^&]*))?(?:$|[&])',
				'i');
		var m = re.exec(s);

		return m ? (m[1] === undefined || m[1] === '' ? true : m[1]) : false;
	}

	function getCookieValue(name) {
		var cookies = document.cookie.split('; '), i = cookies.length, cookie, value;

		while (i--) {
			cookie = cookies[i].split('=');
			if (cookie[0] === name) {
				value = cookie[1];
			}
		}

		return value;
	}

	Ext = window.Ext || {};
	Ext.setRepoDevModeCookie = function() {
		document.cookie = 'ExtRepoDevMode=true; expires=Wed, 01 Jan 3000 07:00:00 GMT;';
	};
	Ext.clearRepoDevModeCookie = function() {
		document.cookie = 'ExtRepoDevMode=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	};

	var scriptEls = document.getElementsByTagName('script'), path = scriptEls[scriptEls.length - 1].src, rtl = getQueryParam('rtl'), theme = getQueryParam('theme')
			|| 'crisp', includeCSS = !hasOption('nocss', path), useDebug = hasOption('debug'), hasOverrides = !hasOption(
			'nooverrides', path)
			&& !!{
				// TODO: remove neptune
				neptune : 1,
				classic : 1,
				gray : 1,
				'neptune-touch' : 1,
				crisp : 1,
				'crisp-touch' : 1
			}[theme], repoDevMode = Ext.repoDevMode = getCookieValue('ExtRepoDevMode'), packagePath, themePath, chartsCSS, sdkRoot, i = 3, overridePath, extPrefix;

	rtl = rtl && rtl.toString() === 'true';

	while (i--) {
		path = path.substring(0, path.lastIndexOf('/'));
	}
	// path == root of ext

	sdkRoot = repoDevMode ? path.substring(0, path.lastIndexOf('/')) : path;
	chartsCSS = sdkRoot + '/packages/sencha-charts/build/' + theme
			+ '/resources/sencha-charts-all-debug.css';

	path = path + '/js/ext';

	theme = 'ext-theme-' + theme;
	packagePath = path + '/' + theme + '/build/';
	themePath = packagePath + 'resources/' + theme
			+ (rtl ? '-all-rtl' : '-all');

	if (includeCSS) {
		document.write('<link rel="stylesheet" type="text/css" href="'
				+ themePath + '-debug.css"/>');
		// document.write('<link rel="stylesheet" type="text/css" href="' +
		// chartsCSS + '"/>');
		console.info('Theme Path', themePath);
	}
	extPrefix = useDebug ? '/ext' : '/ext-all';
	document.write('<script type="text/javascript" src="' + path + extPrefix
			+ '.js"></script>');
	console.info('Extjs Path', path + extPrefix + '.js');
	if (hasOverrides) {
		overridePath = packagePath + theme + (repoDevMode ? '-debug' : '')
				+ '.js';
		if (repoDevMode && window.ActiveXObject) {
			Ext = {
				_beforereadyhandler : function() {
					Ext.Loader.loadScript({
						url : overridePath
					});
				}
			};
		} else {
			document.write('<script type="text/javascript" src="'
					+ overridePath + '" defer></script>');
		}
	}
})();
