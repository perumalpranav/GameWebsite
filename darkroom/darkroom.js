const start = Date.now();

function solved() {
    const end = Date.now();
    let elapsed = end - start;
    const hours = String(Math.floor(elapsed/3600000));
    elapsed = (elapsed % 3600000);
    const min = String(Math.floor(elapsed/60000));
    elapsed = (elapsed % 60000);
    const seconds = String(Math.floor(elapsed/1000));
    alert("Solved in " + hours.padStart(2, '0') + ":" + min.padStart(2, '0') + ":" + seconds.padStart(2, '0'));
    let bodyElem = document.getElementById("body");
    bodyElem.classList.add("solvedit");
    bodyElem.innerHTML = "<section><a class=\"homelink\" href=\"/Website2/practice.html\" target=\"_self\"> Home Page &#9664;</a></section><script src=\"darkroom.js\"></script>"
}