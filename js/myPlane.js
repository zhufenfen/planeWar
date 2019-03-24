function MyPlane(){
	if(!MyPlane.instance){
		MyPlane.instance = {
			body : create("div"),
			//战机创建
			init : function(){
				var ge = new GameEngine();
				ge.append(this.body);
				this.body.className = "my-warplain";
				this.body.style.bottom = 0;
				this.left(ge.width() / 2 - this.width() / 2);
				this.move("mouse");
				this.fire();
			},
			//战机移动，鼠标和键盘操作
			move : function(type){
				var ge = new GameEngine();
				switch(type){
					case "mouse" : {
						ge.body.onmousemove = function(e){
							var e = e || event;
							var x = e.pageX - ge.left() - this.width() / 2;
							var maxL = ge.width() - this.width();
							x = Math.min(Math.max(0, x), maxL);
							this.left(x);
						}.bind(this);
						break;
					}
					case "key" : {
						document.onkeydown = function(e){
							var e = e || event;
							var keyCode = e.keyCode || e.which;
							if(keyCode == 37){
								var x = Math.max(this.left() - 5, 0);
								this.left(x);
							}
							if(keyCode == 39){
								var x = Math.min(this.left() + 5, ge.width() - this.width());
								this.left(x);
							}
						}.bind(this);
						break;
					}
				}
			},
			//开火，引出子弹，根据引擎的level属性设置定时器间隔多久创建一个子弹
			fire : function(){
				setInterval(function(){
					new Bullet().init();
				}.bind(this), new GameEngine().level);
			},
			width : function(){
				return this.body.offsetWidth;
			},
			left : function(val){
				if(val || val == 0){
					this.body.style.left = val + "px";
					return;
				}
				return this.body.offsetLeft;
			},
			top : function(){
				return this.body.offsetTop;
			}
		}
	}
	return MyPlane.instance;
}
