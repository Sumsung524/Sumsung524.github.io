function search() {
$(".search-icon").css("opacity", "1");
var listIndex = -1;
var hotList = 0;
var searchData = {
    "thisSearch": "https://www.baidu.com/s?wd=",
    "thisLOGO": "url('/images/guge.svg')",//添加
    "thisSearchIcon": "url('/images/search_icon.png')",
    "hotStatus": false,
    "data": [{
        name: "百度",
        img: "url('/images/search_icon.png') -80px 0px",
        position: "0px 0px",
        positionlogo: "0px 0px",
        url: "https://www.baidu.com/s?wd="
    }, {
        name: "谷歌",
        img: "url('/images/search_icon.png')  -105px 0px",
        position: "-40px 0px",
        positionlogo: "0px -92px",
        url: "https://www.google.com/search?q="
    }, {
        name: "必应",
        img: "url('/images/search_icon.png')  -80px -100px",
        position: "0px -160px",
        positionlogo: "0px -184px",
        url: "https://cn.bing.com/search?q="
    }, {
        name: "知乎",
        img: "url('/images/search_icon.png') -105px -100px",
        position: "-40px -160px",
        positionlogo: "0px -276px",
        url: "https://www.zhihu.com/search?type=content&q="
    }, {
        name: "GitHub",
        img: "url('/images/search_icon.png') -80px -175px",
        position: "0px -280px",
        positionlogo: "0px -368px",
        url: "https://github.com/search?utf8=✓&q="
    }, {
        name: "英译中",
        img: "url('/images/search_icon.png') -105px -25px",
        position: "-40px -40px",
        positionlogo: "0px -460px",
        url: "https://translate.google.cn/?sl=en&tl=zh-CN&text="
    }, {
        name: "B站",
        img: "url('/images/search_icon.png') -105px -125px",
        position: "-40px -200px",
        positionlogo: "0px -552px",
        url: "http://search.bilibili.com/all?keyword="
    }, {
        name: "优酷",
        img: "url('/images/search_icon.png') -105px -150px",
        position: "-40px -240px",
        positionlogo: "0px -644px",
        url: "https://so.youku.com/search_video/q_"
    }, {
        name: "腾讯",
        img: "url('/images/search_icon.png') -80px -25px",
        position: "0px -40px",
        positionlogo: "0px -736px",
        url: "https://v.qq.com/x/search/?q="
    }, {
        name: "网易云",
        img: "url('/images/search_icon.png') -80px -150px",
        position: "0px -240px",
        positionlogo: "0px -828px",
        url: "https://music.163.com/#/search/m/?s="
    }, {
        name: "值得买",
        img: "url('/images/search_icon.png') -105px -175px",
        position: "-40px -280px",
        positionlogo: "0px -920px",
        url: "https://search.smzdm.com/?c=home&s="
    }, {
        name: "京东",
        img: "url('/images/search_icon.png') -80px -75px",
        position: "0px -120px",
        positionlogo: "0px -1003px",
        url: "http://search.jd.com/Search?keyword="
    }]
};
//本地缓存搜索热词开启记录
var localSearchData = localStorage.getItem("searchData");
if (localSearchData) {
    searchData = JSON.parse(localSearchData)
}
function filterChildren(element) {
    var thisText = $(element).contents().filter(function (index, content) {
        return content.nodeType === 3
    }).text().trim();
    return thisText
}
function getHotkeyword(value) {
    $.ajax({
        type: "GET",
        url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
        async: true,
        data: {
            wd: value
        },
        dataType: "jsonp",
        jsonp: "cb",
        success: function (res) {
            $("#box ul").text("");
            hotList = res.s.length;
            if (hotList) {
                $("#box").css("display", "block");
                for (var i = 0; i < hotList; i++) {
                    $("#box ul").append("<li><span>" + (i + 1) + "</span> " + res.s[i] + "</li>");
                    $("#box ul li").eq(i).click(function () {
                        var thisText = filterChildren(this);
                        $("#txt").val(thisText);
                        window.open(searchData.thisSearch + thisText);
                        $("#box").css("display", "none")
                    });
                    if (i === 0) {
                        $("#box ul li").eq(i).css({
                            "border-top": "none"
                        });
                        $("#box ul span").eq(i).css({
                            "color": "#fff",
                            "background": "#f54545"
                        })
                    } else {
                        if (i === 1) {
                            $("#box ul span").eq(i).css({
                                "color": "#fff",
                                "background": "#ff8547"
                            })
                        } else {
                            if (i === 2) {
                                $("#box ul span").eq(i).css({
                                    "color": "#fff",
                                    "background": "#ffac38"
                                })
                            }
                        }
                    }
                }
            } else {
                $("#box").css("display", "none")
            }
        },
        error: function (res) {
            console.log(res)
        }
    })
}
$("#txt").keyup(function (e) {
    if ($(this).val()) {
        if (e.keyCode == 38 || e.keyCode == 40 || !searchData.hotStatus) {
            return
        }
        getHotkeyword($(this).val())
    } else {
        $(".search-clear").css("display", "none");
        $("#box").css("display", "none")
    }
});
$("#txt").keydown(function (e) {
    if (e.keyCode === 40) {
        listIndex === (hotList - 1) ? listIndex = 0 : listIndex++;
        $("#box ul li").eq(listIndex).addClass("current").siblings().removeClass("current");
        var hotValue = filterChildren($("#box ul li").eq(listIndex));
        $("#txt").val(hotValue)
    }
    if (e.keyCode === 38) {
        if (e.preventDefault) {
            e.preventDefault()
        }
        if (e.returnValue) {
            e.returnValue = false
        }
        listIndex === 0 || listIndex === -1 ? listIndex = (hotList - 1) : listIndex--;
        $("#box ul li").eq(listIndex).addClass("current").siblings().removeClass("current");
        var hotValue = filterChildren($("#box ul li").eq(listIndex));
        $("#txt").val(hotValue)
    }
    if (e.keyCode === 13) {
        window.open(searchData.thisSearch + $("#txt").val());
        $("#box").css("display", "none");
        $("#txt").blur();
        $("#box ul li").removeClass("current");
        listIndex = -1
    }
});
$("#txt").focus(function () {
    $(".search-box").css("box-show", "inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3)");
    if ($(this).val() && searchData.hotStatus) {
        getHotkeyword($(this).val())
    }
});
$("#txt").blur(function () {
    setTimeout(function () {
        $("#box").css("display", "none")
    }, 250)
});
for (var i = 0; i < searchData.data.length; i++) {
    $(".search-engine-list").append('<li><span style="background:' + searchData.data[i].img + '"/></span>' +
        searchData.data[i].name + "</li>")
}//告诉网页如何列出小图标和网站名称
$(".search-icon, .search-engine").hover(function () {
    $(".search-engine").css("display", "block")
}, function () {
    $(".search-engine").css("display", "none")
});
$("#hot-btn").click(function () {
    $(this).toggleClass("off");
    searchData.hotStatus = !searchData.hotStatus;
    localStorage.searchData = JSON.stringify(searchData)
});
searchData.hotStatus ? $("#hot-btn").removeClass("off") : $("#hot-btn").addClass("off");

$(".search-engine-list li").click(function () {
    var index = $(this).index();
    searchData.thisLOGO = searchData.data[index].positionlogo;
    $(".search-LOGO").css("background-position", searchData.thisLOGO);

    searchData.thisSearchIcon = searchData.data[index].position; //首页LOGO显示位置
    $(".search-icon").css("background-position", searchData.thisSearchIcon);
    searchData.thisSearch = searchData.data[index].url;
    $(".search-engine").css("display", "none");
    localStorage.searchData = JSON.stringify(searchData)
});
$(".search-icon").css("background-position", searchData.thisSearchIcon);
$("#search-btn").click(function () {
    var textValue = $("#txt").val();
    if (textValue) {
        window.open(searchData.thisSearch + textValue);
        $("#box ul").html("")
    } else {
        layer.msg("请输入关键词！", {
            time: 500
        }, function () {
            $("#txt").focus()
        })
    }
})
}

