<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="init.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTDHTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
	<title>Feed Viewer</title>
   	<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/Feed-Viewer.css">
	<style type="text/css">
	.x-menu-item div.preview-right, .preview-right {
	    background-image: url(image/preview-right.gif);
	}
	.x-menu-item div.preview-bottom, .preview-bottom {
	    background-image: url(image/preview-bottom.gif);
	}
	.x-menu-item div.preview-hide, .preview-hide {
	    background-image: url(image/preview-hide.gif);
	}
	
	#reading-menu .x-menu-item-checked {
	    border: 1px dotted #a3bae9 !important;
	    background: #DFE8F6;
	    padding: 0;
	    margin: 0;
	}
	</style>
	<script type="text/javascript">
        function hasOption (name) {
            return window.location.search.indexOf(name) >= 0;
        }
		var path = window.path;
        Ext.Loader.setConfig({enabled: true});
        Ext.Loader.setPath('Ext.ux', path+"js/ext/ux");
        Ext.require([
            'Ext.grid.*',
            'Ext.data.*',
            'Ext.util.*',
            'Ext.Action',
            'Ext.tab.*',
            'Ext.button.*',
            'Ext.form.*',
            'Ext.layout.container.Card',
            'Ext.layout.container.Border',
            'Ext.ux.ajax.SimManager',
            'Ext.ux.PreviewPlugin'
        ]);
        Ext.onReady(function(){
            if (hasOption('simjax')) {
                initAjaxSim();
            }
            require(['js/viewer/FeedViewer'],function(){
	            var app = new FeedViewer.App();
            });
        });
    </script>
    <script type="text/javascript" src="<%=basePath%>js/viewer/Sim.js"></script>
</head>
<body>
</body>
</html>
