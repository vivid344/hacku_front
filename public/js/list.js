function approval_button() {
	swal({
	  title: "承認しますか?",
	  text: "グループから招待が届いています。承認しますか？",
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	//もし承認するなら
	.then((willDelete) => {
	  if (willDelete) {
	  	window.location.href = 'detail.html';
	  }
	});
}

function fire_button(){
	swal({
	  title: "目標達成できませんでした。",
	  text: "グループの皆さんが目標金額までお金を貯めることができませんでした。残念ですが、あなたが貯金したお金は全て「Yahoo！ネット募金」に募金されます。",
	  icon: "error",
	  buttons: {
      	cancel: "閉じる",
      	catch: {
      		text: "詳細を見る",
      		value: "catch",
    	},
  	  },
	  dangerMode: true,
	})
	//もし承認するなら
	.then((value) => {
	  switch (value) {
	
	    case "defeat":
	      break;
	 
	    case "catch":
	      window.location.href = 'detail.html';
	      break;
	 
	    default:
	  }
	});
}

function success_button(){
	swal({
	  title: "おめでとうございます。",
	  text: "目標金額に達しました。貯めたお金でショッピングを楽しんでください",
	  icon: "success",
	  buttons: {
      	cancel: "閉じる",
      	catch: {
      		text: "詳細を見る",
      		value: "catch",
    	},
  	  },
	  dangerMode: true,
	})
	//もし承認するなら
	.then((value) => {
	  switch (value) {
	
	    case "defeat":
	      break;
	 
	    case "catch":
	      window.location.href = 'detail.html';
	      break;
	 
	    default:
	  }
	});
}
function detail_button(){
	window.location.href = 'detail.html';
}


