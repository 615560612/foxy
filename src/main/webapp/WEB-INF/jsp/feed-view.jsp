<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="init.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTDHTML 4.01 Transitional//EN">
<html>
<head>
	<title>Feed Viewer</title>
	<link rel="stylesheet" type="text/css" href="<%=basePath %>css/Feed-Viewer.css">
	<script type="text/javascript">
        function hasOption (name) {
            return window.location.search.indexOf(name) >= 0;
        }
        Ext.Loader.setConfig({enabled: true});
        Ext.Loader.setPath('Ext.ux', Foxy.constants.path + "js/ext/ux");
        Ext.require([
            'Ext.ux.ajax.SimManager',
            'Ext.ux.PreviewPlugin'
        ]);
        Ext.onReady(function(){
            if (hasOption('simjax')) {
                initAjaxSim();
            }
            require(['js/viewer/FeedViewer','js/viewer/Sim'],function(){
	            var app = new FeedViewer.App();
            });
        });
    </script>
</head>
<body>
</body>
</html>
