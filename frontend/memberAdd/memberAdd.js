const joinBtn = document.getElementById('joinBtn');

joinBtn.addEventListener('click', () => {
	const id = document.getElementById('id');
	const name = document.getElementById('name');
	const birthYear = document.getElementById('birthYear');

	$.ajax({
		type:"POST",
		url:"localhost:3000/member",
		data : { id, name, birthYear },
		dataType : "json",
		success: (data, status) => {
			
		},
		error: (xhr, status, error) => {
			
		}  
	});
});