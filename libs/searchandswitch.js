"use strict";function search(){$(".search-icon").css("opacity","1");var t=-1,i=0,e={thisSearch:"https://www.baidu.com/s?wd=",thisLOGO:"url('/images/guge.svg')",thisSearchIcon:"url('/images/search_icon.png')",hotStatus:!1,data:[{name:"百度",img:"url('/images/search_icon.png') -80px 0px",position:"0px 0px",positionlogo:"0px 0px",url:"https://www.baidu.com/s?wd="},{name:"谷歌",img:"url('/images/search_icon.png')  -105px 0px",position:"-40px 0px",positionlogo:"0px -92px",url:"https://www.google.com/search?q="},{name:"多吉",img:"url('/images/search_icon.png')  -80px -100px",position:"0px -160px",positionlogo:"0px -184px",url:"https://www.dogedoge.com/results?q="},{name:"知乎",img:"url('/images/search_icon.png') -105px -100px",position:"-40px -160px",positionlogo:"0px -276px",url:"https://www.zhihu.com/search?type=content&q="},{name:"GitHub",img:"url('/images/search_icon.png') -80px -175px",position:"0px -280px",positionlogo:"0px -368px",url:"https://github.com/search?utf8=✓&q="},{name:"网盘搜索",img:"url('/images/search_icon.png') -105px -25px",position:"-40px -40px",positionlogo:"0px -460px",url:"https://www.fastsoso.cn/search?k="},{name:"B站",img:"url('/images/search_icon.png') -105px -125px",position:"-40px -200px",positionlogo:"0px -552px",url:"http://search.bilibili.com/all?keyword="},{name:"优酷",img:"url('/images/search_icon.png') -105px -150px",position:"-40px -240px",positionlogo:"0px -644px",url:"https://so.youku.com/search_video/q_"},{name:"腾讯",img:"url('/images/search_icon.png') -80px -25px",position:"0px -40px",positionlogo:"0px -736px",url:"https://v.qq.com/x/search/?q="},{name:"网易云",img:"url('/images/search_icon.png') -80px -150px",position:"0px -240px",positionlogo:"0px -828px",url:"https://music.163.com/#/search/m/?s="},{name:"值得买",img:"url('/images/search_icon.png') -105px -175px",position:"-40px -280px",positionlogo:"0px -920px",url:"https://search.smzdm.com/?c=home&s="},{name:"京东",img:"url('/images/search_icon.png') -80px -75px",position:"0px -120px",positionlogo:"0px -1012px",url:"http://search.jd.com/Search?keyword="}]};function n(o){return $(o).contents().filter(function(o,s){return 3===s.nodeType}).text().trim()}function s(o){$.ajax({type:"GET",url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",async:!0,data:{wd:o},dataType:"jsonp",jsonp:"cb",success:function(o){if($("#box ul").text(""),i=o.s.length){$("#box").css("display","block");for(var s=0;s<i;s++)$("#box ul").append("<li><span>"+(s+1)+"</span> "+o.s[s]+"</li>"),$("#box ul li").eq(s).click(function(){var o=n(this);$("#txt").val(o),window.open(e.thisSearch+o),$("#box").css("display","none")}),0===s?($("#box ul li").eq(s).css({"border-top":"none"}),$("#box ul span").eq(s).css({color:"#fff",background:"#f54545"})):1===s?$("#box ul span").eq(s).css({color:"#fff",background:"#ff8547"}):2===s&&$("#box ul span").eq(s).css({color:"#fff",background:"#ffac38"})}else $("#box").css("display","none")},error:function(o){console.log(o)}})}$("#txt").keyup(function(o){if($(this).val()){if(38==o.keyCode||40==o.keyCode||!e.hotStatus)return;s($(this).val())}else $(".search-clear").css("display","none"),$("#box").css("display","none")}),$("#txt").keydown(function(o){var s;40===o.keyCode&&(t===i-1?t=0:t++,$("#box ul li").eq(t).addClass("current").siblings().removeClass("current"),s=n($("#box ul li").eq(t)),$("#txt").val(s)),38===o.keyCode&&(o.preventDefault&&o.preventDefault(),o.returnValue&&(o.returnValue=!1),0===t||-1===t?t=i-1:t--,$("#box ul li").eq(t).addClass("current").siblings().removeClass("current"),s=n($("#box ul li").eq(t)),$("#txt").val(s)),13===o.keyCode&&(window.open(e.thisSearch+$("#txt").val()),$("#box").css("display","none"),$("#txt").blur(),$("#box ul li").removeClass("current"),t=-1)}),$("#txt").focus(function(){$(".search-box").css("box-show","inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3)"),$(this).val()&&e.hotStatus&&s($(this).val())}),$("#txt").blur(function(){setTimeout(function(){$("#box").css("display","none")},250)});for(var o=0;o<e.data.length;o++)$(".search-engine-list").append('<li><span style="background:'+e.data[o].img+'"/></span>'+e.data[o].name+"</li>");$(".search-icon, .search-engine").hover(function(){$(".search-engine").css("display","block")},function(){$(".search-engine").css("display","none")}),$("#hot-btn").click(function(){$(this).toggleClass("off"),e.hotStatus=!e.hotStatus,localStorage.searchData=JSON.stringify(e)}),e.hotStatus?$("#hot-btn").removeClass("off"):$("#hot-btn").addClass("off"),$(".search-engine-list li").click(function(){var o=$(this).index();e.thisLOGO=e.data[o].positionlogo,$(".search-LOGO").css("background-position",e.thisLOGO),e.thisSearchIcon=e.data[o].position,$(".search-icon").css("background-position",e.thisSearchIcon),e.thisSearch=e.data[o].url,$(".search-engine").css("display","none"),localStorage.searchData=JSON.stringify(e)}),$(".search-icon").css("background-position",e.thisSearchIcon),$("#search-btn").click(function(){var o=$("#txt").val();o?(window.open(e.thisSearch+o),$("#box ul").html("")):layer.msg("请输入关键词！",{time:500},function(){$("#txt").focus()})})}function switchNightMode(){"0"==(document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/,"$1")||"0")?(document.body.classList.add("night"),document.cookie="night=1;path=/"):(document.body.classList.remove("night"),document.cookie="night=0;path=/"),console.log(" ")}$(document).ready(function(){return lozad().observe(),$(document).on("click",".has-sub",function(){var i=$(this);$(this).hasClass("expanded")?$(".has-sub ul").each(function(o,s){var t=$(this);i.find("ul")[0]!=s&&setTimeout(function(){t.attr("style","")},300)}):setTimeout(function(){i.find("ul").attr("style","")},300)}),$(".user-info-menu .hidden-sm").click(function(){$(".sidebar-menu").hasClass("collapsed")?$(".has-sub.expanded > ul").attr("style",""):$(".has-sub.expanded > ul").show()}),$("#main-menu li ul li").click(function(){$(this).siblings("li").removeClass("active"),$(this).addClass("active")}),$("a.smooth").click(function(o){o.preventDefault(),public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass("mobile-is-visible"),ps_destroy(),$("html, body").animate({scrollTop:$($(this).attr("href")).offset().top-30},{duration:100,easing:"swing"})}),!1});var href="",pos=0;$("a.smooth").click(function(o){$("#main-menu li").each(function(){$(this).removeClass("active")}),$(this).parent("li").addClass("active"),o.preventDefault(),href=$(this).attr("href"),pos=$(href).position().top-30}),function(){var o;""===document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/,"$1")?22<(new Date).getHours()||(new Date).getHours()<6?(document.body.classList.add("night"),document.cookie="night=1;path=/",console.log("夜间模式开启")):(document.body.classList.remove("night"),document.cookie="night=0;path=/",console.log("夜间模式关闭")):"0"==(o=document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/,"$1")||"0")?document.body.classList.remove("night"):"1"==o&&document.body.classList.add("night")}();