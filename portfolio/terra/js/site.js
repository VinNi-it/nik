 /* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
            
for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");  //добавляет класс .active (в css потом можно віделять отдельнім цветом открівшееся меню), если меню уже активно - то клас удаляется
        var n_child = this.childNodes; // получение всех дочерних елементов

        // перебор всех дочерних елементов , сравнение с исходным класом, удаление класа и добавление другого класа (стрелочка вверх или вниз)
        for (j = 0; j < n_child.length; j++) {
            if (n_child[j].className == "fa fa-caret-down") {
                     n_child[j].classList.remove("fa-caret-down");
                     n_child[j].classList.add("fa-caret-up");
               } else if(n_child[j].className == "fa fa-caret-up"){
                     n_child[j].classList.remove("fa-caret-up");
                     n_child[j].classList.add("fa-caret-down");
               }
        }
        console.log(n_child);
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") { // проверяем , если следующий елемент(клас) имеет свойство display:block; меняем на display:none;  и наоборрот
              dropdownContent.style.display = "none";
        } else
		   {
            dropdownContent.style.display = "block";
           }
       });
 }