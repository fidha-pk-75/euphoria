//  menu bar

const menuBar = document.getElementById("menuBar");
const menuList = document.getElementById("menuList");

menuBar.addEventListener("click", () => {
    if (menuList.style.display === "none") {
        menuList.style.display = "block";
    } else {
        menuList.style.display = "none";
    }
});
      
      
      
      //new Arrivals
let items = [];
let currentIndex = 0;
const itemsPerView = 4;

fetch('/data/images.json')
    .then(response => response.json())
    .then(data => {
        items = data;
        displayImage();
    })
    .catch(error => console.error('Data fetch error:', error));

function displayImage() {
    const container = document.getElementById('newArrivals');
    container.innerHTML = ""; 

    for (let i = currentIndex; i < currentIndex + itemsPerView; i++) {
        if (i >= items.length) break;
        const item = items[i];

        const div = document.createElement('div');
        div.classList.add('newarrivalitem');
        if ((i - currentIndex) === 3) {
          div.id = "lastitem";
          }
        else if((i - currentIndex) === 2){
          div.id = "secondlastitem";
        }
        div.innerHTML = `
            
                <img src="${item.imgurl}" alt="${item.title}" class="image">
          
            <div>
                <p class="proinfo">${item.title}</p>
            </div>
        `;
        container.appendChild(div);
    }
}

// Left arrow click
document.querySelector(".left").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex -= itemsPerView;
        displayImage();
    }
});

// Right arrow click
document.querySelector(".rightbtn").addEventListener("click", () => {
    if (currentIndex + itemsPerView < items.length) {
        currentIndex += itemsPerView;
        displayImage();
    }
});



//categories for men
fetch('/data/grid.json')
.then(response =>response.json())
.then(data =>gridview(data))
.catch(error => console.error('Data feched Error:',error));

function gridview(data){
  const gridbody = document.getElementById('imagegrid');
  data.forEach((item,index)=>{
    const griditems = document.createElement('div')
    griditems.classList.add('griditems');
    if (index === data.length - 1 || index === 3 ) {
      griditems.id = "lastitem";
    }
    griditems.innerHTML=`
    <div class = "griditem">
    <img src = "${item.imgurl}" alt="${item.title}" class = "gimg">
    <div class= "gimagedetails">
    <p class="gproductname">${item.title}</p>
    <a class="explorenow" href="http://127.0.0.1:5500/product.html#">${item.link}</a>
    <a class= "arrowButton" href="http://127.0.0.1:5500/product.html#">
    <img class="arrowImg" src="${item.arrowImg}" alt= "Right Arrow">
    </a>
    </div>
    </div>
    `
    gridbody.appendChild(griditems);

    const griditem = document.createElement('div');
    griditem.className = 'griditem';

  })
}

                                //categories for women


fetch('data/forwomen.json')
.then(response => response.json())
.then(data =>{
  displayForWomen(data);
})
.catch(error => console.error("Error fetched Json:",error));

function displayForWomen(data){
  const forwomen = document.getElementById('Womensitems');
  data.forEach((item,index)=>{
    const forwomenflex = document.createElement('div');
    forwomenflex.className='forwomenflex';
    if (index === data.length - 1) {
      forwomenflex.id = "lastitem";
    }
    forwomenflex.innerHTML=`
    <div class="griditem">
    
    <img src="${item.imgurl}" alt="${item.title}" class="gimg">
    
    <div class="gimagedetails">
    <p class="gproductname">${item.title}</p>
    <a href="http://127.0.0.1:5500/product.html#" class="explorenow">${item.link}</a>
    <a href="http://127.0.0.1:5500/product.html#" class="arrowButton">
    <img src="${ item.arrowImg}" alt="Right Arrow" class="arrowImg">
    </a>
    </div>
    </div>
    `
 forwomen.appendChild(forwomenflex);
  });
}



//in the limelight

