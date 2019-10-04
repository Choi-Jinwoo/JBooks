function lent(lentBtn) {
	lentBtn.addEventListener('click', function () {
		const { id } = getUrlParams();
		const name = document.getElementById('name').value;
		let returnTerm = document.getElementById('returnTerm').value;
		if (!returnTerm) {
			returnTerm = 7;
		}
		returnTerm = parseInt(returnTerm);
		const today = new Date();
		today.setDate(today.getDate() + returnTerm);
		const returnDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
		
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/book",
			data: { id, name, returnDate },
			dataType: "json",
			success: (data, status) => {
				if (status === 'nocontent') {
					alert('존재하지 않는 회원입니다.');
				} else {
					alert('대출이 완료되었습니다.');
					location.href = `http://127.0.0.1:5500/frontend/showMember/index.html?id=${id}`
				}
			},
			error: (xhr, status, error) => {
				if (error === 'Bad Request') {
					alert('양식을 확인하세요.');
				} else {
					alert('잠시후 다시 시도해 주세요.');
				}
			}
		})
	});
}

function getUrlParams() {
	const params = {};
	window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
	return params;
}