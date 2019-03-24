function $id(id){
	return document.getElementById(id);
}
function $tagName(tagName){
	return document.getElementsByTagName(tagName);
}
function $name(name){
	return document.getElementsByName(name);
}
function $className(className){
	return document.getElementsByClassName(className);
}
function create(ele){
	return document.createElement(ele);
}
function rand(min, max){
	return Math.round(Math.random() * (max - min) + min);
}
/*function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	for(var i = 1; i <= 6; i++){
		color += str.charAt(rand(0, 15));
	}
	return color;
}*/
function getColor(){
	var color = "#";
	for(var j = 1; j <= 6; j++){
		char = rand(0, 15);
		if(char >= 10){
			char = String.fromCharCode(char + 87);//将10-15的数字转为a-f
		}
		color += char;
	}
	return color;
}
function diff(s, e){
	return e.getTime() - s.getTime();
}
function toTwo(num){
	return num < 10 ? "0" + num : num;
}
function dataToString(sign){
	sign = sign || "-";//设置sign默认值.用户传入sign则连接符为sign，未传入连接符为-
	var d = new Date();
	var y = d.getFullYear();
	var m = d.getMonth() + 1;
	var day = d.getDate();
	var h = toTwo(d.getHours());
	var min = toTwo(d.getMinutes());
	var s = toTwo(d.getSeconds());
	var week = d.getDay();
	var arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	var str = y + sign + m + sign + day + " " + h + ":" + min + ":" + s + " " + arr[week];
	return str;
}
/*思路：随机获取0-61之间的数字，当随机数字在10-35之间，将数字加上55后对应的是A-Z之间的ACSII码；当随机数字在36到61之间，将数字加上61对应的是a-z之间的ASCII码。再将ASCII码通过String.fromCharCode()转为对应的字符。通过for循环就可以得到由大小写字母和数字组成的任意给定长度的字符串*/
function yzm(n){
	var str = "";
	for(var i = 1; i <= n; i++){
		var randNum = rand(0, 61);
		if(randNum >= 10 && randNum <= 35){
			randNum = String.fromCharCode(randNum + 55);
		}else if(randNum >= 36){
			randNum = String.fromCharCode(randNum + 61);
		}
		str += "<span style='color:" + getColor() + "'>" + randNum + "</span>";
	}		
	return str;
}
function Yzm(n){
	var str = "";
	var count = 0;
	while(count < n){
		var randNum = rand(48, 122);
		if(!(randNum >= 58 && randNum <= 64 || randNum >= 91 && randNum <= 96)){
			randNum = String.fromCharCode(randNum);
			str += "<span style='color:" + getColor() + "'>" + randNum + "</span>";
			count++;
		}
	}
	return str;
}
function pz(obj1, obj2){
	if(obj1.offsetLeft + obj1.offsetWidth >= obj2.offsetLeft && obj2.offsetLeft + obj2.offsetWidth >= obj1.offsetLeft && obj1.offsetTop + obj1.offsetHeight >= obj2.offsetTop && obj2.offsetTop + obj2.offsetHeight >= obj1.offsetTop){
		return true;
	}else{
		return false;
	}
}