function switchNightMode() {
var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
if (night == '0') {
    document.body.classList.add('night');
    document.cookie = "night=1;path=/"
    console.log(' ');
} else {
    document.body.classList.remove('night');
    document.cookie = "night=0;path=/"
    console.log(' ');
}
}

//页脚脚本
$(document).ready(function () {
    const observer = lozad();
    observer.observe();

    $(document).on('click', '.has-sub', function () {
      var _this = $(this)
      if (!$(this).hasClass('expanded')) {
        setTimeout(function () {
          _this.find('ul').attr("style", "")
        }, 300);

      } else {
        $('.has-sub ul').each(function (id, ele) {
          var _that = $(this)
          if (_this.find('ul')[0] != ele) {
            setTimeout(function () {
              _that.attr("style", "")
            }, 300);
          }
        })
      }
    })
    $('.user-info-menu .hidden-sm').click(function () {
      if ($('.sidebar-menu').hasClass('collapsed')) {
        $('.has-sub.expanded > ul').attr("style", "")
      } else {
        $('.has-sub.expanded > ul').show()
      }
    })
    $("#main-menu li ul li").click(function () {
      $(this).siblings('li').removeClass('active'); // 删除其他兄弟元素的样式
      $(this).addClass('active'); // 添加当前元素的样式
    });
    $("a.smooth").click(function (ev) {
      ev.preventDefault();

      public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass('mobile-is-visible');
      ps_destroy();
      $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top - 30
      }, {
        duration: 100, //设置缓冲时间长度
        easing: "swing"
      });
    });
    return false;
  });

  var href = "";
  var pos = 0;
  $("a.smooth").click(function (e) {
    $("#main-menu li").each(function () {
      $(this).removeClass("active");
    });
    $(this).parent("li").addClass("active");
    e.preventDefault();
    href = $(this).attr("href");
    pos = $(href).position().top - 30;
  });
  (function () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
      if (new Date().getHours() > 22 || new Date().getHours() < 6) {
        document.body.classList.add('night');
        document.cookie = "night=1;path=/";
        console.log('夜间模式开启');
      } else {
        document.body.classList.remove('night');
        document.cookie = "night=0;path=/";
        console.log('夜间模式关闭');
      }
    } else {
      var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
      if (night == '0') {
        document.body.classList.remove('night');
      } else if (night == '1') {
        document.body.classList.add('night');
      }
    }
  })();