window.onload = function () {
    //1.实现瀑布流布局
    waterFull("main","box");
    //2.动态加载图片
    var timerOn = null;
    window.onscroll = function () {
        clearTimeout(timerOn);
        timerOn = setTimeout(function () {
            if(loadImgFlag("box")) {
                // 2.1 造数据
                var dataArr = [];
                for (var j = 0;j<40;j++) {
                    var obj = {};
                    if(j<9) {
                        obj = {"src":"img0"+parseInt(parseInt(j)+1)+".jpg"};
                    } else {
                        obj = {"src":"img"+parseInt(parseInt(j)+1)+".jpg"};
                    }
                    dataArr.push(obj);
                }

                // 2.2 创建元素
                for(var i=0; i<dataArr.length; i++){
                    var newBox = document.createElement("div");
                    newBox.className = "box";
                    $("main").appendChild(newBox);

                    var newPic = document.createElement("div");
                    newPic.className = "pic";
                    newBox.appendChild(newPic);

                    var newImg = document.createElement("img");
                    newImg.src = "images/" + dataArr[i].src;
                    newPic.appendChild(newImg);
                }
                //重新加载
                waterFull("main","box");
            }
        },200);
    };
    //因为执行次数太多，所以需要截流
    //利用定时器进行截流，通常时间为200ms
    var timer = null;
    window.onresize = function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            waterFull("main","box");
        }, 200);
    }
};

/**
 * 实现瀑布流布局
 */
function waterFull(parent,child) {
    //1. 让父盒子居中（mian盒子）
    //1.1 获取所有要用到的变量
    var allBox = $(parent).getElementsByClassName(child);
    //1.2 获取子盒子宽度
    var boxW = allBox[0].offsetWidth;
    //1.3 获取屏幕宽度
    var screenW = document.documentElement.clientWidth;
    //1.4 计算列数
    var cols = parseInt(screenW/boxW);
    //1.5 计算父盒子宽度
    var mainW = cols*boxW;
    //1.6 设置最外层盒子宽度，并居中
    $(parent).style.width = mainW + "px"
    $(parent).style.margin = "0 auto";

    //2 子盒子的定位
    var heightArr = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;
    //2.1 循环所有box
    for (var i=0;i<allBox.length;i++) {
        //2.2 获取每一个盒子高度
        boxHeight = allBox[i].offsetHeight;
        //2.3获取第一行盒子的高度，放入高度数据
        if (i<cols) { // 第一行
            heightArr.push(boxHeight);
            allBox[i].style = "";
        } else { // 剩余行，定位到最小高度盒子底部
            minBoxHeight = _.min(heightArr);
            //2.4 获取最小高度的index，用于计算定位位置
            minBoxIndex = minIndex(heightArr,minBoxHeight);
            //2.5定位盒子到最小高度盒子的底部
            allBox[i].style.position = "absolute";
            allBox[i].style.left = minBoxIndex * boxW + "px";
            allBox[i].style.top = minBoxHeight + "px";
            //2.6重置最小盒子高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }

}

/**
 * 计算一个数组，最小高度的index
 * @param arr
 * @param minH
 */
function minIndex(arr,minH) {
   for (var i = 0;i < arr.length; i++) {
       if(arr[i] === minH) {
           return i;
       }
   }
}

/**
 * 获取对象
 */
function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

/**
 * 计算加载img的条件
 * 条件如果屏幕滚动到最后一张图片的一半的时候
 */
function loadImgFlag(className) {
    //1.获取所有盒子
    var boxs = document.getElementsByClassName(className);
    //2.计算最后一个盒子的高度
    var lastBoxH = boxs[boxs.length-1].offsetHeight;
    //3.计算滚动边界
    var rollBorder = lastBoxH/2 + boxs[boxs.length-1].offsetTop;
    //4.屏幕可视高度
    var screenH = document.body.clientHeight || document.documentElement.clientHeight;

    return rollBorder < screenH + scroll().top;
}