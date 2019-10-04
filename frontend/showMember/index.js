function showMember() {
	const { id } = getUrlParams();
	$.ajax({
		type:"GET",
		url: `http://localhost:3000/member/${id}`,
		dataType : "json",
		success: (data, status) => {
			if (status === 'nocontent') {
				$('.container').append('존재하지 않는 회원');
				$('.title').append('회원정보 없음');
			} else {
				$('.title').append(data.data.member.name);
				if (data.data.member.lent.length === 0) {
				$('.container').append('대출 정보가 존재하지 않습니다.');
				} else {
					data.data.member.lent.forEach(function(e) {
						let rowItem = `<tr>`
						rowItem += `<td class="book_name" id="name_${e.idx}">${e.name}</td>`
						rowItem += `<td>${e.lentDate}</td>`
						rowItem += `<td>${e.returnDate}</td>`
						rowItem += '</tr>'
						$('.table').append(rowItem);

						const bookName = document.getElementById(`name_${e.idx}`);
						bookName.addEventListener('click', function () {
							returnBook(e.idx, e.id);
						});
					});	
				}
			}
		},
		error: (xhr, status, error) => {
			alert('잠시후 다시 시도해 주세요');
		}  
	});
}

function returnBook(idx, id) {
	console.log(idx);
	$.ajax({
		type: "DELETE",
		url: `http://localhost:3000/book/${idx}`,
		dataType : "json",
		success: (data, status) => {
			if (status === 'nocontent') {
				alert('이미 반납된 도서입니다.');
			} else {
				alert('도서 반납에 성공하였습니다.');
				location.href=`http://127.0.0.1:5500/frontend/showMember/index.html?id=${id}`
			}
		},
		error: (xhr, status, error) => {
			alert('잠시후 다시 시도해 주세요.');
		}  
	});
}

function getUrlParams() {
	const params = {};
	window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
	return params;
}