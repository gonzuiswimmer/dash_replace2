$(function() {

	$('input:checkbox:checked').parent().removeClass("btn btn-default");
	$('input:checkbox:checked').parent().addClass("btn btn-default active");

	$('input[name="assign"]:checked').parent().removeClass("btn btn-default");
	$('input[name="assign"]:checked').parent().addClass("btn btn-default active");
});

// ↓によりposition: sticky;が効くようになる（スライドの際に位置が固定される）
$(function(){
			//side contentsの高さを設定
		const initialHeight = $("#sideContent").height();
		console.log("initialHeight="+initialHeight);
		var height = Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight,
			document.documentElement.scrollHeight, document.documentElement.clientHeight] );
		if(document.body.clientWidth >= 768){
			console.log("clientWidth="+document.body.clientWidth);
			console.log("height="+height);
			$("#sideContent").height(height);
		}
	
		window.addEventListener( 'resize', function() {
			if(document.body.clientWidth >= 768){
				$("#sideContent").height(height);
			}else {
				$("#sideContent").height(initialHeight);
				console.log("画面をリサイズした。高さは"+initialHeight);
			}
		}, false );
})