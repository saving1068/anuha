bgm()
sessionStorage.setItem('assest',0)
$.get("http://lishui.henghadigital.com/api/plan/singing", function(data){
	console.log(data)
	wx.config({
		debug:false,
		appId:data.appId,//appi
		timestamp:data.timestamp,// 时间戳
		nonceStr:data.noticeStr,// 随机字符串
		signature:data.signature,// 签名
		jsApiList: [
			'updateAppMessageShareData',
			'updateTimelineShareData'
		]
	})
	wx.ready(function(){
			let url = window.location.href
			console.log(url)
             // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
            wx.checkJsApi({
                jsApiList: [
                    'updateAppMessageShareData',
                    'updateTimelineShareData'
                ],
                success: function (res) {
//                alert(JSON.stringify(res));
                },
                fail:function (res) {
                    alert('失败',JSON.stringify(res));
                }
            });
			// console.log('成功了')
			//好友
			wx.updateAppMessageShareData({ 
				title: '测一测2021年的你是哪种青年', // 分享标题
				desc: '玩了那么多测试，还是这个最准', // 分享描述
				link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: 'http://lishui.henghadigital.com/anuha/img/heard.jpg', // 分享图标
				success: function () {
					console.log(好友分享成功了)
			        // 设置成功
				}
			})
			//朋友圈
			wx.updateTimelineShareData({ 
				title: '测一测2021年的你是哪种青年', // 分享标题
				link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: 'http://lishui.henghadigital.com/anuha/img/heard.jpg', // 分享图标
				success: function () {
				// 设置成功
				console.log(朋友圈分享成功了)
				}
			})
		});
		wx.error(function(res){
			console.log(res,"dddd")
		});
	
});

document.body.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });
var musics0 = true
var musics1 = true
sessionStorage.setItem('bgms',0)


$('.music').click(function(){
	let bgms = sessionStorage.getItem('bgms')
	console.log(bgms)
	if(bgms == 0){
		if(musics0){
			muiscs0 = !musics0
			console.log(muiscs0)
			$(".bgm")[0].play();
		}else{
			muiscs0 = !musics0
			console.log(muiscs0)
			$(".bgm")[0].pause();
		}
	}
	if(bgms == 1){
		if(musics1){
			muiscs1 = !musics1
			console.log(muiscs1)
			$(".game_bgm")[0].play();
		}else{
			muiscs1 = !musics1
			console.log(muiscs1)
			$(".game_bgm")[0].pause();
		}
	}
	
})
var w = window.innerWidth;
var h = window.innerHeight;
console.log(w/h,"宽高比")
$('.name_p').css({'width':w,'height':h})
$(".name_p").click(function(){
	$('.name_p').css('display','none')
})
$('#progress').css({"bottom":h/6,"left":w/3*1.3})
$('.progress').css({"bottom":h/6*1.1})
$('.input').css("top",h/5*2.5) 
$('.input input').css("width",w/5*3)
$('.swiper-container').css('top',h/5*0.9)
if(w/h>0.6){
	$('.swiper-container').css('top',h/7)
}

$('#share').css({'right':0,'bottom':h/9*1.85})
$('.img').css({'width':w,'height':h,'display':'none'})
$('.rules_p').css({'top':h/3})
$('.but1').click(function(){
	$('.img').css('display','none')
	$('#posters_canvas').fadeOut(1000);
	$('.button div img').css('display','none')
	$('#share').fadeOut(1000);
	$('#card_canvas').fadeIn(1000);
	$('.swiper-container').fadeIn(1000);
	card()
	console.log(1111)
})
$('.but2').click(function(){
	// createPoster()
	$('#share_canvas').css('display','block')
	share()
})



