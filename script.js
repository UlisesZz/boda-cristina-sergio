const main = document.getElementById("main");

setTimeout(() => {
  main.classList.remove("hidden");
}, 5000);

window.addEventListener("scroll", () => {
  main.classList.remove("hidden");
});
