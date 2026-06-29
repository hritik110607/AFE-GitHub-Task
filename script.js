window.onload=function(){
document.getElementById("loader").style.display="none";
};

const text=[
"Software Developer",
"Python Programmer",
"C Programmer",
"AI Enthusiast"
];

let i=0,j=0,del=false;

function typing(){

let t=text[i];

document.getElementById("typing").innerHTML=t.substring(0,j);

if(!del){
j++;
if(j>t.length){
del=true;
setTimeout(typing,1000);
return;
}
}
else{
j--;
if(j==0){
del=false;
i=(i+1)%text.length;
}
}

setTimeout(typing,del?60:120);

}

typing();

const topBtn=document.getElementById("topBtn");

window.onscroll=function(){

if(document.documentElement.scrollTop>300)

topBtn.style.display="block";

else

topBtn.style.display="none";

};

topBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};
