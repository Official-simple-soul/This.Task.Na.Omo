

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



let getFeed = document.querySelector('.get-feed');
let postForm = document.querySelector('#post-form');
let title = document.querySelector('.title');
let body  = document.querySelector('#body');


let rowWrap = document.querySelector('.rowWrap');
let rowPost = document.querySelector('.rowPost');

let dataArray = 0;
let postBox = [];



postForm.addEventListener('submit', createPost)


function createPost(e) {
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
        postBox.unshift(data);

        console.log(postBox)

        // let postHolder = '';
        
        renderUI(postBox)
    })
}


// get feed

getFeed.addEventListener('click', getPost)

getFeed.addEventListener('click', getmore)

function getmore() {
  document.getElementById('more').innerHTML = 'get more';
}

function getPost(){

  window.alert('you want to get feeds');
  

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => {
      return res.json();
})

    .then((data) => {
        postBox = data
        renderUI(postBox)
    })
};

function updatePost(id) {
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
          console.log(postTitles)
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


function viewPost(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
          localStorage.setItem('viewedPost', JSON.stringify(data))
          window.location.href = 'view.html'
          // console.log(data)
      });
}







function deleteMyPost(id) {
  fetch('https://jsonplaceholder.typicode.com/posts' + "/" + id, {
      method: 'DELETE',
      headers: {
          "Content-type": "application/json"
      }
  })
  .then((response) => response.json())
  .then((data) => {
      postBox.shift(data);

      // let postHolder = '';

        renderUI(postBox)
})
}

// function deleteMyPost2(id) {
//   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//       method: 'DELETE',
//       headers: {
//           "Content-type": "application/json"
//       }
//   })
//   .then((response) => response.json())
//   .then((data) => {
//       // rowWrap.shift(data);
//       console.log(dataArray);

//         for (let i = 0; i < 1; i++) {
//           rowWrap.innerHTML += `
//           <div class="col-10 mx-auto mb-3">
//           <div class="cardPost bg-dark text-light h-100  rounded">
//               <div class="card-body">
//                   <p class="d-non">${data[dataArray].id}</p>
//                   <div class="head d-flex justify-content-between align-items-center">
//                     <h6 id="post-title" class="post-title">${data[dataArray].title}</h6>
//                     <img src="img/female.png" alt="" class="head-image" width="70px" height="80px">
//                   </div>
//                   <p id="post-body" class="post-body">${data[dataArray].body}</p>
//                   <div class="d-flex justify-content-between">
//                     <button class="btn btn-light text-dark" id="update" onclick="updatePost(${data[dataArray].id})">Update</button>
//                     <button class="btn btn-dark border-light" id="view" onclick="viewPost(${data[dataArray].id})">View More</button>
//                     <button class="border-0 bg-transparent" id="delete" onclick="deleteMyPost2(${data[dataArray].id})"><i class="fa-solid fa-trash-can text-danger fs-1"></i></button>
//                   </div>
//               </div>
//           </div>
//           `
//           dataArray = dataArray + 1;
//         }
//   })
// }



function renderUI (arr) {
  let postHolder = '';
          arr.forEach(post => {
              postHolder += `
                  <div class="col-10 mx-auto mb-3">
                      <div class="cardPost bg-dark text-light h-100  rounded">
                          <div class="card-body">
                              <p class="d-none">${post.id}</p>
                              <div class="head d-flex justify-content-between align-items-center">
                                <h6 id="post-title" class="post-title">${post.title}</h6>
                                <img src="img/female.png" alt="" class="head-image" width="70px" height="80px">
                              </div>
                              <p id="post-body" class="post-body">${post.body}</p>
                              <div class="d-flex justify-content-between">
                                  <button class="btn btn-light text-dark" onclick="updatePost(${post.id})">Update</button>
                                  <button class="btn btn-dark border-light" id="view-btn" onclick="viewPost(${post.id})">view More</button>
                                  <button class="border-0 bg-transparent" onclick="deleteMyPost(${post.id})"><i class="fa-solid fa-trash-can text-danger fs-1"></i></button>
                              </div>
                          </div>
                      </div>
                  </div>
              `
          });
          rowPost.innerHTML = postHolder;
}



