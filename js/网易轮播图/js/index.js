window.onload = function () {
    var slider = $("slider");
    var slider_main = $("slider_main");
    var slider_main_img = slider_main.children;
    var slider_ctl = $("slider_ctl");
    var iNow = 0;//当前图片下标
    //1.动态添加下面控制器
    for (var i=0;i<slider_main_img.length;i++) {
        var span = document.createElement("span");
        span.className = "slider-ctl-icon";
        span.innerText = slider_main_img.length - i - 1;
        slider_ctl.insertBefore(span,slider_ctl.children[1]);
    }

    //2.选中控制器第一个
    slider_ctl.children[1].className = "slider-ctl-icon current";

    //3.让除了第一张图片的所有图片归位
    var sliderW = slider.offsetWidth;
    for (var j=1;j<slider_main_img.length;j++) {
        slider_main_img[j].style.left = sliderW + "px";
    }

    //4.遍历监听点击控制区
    var slider_ctl_child = slider_ctl.children;
    for (var k=0;k<slider_ctl_child.length;k++) {
        slider_ctl_child[k].onmousedown = function () {
            if(this.className==="slider-ctl-prev") {//左面
                /*
                 1.当前可视区域的图片快速右移;
                 2.上一张图片快速出现在可视区域的左边
                 3.让这张图片做动画进入
                */
                //当前可视区域的图片快速右移
                buffer(slider_main_img[iNow],{"left":sliderW});
                //上一张图片快速出现在可视区域的左边
                iNow --;
                if(iNow<0) {
                    iNow = slider_main_img.length-1;
                }
                slider_main_img[iNow].style.left = -sliderW + "px";
                //让这张图片做动画进入
                buffer(slider_main_img[iNow], {"left": 0});
            } else if (this.className==="slider-ctl-next") {//右面
                autoPlay();
            } else {//下面
                /*
                 1.用当前点击的索引和选中索引对比
                 2.点击的 > 选中的, 相当于点击了右边的按钮
                 2.点击的 < 选中的, 相当于点击了左边的按钮
                */
                var index = parseInt(this.innerText);
                if (index > iNow) {//相当于点击右面
                    buffer(slider_main_img[iNow],{"left":-sliderW});
                    slider_main_img[index].style.left = sliderW + "px";
                } else if (index < iNow) {//相当于点击了左面
                    buffer(slider_main_img[iNow],{"left":sliderW});
                    slider_main_img[index].style.left = -sliderW + "px";
                }
                iNow = index;
                buffer(slider_main_img[iNow], {"left": 0});
            }
            changeIndex();
        };
    }

    //5.切换索引
    function changeIndex() {
        for(var i=1; i<slider_ctl_child.length-1; i++){
            slider_ctl_child[i].className = "slider-ctl-icon";
        }
        slider_ctl_child[iNow + 1].className = "slider-ctl-icon current";
    }

    //6.自动播放
    var timer = setInterval(autoPlay,2000);

    //7.鼠标进入控制器
    slider.onmousemove = function () {
        clearInterval(timer);
    };

    //8.鼠标移出控制器
    slider.onmouseout = function () {
        timer = setInterval(autoPlay,2000);
    };

    /**
     * 自动播放函数
     */
    function autoPlay() {
        /*
          1.当前可视区域的图片快速左移;
          2.下一张图片快速出现在可视区域的右边
          3.让这张图片做动画进入
          */
        //当前可视区域的图片快速左移;
        buffer(slider_main_img[iNow],{"left":-sliderW});
        //下一张图片快速出现在可视区域的右边
        iNow ++;
        if(iNow>=slider_main_img.length) {
            iNow = 0;
        }
        slider_main_img[iNow].style.left = sliderW + "px";
        //让这张图片做动画进入
        buffer(slider_main_img[iNow], {"left": 0});
        changeIndex()
    }
};