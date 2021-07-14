window.onload = function(){
	//1.获取头部所有li
	var allList = $("tab-head").getElementsByTagName("li");
	//2.获取所有显示body
	var bodyList = document.getElementsByClassName("dom");
	//3.循环tab，添加鼠标移入事件
	for (var i = 0; i < allList.length; i++) {
		var single = allList[i];
		single.id = i;
		single.onmouseover = function(){
			//3.1将所有tab选中状态清除，并且将所有body隐藏
			for (var j = 0; j < allList.length; j++) {
				allList[j].setAttribute("class","");
				bodyList[j].style = "display:none";
			}
			//3.2添加当前移入的为选中状态，并且显示当前的body
			this.setAttribute("class","selected");
			bodyList[this.id].style = "display:block";
		};
	}
};
function $(id){
	return typeof id === "string"?document.getElementById(id):null;
}