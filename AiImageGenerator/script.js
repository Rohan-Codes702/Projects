async function fetchImage(){
    let prompt=document.getElementById("input").value;
    let gallary=document.getElementById("gallery");

    if(prompt===""){
        alert("Enter something for search");
        return;
    }

    gallary.innerHTML="<p>Loading Image...</p>";

   try{
    const response=await fetch(`https://lexica.art/api/v1/search?q=${encodeURIComponent(prompt)}`);
    const data=await response.json();
    gallary.innerHTML="";

    if(data.images.length==0){
        gallary.innerHTML="<p>Image Not Found</p>";
        return;
    }

    for(let i=0;i<6;i++){
        const img=document.createElement("img");
        img.src=data.images[i].srcSmall;
        img.alt=prompt;
         img.className = "w-full rounded-lg shadow-md mb-4";
        gallery.appendChild(img);
    }
   }
   catch(error){
    gallary.innerHTML="<p>Error in Fetching in image</p>";
    console.log="Error in Fetching in image"
   }
}

document.getElementById("btn").addEventListener("click",fetchImage);