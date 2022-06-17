let change = document.getElementById('like');



function showSingle() {
    let newOject = localStorage.getItem('viewedPost');

    let post = JSON.parse(newOject);

    renderUI(post);

}







 

change.addEventListener('click', changeColor)

function changeColor() {
  document.getElementById('like').style.color = 'blue';
  document.getElementById('like').style.transform = 'scale(1.5)';
  document.getElementById('like').style.transition = 'all 0.5s ease-in-out';
}