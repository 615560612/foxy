define(['js/viewer/FeedPost','js/viewer/FeedGrid'],function(FeedPost,FeedGrid){
	var FeedDetail = Ext.define('FeedViewer.FeedDetail', {
	    extend: 'Ext.panel.Panel',
	    alias: 'widget.feeddetail',
	    border: false,
	    initComponent: function(){
	        this.display = new FeedPost({});
	        Ext.apply(this, {
	            layout: 'border',
	            items: [this.createGrid(), this.createSouth(), this.createEast()]
	        });
	        this.relayEvents(this.display, ['opentab']);
	        this.relayEvents(this.grid, ['rowdblclick']);
	        this.callParent(arguments);
	    },
	    loadFeed: function(url){
	        this.grid.loadFeed(url);
	    },
	    createGrid: function(){
	        this.grid = new FeedGrid({
	            region: 'center',
	            dockedItems: [this.createTopToolbar()],
	            flex: 2,
	            minHeight: 200,
	            minWidth: 150,
	            listeners: {
	                scope: this,
	                select: this.onSelect
	            }
	        });
	        this.loadFeed(this.url);
	        return this.grid;
	    },
	    onSelect: function(grid, rec) {
	        this.display.setActive(rec);
	    },
	    createTopToolbar: function(){
	        this.toolbar = Ext.create('widget.toolbar', {
	            cls: 'x-docked-noborder-top',
	            items: [{
	                iconCls: 'open-all',
	                text: 'Open All',
	                scope: this,
	                handler: this.onOpenAllClick
	            }, '-', {
	                xtype: 'cycle',
	                text: 'Reading Pane',
	                prependText: 'Preview: ',
	                showText: true,
	                scope: this,
	                changeHandler: this.readingPaneChange,
	                menu: {
	                    id: 'reading-menu',
	                    items: [{
	                        text: 'Bottom',
	                        checked: true,
	                        iconCls:'preview-bottom'
	                    }, {
	                        text: 'Right',
	                        iconCls:'preview-right'
	                    }, {
	                        text: 'Hide',
	                        iconCls:'preview-hide'
	                    }]
	                }
	            }, {
	                iconCls: 'summary',
	                text: 'Summary',
	                enableToggle: true,
	                pressed: true,
	                scope: this,
	                toggleHandler: this.onSummaryToggle
	            }]
	        });
	        return this.toolbar;
	    },
	    onOpenAllClick: function(){
	        this.fireEvent('openall', this);
	    },
	    getFeedData: function(){
	        return this.grid.store.getRange();
	    },
	    onSummaryToggle: function(btn, pressed) {
	        this.grid.getView().getPlugin('preview').toggleExpanded(pressed);
	    },
	    readingPaneChange: function(cycle, activeItem){
	        switch (activeItem.text) {
	            case 'Bottom':
	                this.east.hide();
	                this.south.show();
	                this.south.add(this.display);
	                break;
	            case 'Right':
	                this.south.hide();
	                this.east.show();
	                this.east.add(this.display);
	                break;
	            default:
	                this.south.hide();
	                this.east.hide();
	                break;
	        }
	    },
	    createSouth: function(){
	        this.south =  Ext.create('Ext.panel.Panel', {
	            layout: 'fit',
	            region: 'south',
	            border: false,
	            split: true,
	            flex: 2,
	            minHeight: 150,
	            items: this.display
	        });
	        return this.south;
	    },
	    createEast: function(){
	        this.east =  Ext.create('Ext.panel.Panel', {
	            layout: 'fit',
	            region: 'east',
	            flex: 1,
	            split: true,
	            hidden: true,
	            minWidth: 150,
	            border: false
	        });
	        return this.east;
	    }
	});
	return FeedDetail;
});