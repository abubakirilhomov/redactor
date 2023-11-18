const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll('.filter button'),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSliders = document.querySelector(".sliders input"),
rotateOptions = document.querySelectorAll('.rotate button'),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter");
 chooseImgBtn = document.querySelector(".choose-img");
saveImgBtn = document.querySelector(".save-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
} 

console.log(fileInput)
console.log(filterOptions)
console.log(fileInput)
console.log(fileInput)

const loadImage = () => {
    let file = fileInput.files[0]; //getting useer selected file
    if(!file) return; //return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file); //passing file url as preview img src
    previewImg.addEventListener("load", () =>{
        resetFilterBtn.click();  
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option =>{
    option.addEventListener("click", () =>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerHTML = option.innerText

        if(option.id === "brightness"){
            filterSliders.max = "200"
            filterSliders.value = brightness;
            filterValue.innerHTML = `${brightness}%`;
        } else if(option.id === "saturation"){
            filterSliders.max = "200"
            filterSliders.value = saturation;
            filterValue.innerHTML = `${saturation}%`;
        } else if(option.id === "inversion"){
            filterSliders.max = "100"
            filterSliders.value = inversion;
            filterValue.innerHTML = `${inversion}%`;
        } else {
            filterSliders.max = "100"
            filterSliders.value = grayscale;
            filterValue.innerHTML = `${grayscale}%`;
        }
    });
})
const updateFilter = () => {
    filterValue.innerHTML = `${filterSliders.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness"){
        brightness = filterSliders.value;
    } else if(selectedFilter.id === "saturation"){
        saturation = filterSliders.value;
    } else if(selectedFilter.id === "inversion"){
        inversion = filterSliders.value;
    } else{
        grayscale = filterSliders.value;
    }
    applyFilters();
} 
rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left"){
            rotate -=90;
        }else if(option.id === "right"){
            rotate +=90;    
        } else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else{
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilters();
    });
});

const resetFilter = () =>{
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0
    rotate = 0, flipHorizontal = 1, flipVertical = 1;
    filterOptions[0]. click();
    applyFilters();
}

const saveImage = () =>{
    const canvas = document.createElement("canvas"); 
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

fileInput.addEventListener("change", loadImage);    
filterSliders.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());