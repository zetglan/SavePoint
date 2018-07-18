var chars=``;
var count = 0;
var speed = 50; // 表示スピード（1に近いほど速く）
var flag = 1; // 繰り返し（0 = 繰り返す｜1 = 1回だけ）
var steps = 0;//表示段階
var canClick=true;
var serifaudio='SEs/000029ed.wav';

window.AudioContext = window.AudioContext || window.webkitAudioContext;  
const context = new window.AudioContext();
const volume = 0.5;

var getAudioBuffer = function(url, fn) {  
  var req = new XMLHttpRequest();
  // array buffer を指定
  req.responseType = 'arraybuffer';

  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 0 || req.status === 200) {
        // array buffer を audio buffer に変換
        context.decodeAudioData(req.response, function(buffer) {
          // コールバックを実行
          fn(buffer);
        });
      }
    }
  };

  req.open('GET', url, true);
  req.send('');
};

var playSound = function(buffer) {  
	var source = context.createBufferSource();
	var gainNode = context.createGain();
	gainNode.gain.value = volume
    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(context.destination);
    source.start(0);
};
  

function randomChars(){
var random = Math.floor( Math.random() * 7 );
	switch(random){
		case 0:
		return `*（わきあがりつつある　かいじょうを
　まのあたりにして
　あなたはケツイが　みなぎった）`;
	
		case 1:
		return `*（あなたはかんじる…　なにかを
　あなたはテミ意で　みたされた。）`;

		case 2:
		return `*（いつかあなたも　がっきをもち
　ライブに　しゅつえんするかもしれない...
　そうおもったら　ケツイが　みなぎった）`;

		case 3:
		return `*（あのギターの　かたちの
　ちょうどよさを　おもいだすと
　ケツイが　みなぎった）`;

		case 4:
		return `*（いつかネズミは　おんがくを
　たのしむ　ほうほうを
　みつける　かもしれない
　そうおもったら　ケツイが　みなぎった）`;

		case 5:
		return `*（あのイヌは　カンペキな
　ゆきピアノが　かんせいするまで
　けっして　あきらめないだろう...
　そうおもったら　ケツイが　みなぎった）`;

		case 6:
		return `*（かいじょうの　おちついた
　ふんいきに…
　ケツイが　みなぎった）`;
	}
}

function startDisplay(){

  // サウンドを読み込む
  if(steps==0){
        var audio='SEs/00002a1b.wav';
  }else if(steps==2){
        var audio='SEs/000029a7.wav';
  }else{
        var audio='SEs/nothing.wav';
  }
  getAudioBuffer(audio, function(buffer) {
  	if(steps==0){
        playSound(buffer);
  	}else if(steps==3){
  		console.log("GO!");
        playSound(buffer);
  	}
  });


	if(canClick){
				console.log("let's start");
				chars=randomChars();
				var box = document.getElementById('displaybox');
				var area = document.getElementById('charsarea');
				if(steps==0){//step0=最初の文字列を表示
					canClick=false;
					box.style.backgroundColor = "rgba(0,0,0,100)";
					box.style.borderColor = "rgba(255,255,255,100)";
					appearChars();
				}else if(steps==1){//step1=セーブ画面
					area.textContent = `あなた　  LV1  　3：20
だれキズかいじょう　うけつけ
`;
					box.style.width = "70vw";
					box.style.textAlign = "center";
					area.insertAdjacentHTML('beforeend', '<div id=saveline><img src="img/heart.png" id=heart>セーブ </div>');
					steps++;
					console.log(steps);
				}else if(steps==2){//step1=セーブ画面
					steps++;
					area.textContent = `あなた　  LV1  　3：20
だれキズかいじょう　うけつけ
`;
					box.style.width = "70vw";
					box.style.textAlign = "center";
					area.insertAdjacentHTML('beforeend', '<div id=saveline>セーブしました。　　　 </div>');
					area.style.color="yellow";
					console.log(steps);
				}else if(steps==3){
					steps=0;
					box.style.width = "90vw";
					box.style.backgroundColor = "rgba(0,0,0,0)";
					box.style.borderColor = "rgba(255,255,255,0)";
					area.style.color="white";
					area.textContent ="";
					count=0;
					box.style.textAlign = "left";
				}
		}
}

function appearChars(){
	var type = chars.substring(0, count);
	var area = document.getElementById('charsarea');
	// テキストフィールドにデータを渡す処理
	area.textContent = type;
	count++;
	var rep = setTimeout("appearChars()", speed);
	getAudioBuffer(serifaudio, function(buffer) {
	    	var serif = setTimeout(function(){playSound(buffer)},speed);
	    	if(count > chars.length){clearTimeout(serif);}
	  });
	if(count > chars.length){
		steps++;
		canClick=true;
		console.log(steps);
		if(flag == 1){ clearTimeout(rep);  }
		else{ count = 0; }
		
	}
}