function load_assest(){
	load_manifest = [
		{src:"bg1.png",id:"bg1"},
		{src:"music.png",id:"music"},
		{src:"loading/2020.png",id:"zi2020"},
		{src:"loading/biaoqian.png",id:"biaoqian"},
		{src:"loading/zi1.png",id:"zi1"},
		{src:"loading/zi2.png",id:"zi2"},
		{src:"loading/zi3.png",id:"zi3"},
		{src:"loading/shou.png",id:"shou"},
		// {src:"loading/progress.png",id:"progress"},
		{src:"loading/0_img.png",id:"0_img"},
		{src:"loading/100_img.png",id:"100_img"},
	];
	loading_preload = new createjs.LoadQueue(false, "http://lishui.henghadigital.com/anuha/img/");
	loading_preload.setMaxConnections(100);
	loading_preload.maintainScriptOrder=true;

	loading_preload.on("fileload",function(event){
		console.log(event)
	})
	loading_preload.on('complete', function (event) {
		$('.music img').fadeIn(500);
		$('#loading_canvas').fadeIn(500);
		$('#progress').fadeIn(500);
		load()
		setTimeout(function(){
			all_assest()
			clearTimeout()
		},2000)
		
	})
	loading_preload.loadManifest(load_manifest)
}
function bgm(){
	var queue = new createjs.LoadQueue();
	queue.installPlugin(createjs.Sound);
	queue.loadManifest([
	// {id: "bgm", src:"./bgm/bgm.mp3"},
	// {id: "game_bgm", src:"./bgm/game_bgm.mp3"},
	{id: "get", src:"http://lishui.henghadigital.com/anuha/bgm/get.mp3"},
	{id: "swiper", src:"http://lishui.henghadigital.com/anuha/bgm/swiper.mp3"},
	{id: "game_win", src:"http://lishui.henghadigital.com/anuha/bgm/game_win.mp3"},
	{id: "put", src:"http://lishui.henghadigital.com/anuha/bgm/put.mp3"},
	]);
	queue.on("complete", handleComplete, this);
	function handleComplete() {
		console.log("全部音频文件加载完成");
	}
}
function all_assest(){
	all_manifest = [
		{src:"bg2.png",id:"bg2"},
		{src:"bg3.png",id:"bg3"},
		{src:'bg4.png',id:'bg4'},
		{src:'share.png',id:'share'},
		
		{src:'card/button2.png',id:'button2'},
		{src:'card/zi4.png',id:'zi4'},
		{src:'card/zi5.png',id:'zi5'},
		{src:'card/card1.png',id:'card1'},
		{src:'card/card2.png',id:'card2'},
		{src:'card/card3.png',id:'card3'},
		{src:'card/card4.png',id:'card4'},
		{src:'card/card5.png',id:'card5'},
		
		{src:'game/button5.png',id:'button5'},
		{src:'game/button6.png',id:'button6'},
		{src:'game/maps.png',id:'maps'},
		{src:'game/map2.png',id:'map2'},
		// {src:'game/rules.png',id:'rules'},
		// {src:'game/over.png',id:'over'},
		{src:'game/zz.png',id:'zz'},
		{src:'game/r1.png',id:'r1'},
		{src:'game/r2.png',id:'r2'},
		{src:'game/r3.png',id:'r3'},
		{src:'game/r4.png',id:'r4'},
		{src:'game/r5.png',id:'r5'},
		{src:'game/z1.png',id:'z1'},
		{src:'game/z2.png',id:'z2'},
		{src:'game/z3.png',id:'z3'},
		{src:'game/z4.png',id:'z4'},
		{src:'game/z5.png',id:'z5'},
		
		{src:'index/biaoti.png',id:'biaoti'},
		{src:'index/button1.png',id:'button1'},
		{src:'index/tu1.png',id:'tu1'},
		{src:'index/tu2.png',id:'tu2'},
		{src:'index/tu3.png',id:'tu3'},
		{src:'index/tu4.png',id:'tu4'},
		{src:'index/tu5.png',id:'tu5'},
		
		{src:'posters/button3.png',id:'button3'},
		{src:'posters/button4.png',id:'button4'},
		{src:'posters/logo.png',id:'logo'},
		{src:'posters/posters1.png',id:'posters1'},
		{src:'posters/posters2.png',id:'posters2'},
		{src:'posters/posters3.png',id:'posters3'},
		{src:'posters/posters4.png',id:'posters4'},
		{src:'posters/posters5.png',id:'posters5'},
		{src:'posters/n1.png',id:'n1'},
		{src:'posters/n2.png',id:'n2'},
		{src:'posters/n3.png',id:'n3'},
		{src:'posters/n4.png',id:'n4'},
		{src:'posters/n5.png',id:'n5'},
		
		{src:'name/button.png',id:'button'},
		{src:'name/input.png',id:'input'},

	]
	var count = 0
	all_preload = new createjs.LoadQueue(false, "http://lishui.henghadigital.com/anuha/img/");
	// all_preload.setMaxConnections(10);
	// all_preload.maintainScriptOrder=true;
	all_preload.on("fileload",function(event){
		count++
		console.log(event,count)
		var str = (count * 100 / all_manifest.length).toFixed(0)
		var str2 = str + '%'
		document.querySelector("#progress").innerHTML = str2
		sessionStorage.setItem('assest',str)
	})
	all_preload.on('complete', function (event) {
		let assest = sessionStorage.getItem('assest')
		if(assest == 100){
			setTimeout(function(){
				$('#progress').fadeOut(1500);
				$('.progress').fadeOut(1500);
				$('#loading_canvas').fadeOut(2000);
				$('#index_canvas').fadeIn(1000);
				index()
				clearTimeout()
			},2000)
		}
	})
	all_preload.loadManifest(all_manifest)
}

