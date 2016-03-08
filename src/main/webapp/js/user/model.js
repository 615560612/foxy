define([],function(){
	var model = Ext.define('Writer.Person', {
	    extend: 'Ext.data.Model',
	    fields: [
	    'id',
	    'userName',
	    'password', 
	    {
	        name: 'age',
	        type: 'int',
	        useNull: true
	    },
	    ],
	    validators: {
	    	userName: {
	            type: 'length',
	            min: 1
	        },
	        age: {
	            type: 'length',
	            min: 1
	        },
	    }
	});
	return model;
});
