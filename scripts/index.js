window.onload=function(){

    var RIGHT=39,LEFT=37,DOWN=40,UP=38;
    var snake=[ {x:0,y:0},{x:0,y:1},{x:0,y:2} ];
    var dd=RIGHT;
    var NUM=12;
    var score=0;
    var timeId;
    var kaiguan=true,kaiguan1;
    var kai;
    var time;

    moden1.onclick=function(){
        time=80;
        moden1.style.backgroundColor="black";
        moden1.style.color="white";

        moden2.style.display="none";
        start.innerHTML='开始游戏';
        kaiguan1=true;
        kai=false;
    }

    moden2.onclick=function(){
        time=300;
        moden2.style.backgroundColor="black";
        moden2.style.color="white";

        moden1.style.display="none";
        start.innerHTML='开始游戏';
        kaiguan1=true;
        kai=true;
    }

    start.onclick=function(){
        if(kaiguan1){
            start.innerHTML='重新开始';
            end.style.display="block";
            score1.style.display="block";
            mu.style.display='none';
            timeId=setInterval(moveSnake,time);
            kaiguan1=false;
        }else{
            location.reload();
        }
        
    }
    end.onclick=function(){
        if(kaiguan){
            clearInterval(timeId);
            mu.style.display='block';
            zimu.innerHTML='暂停';
            end.innerHTML='开始';
            kaiguan=false;
        }else{
            timeId=setInterval(moveSnake,time);
            mu.style.display='none';
            end.innerHTML='暂停';
            kaiguan=true;
        }
        
    }
    

    for(var i=0;i<NUM;i++){
        for(var j=0;j<NUM;j++){
            var el=document.createElement('div');
            el.setAttribute('class','block');
            el.setAttribute('id',i+'_'+j);
            el.style.width=(600-NUM)/NUM+'px';
            el.style.height=(600-NUM)/NUM+'px';
            changjing.appendChild(el);
        }
    }

    var isInSnake=function(cc,dd){
            for(var i=0;i<snake.length;i++){
                if(snake[i].x==cc&&snake[i].y==dd){
                    return true;
                }
            }
            return false;
    }

    var dropFood=function(){        
        var
        x=Math.floor(Math.random()*NUM),
        y=Math.floor(Math.random()*NUM);
        if(snake.length==NUM*NUM){
            mu.style.display='block';
            zimu.innerHTML='你赢了！！！！';
            end.style.display="none";
            return;
        }
        while(isInSnake(x,y)){
            x=Math.floor(Math.random()*NUM);
            y=Math.floor(Math.random()*NUM);  
        } 
        document.getElementById(x+'_'+y).style.backgroundColor='red';
        document.getElementById(x+'_'+y).style.borderRadius='50%';  
        return {foodx:x,foody:y}; 
    }; 

    var drawSnake=function(){
        for(var i=0;i<snake.length;i++){
            document.getElementById(snake[i].x+'_'+snake[i].y).style.backgroundColor='green';
        }
    }

    var moveSnake=function(){
        
        var last=snake.length-1;
        var newHead;
        if(dd==LEFT){
            newHead={x:snake[last].x,y:snake[last].y-1};
        }
        if(dd==RIGHT){
            newHead={x:snake[last].x,y:snake[last].y+1};
        }
        if(dd==DOWN){
            newHead={x:snake[last].x+1,y:snake[last].y};
        }
        if(dd==UP){
            newHead={x:snake[last].x-1,y:snake[last].y};
        }

        if(kai){           
            if(newHead.x>NUM-1||newHead.x<0||newHead.y>NUM-1||newHead.y<0){
                mu.style.display='block';
                zimu.innerHTML='你输了！！！';
                end.style.display="none";
                return;
            }  
        }else{
            if(newHead.x==NUM){
                newHead.x=0;
            }
            if(newHead.x==-1){
                newHead.x=NUM-1;
            }
            if(newHead.y==NUM){
                newHead.y=0;
            }
            if(newHead.y==-1){
                newHead.y=NUM-1;
            }           
        }
        

        if(isInSnake(newHead.x,newHead.y)){
            mu.style.display='block';
            zimu.innerHTML='你输了！！！';
            end.style.display="none";
            return;
        }
        if(newHead.x==food.foodx&&newHead.y==food.foody){
            score++;
            scores.innerHTML=score*5;
            snake.push(newHead);
            document.getElementById(food.foodx+'_'+food.foody).style.backgroundColor='green';
            document.getElementById(food.foodx+'_'+food.foody).style.borderRadius='0%'; 
            food=dropFood();
            return;
        }
        
        var weiba=snake.shift();
        snake.push(newHead);

        var t=document.getElementById(weiba.x+'_'+weiba.y);
        t.style.backgroundColor='white';
        var h=document.getElementById(newHead.x+'_'+newHead.y);
        h.style.backgroundColor='green';

    }
   

    var food=dropFood();  
    drawSnake();    

    document.onkeydown=function(e){
        if(mu.style.display=='block'){return;}
        var d=e.keyCode;
        if(d==LEFT||d==RIGHT||d==UP||d==DOWN){
            if(Math.abs(d-dd)!=2){
                dd=d;
                moveSnake(); 
            }            
        }
    };


};