function imgs(stage,preload,scale,id,alpha,x,y){
	// console.log(preload.getResult("bg1").width,preload.getResult("bg1").height)
	var img = new createjs.Bitmap(preload.getResult(id))
	// console.log(preload.getResult(id).width/preload.getResult(id).height)
	img.scaleX = w/scale.width
	img.scaleY = h/scale.height
	img.alpha = alpha
	img.x = x*w/scale.width
	img.y = y*h/scale.height
	stage.addChild(img)
	return img
}

function translations(img,loop,preload,scale,alpha,x,y,s){
	let xs = w/scale.width*x;
	let ys= h/scale.height*y;
	createjs.Tween.get(img,{loop:loop}).to({y:ys,x:xs,alpha:alpha},s,createjs.Ease.getPowInOut(4));
}

function load(){
	$('.progress1').css({'width':loading_preload.getResult('0_img').width*w/loading_preload.getResult('bg1').width,'height':loading_preload.getResult('0_img').height*w/loading_preload.getResult('bg1').width})
	var load_canvas = document.getElementById('loading_canvas');
	load_canvas.width = w;
	load_canvas.height = h;
	var load_stage = new createjs.Stage(load_canvas);
	createjs.Ticker.addEventListener("tick", handleTicker);
	function handleTicker() {
		let shu = sessionStorage.getItem('assest')+'%'
		$('.progress2').css({'width':shu})
		// if(shu<20){
		// 	var progress1 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"0_img",0.1,100,1080)
		// }else if(shu<40){
		// 	var progress2 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"20_img",0.1,100,1080)
		// }else if(shu<60){
		// 	var progress3 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"40_img",0.1,100,1080)
		// }else if(shu<80){
		// 	var progress4 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"60_img",0.1,100,1080)
		// }else if(shu<100){
		// 	var progress5 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"80_img",0.1,100,1080)
		// }else if(shu == 100){
		// 	var progress6 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"100_img",0.1,100,1080)
		// }
	    load_stage.update();
	};
	var bg1_img = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),'bg1',1,0,0)
	var zi2020_img = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"zi2020",0,220,100)
	var zi1_img = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"zi1",0,-1000,400)
	var biaoqian_img = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"biaoqian",0,1000,480)
	var zi2_img = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"zi2",0,-1000,650)
	var zi3_img = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"zi3",0,280,900)
	var shou_img = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"shou",1,2000,850)
	this.translations(zi2020_img,false,loading_preload,loading_preload.getResult('bg1'),1,220,240,1500)
	this.translations(zi1_img,false,loading_preload,loading_preload.getResult('bg1'),1,20,400,2000)
	this.translations(biaoqian_img,false,loading_preload,loading_preload.getResult('bg1'),1,250,480,2500)
	this.translations(zi2_img,false,loading_preload,loading_preload.getResult('bg1'),1,130,650,3500)
	this.translations(zi3_img,false,loading_preload,loading_preload.getResult('bg1'),1,280,750,4000)
	this.translations(shou_img,false,loading_preload,loading_preload.getResult('bg1'),1,105,850,4500)
	
	// var progress1 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"0_img",1,100,1080)

	// setTimeout(function(){	
	// 	var progress2 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"20_img",1,100,1080)
	// },500)
	// 	setTimeout(function(){
	// 	var progress3 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"40_img",1,100,1080)
	// },900)
	// setTimeout(function(){
	// 	var progress4 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"60_img",1,100,1080)
	// },1200)
	// setTimeout(function(){
	// 	var progress5 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"80_img",1,100,1080)
	// },1500)
	// setTimeout(function(){
	// 	var progress6 = this.imgs(load_stage,loading_preload,loading_preload.getResult('bg1'),"100_img",1,100,1080)
	// },1800)

	
	
	
}
function index(){
	var index_canvas = document.getElementById('index_canvas');
	index_canvas.width = w;
	index_canvas.height = h;
	var index_stage = new createjs.Stage(index_canvas);
	createjs.Ticker.addEventListener("tick", handleTicker);
	function handleTicker() {
	  index_stage.update();
	};
	var bg4_img = this.imgs(index_stage,all_preload,all_preload.getResult('bg2'),'bg4',1,0,0)
	// var scaleX = w/all_preload.getResult('bg2').width
	// var scaleY = w/all_preload.getResult('bg2').height
	// let xxx = 100*scaleX/2
	// let yyy = 100*scaleY/2
	var tu1_img = this.imgs(index_stage,all_preload,all_preload.getResult('bg2'),"tu1",1,30,580)
	// createjs.Tween.get(tu1_img,{loop:true})
	// .to({regX:xxx,regY:yyy,rotation: 180,},1000)
	// .to({regX:xxx,regY:yyy,rotation: 360,},1000)
	// console.log(all_preload.getResult('tu1').width*scaleX)
	
	// console.log(xxx,yyy,"ddadada")
	// this.translations(tu1_img,false,all_preload,all_preload.getResult('bg2'),1,30,590,4400)
	// createjs.Tween.get(tu1_img,{loop:true}).to({x:50*scaleX},1000).to({x:20*scaleX},1000);
	// createjs.Tween.get(tu1_img,{loop:true}).to({rotation: 180,},1000).to({rotation: 360,},1000)
	var tu2_img = this.imgs(index_stage,all_preload,all_preload.getResult('bg2'),"tu2",1,80,830)
	// createjs.Tween.get(tu2_img,{loop:true})
	// .to({regX:xxx,regY:yyy,rotation: 360},1000)
	// .to({regX:xxx,regY:yyy,rotation: 360,},1000)
	// this.translations(tu2_img,false,all_preload,all_preload.getResult('bg2'),1,80,830,4600)
	var tu3_img = this.imgs(index_stage,all_preload,all_preload.getResult('bg2'),"tu3",1,400,280)
	// this.translations(tu3_img,false,all_preload,all_preload.getResult('bg2'),1,400,280,4700)
	var tu4_img = this.imgs(index_stage,all_preload,all_preload.getResult('bg2'),"tu4",1,80,290)
	// this.translations(tu4_img,false,all_preload,all_preload.getResult('bg2'),1,80,290,4800)
	var biaoti_img = this.imgs(index_stage,all_preload,all_preload.getResult('bg2'),"biaoti",1,40,300)
	// this.translations(biaoti_img,false,all_preload,all_preload.getResult('bg2'),1,40,300,1000)
	var button1_img = this.imgs(index_stage,all_preload,all_preload.getResult('bg2'),"button1",1,150,2000)
	this.translations(button1_img,false,all_preload,all_preload.getResult('bg2'),1,150,1050,1300)
	var tu5_img = this.imgs(index_stage,all_preload,all_preload.getResult('bg2'),"tu5",1,550,535)
	// this.translations(tu5_img,false,all_preload,all_preload.getResult('bg2'),1,550,535,4900)
	
	
	button1_img.addEventListener('click', function(e) {
		$('#index_canvas').fadeOut(1000);
		$('#name_canvas').fadeIn(1000);
		name()
		e.target.removeAllEventListeners();
	});
}

