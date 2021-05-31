//function to display navbar background-color on scroll
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.getElementById("mainNav").style.backgroundColor = "#323033";
  } else {
    document.getElementById("mainNav").style.backgroundColor = "transparent";
  }
}
