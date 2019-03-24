function Enemy(type){
	this.body = create("div");
	//敌机创建
	this.init = function(){
		new GameEngine().append(this.body);
		switch(type){
			case "small" : {
				this.body.className = "enemy-small";
				this.speed = 8;
				this.blood = 1;
				this.imgs = ["plane1_die1.png", "plane1_die2.png", "plane1_die3.png"];
				break;
			}
			case "middle" : {
				this.body.className = "enemy-middle";
				this.speed = 5;
				this.blood = 3;
				this.imgs = ["plane2_die1.png", "plane2_die2.png", "plane2_die3.png", "plane2_die4.png"];
				break;
			}
			case "large" : {
				this.body.className = "enemy-large";
				this.speed = 2;
				this.blood = 8;
				this.imgs = ["plane3_die1.png", "plane3_die2.png", "plane3_die3.png", "plane3_die4.png", "plane3_die5.png", "plane3_die6.png"];
				break;
			}
		}
		this.top(-this.height());
		this.left(rand(0, new GameEngine().width() - this.width()));
		this.move();
		return this;
	}
	//敌机移动
	this.move = function(){
		this.timer = setInterval(function(){
			this.top(this.top() + this.speed);
			if(this.top() > new GameEngine().height()){
				this.body.remove();
				new GameEngine().enemies.delete(this);
				clearInterval(this.timer);
			}
		}.bind(this), 30);
	}
	//敌机受伤
	this.hurt = function(){
		--this.blood == 0 ? this.explode() : "";
	}
	//敌机销毁
	this.explode = function(){
		clearInterval(this.timer);
		new GameEngine().enemies.delete(this);
//		console.log(new GameEngine().enemies);
		var timer = setInterval(function(){
			if(this.imgs.length == 0){
				this.body.remove();
				clearInterval(timer);
			}
			this.body.style.backgroundImage = `url(images/${this.imgs.shift()})`;
		}.bind(this), 200);
	}
	this.width = function(){
		return this.body.offsetWidth;
	}
	this.height = function(){
		return this.body.offsetHeight;
	}
	this.left = function(val){
		if(val || val == 0){
			this.body.style.left = val + "px";
			return;
		}
		return this.body.offsetLeft;
	}
	this.top = function(val){
		if(val || val == 0){
			this.body.style.top = val + "px";
			return;
		}
		return this.body.offsetTop;
	}
}