function name(){
	var name_canvas = document.getElementById('name_canvas');
	name_canvas.width = w;
	name_canvas.height = h;
	var name_stage = new createjs.Stage(name_canvas);
	createjs.Ticker.addEventListener("tick", handleTicker);
	function handleTicker() {
	  name_stage.update();
	};
	var bg2_img = this.imgs(name_stage,all_preload,all_preload.getResult('bg2'),'bg2',1,0,0)
	var input_img = this.imgs(name_stage,all_preload,all_preload.getResult('bg2'),"input",0,75,-1000)
	this.translations(input_img,false,all_preload,all_preload.getResult('bg2'),1,75,150,500)
	var button_img = this.imgs(name_stage,all_preload,all_preload.getResult('bg2'),"button",0,220,900)
	this.translations(button_img,false,all_preload,all_preload.getResult('bg2'),1,220,900,1000)
	// setTimeout(function(){
	// 	$('.input').css('display','block');
	// },1000)
	$('.input').fadeIn(800);
	button_img.addEventListener('click',function(e){
		console.log(11111)
		let name = $("input[name = 'name']").val()
		if(name!=''){
			// console.log(name)
			sessionStorage.setItem("name", name);
			$('.input').fadeOut(500);
			$('#name_canvas').fadeOut(2000);
			$('#card_canvas').fadeIn(2000);
			$('.swiper-container').fadeIn(2000);
			card()
		}else{
			// console.log('请输入名字')
			$('.name_p').css("display",'block')
			$('.name_p').css("display",'flex')
		}
		// e.target.removeAllEventListeners();
	})
}

