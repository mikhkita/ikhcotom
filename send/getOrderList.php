<?
	$orders = array();

	//Вариант когда купон применён
	$orders["coupons"][] = array(
		"id" => 723,
		"name" => "zima10",
		"success" => true,
	);
	$orders["coupons"][] = array(
		"id" => 724,
		"name" => "wefe",
		"success" => false,
	);
	$orders["coupons"][] = array(
		"id" => 725,
		"name" => "YTCCTRCT",
		"success" => false,
	);


	$orders["items"][] = array(
		"id" => 25523,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 10,
		"basePriceForOne" => 250,
		"totalPriceForOne" => 180,
		"maxCount" => 12,
	);
	$orders["items"][] = array(
		"id" => 3451,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 5,
		"basePriceForOne" => 100,
		"totalPriceForOne" => 80,
		"maxCount" => 100,
	);
	$orders["items"][] = array(
		"id" => 26234,
		"image" => "i/cabinet-item.jpg",
		"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
		"url" => "detail.html",
		"quantity" => 30,
		"basePriceForOne" => 60,
		"totalPriceForOne" => 50,
		"maxCount" => 400,
	);

	$orders["delivery"]["active"] = "SDEC";
	$orders["delivery"]["items"][] = array(
		"id" => 512,
		"name" => "Почта России",
		"value"=>"post",
        "cost"=> 350,
        "checked"=> true,
        "text"=> "1. Без объявленной ценности. Если хотите ценную посылку, пишите в примечании к заказу, какую ценность указать, и мы пересчитаем доставку."
	);
	$orders["delivery"]["items"][] = array(
		"id" => 513,
		"name"=> "СДЭК",
		"value"=> "SDEC",
        "cost"=> 550,
        "checked"=> false,
        "text"=> "2. Без объявленной ценности. Если хотите ценную посылку, пишите в примечании к заказу, какую ценность указать, и мы пересчитаем доставку."
	);
	$orders["delivery"]["items"][] = array(
		"id" => 514,
		"name"=> "Курьер по Томску",
		"value"=> "courier",
        "cost"=> 700,
        "checked"=> false,
        "text"=> "3. Без объявленной ценности. Если хотите ценную посылку, пишите в примечании к заказу, какую ценность указать, и мы пересчитаем доставку."
	);
	$orders["delivery"]["items"][] = array(
		"id" => 515,
		"name"=> "Самовывоз из офиса",
		"value"=>"pickup",
        "cost"=> 0,
        "checked"=> false,
        "text"=>"4. Без объявленной ценности. Если хотите ценную посылку, пишите в примечании к заказу, какую ценность указать, и мы пересчитаем доставку."
	);

	$orders["payments"][] = array(
		"id" => 4234,
		"name"=> "Онлайн-оплата картой",
		"value"=> "online",
        "checked"=> true,
	);
	$orders["payments"][] = array(
		"id" => 4235,
		"name"=>"Сбербанк.Онлайн",
		"value"=> "sber",
        "checked"=> false,
	);



	// echo json_encode($orders);

	//Вариант когда купон не применён
	// $orders["coupon"] = array();

	// $orders["items"][] = array(
	// 	"id" => 25523,
	// 	"image" => "i/cabinet-item.jpg",
	// 	"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
	// 	"url" => "detail.html",
	// 	"quantity" => 10,
	// 	"basePriceForOne" => 280,
	// 	"totalPriceForOne" => 250,
	// 	"maxCount" => 12,
	// );
	// $orders["items"][] = array(
	// 	"id" => 3451,
	// 	"image" => "i/cabinet-item.jpg",
	// 	"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
	// 	"url" => "detail.html",
	// 	"quantity" => 5,
	// 	"basePriceForOne" => 100,
	// 	"totalPriceForOne" => 100,
	// 	"maxCount" => 100,
	// );
	// $orders["items"][] = array(
	// 	"id" => 26234,
	// 	"image" => "i/cabinet-item.jpg",
	// 	"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
	// 	"url" => "detail.html",
	// 	"quantity" => 30,
	// 	"basePriceForOne" => 60,
	// 	"totalPriceForOne" => 60,
	// 	"maxCount" => 400,
	// );

	echo json_encode($orders);

?>