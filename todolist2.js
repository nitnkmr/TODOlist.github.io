console.log('check 1 2 34,,,,')
showNotes();

let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
    let addText=document.getElementById('addText');
    let addTtl=document.getElementById('addTtl');
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{   notesObj=JSON.parse(notes);
    }
    let MyObj={
        title:addTtl.value,
        text:addText.value
    }
    notesObj.push(MyObj);
         localStorage.setItem('notes',JSON.stringify(notesObj));
    
    addText.value="";
    addTtl.value="";
    showNotes();
})

function showNotes(){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html='';
    notesObj.forEach(function(element ,index) {
        html+=`
        <div class="cardNote card my-3 mx-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${index+1}. ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">DELETE</button>
        </div>
    </div>`; 
            
    });
    let notesElm=document.getElementById('notes');
    if(notesObj.length!=0){
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML=`<h3>no tasks</h3>`
    }

}
function deleteNote(index){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();

    
}
let search=document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let inputVal=search.value.toLowerCase();
    let cardNote=document.getElementsByClassName('cardNote');
    Array.from(cardNote).forEach(function(element){
        let cardTxt=element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})