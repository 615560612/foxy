define(['js/viewer/FeedPost','js/viewer/FeedDetail'],function(FeedPost,FeedDetail){
	var FeedInfo = Ext.define('FeedViewer.FeedInfo', {
		extend: 'Ext.tab.Panel',
		alias: 'widget.feedinfo',
		maxTabWidth: 230,
		border: false,
		tabBar: {
			border: true
		},
		addFeed: function(title, url){
			var active = this.items.first();
			if (!active) {
				active = this.add({
					xtype: 'feeddetail',
					title: title,
					url: url,
					closable: false,
					listeners: {
						scope: this,
						opentab: this.onTabOpen,
						openall: this.onOpenAll,
						rowdblclick: this.onRowDblClick
					}
				});
			} else {
				active.loadFeed(url);
				active.tab.setText(title);
			}
			this.setActiveTab(active);
		},
		onTabOpen: function(post, rec) {
			var items = [],
			item,
			title;
			if (Ext.isArray(rec)) {
				Ext.each(rec, function(rec) {
					title = rec.get('title');
					if (!this.getTabByTitle(title)) {
						items.push({
							inTab: true,
							xtype: 'feedpost',
							title: title,
							closable: true,
							data: rec.data,
							active: rec
						});
					}
				}, this);
				this.add(items);
			}
			else if (rec) {
				title = rec.get('title');
				item = this.getTabByTitle(title);
				if (!item) {
					item = this.add({
						inTab: true,
						xtype: 'feedpost',
						title: title,
						closable: true,
						data: rec.data,
						active: rec
					});
				}
				this.setActiveTab(item);
			}
		},
		getTabByTitle: function(title) {
			var index = this.items.findIndex('title', title);
			return (index < 0) ? null : this.items.getAt(index);
		},
		onRowDblClick: function(info, rec){
			this.onTabOpen(null, rec);
		},
		onOpenAll: function(detail) {
			this.onTabOpen(null, detail.getFeedData());
		}
	});
	return FeedInfo;
});