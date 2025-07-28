const input=document.getElementById("inputField");
const addbtn=document.getElementById("addBtn");
const tasklist=document.getElementById("tasksList");

addbtn.addEventListener("click",function(){

    const task=input.value.trim();

    if(task!=''){
        addTaskToList(task);    
        input.value='';   
    }
})

function addTaskToList(task) {
    const li=document.createElement("li");

    li.textContent=task;

    const deleteBtn=document.createElement("button");
    deleteBtn.textContent="Delete";

    deleteBtn.addEventListener("click",function(){
        tasklist.removeChild(li);
        deletefromstorage(task);
    });
    li.appendChild(deleteBtn);
    tasklist.prepend(li);

    let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function deletefromstorage(task){
    let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
    tasks=tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.addEventListener("load", function() {
    let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToList(task);
    });
}   );