fetch('data/limelight.json')
.then(response => response.json())
.then(data =>  displaylimelight(data))
.catch(error => console.error("error fetched json:",error))

function displaylimelight(data){
  const limelightflex = document.getElementById('limelightflex')
  data.forEach((item,index) =>{
    const limelight = document.createElement('div');
    limelight.className = 'limelightitems';
    if(index === data.length-1){
      limelight.id = 'lastitem';
    }
    limelight.innerHTML=`
    <div class="griditem">
      
        <img src="${item.imgurl}" alt="${item.title}" class="gimg">
        <button class="wishlistbutton">
        <i class="fa-regular fa-heart like"></i>
        </button>
    
      <div class="prodescription">
        <div class="productinformation">
          <p class="lpinfo">${item.title}</p>
          <p class="brandname">${item.brand}</p>
        </div>
          <button class="price">${item.button}</button>
      </div>
    </div>
    `
    
  limelightflex.appendChild(limelight)

  })
  likeditems();
}

//like button

function likeditems(){
  document.querySelectorAll('.wishlistbutton').forEach(button => {
    button.addEventListener('click', function () {
      const icon = this.querySelector('.like');
      if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid'); 
        icon.style.color = 'red'; 
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        icon.style.color = '#3C4242';
      }
    });
  });
}



//                 similar products

fetch('data/similarproduct.json')
.then(response => response.json())
.then(data=>displaysimilarproduct(data))
.catch(error=>console.error('json fetching error',error))

function displaysimilarproduct(data){
  const similarproductflex = document.getElementById('similarproductflex')
  data.forEach(item =>{
    const similarproduct = document.createElement('div');
    similarproduct.className='similarproduct'
    similarproduct.innerHTML=`
    <div class='griditem'>
      
        <img src=${item.imgurl} alt="${item.title}"class="gimg">
        <button class="wishlistbutton">
          <i class="fa-regular fa-heart like"></i>
        </button>
      
      <div class="prodescription">
        <div class="productinformation">
          <p class="lpinfo">${item.title}</p>
          <p class="brandname">${item.brand}</p>
        </div>
          <button class="price">${item.price}</button>
      </div>
    </div>
    `
    similarproductflex.appendChild(similarproduct);
  })

  likeditems();
}



// spot light image change
document.addEventListener("DOMContentLoaded", function () {
  const leftButton = document.getElementById("slideleft");
  const rightButton = document.getElementById("slideright");
  const imageElement = document.getElementById("background");
  const leftslide = document.querySelector('.leftslide')
  const rightslide =document.querySelector('.rightslide')

  const images = [
      "images/bg-1.jpg",
      "images/bg-2.jpg"
  ];

  let currentIndex = 0;

  leftButton.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % images.length;
      imageElement.src = images[currentIndex];
  });

  rightButton.addEventListener("click", function () {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      imageElement.src = images[currentIndex];
  });
  leftslide.addEventListener("mouseenter", function () {
    currentIndex = (currentIndex + 1) % images.length;
    imageElement.src = images[currentIndex];
  });
  rightslide.addEventListener("mouseenter", function () {
    currentIndex = (currentIndex + 1) % images.length;
    imageElement.src = images[currentIndex];
  });
});


//footer drop down button
const button = document.getElementById('dropdownbutton');
const droplist = document.getElementById('drop');
const icon = document.getElementById('downicon');
button.addEventListener("click", () => {
  droplist.style.display = droplist.style.display === "block" ? "none" : "block";
  droplist.style.textAlign = "center";
  droplist.style.lineHeight='32px';
  icon.classList.toggle("fa-angle-down");
  icon.classList.toggle("fa-angle-up");
});

document.addEventListener("click", (e) => {
  if (!button.contains(e.target) && !droplist.contains(e.target)) {
      droplist.style.display = "none";
      icon.classList.add("fa-angle-down");
      icon.classList.remove("fa-angle-up");
  }
});

