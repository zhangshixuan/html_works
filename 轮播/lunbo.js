//定义需要的全局变量和获取需要使用的元素节点
var timer;
var index = 1;
var list = document.getElementById('list');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var container = document.getElementById('container');
var buttons = document.getElementById('buttons').getElementsByTagName('span');


window.onload = function() {
    
    function animate(offset) {
        var left_str = list.style.transform + "";
        var left_num = left_str.substring(12,left_str.indexOf("px"));
        //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
        //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
        var newLeft = parseInt(left_num) + offset;
        if(newLeft < -4800) {
            list.style.transform = "translate3d(-600px, 0px, 0px)";
            index = 1;
        } else if(newLeft > -600) {
            list.style.transform = "translate3d(-4800px, 0px, 0px)";
            index = 8;
        } else {
            list.style.transform = "translate3d("+newLeft + "px, 0px, 0px)";
        }
        buttonsShow();
    }
    
    //左（上一张）切换按钮点击事件
    prev.onclick = function() {
        index -= 1;
        if (index < 1) {
            index = 8;
        }
        buttonsShow();
        animate(600);
    }

    //右（下一张）切换按钮点击事件
    next.onclick = function() {
        index += 1;
        if (index > 8) {
            index = 1;
        }
        buttonsShow();
        animate(-600);
    }
    
    //圆点切换图片
    for (var i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function () {
                /* 偏移量获取：这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
                /* 由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
                var clickIndex = parseInt(this.getAttribute('index'));
                var offset = 600 * (index - clickIndex);
                animate(offset); //存放鼠标点击后的位置，用于小圆点的正常显示 
                index = clickIndex;
                buttonsShow();
            }
    }
    
    play();
    container.onmouseover = stop;
    container.onmouseout = play;
    
}

//图片自动播放函数
function play() {
    timer = setInterval(function() {
        next.onclick()
    }, 3000)
}

//图片暂停播放函数
function stop() {
    clearInterval(timer);
}

//圆点按钮高亮状态切换函数
function buttonsShow() {
    //这里需要清除之前的样式
    for(var i = 0; i < buttons.length; i++) {
        if(buttons[i].className == 'on') {
            buttons[i].className = '';
        }
    }
    //数组从0开始，故index需要-1
    buttons[index - 1].className = 'on';
}
