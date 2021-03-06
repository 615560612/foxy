define(['js/viewer/FeedWindow'],function(FeedWindow){
	var FeedPanel = Ext.define('FeedViewer.FeedPanel', {
		extend: 'Ext.panel.Panel',
		alias: 'widget.feedpanel',
		animCollapse: true,
		layout: 'fit',
		title: 'Feeds',
		initComponent: function(){
			Ext.apply(this, {
				items: this.createView(),
				dockedItems: this.createToolbar()
			});
			this.createMenu();
			this.callParent(arguments);
		},
		createView: function(){
			this.view = Ext.create('widget.dataview', {
				scrollable: true,
				store: Ext.create('Ext.data.Store', {
					model: 'Feed',
					data: this.feeds
				}),
				selModel: {
					mode: 'SINGLE',
					listeners: {
						scope: this,
						selectionchange: this.onSelectionChange
					}
				},
				listeners: {
					scope: this,
					contextmenu: this.onContextMenu,
					viewready: this.onViewReady
				},
				trackOver: true,
				cls: 'feed-list',
				itemSelector: '.feed-list-item',
				overItemCls: 'feed-list-item-hover',
				tpl: '<tpl for="."><div class="feed-list-item">{title}</div></tpl>'
			});
			return this.view;
		},
		onViewReady: function(){
			Ext.suspendLayouts();
			this.view.getSelectionModel().select(this.view.store.first());
			Ext.resumeLayouts(true);
		},
		createToolbar: function(){
			this.createActions();
			this.toolbar = Ext.create('widget.toolbar', {
				items: [this.addAction, this.removeAction]
			});
			return this.toolbar;
		},
		createActions: function(){
			this.addAction = Ext.create('Ext.Action', {
				scope: this,
				handler: this.onAddFeedClick,
				text: 'Add',
				iconCls: 'feed-add'
			});
			this.removeAction = Ext.create('Ext.Action', {
				itemId: 'remove',
				scope: this,
				handler: this.onRemoveFeedClick,
				text: 'Remove',
				iconCls: 'feed-remove'
			});
		},
		createMenu: function(){
			this.menu = Ext.create('widget.menu', {
				items: [{
					scope: this,
					handler: this.onLoadClick,
					text: 'Load feed',
					iconCls: 'feed-load'
				}, this.removeAction, '-', this.addAction],
				listeners: {
					hide: function(c){
						c.activeFeed = null;
					}
				}
			});
		},
		onSelectionChange: function(){
			var selected = this.getSelectedItem();
			this.toolbar.getComponent('remove').setDisabled(!selected);
			if (selected) {
				this.loadFeed(selected);
			}
		},
		onLoadClick: function(){
			this.loadFeed(this.menu.activeFeed);
		},
		loadFeed: function(rec){
			if (rec) {
				this.fireEvent('feedselect', this, rec.get('title'), rec.get('url'));
			}
		},
		getSelectedItem: function(){
			return this.view.getSelectionModel().getSelection()[0] || false;
		},
		onContextMenu: function(view, index, el, event){
			var menu = this.menu;
			event.stopEvent();
			menu.activeFeed = view.store.getAt(index);
			menu.showAt(event.getXY());
		},
		onRemoveFeedClick: function() {
			var active = this.menu.activeFeed || this.getSelectedItem();
			if (active) {
				this.view.getSelectionModel().deselectAll();
				this.animateNode(this.view.getNode(active), 1, 0, {
					scope: this,
					afteranimate: function() {
						this.view.store.remove(active);
					}
				});
				this.fireEvent('feedremove', this, active.get('title'), active.get('url'));
			}
		},
		onAddFeedClick: function(){
			var win = this.addFeedWindow || (this.addFeedWindow = new FeedWindow({
				listeners: {
					scope: this,
					feedvalid: this.onFeedValid
				}
			}));
			win.form.getForm().reset();
			win.show();
		},
		onFeedValid: function(win, title, url){
			var view = this.view,
			store = view.store,
			rec;
			
			rec = store.add({
				url: url,
				title: title
			})[0];
			this.animateNode(view.getNode(rec), 0, 1);
		},
		animateNode: function(el, start, end, listeners){
			Ext.create('Ext.fx.Anim', {
				target: Ext.get(el),
				duration: 500,
				from: {
					opacity: start
				},
				to: {
					opacity: end
				},
				listeners: listeners
			});
		},
		onDestroy: function(){
			this.callParent(arguments);
			this.menu.destroy();
		}
	});
	return FeedPanel;
});
