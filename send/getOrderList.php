<?
	$orders = array();

	//Вариант когда купон применён
	// $orders["coupon"] = array(
	// 	"id" => 234,
	// 	"name" => "zima10",
	// 	"success" => true,
	// 	"discount" => 5.5, //скидка в процентах
	// );

	// $orders["items"][] = array(
	// 	"id" => 25523,
	// 	"image" => "i/cabinet-item.jpg",
	// 	"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
	// 	"url" => "detail.html",
	// 	"quantity" => 10,
	// 	"basePriceForOne" => 250,
	// 	"totalPriceForOne" => 180,
	// 	"maxCount" => 12,
	// 	"visible" => true,
	// );
	// $orders["items"][] = array(
	// 	"id" => 3451,
	// 	"image" => "i/cabinet-item.jpg",
	// 	"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
	// 	"url" => "detail.html",
	// 	"quantity" => 5,
	// 	"basePriceForOne" => 100,
	// 	"totalPriceForOne" => 80,
	// 	"maxCount" => 100,
	// 	"visible" => true,
	// );
	// $orders["items"][] = array(
	// 	"id" => 26234,
	// 	"image" => "i/cabinet-item.jpg",
	// 	"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
	// 	"url" => "detail.html",
	// 	"quantity" => 30,
	// 	"basePriceForOne" => 60,
	// 	"totalPriceForOne" => 50,
	// 	"maxCount" => 400,
	// 	"visible" => true,
	// );
	// echo json_encode($orders);

	//Вариант когда купон не применён
	$orders["coupon"] = array();

	$orders["items"][] = array(
		"id" => 25523,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 10,
		"basePriceForOne" => 280,
		"totalPriceForOne" => 250,
		"maxCount" => 12,
		"visible" => true,
	);
	$orders["items"][] = array(
		"id" => 3451,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 5,
		"basePriceForOne" => 100,
		"totalPriceForOne" => 100,
		"maxCount" => 100,
		"visible" => true,
	);
	$orders["items"][] = array(
		"id" => 26234,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 30,
		"basePriceForOne" => 60,
		"totalPriceForOne" => 60,
		"maxCount" => 400,
		"visible" => true,
	);

	echo json_encode($orders);

?>