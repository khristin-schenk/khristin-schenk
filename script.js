function copyToClipboard(text) {
  var aftercopy = document.createElement("input");
  document.body.appendChild(aftercopy);
  aftercopy.setAttribute("value", text);
  aftercopy.select();
  document.execCommand("copy");
  document.body.removeChild(aftercopy);
  alert("Address Copied!");
  document.getElementById("email").innerHTML = "khristinschenk@gmail.com";
}
