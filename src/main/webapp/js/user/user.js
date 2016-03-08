require(['js/user/form','js/user/grid','js/user/model'],function(model){
	Ext.onReady(function(){
	    Ext.tip.QuickTipManager.init();
	    var store = Ext.create('Ext.data.Store', {
	        model: 'Writer.Person',
	        proxy: {
	            type: 'ajax',
	            api: {
	                read: Foxy.constants.path + 'user/view',
	                create: Foxy.constants.path + 'user/create',
	                update: Foxy.constants.path + 'user/update',
	                destroy: Foxy.constants.path + 'user/destroy'
	            },
	            reader: {
	                type: 'json',
	                successProperty: 'success',
	                root: 'data',
	                messageProperty: 'message'
	            },
	            writer: {
	                type: 'json',
	                writeAllFields: false,
	                root: 'data'
	            },
	            listeners: {
	                exception: function(proxy, response, operation){
	                    Ext.MessageBox.show({
	                        title: 'REMOTE EXCEPTION',
	                        msg: operation.getError(),
	                        icon: Ext.MessageBox.ERROR,
	                        buttons: Ext.Msg.OK
	                    });
	                }
	            }
	        },
	        listeners: {
	            write: function(proxy, operation){
	                if (operation.action == 'destroy') {
	                    main.child('#form').setActiveRecord(null);
	                }
	                Ext.example.msg(operation.action, operation.getResultSet().message);
	            }
	        }
	    });
	    var main = Ext.create('Ext.panel.Panel', {
	        constrain: true,
	        items: [{
	            itemId: 'form',
	            xtype: 'writerform',
	            manageHeight: false,
	            margin: '0 0 10 0',
	            listeners: {
	                create: function(form, data){
	                    store.insert(0, data);
	                }
	            }
	        }, {
	            itemId: 'grid',
	            xtype: 'writergrid',
	            title: 'User List',
	            flex: 1,
	            store: store,
	            listeners: {
	                selectionchange: function(selModel, selected) {
	                    main.child('#form').setActiveRecord(selected[0] || null);
	                }
	            }
	        }]
	    });
	    Ext.create('Ext.window.Window', {
	        title: 'Insert User',
	        width: 700,
	        layout: 'fit',
	        items: main
	    }).show();
	});
});
