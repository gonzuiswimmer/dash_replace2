$(function() {
	$('#new_inquiry').submit(function() {

		$('#inquiry-error').empty();
		
		let error;
		let value = $(inquiry_body).val();
		//value値の長さ
		let count = value.length;
		
		if (value == "") {
			error = true;
		} else if (!value.match(/[^\s\t]/)) {
			error = true;
		} else if (count > 1000){
			//1000文字より大きいときエラー
			error = true;
		}
		
		if (error) {
			if(value == ""){
				// 空白、スペースのみで送信された時の処理
				$('#inquiry-error').append(`
					<div class="alert alert-dismissible fade in alert-danger">
	                    <button class="close" data-dismiss="alert" type="button">
	                    <span aria-hidden="true">×</span>
	                    <span class="sr-only">Close</span></button>内容を入力してください
	                  </div>
	                  `);      
			}else if(count > 1000){
				// 1000文字より大きい値を入力した時の処理
				 $('#inquiry-error').append(`
					<div class="alert alert-dismissible fade in alert-danger">
	                    <button class="close" data-dismiss="alert" type="button">
	                    <span aria-hidden="true">×</span>
	                    <span class="sr-only">Close</span></button>1000文字以内で入力してください
	                  </div>
	                  `);   
			}
			return false;
		} else {
			// 成功時の処理
			alert('投稿ありがとうございました!');
			$('#inquiry_form_close').trigger('click');
			// 後処理
			  setTimeout(function(){
				  $(inquiry_body).val('');
			  }, 1);
		}
	})
});
