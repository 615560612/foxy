define(['js/user/model'],function(model){
	var grid = Ext.define('Writer.Grid', {
	    extend: 'Ext.grid.Panel',
	    alias: 'widget.writergrid',
	    requires: [
	        'Ext.grid.plugin.CellEditing',
	        'Ext.form.field.Text',
	        'Ext.toolbar.TextItem'
	    ],
	    initComponent: function(){
	        this.editing = Ext.create('Ext.grid.plugin.CellEditing');
	        Ext.apply(this, {
	            iconCls: 'icon-grid',
	            plugins: [this.editing],
	            dockedItems: [{
	                xtype: 'toolbar',
	                items: [{
	                    iconCls: 'icon-add',
	                    text: 'Add',
	                    scope: this,
	                    handler: this.onAddClick
	                }, {
	                    iconCls: 'icon-delete',
	                    text: 'Delete',
	                    disabled: true,
	                    itemId: 'delete',
	                    scope: this,
	                    handler: this.onDeleteClick
	                }]
	            }, {
	                weight: 2,
	                xtype: 'toolbar',
	                dock: 'bottom',
	                items: [{
	                    xtype: 'tbtext',
	                    text: '<b>@cfg</b>'
	                }, '|', {
	                    text: 'autoSync',
	                    enableToggle: true,
	                    pressed: true,
	                    tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
	                    scope: this,
	                    toggleHandler: function(btn, pressed){
	                        this.store.autoSync = pressed;
	                    }
	                }, {
	                    text: 'batch',
	                    enableToggle: true,
	                    pressed: true,
	                    tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
	                    scope: this,
	                    toggleHandler: function(btn, pressed){
	                        this.store.getProxy().batchActions = pressed;
	                    }
	                }, {
	                    text: 'writeAllFields',
	                    enableToggle: true,
	                    pressed: false,
	                    tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
	                    scope: this,
	                    toggleHandler: function(btn, pressed){
	                        this.store.getProxy().getWriter().writeAllFields = pressed;
	                    }
	                }]
	            }, {
	                weight: 1,
	                xtype: 'toolbar',
	                dock: 'bottom',
	                ui: 'footer',
	                items: ['->', {
	                    iconCls: 'icon-save',
	                    text: 'Sync',
	                    scope: this,
	                    handler: this.onSync
	                }]
	            }],
	            columns: [{
	                text: 'ID',
	                width: 40,
	                sortable: true,
	                dataIndex: 'id',
	                renderer: function(value){
	                    return Ext.isNumber(value) ? value : '&nbsp;';
	                }
	            }, {
	                header: 'User Name',
	                flex: 1,
	                sortable: true,
	                dataIndex: 'userName',
	                field: {
	                    type: 'textfield'
	                }
	            },{
	                header: 'Password',
	                flex: 1,
	                sortable: true,
	                dataIndex: 'password',
	                field: {
	                    type: 'textfield'
	                }
	            }, {
	                header: 'Age',
	                width: 100,
	                sortable: true,
	                dataIndex: 'age',
	                field: {
	                    type: 'textfield'
	                }
	            }]
	        });
	        this.callParent();
	        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	    },
	    onSelectChange: function(selModel, selections){
	        this.down('#delete').setDisabled(selections.length === 0);
	    },
	    onSync: function(){
	        this.store.sync();
	    },
	    onDeleteClick: function(){
	        var selection = this.getView().getSelectionModel().getSelection()[0];
	        if (selection) {
	            this.store.remove(selection);
	        }
	    },
	    onAddClick: function(){
	        var rec = new model({
	            userName: '',
	            password:'',
	            age: '',
	        }), edit = this.editing;
	        edit.cancelEdit();
	        this.store.insert(0, rec);
	        edit.startEditByPosition({
	            row: 0,
	            column: 1
	        });
	    }
	});
	return grid;
});