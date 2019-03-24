function Bullet(){
	this.body = create("div");
	//子弹创建
	this.init = function(){
		var mp = new MyPlane();
		new GameEngine().append(this.body);
		this.body.className = "bullet";
		this.left(mp.left() + mp.width() / 2 - this.width() / 2);
		this.top(mp.top() - this.height());
		this.move();
	}
	//子弹移动
	this.move = function(){
		this.timer = setInterval(function(){
			this.top(this.top() - 2);
			if(this.top() < -this.height()){
				this.remove();
				return;
			}
			//子弹销毁
			var enemies = new GameEngine().enemies;
			for(var en of enemies){
				if(pz(en.body, this.body)){
					clearInterval(this.timer);
					this.explode();
					en.hurt();
				}
			}
		}.bind(this), 10);
	}
	this.explode = function(){
		this.body.className = "bullet_die";
		setTimeout(function(){
			this.body.style.backgroundImage = "url(images/die2.png)";
			setTimeout(function(){
				this.remove();
			}.bind(this), 100);
		}.bind(this), 200);
	}
	this.remove = function(){
		this.body.remove();
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