function card(){
	console.log(all_preload.getResult('card1').src,"ddddddd")
	var swiper_div = ''
	for(let i=1;i<=5;i++){
		swiper_div += '<div class="swiper-slide"><img id="'+i+'" src="'+all_preload.getResult('card'+i).src+'" alt=""></div>'
	}
	$('.swiper-wrapper').html(swiper_div)
	var swiper = new Swiper('.swiper-container', {
	    slidesPerView: 1.5,
	    spaceBetween: 0,
		centeredSlides: true,
		loop: true,
	    pagination: {
	        // el: '.swiper-pagination',
	        clickable: true,
	    },
		observer:true,
		observeParents:true,
		on:{
		    slideChangeTransitionEnd: function(){
		        createjs.Sound.play("swiper");
		    },
		},
	});
	var card_canvas = document.getElementById('card_canvas');
	card_canvas.width = w;
	card_canvas.height = h;
	let swiper_w = all_preload.getResult('card1').width*w/all_preload.getResult('bg3').width
	// let swiper_h = all_preload.getResult('card1').height*w/all_preload.getResult('bg3').width
	$('.swiper-slide img').css({'width':swiper_w})
	var card_stage = new createjs.Stage(card_canvas);
	createjs.Ticker.addEventListener("tick", handleTicker);
	function handleTicker() {
	  card_stage.update();
	};
	var bg3_img = this.imgs(card_stage,all_preload,all_preload.getResult('bg2'),'bg3',1,0,0)
	console.log(all_preload.getResult('card1').width,all_preload.getResult('card1').height,"dddd")
	var zi5_img = this.imgs(card_stage,all_preload,all_preload.getResult('bg3'),"zi5",1,140,70)
	var zi4_img = this.imgs(card_stage,all_preload,all_preload.getResult('bg3'),"zi4",1,30,1200)
	var button2_img = this.imgs(card_stage,all_preload,all_preload.getResult('bg3'),"button2",1,180,1300)
	button2_img.addEventListener('click',function(e){
		let id = ($('.swiper-slide-active img').attr('id'))
		sessionStorage.setItem("id", id);
		$('#card_canvas').fadeOut(1000);
		$('.swiper-container').fadeOut(500);
		// $('#game_canvas').fadeIn(1000);
		// $('#rules_canvas').fadeIn(2000);
		$('#start_canvas').fadeIn(1000);
		$('.rules_p').css({'display': 'flex'})
		$('.rules_p p').fadeIn(1400);
		// game()
		start()
		e.target.removeAllEventListeners();
	})
}
function rules(){
	var rules_canvas = document.getElementById('rules_canvas');
	rules_canvas.width = w;
	rules_canvas.height = h;
	var rules_stage = new createjs.Stage(rules_canvas);
	createjs.Ticker.addEventListener("tick", handleTicker);
	function handleTicker() {
	  rules_stage.update();
	};
	var rules_img = this.imgs(rules_stage,all_preload,all_preload.getResult('bg3'),"rules",1,0,0)
	rules_img.addEventListener('click',function(e){
		console.log('click')
		$('#rules_canvas').css('display','none')
		e.target.removeAllEventListeners();
	})
}
function game(){
	// rules()
	sessionStorage.setItem('bgms',1)
	var game_canvas = document.getElementById('game_canvas');
	game_canvas.width = w;
	game_canvas.height = h;
	var game_stage = new createjs.Stage(game_canvas);
	createjs.Ticker.addEventListener("tick", handleTicker);
	function handleTicker() {
	  game_stage.update();
	};
	var bg3_img = this.imgs(game_stage,all_preload,all_preload.getResult('bg2'),'bg3',1,0,0)
	// var maps_img = this.imgs(game_stage,all_preload,all_preload.getResult('bg3'),"maps",1,35,70)
	let id = sessionStorage.getItem('id')
	console.log(id)
	var button5_img = this.imgs(game_stage,all_preload,all_preload.getResult('bg3'),"button5",1,230,1250)
	// var g = 'g'+id
	// var g_img = this.imgs(game_stage,all_preload,all_preload.getResult('bg3'),g,1,150,300)
	var r = 'r'+id
	var r_img = this.imgs(game_stage,all_preload,all_preload.getResult('bg3'),r,1,50,985)
	var zz_img = this.imgs(game_stage,all_preload,all_preload.getResult('bg3'),'zz',1,100,1050)
	createjs.Tween.get(zz_img,{loop:true}).to({x:400*w/all_preload.getResult('bg3').width},1000).to({x:100*w/all_preload.getResult('bg3').width},1000);
	r_img.addEventListener('click',function(e){
		console.log('游戏开始')
		document.getElementById('time').innerHTML = '12'
		document.getElementById('inte').innerHTML = '0'
		$('.rules_p').css({'display': 'none'})
		$('#game_canvas').fadeOut(1000);
		$('#start_canvas').fadeIn(1000);
		$('#time').fadeIn(1000);
		$('#inte').fadeIn(1000);
		start()
		$('.bgm')[0].pause();
		$('.game_bgm')[0].play();
		e.target.removeAllEventListeners();
	})
}

