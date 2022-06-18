

// section 2

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    effect: 'card',
  
    autoplay: {
      delay: 3000,
    },
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination1',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    
        // Default parameters

        // Responsive breakpoints
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 4,
            spaceBetween: 40
          },

          1200: {
            slidesPerView: 6,
            spaceBetween: 40
          },

          autoplay: {
            delay: 3000,
          },
        }
  });

//   ===================================================

// Storing Variables

let importFeed = document.querySelector('.get-feed');
let viewForm = document.querySelector('#post-form');
let title = document.querySelector('.title');
let body  = document.querySelector('#body');


let rowWrap = document.querySelector('.rowWrap');
let rowPost = document.querySelector('.rowPost');

let dataArray = 0;
let feedBox = [];


// blockHtml into function

function blockHtml (arr) {
  let postHolder = '';
          arr.forEach(post => {
              postHolder += `
                  <div class="col-10 mx-auto mb-3" data-aos="zoom-in" data-aos-duration="2000">
                      <div class="cardPost bg-dark text-light h-100  rounded">
                          <div class="card-body">
                              <p class="d-none">${post.id}</p>
                              <div class="head d-flex justify-content-between align-items-center">
                                <h6 id="post-title" class="post-title">${post.title}</h6>
                                <img src="img/female.png" alt="" class="head-image" width="70px" height="80px">
                              </div>
                              <p id="post-body" class="post-body">${post.body}</p>
                              <div class="d-flex justify-content-between">
                                  <button class="btn btn-light text-dark" onclick="editFeed(${post.id})">Update</button>
                                  <button class="btn btn-dark border-light" id="view-btn" onclick="viewFeed(${post.id})">view More</button>
                                  <button class="border-0 bg-transparent" onclick="deleteMyFeed(${post.id})"><i class="fa-solid fa-trash-can text-danger fs-1"></i></button>
                              </div>
                          </div>
                      </div>
                  </div>
              `
          });
          rowPost.innerHTML = postHolder;
}



// feed setting
// function myFunction() {
//   document.getElementById("post-form").reset();
// }




viewForm.addEventListener('submit', setFeed)



function setFeed(e) {
 
  alert('you want to create post')
    e.preventDefault();
    // console.log(title.value, body.value)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data)=> {

        console.log(data)
        // postBox = data
        feedBox.unshift(data);

        // console.log(feedBox)

        // let postHolder = '';
        
        blockHtml(feedBox)
    })

    document.getElementById("post-form").reset()
}


// feed importing

// click functions

importFeed.addEventListener('click', importPost)

importFeed.addEventListener('click', getmore)

function getmore() {
  document.getElementById('more').innerHTML = 'get more';
}

// import function

function importPost(){

  window.alert('you want to get feeds');
  

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => {
      return res.json();
})

    .then((data) => {
        feedBox = data
        blockHtml(feedBox)
    })
};

// edit feed

function editFeed(id) {
  window.alert('you want to update post');

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          id: id,
          title: title.value,
          body: body.value,
          userId: 2,
      }),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
      .then((response) => response.json())
      .then((data) => {

          console.log(data)
          let postTitles = document.querySelectorAll('.post-title') // 100 post titles [0 -99]
          let postBodies = document.querySelectorAll('.post-body')

          postTitles.forEach((postTitle, index) => {
              if (index + 1 === id) {
                  if (data.title !== "") {
                      postTitle.innerHTML = data.title
                  }
              }

          })

          postBodies.forEach((postBody, index) => {
              if (index + 1 === id) {
                  if (data.body !== "") {
                      postBody.innerHTML = data.body
                  }
              }

          })

      });
}

// view feed

function viewFeed(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
          localStorage.setItem('viewedFeed', JSON.stringify(data))
          window.location.href = 'view.html'
          // console.log(data)
      });
}

// delete feed

function deleteMyFeed(id) {
  fetch('https://jsonplaceholder.typicode.com/posts' + "/" + id, {
      method: 'DELETE',
      headers: {
          "Content-type": "application/json"
      }
  })
  .then((response) => response.json())
  .then((data) => {
      feedBox.shift(data);

      // let postHolder = '';

        blockHtml(feedBox)
})
}





