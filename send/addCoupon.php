<?
	$coupons = array("zima10", "leto10");
	if(isset($_POST["coupon"])){
		if(in_array($_POST["coupon"], $coupons)){
			
			$orders = array();

			$orders["coupon"] = array(
				"id" => 234,
				"name" => $_POST["coupon"],
				"success" => true,
				"discount" => 5.5, //скидка в процентах
			);

			$orders["items"][] = array(
				"id" => 25523,
				"image" => "i/cabinet-item.jpg",
				"name" => "Пряжа Rowan Finest, меринос/альпака/кашемир, 87 м/25 г",
				"url" => "detail.html",
				"quantity" => 10,
				"basePriceForOne" => 200,
				"totalPriceForOne" => 180,
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
				"totalPriceForOne" => 90,
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
				"totalPriceForOne" => 54,
				"maxCount" => 400,
				"visible" => true,
			);

			echo json_encode($orders);

		}else{
			echo false;
		}
	}
?>