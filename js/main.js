"use strict"


let items = document.querySelectorAll('.carousel .carousel-item')
	   
items.forEach((el) => {
    const minPerSlide = 3
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
});

//date
let date = new Date();
document.getElementById('year').innerText = `${date.getFullYear()} & VinNi`;

//form
document.addEventListener('DOMContentLoaded',function () {
	const form = document.getElementById('form');

	form.addEventListener('submit',formsend);

	async function formsend(e) {
		e.preventDefault();//запрет на стандартную отправку форм

		let error = formValidate(form);

		let formData = new FormData(form);
		//formData.append('image', "img/bp.png");
	
		if(error === 0){
			form.classList.add('_sending');//класс за анимацию загрузки добавляется
			//при помощи технологии ajax и fetch
			let response = await fetch('sendmail.php',{
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				let result = await response.json();
//				let result = await response;// sendmail2.php
				alert(result.message);
//				alert('сообщение отправлено');// sendmail2.php
				form.reset();
				form.classList.remove('_sending');//класс за анимацию загрузки удаляется
			} else {
				alert('ошибка');
				form.classList.remove('_sending');
			}
		} else {
			alert ('Заполните обязательные поля');
		}
	}

	function formValidate(form){
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for(let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			formRemoveError(input);

			if(input.classList.contains('_email')){
				if(emailTest(input)){
					formAddError(input);
					error++;
				}
			} else {
				if(input.value === ''){
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);//регулярное выражение
	}



});