function start(){
	document.getElementById('time').innerHTML = '12'
	document.getElementById('inte').innerHTML = '0'
	sessionStorage.setItem('bgms',1)
	// time()
	$('.bgm')[0].pause();
	$('.game_bgm')[0].play();
	$('#time').css({"top":h/all_preload.getResult('bg3').height*135,"left":w/all_preload.getResult('bg3').width*235})
	$('#inte').css({"top":h/all_preload.getResult('bg3').height*135,"right":w/all_preload.getResult('bg3').width*150})
	var start_canvas = document.getElementById('start_canvas');
	start_canvas.width = w;
	start_canvas.height = h;
	var start_stage = new createjs.Stage(start_canvas);
	createjs.Touch.enable(start_stage);
	// createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", handleTicker);
	let id = sessionStorage.getItem('id')
	function handleTicker() {
		start_stage.update();
	};
	var bg3_img = this.imgs(start_stage,all_preload,all_preload.getResult('bg2'),'bg3',1,0,0)
	var maps_img = this.imgs(start_stage,all_preload,all_preload.getResult('bg3'),"map2",1,35,70)
	// console.log(all_preload.getResult('maps').width,'width')
	var r = 'r'+id
	var r_img = this.imgs(start_stage,all_preload,all_preload.getResult('bg3'),r,1,50,1155)
	// var r_img2 = this.imgs(start_stage,all_preload,all_preload.getResult('bg3'),r,1,50,1155)
	// var button5_img = this.imgs(start_stage,all_preload,all_preload.getResult('bg3'),"button5",1,230,1250)
	var oldx
	var may_w = all_preload.getResult('maps').width*w/all_preload.getResult('bg3').width
	console.log(may_w,"wwwww")
	var left_x = (w - may_w)/2
	var right_x = may_w + (w - may_w)/2 - all_preload.getResult(r).width*w/all_preload.getResult('bg3').width
	console.log(left_x,right_x,"xxxxxxx")
	var dong = false
	var z = 'z'+id
	var zz_img = this.imgs(start_stage,all_preload,all_preload.getResult('bg3'),'zz',1,100,1250)
	createjs.Tween.get(zz_img,{loop:true}).to({x:400*w/all_preload.getResult('bg3').width},1000).to({x:100*w/all_preload.getResult('bg3').width},1000);
	maps_img.addEventListener('click',function(e){
		if(dong){
			return
		}
		dong = true
		$('#time').css('display','block');
		$('#inte').css('display','block');
		$('.rules_p p').css({'display': 'none'})
		start_stage.removeChild(zz_img)
		// start_stage.removeChild(r_img2)
		time()
		// props(start_stage,all_preload,all_preload.getResult('bg3'),z,1,35,200,r_img)
		props(start_stage,all_preload,all_preload.getResult('bg3'),z,1,35,50,r_img)
	})
	r_img.addEventListener('mousedown',function(e){
		if(dong){
			return
		}
		// r_img.x = e.stageX
		dong = true
		$('#time').css('display','block');
		$('#inte').css('display','block');
		$('.rules_p p').css({'display': 'none'})
		start_stage.removeChild(zz_img)
		// start_stage.removeChild(r_img2)
		time()
		// props(start_stage,all_preload,all_preload.getResult('bg3'),z,1,35,200,r_img)
		props(start_stage,all_preload,all_preload.getResult('bg3'),z,1,35,50,r_img)
	})
	r_img.addEventListener('mousedown',function(e){
		oldx = e.stageX
		// console.log(oldx)
	})
	r_img.addEventListener('pressmove',function(e){
		e.target.x+= e.stageX-oldx
		if(e.stageX<left_x){
			e.target.x = left_x
		}else if(e.stageX>right_x){
			e.target.x = right_x
		}
		oldx = e.stageX
		// console.log(oldx)
	})
	
	// var z_img = this.imgs(start_stage,all_preload,all_preload.getResult('bg3'),z,1,35,200)
	// props(start_stage,all_preload,all_preload.getResult('bg3'),z,1,35,200,r_img)
	
}
function over(){
	var over_canvas = document.getElementById('over_canvas');
	over_canvas.width = w;
	over_canvas.height = h;
	var over_stage = new createjs.Stage(over_canvas);
	createjs.Ticker.addEventListener("tick", handleTicker);
	function handleTicker() {
	  over_stage.update();
	};
	var over_img = this.imgs(over_stage,all_preload,all_preload.getResult('bg3'),"over",1,0,0)
	var button6_img = this.imgs(over_stage,all_preload,all_preload.getResult('bg3'),"button6",1,226,720)
	button6_img.addEventListener('click',function(e){
		// document.getElementById('time').innerHTML = '60'
		// document.getElementById('inte').innerHTML = '0'
		$('#over_canvas').css('display','none')
		$('#time').css('display','none')
		$('#inte').css('display','none')
		$('#start_canvas').fadeOut(1000);
		$('#card_canvas').fadeIn(3000);
		$('.swiper-container').fadeIn(3000);
		card()
		e.target.removeAllEventListeners();
	})
}
// var flag = false
function time(){
	// console.log(11111)
	var time = document.getElementById('time')
	var settime = setInterval(function() {
		   time.innerHTML = parseFloat(time.innerHTML) - 1;
		   // console.log(time.innerHTML)
		   if (time.innerHTML == '0') {
				game_over()
		        clearInterval(settime);
				console.log('游戏结束')
				
		   }
	}, 1000);
}
function game_over(){
	let g_time = parseFloat($('#time').text())
	let fenshu = parseInt($('#inte').text())
	// if(fenshu<10&&g_time == 0){
	// 	document.getElementById('time').innerHTML = '12'
	// 	document.getElementById('inte').innerHTML = '0'
	// 	$('#over_canvas').css('display','block');
	// 	over()
	// }else{
	// 	document.getElementById('time').innerHTML = '12'
	// 	document.getElementById('inte').innerHTML = '0'
	// 	posters()
	// 	$('#start_canvas').fadeOut(1500);
	// 	$('#time').fadeOut(1000);
	// 	$('#inte').fadeOut(1000);
	// 	$('#posters_canvas').fadeIn(1500);
	// 	$('.button div img').fadeIn(1800);
	// 	$('#share').fadeIn(1800);
	// }
	sessionStorage.setItem('bgms',0)
	if(g_time == 0){
		setTimeout(function(){
			createjs.Sound.play("game_win");
			posters()
			$('#start_canvas').fadeOut(1500);
			$('#time').fadeOut(1000);
			$('#inte').fadeOut(1000);
			$('#posters_canvas').fadeIn(1500);
			$('.button div img').fadeIn(1800);
			$('#share').fadeIn(1800);
			$('.bgm')[0].play();
			$('.game_bgm')[0].pause();
			clearTimeout()
		},2000)
		// document.getElementById('time').innerHTML = '12'
		// document.getElementById('inte').innerHTML = '0'
		// posters()
		// $('#start_canvas').fadeOut(1500);
		// $('#time').fadeOut(1000);
		// $('#inte').fadeOut(1000);
		// $('#posters_canvas').fadeIn(1500);
		// $('.button div img').fadeIn(1800);
		// $('#share').fadeIn(1800);
		// $('.bgm')[0].play();
		// $('.game_bgm')[0].pause();
	}
}

