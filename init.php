<?
function getOrderList(){
	$orders = array();
	$orders[] = array(
		"id" => 25523,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 10,
		"basePrice" => 250,
		"totalPrice" => 180,
		"maxCount" => 12
	);
	$orders[] = array(
		"id" => 3451,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 5,
		"basePrice" => 100,
		"totalPrice" => 80,
		"maxCount" => 100
	);
	$orders[] = array(
		"id" => 26234,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 30,
		"basePrice" => 60,
		"totalPrice" => 50,
		"maxCount" => 400
	);
	return htmlspecialchars(json_encode($orders), ENT_QUOTES, 'UTF-8');
}
?>