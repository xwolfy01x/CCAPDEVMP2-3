$("#showrecbtn").click(function(){
	$("#recipecontainer").css('display','block');
	$("#workoutcontainer").css('display', 'none');
	document.getElementById("recipecontainer").scrollIntoView();
	document.getElementById('showrecbtn').disabled=true;
	document.getElementById('showworkbtn').disabled=false;
})

$("#showworkbtn").click(function(){
	$("#workoutcontainer").css('display','block');
	$("#recipecontainer").css('display', 'none');
	document.getElementById("workoutcontainer").scrollIntoView();
	document.getElementById('showworkbtn').disabled=true;
	document.getElementById('showrecbtn').disabled=false;
})
function toggle(source) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}
let idexer = 1;
$("#addExercise").click(function (){
	document.getElementById('addExercise').insertAdjacentHTML("beforebegin",`
	<div id="exerciseFormButton${idexer}" class="exerciseFormButton">
		<div class="newExercise" onclick="showExerForm('${idexer}')" id="showyButton${idexer}">
			<center>
				<span id="exerNameDisplay${idexer}" class="exerNameDisplay"></span>
				<img id="exerPicDisplay${idexer}" src="#" class="exerPicDisplay" alt="imagehere">
			</center>
		</div>
		<button type="button" class="removeButton" onclick="removeExercise('newExercise${idexer}Form', 'exerciseFormButton${idexer}')">Remove</button>
	</div>`);
	document.getElementById('workoutpost').insertAdjacentHTML("afterbegin", `<div class="exerciseForm" id="newExercise${idexer}Form">
		<span>Exercise ${idexer} Name:</span>
		<input type="text" id="exername${idexer}" name="exername" required>
		<span>Exercise ${idexer} Picture: </span>
		<input type="file" id="exerpic${idexer}" name="exerpic" onchange="readURL(this, ${idexer})" accept="image/*">
		<div style="grid-column: 1/5">
			<span>Exercise ${idexer} Instructions:</span><br>
			<textarea id="exerdesc${idexer}" name="exerdesc" required></textarea>
		</div>
		<span>Exercise ${idexer} Repetitions:</span> 
		<input type="number" id="exerrep${idexer}" name="exerrep" required>
		<span>Exercise ${idexer} Sets:</span> 
		<input type="number" id="exerset${idexer}" name="exerset" required>
		<center style="grid-column: 1/3;">
			<input type="text" value="1" style="display: none;" id='cancel${idexer}' required>
			<input type="button" onclick="hideExerForm('${idexer}'); checkCancelCount('cancel${idexer}', 'newExercise${idexer}Form', 'exerciseFormButton${idexer}')" value="Cancel">
		</center>
		<center style="grid-column:3/5;">
		<input type="text" value="1" style="display: none;" id='add${idexer}' required>
			<input type="button" onclick="hideExerForm('${idexer}'); checkAddCount('add${idexer}', 'cancel${idexer}'); increaseExerCount('${idexer}');" value="Add">
		</center>
	</div>`);
	document.getElementById("wpostbtn").disabled = false;
})
let idexer2=1;
$("#addSteps").click(function (){
	document.getElementById('addSteps').insertAdjacentHTML("beforebegin",`
	<div id="stepFormButton${idexer2}" class="stepFormButton">
		<div class="newSteps" onclick="showStepForm('${idexer2}')" id="showyButton2${idexer2}">
			<center>
				<span id="stepNameDisplay${idexer2}" class="stepNameDisplay"></span>
				<img id="stepPicDisplay${idexer2}" src="#" class="stepPicDisplay" alt="imagehere">
			</center>
		</div>
		<button type="button" class="removeButton" onclick="removeStep('newStep${idexer2}Form', 'stepFormButton${idexer2}')">Remove</button>
	</div>`);
	document.getElementById('recipepost').insertAdjacentHTML("afterbegin", `<div class="stepForm" id="newStep${idexer2}Form">
		<span>Step ${idexer2} Picture: </span>
		<input type="file" id="steppic${idexer2}" name="steppic" class="steppic" onchange="readURL2(this, ${idexer2})" accept="image/*">
		<div style="grid-column: 1/5">
			<span>Step ${idexer2} Instructions:</span><br>
			<textarea id="stepdesc${idexer2}" name="stepdesc" class="stepdesc" required></textarea>
		</div>
		<center style="grid-column: 1/3;">
			<input type="text" value="1" style="display: none;" id='cancel2${idexer2}' required>
			<input type="button" onclick="hideStepForm('${idexer2}'); checkCancelCount2('cancel2${idexer2}', 'newStep${idexer2}Form', 'stepFormButton${idexer2}')" value="Cancel">
		</center>
		<center style="grid-column:3/5;">
		<input type="text" value="1" style="display: none;" id='add2${idexer2}' required>
			<input type="button" onclick="hideStepForm('${idexer2}'); checkAddCount2('add2${idexer2}', 'cancel2${idexer}'); increaseStepCount('${idexer2}');" value="Add">
		</center>
	</div>`);
	document.getElementById("rpostbtn").disabled = false;
})
function showExerForm(id) {
	document.getElementById(`newExercise${id}Form`).style.display="grid";
	document.getElementById(`newExercise${id}Form`).style.gridTemplateColumns="repeat(4, 1fr);"
	document.getElementById(`newExercise${id}Form`).style.gridTemplateRows="3vh 30vh 3vh 3vh;"
	document.getElementById(`newExercise${id}Form`).style.gridColumnGap="2%";
	document.getElementById(`newExercise${id}Form`).style.gridRowGap="5%";
}
function showStepForm(id) {
	document.getElementById(`newStep${id}Form`).style.display="grid";
	document.getElementById(`newStep${id}Form`).style.gridTemplateColumns="repeat(4, 1fr);"
	document.getElementById(`newStep${id}Form`).style.gridTemplateRows="3vh 30vh 3vh 3vh;"
	document.getElementById(`newStep${id}Form`).style.gridColumnGap="2%";
	document.getElementById(`newStep${id}Form`).style.gridRowGap="5%";
}
function hideExerForm(id) {
	document.getElementById(`newExercise${id}Form`).style.display="none";
}
function hideStepForm(id) {
	document.getElementById(`newStep${id}Form`).style.display="none";
}
function removeExercise(formid, buttonid) {
	$(`#${formid}`).remove();
	$(`#${buttonid}`).css('display', 'none');
	$(`#${buttonid}`).remove();
}
function removeStep(formid, buttonid) {
	$(`#${formid}`).remove();
	$(`#${buttonid}`).css('display', 'none');
	$(`#${buttonid}`).remove();
}
function increaseExerCount(id) {
	$(`#exerNameDisplay${id}`).html($(`#exername${id}`).val());
	$(`#cancel2${id}`).val(`2`);
}
function increaseStepCount(id) {
	$(`#stepNameDisplay${id}`).html($(`#stepname${id}`).val());
	$(`#cancel2${id}`).val(`2`);
}
function readWorkThumbnail(input, count) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = e => {
			$(`#workpostimg`).attr("src", e.target.result);
			$(`#thumbnailName`).val($('#thumbnail').val().split('\\')[2]);
			$(`#workpostimg`).css('display', 'block');
		}
		reader.readAsDataURL(input.files[0]);
	}	
}
function readRecipeThumbnail(input, count) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = e => {
			$(`#recipepostimg`).attr("src", e.target.result);
			$(`#thumbnailName2`).val($('#thumbnail2').val().split('\\')[2]);
			$(`#recipepostimg`).css('display', 'block');
		}
		reader.readAsDataURL(input.files[0]);
	}	
}
function readURL(input, count) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = e => {
			$(`#exerPicDisplay${count}`).attr("src", e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}	
}
function readURL2(input, count) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = e => {
			$(`#stepPicDisplay${count}`).attr("src", e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}	
}
function checkCancelCount(id, formid, buttonid) {
	var cancelid = id;
	var count = parseInt($(`#${cancelid}`).val(), 10);
	console.log(count)
	if (count === 1) 
		removeExercise(formid, buttonid);
}
function checkCancelCount2(id, formid, buttonid) {
	var cancelid = id;
	var count = parseInt($(`#${cancelid}`).val(), 10);
	console.log(count)
	if (count === 1) 
		removeStep(formid, buttonid);
}
function checkAddCount(id, cancelid) {
	var addid = id;
	var count = parseInt($(`#${addid}`).val(), 10);
	if (count === 1) {
		idexer++;
		$(`#${cancelid}`).val('2');
	}
}
function checkAddCount2(id, cancelid) {
	var addid = id;
	var count = parseInt($(`#${addid}`).val(), 10);
	if (count === 1) {
		idexer2++;
		$(`#${cancelid}`).val('2');
	}
}
let slideNumber = -1;
showSlide();
function showSlide() {
	var array = [
		"../images/bodyFocusAbdomen.jpg",
		"../images/bodyFocusTriceps2.jpg",
		"../images/bodyFocusTriceps.jpg",
		"../images/bodyFocusBack.jpg",
		"../images/bodyFocusBack2.jpg",
		"../images/bodyFocusThigh.jpg",
		"../images/bodyFocusGlutes.jpg",
		"../images/bodyFocusBiceps.jpg",
		"../images/bodyFocusBiceps2.webp",
		"../images/bodyFocusChest.jpg",
		"../images/bodyFocusChest2.jpg",
		"../images/bodyFocusFullBody.jpg",
	];
	slideNumber++;
    $('#slideshow').css('background-image', `url(${array[slideNumber%array.length]})`);
	$('#slideshow').css('background-size', '100% 100%');
    setTimeout(showSlide, 4000);
}
showSlide2();
function showSlide2() {
	var array = [
		"../images/seafood.jpg",
		"../images/pastry.jpg",
		"../images/vegetables.jpg",
		"../images/meat.jpg",
		"../images/fruits.jpg",
	];
	slideNumber++;
    $('#slideshow2').css('background-image', `url(${array[slideNumber%array.length]})`);
	$('#slideshow2').css('background-size', '100% 100%');
    setTimeout(showSlide2, 4000);
}
$("#wpostbtn").click(function() {
	let incompleteData = 0;
	document.getElementById('bodyFocusList').value='';
	if(document.getElementById('abdomen').checked) 
         document.getElementById('bodyFocusList').value+='abdomen ';
    if(document.getElementById('glutes').checked)
        document.getElementById('bodyFocusList').value+='glutes ';
    if(document.getElementById('triceps').checked)
        document.getElementById('bodyFocusList').value+='triceps ';
    if(document.getElementById('biceps').checked)
        document.getElementById('bodyFocusList').value+='biceps ';
    if(document.getElementById('back').checked)
        document.getElementById('bodyFocusList').value+='back ';
    if(document.getElementById('chest').checked)
        document.getElementById('bodyFocusList').value+='chest ';
	if(document.getElementById('thighs').checked)
        document.getElementById('bodyFocusList').value+='thighs ';
    if(document.getElementById('wholebody').checked)
		document.getElementById('bodyFocusList').value+='wholebody';
	if(document.getElementById('bodyFocusList').value=='') {
		$('#error').text('Please specify the body focus!')
		incompleteData = 1;
	}
	if(document.getElementsByClassName('exerciseForm').length == 0) {
		$('#error').text('Please put an exercise!')
		incompleteData = 1;
	}
	for (let i = 0; i < document.getElementsByClassName('exerciseForm').length; i++) {
		if($(`#exername${i+1}`).val()=='' || $(`#exerpic${i+1}`).val()=='' || $(`#exerrep${i+1}`).val()=='' || $(`#exerdesc${i+1}`).val()=='' || $(`#exerset${i+1}`).val()=='') {
			incompleteData = 1;
			$('#error').text('Please answer all your exercise fields')
		}
	}
	if(!incompleteData) document.workoutpost.submit();
	else $('#error').css('display', 'block');
})
$("#rpostbtn").click(function() {
	let incompleteData = 0;
	document.getElementById('fullingredients').value='';
	document.getElementById('recipechecks').value='';
	if(document.getElementById('seafood').checked) 
        document.getElementById('recipechecks').value+='seafood ';
    if(document.getElementById('pastry').checked)
        document.getElementById('recipechecks').value+='pastry ';
    if(document.getElementById('vegetables').checked)
        document.getElementById('recipechecks').value+='vegetables ';
    if(document.getElementById('meat').checked)
        document.getElementById('recipechecks').value+='meat ';
    if(document.getElementById('fruits').checked)
		document.getElementById('recipechecks').value+='fruits ';
	if(document.getElementById('recipechecks').value === '') {
		$('#error2').text('Please specify the recipe category!');
		incompleteData = 1;
	}
	if (document.getElementsByClassName('stepForm').length == 0) {
		$('#error2').text('Please specify the step directions'); 
		incompleteData = 1;
	}
	for(let i = 0; i < document.getElementsByClassName('ingredients').length; i++)
		document.getElementById('fullingredients').value += $(`#ingredient${i}`).children('center').children('span').text()+'¿';
	if(document.getElementById('fullingredients').value=='') {
		$('#error2').text('Please add your ingredients!');
		incompleteData = 1
	};
	for(let i = 0; i< document.getElementsByClassName('stepForm').length; i++)
		if ($(`#stepname${i+1}`).val() == '' || $(`#steppic${i+1}`).val()=='' || $(`#stepdesc${i+1}`).val() == ''){
			incompleteData = 1;
			$('#error2').text('Please answer all your step details!');
		}
	if(!incompleteData) {
		incompleteData=0;
		document.recipepost.submit();
	} else $('#error2').css('display', 'block');
})
let ingCount = 0;
function addIngredient() {
	if($('#ingredients').val()!='') {
		document.getElementById('ingredientsList').insertAdjacentHTML('afterbegin', `
			<li id="ingredient${ingCount}" class="ingredients">
				<button type="button" class="ingDel" onclick="deleteIngredient(${ingCount})">X</button>
				<center><span>${$("#ingredients").val()}</span></center>
			</li>
		`)
		ingCount++;
		$('#ingredients').val('');
	}
}
function deleteIngredient(count) {
	$(`#ingredient${count}`).remove();
}