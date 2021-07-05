// 開始時間
var startTime;
// 経過秒数用 タイマー
var timer;
// カードめくり用 タイマー
var backTimer;
//ミスの回数andぴえんのカウント用とBGMを流す(Microsoftedge推奨)
var test = 0;//BGM(Microsoftedge推奨)
var pien = 0;//ぴえん
var miss = 0;//ミス回数の記録
var kuria = 0;//クリアフラグ
var count_disp = document.getElementById("disp_count"); 
var back = document.getElementById("button");
//残り枚数のカウント
var nokori = 10;
window.onload=function(){
  
 
  
   // 開始時刻を取得
   startTime = new Date();
 // タイマ-
 startTimer();
  function Card(suit,num){

    this.suit=suit;

    this.num=num;

    this.front;

    this.setFront=function(){

      this.front=`${this.suit}${('0'+this.num).slice(-2)}.gif`;

    };
  
  }

  const cards=[];

  const suits=['s','d'];

  for(let i=0;i<suits.length;i++){

    for(let j=1;j<=5;j++){

      let card=new Card(suits[i],j);

      card.setFront();

      cards.push(card);

    }

  }

  function shuffle(){

    let i=cards.length;

    while(i){

      let index=Math.floor(Math.random()*i--);

      var temp=cards[index];

      cards[index]=cards[i];

      cards[i]=temp;

    }

  }

  shuffle();//シャッフルする

  const table=document.getElementById('table');

  for(let i=0;i<suits.length;i++){

    let tr=document.createElement('tr');//表の横方向

    for(let j=0;j<5;j++){

      let td=document.createElement('td');//表の縦方向

      let tempCard=cards[i*5+j];

      td.classList.add('card','back');

      td.onclick=flip;

      td.num=tempCard.num;

      td.style.backgroundImage=`url(images/${tempCard.front})`;

      tr.appendChild(td);

    }

    table.appendChild(tr);

  }

  let firstCard=null;

  let flipTimerId=NaN;

  function flip(e){

    let td=e.target;

    
    if(!td.classList.contains('back') || flipTimerId){
         
      return;//表のカードをクリックしても何もしない。

    }

    td.classList.remove('back');//カードを表にする。

    if(firstCard===null){
        
      firstCard=td;
      
    }else{

      //2枚目だったら1枚目と比較して結果を判定する。

      if(firstCard.num===td.num){

        //２枚が同じだったときの処理
      
        firstCard=null;
        kuria = kuria + 1;
        remaining();
           
      
        
      }else{
        
        flipTimerId=setTimeout(function(){

          firstCard.classList.add('back');

          td.classList.add('back');

          flipTimerId=NaN;

          firstCard=null;
           
        },500);
        //ミスのカウント＋ぴえんのフラグを立てる
        miss = miss + 1;
        pien = pien + 1;
        var misu = 'ミス回数: ' + miss + '回';
        var re = document.getElementById('count');
        re.innerHTML = misu;
        
      }if(pien == 5){
        button();
       music4();
        PlaySound();//ぴえんを流す
        pien = pien + 1;
      }
     
    }
    if(kuria == 5 && miss<5){
      music4();
      music3();
      window.open('clear.html', '_blank');
    }if(kuria == 5&& miss>=5){
      audioElem.pause();
      music2();
      window.open('clear2.html', '_blank');
    }
}
// タイマー開始
function startTimer(){
  timer = setInterval(showSecond, 1000);
}

// 秒数表示
function showSecond(){

  var nowTime = new Date();
  var elapsedTime = Math.floor((nowTime - startTime) / 1000);
  var str = '経過秒数: ' + elapsedTime + '秒';

  var re = document.getElementById('result');
  re.innerHTML = str;
}
//残り枚数のカウント
function remaining(){

  nokori = nokori - 2;
  var str = '残り枚数: '+nokori+ '枚'

  var re =document.getElementById('residue');
  re.innerHTML = str;
  
}
function button(){
  var back = document.getElementById("button");
  back.disabled = "disabled"; 
}
  }