function props(stage,preload,scale,id,alpha,x,y,img){
	// console.log(3131313)
	// var z_img = this.imgs(stage,preload,scale,id,alpha,x,y)
	var cout = 0
	var z_may_w = all_preload.getResult('maps').width*w/all_preload.getResult('bg3').width
	// var may_h = 1120*h/all_preload.getResult('bg3').height
	// if (id =='z2'){
	// 	may_h = 1050*h/all_preload.getResult('bg3').height
	// }
	// if (id =='z3'){
	// 	may_h = 1080*h/all_preload.getResult('bg3').height
	// }
	var may_h = 1290*h/all_preload.getResult('bg3').height
	if (id =='z2'){
		may_h = 1220*h/all_preload.getResult('bg3').height
	}
	if (id =='z3'){
		may_h = 1250*h/all_preload.getResult('bg3').height
	}
	console.log(may_h)
	var min = 75*w/all_preload.getResult('bg3').width
	var max = 1000*w/all_preload.getResult('bg3').width
	console.log(max)
	var j = parseFloat($('#time').text())
	console.log(j)
	var s = 2000
	// var collection = new Array();
	// for(var i = 50;i>0;i--){
	// 	var z_math = Math.floor(Math.random() * (max - min)) + min;
	// 	var z_img = this.imgs(stage,preload,scale,id,0,z_math,y)
	// 	collection.push(z_img)
	// }
	// console.log(collection,"ddd")
	// var props_time = setInterval(function(){
	// 	// var z_math = Math.floor(Math.random() * (max - min)) + min;
	// 	// var z_img = this.imgs(stage,preload,scale,id,alpha,z_math,y)
	// 	var i2 = 49
	// 	var j = parseFloat($('#time').text())
	// 	if (j%10==0&&j>0){
	// 		s = s - 1000
	// 	}
	// 	createjs.Tween.get(collection[i2],{loop:false}).to({alpha:1}).to({y:may_h},s);
	// 	i2 = i2-1
	// 	if(j == 0){
	// 		// clearInterval(props_time);
	// 		console.log('游戏结束')
	// 	}	
	// },1000)
	// createjs.Ticker.addEventListener("tick", function(e){
	// 	console.log(collection)
	// 	for(var i3 = 50;i3>0;i3--){
	// 		console.log(collection[i3])
	// 		if(collection[i3].y==may_h){
	// 			stage.removeChild(collection[i3])
	// 		}
	// 		var xy = CollisionTest(img,collection[i3],all_preload.getResult('bg3'))
	// 		if(xy){
	// 			console.log('碰到了')
	// 			stage.removeChild(collection[i3])
	// 		}else{
	// 			console.log('没碰到了')
	// 		}
	// 	}
		
	// });
	
	let props_time = setInterval(function(){
		var j = parseFloat($('#time').text())
		if(j <= 0){
			clearInterval(props_time);
			console.log('游戏结束')
			img.removeAllEventListeners("pressmove");
		}
		var count = 0
		var z_math = Math.floor(Math.random() * (max - min)) + min;
		var z_img = this.imgs(stage,preload,scale,id,alpha,z_math,y)
		
		if (j==7){
			s = 1000
		}
		createjs.Tween.get(z_img,{loop:false}).to({y:may_h},s);
		createjs.Ticker.addEventListener("tick", function(e){
			// if(z_img.y==may_h){
			// 	createjs.Sound.play("put");
			// }
			if(z_img.y==may_h){
				// createjs.Sound.play("put");
				stage.removeChild(z_img)
			}
			var xy = CollisionTest(img,z_img,all_preload.getResult('bg3'))
			if(xy){
				var zzz= stage.removeChild(z_img)
				// console.log(zzz)
				console.log('碰到了')
				if(zzz){
					createjs.Sound.play("get");
					cout++
					document.getElementById('inte').innerHTML = cout
				}
				
				
			}
		});	
	},300)
}


