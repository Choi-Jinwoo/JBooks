function addMember(joinBtn) {
	joinBtn.addEventListener('click', function () {
		const id = document.getElementById('id').value;
		const name = document.getElementById('name').value;
		const birthYear = document.getElementById('birthYear').value;
		
		$.ajax({
			type:"POST",
			url:"http://localhost:3000/member",
			data : { id, name, birthYear },
			dataType : "json",
			success: (data, status) => {
				alert('추가에 성공하였습니다.');
				location.href='http://127.0.0.1:5500/frontend/showMembers/index.html';
			},
			error: (xhr, status, error) => {
				if (error === 'Conflict') {
					alert('이미 존재하는 아이디 입니다.');
				} else if (error === 'Bad Request') {
					alert('양식을 확인해주세요.');
				} else {
					alert('잠시후 다시 시도해주세요.');
				}
			}  
		});
	});
}