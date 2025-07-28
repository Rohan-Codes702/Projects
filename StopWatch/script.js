let timerdispaly=document.querySelector('.timerdisplay');
let stopbtn=document.getElementById('stopbtn');
let startbtn=document.getElementById('startbtn');
let resetbtn=document.getElementById('resetbtn');

let msec = 0;
let sec= 0;
let min= 0;

let timerId=null;

startbtn.addEventListener('click',function(){
    if(timerId!=null){
        clearInterval(timerId);
    }
   timerId= setInterval(startimer,10);

    
});

stopbtn.addEventListener('click',function(){
   
        clearInterval(timerId);
    
});

resetbtn.addEventListener('click',function(){
    
        clearInterval(timerId);
    
   timerdispaly.innerHTML=`00:00:00`;
    
});


function startimer(){
    msec++;
    if(msec==100){
        msec=0;
        sec++;

        if(sec==60){
            sec=0;
            min++;
        }
    }
    let msecStirng;
    if(msec<10){
        msecStirng=`0${msec}`;
    }
    else{
        msecStirng=msec;
    }

     let secString;
    if(sec<10){
        secString=`0${sec}`;
    }
    else{
        secString=sec;
    }

     let minString;
    if(min<10){
        minString=`0${min}`;
    }
    else{
        minString=min;
    }

    timerdispaly.innerHTML=`${minString}:${secString}:${msecStirng}`;
}