function CollisionTest(ele1,ele2,preload){
	// var w1 = ele1.getBounds().width*w/preload.width
	// var h1 = ele1.getBounds().height*h/preload.height
	// var w2 = ele2.getBounds().width*w/preload.width
	// var h2 = ele2.getBounds().height*h/preload.height
	// console.log(w1,h1,w2,h2)
	
	var w1 = 100*w/preload.width
	var h1 = 100*h/preload.height
	var w2 = 100*w/preload.width
	var h2 = 100*h/preload.height
	if(sessionStorage.getItem('id')==2){
		h2 = 180*h/preload.height
		h1 = 180*h/preload.height
	}
	var x1 = ele1.x-w1/2;
	var x2 = ele1.x+w1/2;
	var y1 = ele1.y-h1/2;
	var y2 = ele1.y+h1/2;
	var x3 = ele2.x-w2/2;
	var x4 = ele2.x+w2/2;
	var y3 = ele2.y-h2/2;
	var y4 = ele2.y+h1/2;
	//x轴重叠检测
	var collX,collY
	// conscolole.log(x1,x2,x3,x4,y1,y2,y3,y4)
		
	if( (x3>x1&&x3<x2) || (x4>x1&&x4<x2) ){
		collX = true;
	}else{lX = false;
	}
	if( (y3>y1&&y3<y2) || (y4>y1&&y4<y2) ){
		collY = true;
	}else{
		collY = false;
	}
	// console.log(collX,collY)
	return collX && collY
}

function posters(){
	var posters_canvas = document.getElementById('posters_canvas');
	posters_canvas.width = w;
	posters_canvas.height = h;
	$('.button').css({"bottom":h/8})
	$('.button div img').css({"width":200*w/all_preload.getResult('bg3').width,"height":100*h/all_preload.getResult('bg3').height})
	var posters_stage = new createjs.Stage(posters_canvas);
	createjs.Ticker.addEventListener("tick", handleTicker);
	function handleTicker() {
	  posters_stage.update();
	};
	let name = sessionStorage.getItem('name')
	let id = sessionStorage.getItem('id')
	console.log(name,id)
	let posters = 'posters'+id
	let ns = 'n'+id
	var posters_bg = this.imgs(posters_stage,all_preload,all_preload.getResult('bg3'),'bg3',1,0,0)
	var posters_img =  this.imgs(posters_stage,all_preload,all_preload.getResult('bg3'),posters,1,50,300)
	var logo_img = this.imgs(posters_stage,all_preload,all_preload.getResult('bg3'),"logo",1,0,1300)
	var n_w = 0
	if(id == 1){
		n_w = 80
	}
	if(id == 2){
		n_w = 80
	}
	if(id == 3){
		n_w = 55
	}
	if(id == 4){
		n_w = 80
	}
	if(id == 5){
		n_w = 55
	}
	var n_img = this.imgs(posters_stage,all_preload,all_preload.getResult('bg3'),ns,1,n_w,100)
	var text = new createjs.Text(name, "30px Arial", "#ffffff")
	text.textAlign = 'center';
	text.x = posters_stage.canvas.width / 2;
	text.y = 80*h/all_preload.getResult('bg3').height
	posters_stage.addChild(text);
	setTimeout(function(){
		createPoster()
		clearTimeout()
	},1000)
	
}

function createPoster(){
	$('.img').css('display','block')
	var posters_create = document.getElementById('posters_canvas');
	var dataURL = posters_create.toDataURL();
	console.log(dataURL);
	let img_div = '<img style="width:100%;height:100%" src="'+ dataURL +'" alt=""/>'
	$('.img').html(img_div)
}

function share(){
	var share_canvas = document.getElementById('share_canvas');
	share_canvas.width = w;
	share_canvas.height = h;
	var share_stage = new createjs.Stage(share_canvas);
	createjs.Ticker.addEventListener("tick", handleTicker);
	function handleTicker() {
	  share_stage.update();
	};
	share_img = this.imgs(share_stage,all_preload,all_preload.getResult('bg3'),'share',1,0,0)
	share_img.addEventListener('click',function(e){
		$('#share_canvas').css('display','none')
	})
	
}
load_assest()