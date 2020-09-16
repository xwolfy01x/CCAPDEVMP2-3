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
			<input type="button" onclick="hideExerForm('${idexer}'); checkAddCount('add${idexer}'); increaseExerCount('${idexer}');" value="Add">
		</center>
	</div>`);
	document.getElementById("wpostbtn").disabled = false;
})
function showExerForm(id) {
	document.getElementById(`newExercise${id}Form`).style.display="grid";
	document.getElementById(`newExercise${id}Form`).style.gridTemplateColumns="repeat(4, 1fr);"
	document.getElementById(`newExercise${id}Form`).style.gridTemplateRows="3vh 30vh 3vh 3vh;"
	document.getElementById(`newExercise${id}Form`).style.gridColumnGap="2%";
	document.getElementById(`newExercise${id}Form`).style.gridRowGap="5%";
}
function hideExerForm(id) {
	document.getElementById(`newExercise${id}Form`).style.display="none";
}
function removeExercise(formid, buttonid) {
	$(`#${formid}`).remove();
	$(`#${buttonid}`).css('display', 'none');
	$(`#${buttonid}`).remove();
}
function increaseExerCount(id) {
	$(`#exerNameDisplay${id}`).html($(`#exername${id}`).val());
	$(`#cancel${id}`).val(`2`);
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
			$(`#thumbnailName`).val($('#thumbnail').val().split('\\')[2]);
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
function checkCancelCount(id, formid, buttonid) {
	var cancelid = id;
	var count = parseInt($(`#${cancelid}`).val(), 10);
	console.log(count)
	if (count === 1) 
		removeExercise(formid, buttonid);
}
function checkAddCount(id) {
	var addid = id;
	var count = parseInt($(`#${addid}`).val(), 10);
	console.log(count)
	if (count === 1) {
		idexer++;
		$(`#${addid}`).val('2');
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
$("#wpostbtn").click(function() {
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
	document.workoutpost.submit();
})
let ingCount = 0;
function addIngredient() {
	document.getElementById('ingredientsList').insertAdjacentHTML('afterbegin', `
		<li id="ingredient${ingCount}" class="ingredients">
			<button type="button" class="ingDel" onclick="deleteIngredient(${ingCount})">X</button>
			<center><span>${$("#ingredients").val()}</span></center>
		</li>
	`)
	$('#ingredients').val('');
	ingCount++;
}
function deleteIngredient(count) {
	$(`#ingredient${count}`).remove();
}