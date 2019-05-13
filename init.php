<?
function getOrderList(){
	$orders = array();
	$orders[] = array(
		"id" => 25523,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 10,
		"basePrice" => 2500,
		"totalPrice" => 1800,
		"maxCount" => 100
	);
	$orders[] = array(
		"id" => 3451,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 5,
		"basePrice" => 1000,
		"totalPrice" => 800,
		"maxCount" => 22
	);
	$orders[] = array(
		"id" => 26234,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 30,
		"basePrice" => 6000,
		"totalPrice" => 5000,
		"maxCount" => 400
	);
	return htmlspecialchars(json_encode($orders), ENT_QUOTES, 'UTF-8');
}
?>