let change = document.getElementById('like');



function checkFeed() {
    let newObject = localStorage.getItem('viewedFeed')
    console.log(newObject);
    let post = JSON.parse(newObject)
    console.log(post)

    document.getElementById('post-id').innerHTML = post.id
    document.getElementById('post-title').innerHTML = post.title
    document.getElementById('post-body').innerHTML = post.body
}

checkFeed();






// styling the like button
 

change.addEventListener('click', changeColor)

function changeColor() {
  document.getElementById('like').style.color = 'blue';
  document.getElementById('like').style.transform = 'scale(1.5)';
  document.getElementById('like').style.transition = 'all 0.5s ease-in-out';
}