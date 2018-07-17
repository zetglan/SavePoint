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
 // main
window.onload = function() {  
  // サウンドを読み込む
  getAudioBuffer('SEs/00002a1b.wav', function(buffer) {
    // 読み込み完了後にボタンにクリックイベントを登録
    var save = document.getElementById('save');
    save.onclick = function() {
      // サウンドを再生
      playSound(buffer);
    };
  });
};

function startDisplay(){
	console.log("let's start");
	var box = document.getElementById('displaybox');
	box.style.backgroundColor = "rgba(0,0,0,100)";
	box.style.borderColor = "rgba(255,255,255,100)";

}