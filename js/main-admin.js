var style ={
    paddingBanner: function(){
		var paddingHeader = document.querySelector('header');
		// lần đầu chỉnh bởi vì lúc này chưa có resize
		const nextSiblingElement = paddingHeader.nextElementSibling;
		var height = paddingHeader.offsetHeight;
		console.log(height);
		nextSiblingElement.style.paddingTop = height.toString() + 'px';
  
		window.addEventListener('resize', function() {
		  // Kiểm tra và hiển thị kết quả
			var height = paddingHeader.offsetHeight;
			nextSiblingElement.style.paddingTop = height.toString() + 'px';
		});
	  },
}
var control = {
	active: function(){
		var active = document.querySelectorAll('.toggle-ios');
		active.forEach(function(name,X){
			var oof = name.getAttribute('value');
			if(oof == '1'){
				name.checked = true;
			}else{
				name.checked = false;
			}
			name.addEventListener("change",function(e){
				const id = name.dataset.id;
				if(name.checked){
					a = 1;
				}else{
					a = 0;
				}
				fetch(`http://localhost:3000/news/${id}`, {
					method: 'PUT',  // Hoặc 'PATCH' nếu chỉ muốn cập nhật một phần
					headers: {
						'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
					},
					body: JSON.stringify({
						active: a  // Giá trị mới của cột 'active'
					})
				})
				.then(response => response.json())  // Chuyển đổi phản hồi từ máy chủ thành JSON
				.then(data => {
					console.log('Cập nhật thành công:', data);
				})
				.catch(error => {
					console.error('Lỗi khi cập nhật:', error);
				});
			})
		})
			


	},
	delete: function(){
		document.querySelectorAll('.delete-btn').forEach(button => {
			button.addEventListener('click', function () {
				const id = this.dataset.id;
	
				if (confirm("Bạn có chắc chắn muốn xóa bản ghi này?")) {
					fetch(`http://localhost:3000/news/${id}`, {
						method: 'DELETE',
					})
					.then(response => response.json())
					.then(data => {
							
						if (data.message === "Xóa thành công") {
							// Xóa phần tử khỏi giao diện
							this.closest('tr').remove(); // Giả sử phần tử nằm trong thẻ <tr>
						}
					})
					.catch(error => {
						console.error("Lỗi khi gửi yêu cầu: ", error);
						console.error(error);
					});
				}
			});
		});
	}
}
style.paddingBanner();
control.active();
control.delete();
