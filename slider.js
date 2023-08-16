indexValue = 1;
showImg(indexValue);
function btm_slide(e) {
  showImg((indexValue = e));
}
function side_slide(e) {
  showImg((indexValue += e));
}

function showImg(e) {
  const divs = document.getElementsByClassName("slides")[0].children;
  const slider = document.getElementsByClassName("indication");
  if (e > divs.length) {
    indexValue = 1;
  }
  if (e < 1) {
    indexValue = divs.length;
  }
  for (let i = 0; i < divs.length; i++) {
    divs[i].style.display = "none";
  }
  for (let i = 0; i < slider.length; i++) {
    slider[i].style.background = "rgba(255,255,255,0.1)";
    slider[i].style.border = "1px solid black";
  }
  divs[indexValue - 1].style.display = "block";
  slider[indexValue - 1].style.backgroundColor = "rgb(252, 109, 169)";
  slider[indexValue - 1].style.border = "1px solid rgb(252, 109, 169)";
}
