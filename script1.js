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


//product.html
function changeImage(element) {
  let mainImage = document.querySelector(".mainimage");
  mainImage.src = element.src;}


  //similar products

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

// footer drop down button
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
