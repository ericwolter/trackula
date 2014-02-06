"use strict";window.navigator.standalone&&$(document.body).css("margin-top","20px"),moment.lang("en",{calendar:{lastDay:"[Yesterday at] LT",sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",lastWeek:"[last] dddd [at] LT",nextWeek:"dddd [at] LT",sameElse:"L [at] LT"}});var client=new Dropbox.Client({key:"3kvwzf94d0wkxwz"}),Dialog=Dialog||{init:function(){},show:function(a,b,c,d,e,f){var g=$("#dialog");g.find("#title").text(a),g.find("#message").text(b),g.find("#yes").text(c).unbind("click").click(function(a){a.preventDefault(),g.hide(),e()}),g.find("#no").text(d).unbind("click").click(function(a){a.preventDefault(),g.hide(),f()}),g.show()}},swiper={triggerOnTouchEnd:!0,allowPageScroll:"vertical",speed:100},bloodhound=new Bloodhound({datumTokenizer:function(a){return Bloodhound.tokenizers.whitespace(a.val)},queryTokenizer:Bloodhound.tokenizers.whitespace,local:[]});bloodhound.initialize();var TrackulaApp=TrackulaApp||{actions:null,init:function(){FastClick.attach(document.body),document.getElementById("scrollable").addEventListener("touchstart",function(){}),document.getElementById("scrollable").addEventListener("touchmove",function(){}),document.getElementById("scrollable").addEventListener("touchend",function(){}),swiper.swipeStatus=TrackulaApp.onSwipe,TrackulaApp.resetDatetime(),$("form").submit(TrackulaApp.onSubmit),$(".swipable").swipe(swiper),$("#action-input").focus(function(){$("#suggestions").show(),$("#actionlist").hide()}),$("#action-input").keyup(function(){bloodhound.get($(this).val(),function(a){$("#suggestions").empty(),a.forEach(function(a){var b=$("<li>"+a.val+"</li>");b.mousedown(function(){$("#action-input").val($(this).text())}),b.bind("touchstart",function(){$("#action-input").val($(this).text())}),$("#suggestions").prepend(b)})})}),$("#action-input").blur(function(){$("#actionlist").show(),$("#suggestions").hide()}),client.authenticate({interactive:!1},function(a){a&&console.log("OAuth error: "+a)}),TrackulaApp.checkClient()},checkClient:function(){client.isAuthenticated()?client.getDatastoreManager().openDefaultDatastore(function(a,b){a&&console.log("Datastore error: "+a),TrackulaApp.actions=b.getTable("actions"),TrackulaApp.updateActions(),b.recordsChanged.addListener(TrackulaApp.updateActions)}):client.authenticate()},resetDatetime:function(){$("#datetime").val(moment().format("YYYY-MM-DDTHH:mm"))},updateActions:function(){var a=$("#actionlist"),b=TrackulaApp.actions.query();a.empty();for(var c={},d=b.length-1;d>=0;d--){var e=b[d],f='<li class="swipable" data-record-id="'+e.getId()+'"><span class="left">pencil</span><div class="center"><span class="action">'+e.get("action")+'</span><span class="value">'+e.get("value")+'</span><span class="timestamp">'+moment(1e3*e.get("timestamp")).calendar()+'</span><span class="right">cancel</span></li>';a.append($(f)),c[e.get("action")]=1}bloodhound=new Bloodhound({datumTokenizer:function(a){return Bloodhound.tokenizers.whitespace(a.val)},queryTokenizer:Bloodhound.tokenizers.whitespace,local:Object.keys(c).map(function(a){return{val:a}})}),bloodhound.initialize(),$(".swipable").swipe(swiper)},onSubmit:function(a){a.preventDefault();var b=moment($("#datetime").val()),c=$("#action-input").val(),d=$("#value-input").val();TrackulaApp.actions.insert({action:c,value:Dropbox.Datastore.int64(d),timestamp:Dropbox.Datastore.int64(b.unix())}),$("#action-input").val(""),$("#datetime").val(moment().format("YYYY-MM-DDTHH:mm"))},onSwipe:function(a,b,c,d){var e=a.currentTarget;if("move"!==b||"left"!==c&&"right"!==c){if("cancel"===b)TrackulaApp.scrollListItems($(e),0,swiper.speed);else if("end"===b)if(TrackulaApp.scrollListItems($(e),0,swiper.speed),console.log(e),"left"===c){var f=$(e).find(".right");if(d>parseInt(f.css("width"))){$(".ew-content").css("filter","blur(10px)"),$(".ew-content").css("-webkit-filter","blur(10px)");var g=$(e).attr("data-record-id");Dialog.show("Delete Action","Are you sure you want to delete this action?","Yes. Delete it.","No. Cancel.",function(){$(".ew-content").css("filter",""),$(".ew-content").css("-webkit-filter",""),console.log("delete: "+g),TrackulaApp.actions.get(g).deleteRecord()},function(){$(".ew-content").css("filter",""),$(".ew-content").css("-webkit-filter",""),console.log("cancel: "+g)})}}else if("right"===c){var h=$(e).find(".left");d>parseInt(h.css("width"))&&($(".ew-content").css("filter","blur(10px)"),$(".ew-content").css("-webkit-filter","blur(10px)"),Dialog.show("test","message","yes","no",function(){$(".ew-content").css("filter",""),$(".ew-content").css("-webkit-filter","")},function(){$(".ew-content").css("filter",""),$(".ew-content").css("-webkit-filter","")}))}}else{var i=0;"left"===c?TrackulaApp.scrollListItems($(e),0+d,i):"right"===c&&TrackulaApp.scrollListItems($(e),0-d,i)}},scrollListItems:function(a,b,c){a.css("-transition-duration",(c/1e3).toFixed(1)+"s");var d=(0>b?"":"-")+Math.abs(b).toString();a.css("-transform","translate3d("+d+"px,0px,0px)");var e;if(0>b){var f=a.find(".left");e=parseInt(f.css("width")),f.css("color","rgba(255,255,255,"+(Math.abs(b)/e).toString()+")"),Math.abs(b)>e?a.parent().css("background-color","#34aadc"):a.parent().css("background-color","#d2d6d6")}else if(b>0){var g=a.find(".right");e=parseInt(g.css("width")),g.css("color","rgba(255,255,255,"+(Math.abs(b)/e).toString()+")"),Math.abs(b)>e?a.parent().css("background-color","#ff3b30"):a.parent().css("background-color","#d2d6d6")}}};$("document").ready(TrackulaApp.init);