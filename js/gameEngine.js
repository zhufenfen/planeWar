function GameEngine(){
	if(!GameEngine.instance){
		GameEngine.instance = {
			body : $id("main"),
			ul : $id("options"),
			level : 0,
			enemies : new Set(),//用于存放所有的敌机对象
			init : function(){
				this.ul.addEventListener("click", function(e){
					var e = e || event;
					var target = e.target || e.srcElement;
					if(target.tagName == "LI"){
						this.level = target.getAttribute("level");
						this.ul.remove();
						this.start();
					}
				}.bind(this));
			},
			start : function(){
				//加载logo
				var logo = create("div");
				this.append(logo);
				logo.className = "logo";
				//动画飞机
				var plane = create("div");
				this.append(plane);
				plane.className = "loading";
				var index = 1;
				var timer = setInterval(function(){
					plane.style.backgroundImage = `url(images/loading${++index}.png)`;
					if(index == 3){
						index = 0;
					}
				}, 500);
				//背景移动
				var count = 0;
				setInterval(function(){
					this.body.style.backgroundPositionY = ++count + "px";
				}.bind(this), 30);
				//开启战机
				setTimeout(function(){
					logo.remove();
					plane.remove();
					clearInterval(timer);
					this.startGame();
				}.bind(this), 3000);
			},
			startGame : function(){
				//我方战机的入口方法
				new MyPlane().init();
				//敌机出场
				this.autoCreateEnemy();
			},
			autoCreateEnemy : function(){
				setInterval(function(){
					if(Math.random() > 0.3){
						this.enemies.add(new Enemy("small").init());
					}
				}.bind(this), 1000);
				setInterval(function(){
					if(Math.random() > 0.5){
						this.enemies.add(new Enemy("middle").init());
					}
				}.bind(this), 1500);
				setInterval(function(){
					if(Math.random() > 0.7){
						this.enemies.add(new Enemy("large").init());
					}
				}.bind(this), 3000);
			},
			append : function(obj){
				this.body.appendChild(obj);
			},
			width : function(){
				return this.body.offsetWidth;
			},
			height : function(){
				return this.body.offsetHeight;
			},
			left : function(val){
				return this.body.offsetLeft;
			}
		}
	}
	return GameEngine.instance;
}
