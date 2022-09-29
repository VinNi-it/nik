var dropdown = document.getElementsByClassName("menu-bar-item");
var i;
            
for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {

        var ddd = document.getElementById("menu-bar");

        if (ddd.style.display === "flex") {
            ddd.style.display = "none";
        } else
             {
          ddd.style.display = "flex";
         }
         console.log(ddd);

      })
 }