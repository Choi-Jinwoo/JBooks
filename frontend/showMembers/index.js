function showMembers() {
	$.ajax({
		type:"GET",
		url:"http://localhost:3000/member",
		dataType : "json",
		success: (data, status) => {
			if (status === 'nocontent') {
				$('.container').append('회원 정보 없음');
			} else {
				data.data.members.forEach(function(e) {
					const age = new Date().getFullYear() - e.birthYear + 1;
					let rowItem = `<tr>`
					rowItem += `<td><a href="http://127.0.0.1:5500/frontend/showMember/index.html?id=${e.id}">${e.id}</a></td>`
					rowItem += `<td>${e.name}</td>`
					rowItem += `<td>${age}</td>`
					if (e.lent.length) {
						rowItem += `<td>O</td>`	
					} else {
						rowItem += `<td>X</td>`	
					}
					rowItem += '</tr>'
					$('.table').append(rowItem);
				});	
			}
		},
		error: (xhr, status, error) => {
			alert('잠시후 다시 시도해 주세요');
		}  
	});
}