define(['js/viewer/FeedPanel','js/viewer/FeedInfo'],function(FeedPanel,FeedInfo){
	return Ext.define('FeedViewer.App', {
		extend: 'Ext.container.Viewport',
		initComponent: function(){
			Ext.define('Feed', {
				extend: 'Ext.data.Model',
				fields: ['title', 'url']
			});
			Ext.define('FeedItem', {
				extend: 'Ext.data.Model',
				fields: ['title', 'author', 'link', {
					name: 'pubDate',
					type: 'date'
				}, {
					name: 'description',
					mapping: function(raw) {
						var DQ = Ext.dom.Query,
						content = DQ.selectNode('content', raw),
						key;
						if (content && DQ.getNodeValue(content)) {
							key = 'description';
						} else {
							key = 'title';
						}
						return DQ.selectValue(key, raw);
					}
				}, {
					name: 'content',
					mapping: function(raw) {
						var DQ = Ext.dom.Query,
						content = DQ.selectNode('content', raw);
						if (!content || !DQ.getNodeValue(content)) {
							content = DQ.selectNode('description', raw);
						}
						return DQ.getNodeValue(content, '');
					}
				}]
			});
			Ext.apply(this, {
				layout: {
					type: 'border',
					padding: 5
				},
				items: [this.createFeedPanel(), this.createFeedInfo()]
			});
			this.callParent(arguments);
		},
		createFeedPanel: function(){
			this.feedPanel = new FeedPanel({
				region: 'west',
				collapsible: true,
				width: 225,
				//floatable: false,
				split: true,
				minWidth: 175,
				feeds: [{
					title: 'Sencha Blog',
					url: 'http://feeds.feedburner.com/extblog'
				}, {
					title: 'Sencha Forums',
					url: 'http://sencha.com/forum/external.php?type=RSS2'
				}, {
					title: 'Ajaxian',
					url: 'http://feeds.feedburner.com/ajaxian'
				}],
				listeners: {
					scope: this,
					feedselect: this.onFeedSelect
				}
			});
			return this.feedPanel;
		},
		createFeedInfo: function(){
			this.feedInfo = new FeedInfo({
				region: 'center',
				minWidth: 300
			});
			return this.feedInfo;
		},
		onFeedSelect: function(feed, title, url){
			this.feedInfo.addFeed(title, url);
		}
	});
});
