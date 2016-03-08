Ext.define('FeedSimlet', {
    extend: 'Ext.ux.ajax.Simlet',
    alias: 'simlet.feed',
    cleanupRe: /[%=&]/g,
    doRedirect: function (ctx) {
        var p = ctx.params,
            name = 'feed=' + encodeURIComponent(p.feed) +
                   '&page=' + p.page + '&start=' + p.start + '&limit=' + p.limit;
        name = 'data/' + name.replace(this.cleanupRe, '_') + '.xml';
        return this.redirect(name);
    }
});
function initAjaxSim () {
	var path = Foxy.constants.path + 'js/feed-proxy.php';
    Ext.ux.ajax.SimManager.init({
        delay: 300
    }).register({
    	path: {
            stype: 'feed'
        }
    });
}
