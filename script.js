
var contacts=[];
var phonedel;
const cp = document.getElementById('confirm');
const yesBtn = document.getElementById('yesbtn');
const noBtn = document.getElementById('nobtn');
const tbody = document.getElementById('tbdy');
const addbtn = document.getElementById('addCont');
const cname = document.getElementById('name');
const cphone = document.getElementById('phone');
const okbtn = document.getElementById('ok');
const eokbtn = document.getElementById('eok');
var up = document.getElementById('popup');
const wrapper = document.getElementById('wrapper');
const searchCont = document.getElementById('searchContact');
var contRow = document.getElementsByTagName('tbody');
okbtn.addEventListener('click',alertdown);
eokbtn.addEventListener('click',existDown);
const existpop = document.getElementById('existsup');
const nameBtn = document.getElementById('searchBy1');
const phoneBtn = document.getElementById('searchBy2');
const contInfo = document.getElementById('contInfo');
var contLength = contInfo.parentNode.children.length;
const patterns = {
    contactName:/^[A-Aa-z]{1,25}$/,
    contactNo :/^89([0-9]){1}[(0-9)]{8}$/
};
var radio=0;    
startApp();

phoneBtn.addEventListener('change',switch1);
nameBtn.addEventListener('change',switch1);


function switch1(){
    if(radio==0){
        radio=1;
    }
    else
        radio=0;
    console.log(radio);
}
function startApp(){
    nameBtn.checked=true;
    console.log(contacts);
    let tmp = JSON.parse(localStorage.getItem('contacts'));

    if(tmp==null){
        console.log(null);
        return;
    }

    contacts = tmp;


    
    for(var i=0;i<contacts.length;i++){
        createRow(contacts[i].nameNo,contacts[i].phoneNo)
    }

}


yesBtn.addEventListener('click',function(){
    wrapper.style.opacity = '1';
    cp.style.display = 'none';
    targetCont.parentElement.removeChild(targetCont);
    for (let i = 0; i < contacts.length; i++) {
   
    console.log(phonedel);
        if(contacts[i].phoneNo == phonedel){
            console.log('deleting contact with phone',cphone.value);
            contacts.splice(i,1);
    }

    localStorage.setItem('contacts',JSON.stringify(contacts));
    console.log(contacts);
    
    }

    

});

searchCont.addEventListener('keyup',function(e){
    const term = e.target.value.toLowerCase();

    if(radio==0){   
        var searchValue = e.target.value.toLowerCase();
        var info = contInfo.nextElementSibling; 
        var infoName,infoPhone;
        for(i=0;i<contacts.length;i++){
            infoName=info.firstElementChild;
            infoPhone=infoName.nextElementSibling;
            infoName=infoName.textContent.toLocaleLowerCase();
            infoPhone=infoPhone.textContent;
            
            if(infoName.indexOf(searchValue) != -1){
                
                info.style.display='';
            }
            else{
                
                info.style.display='none';
            }
            
            
            info=info.nextElementSibling;
        }
    }
    else {  
        var searchValue = e.target.value;
        var info = contInfo.nextElementSibling; 
        var infoName,infoPhone;
        for(i=0;i<contacts.length;i++){
            infoName=info.firstElementChild;
            infoPhone=infoName.nextElementSibling;

            infoPhone=infoPhone.textContent;
            

            
            if(infoPhone.indexOf(searchValue) != -1){
                
                
                info.style.display='';
            }
            else{
                
                
                info.style.display='none';
            }
            
            
            info=info.nextElementSibling;
        }
    }
});

noBtn.addEventListener('click',function(){
    wrapper.style.opacity = '1';
    cp.style.display = 'none'; 

});

addbtn.addEventListener('click',function(e){
    e.preventDefault();

    Validity();
});



function  Validity(){
    
    if(patterns[cphone.name].test(cphone.value)){
        

        if(exists(cphone.value)){
            existUp();
        }
        else{
 
            contacts.push({
                nameNo:cname.value,
                phoneNo:cphone.value
            })
                
            localStorage.setItem('contacts',JSON.stringify(contacts));
            createRow(cname.value,cphone.value);  
        }

    }
    else{
        alertup();
    }

}
function createRow(n,p){
    
    const tr1 = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    td1.textContent=n;
    td2.textContent=p;
    td3.textContent="X";
    td3.id='delRow';
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    
    tbody.append(tr1);
    contLength++;

    cname.value='';
    cphone.value='';
}
function alertup(){
    wrapper.style.opacity = '0.2';
    up.style.display = 'block';
    console.log(delBtn);
}
function alertdown(){
    wrapper.style.opacity = '1';
    up.style.display = 'none';    
}

Array.from(contRow).forEach(function(roww){
    roww.addEventListener('click',function(e){

        targetCont=e.target.parentElement;
        
        
        
        phonedel=targetCont.children[1];
        phonedel=phonedel.textContent;
        console.log(phonedel);
        if(e.target.id=='delRow'){
            confirmup();
        }
    })
});


function confirmup(){
    wrapper.style.opacity = '0.2';
    cp.style.display = 'block';    
}

function exists(p){
    for (let i = 0; i < contacts.length; i++) {
        if(p==contacts[i].phoneNo ){
            return true;
        }        
    }
}

function existUp(){   
    existpop.style.display='block';
    wrapper.style.opacity='0.2';
}
function existDown(){
    existpop.style.display='none';
    wrapper.style.opacity='1';
    
}