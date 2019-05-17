<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="keywords" content=''>
	<meta name="description" content=''>

	<meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1">
	<meta name="format-detection" content="telephone=no">

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" href="css/reset.css" type="text/css">
	<link rel="stylesheet" href="css/jquery.fancybox.css" type="text/css">
	<link rel="stylesheet" href="css/KitAnimate.css" type="text/css">
	<link rel="stylesheet" href="css/slick.css" type="text/css">
	<link rel="stylesheet" href="css/chosen.min.css" type="text/css">
	<link rel="stylesheet" href="css/jquery-ui.min.css" type="text/css">
	<link rel="stylesheet" href="css/layout.css" type="text/css">

	<!-- <link rel="stylesheet" media="screen and (min-width: 768px) and (max-width: 1024px)" href="css/layout-tablet.css">
	<link rel="stylesheet" media="screen and (min-width: 240px) and (max-width: 767px)" href="css/layout-mobile.css"> -->

	<!-- <link rel="icon" type="image/vnd.microsoft.icon" href="favicon.ico"> -->
</head>
<body>
	<div class="b b-header">
		<div class="b-top">
			<div class="b-block">
				<p class="b-city">Интернет-магазин пряжи</p>
				<div class="b-top-menu">	
					<a href="#">О нас</a>
					<a href="#">Доставка и оплата</a>
					<a href="#">Услуги</a>
					<a href="#">Блог</a>
					<a href="#">Отзывы</a>
					<a href="#">Контакты</a>
				</div>
				<a href="tel:+79039538088" class="b-phone">+7 (903) 953-80-88</a>
			</div>
		</div>
		<div class="b-block">
			<div class="b-bottom">
				<a href="/" class="b-logo"></a>
				<a href="#" class="b-header-catalogue">Каталог</a>
				<div class="b-search">Поиск по товарам</div>
				<div class="b-control">
					<a href="#" class="b-profile icon-login"></a>
					<a href="#" class="b-fav icon-star"><p class="b-fav-number">13</p></a>
				</div>
			</div>
		</div>
		<div class="b-main-menu">
			<div class="b-block">
				<ul class="b-menu-items">
					<ul class="b-menu-item"><a href="#">Пряжа</a></ul>
					<ul class="b-menu-item"><a href="#">Инструменты</a></ul>
					<ul class="b-menu-item"><a href="#">Товары для вязания</a></ul>
					<ul class="b-menu-item"><a href="#">Акции и скидки</a></ul>
				</ul>
				<a href=# class="b-price-button">6 400 ₽<p class="b-cart-number">50</p></a>
			</div>
		</div>
	</div>

	<div class="b-content-inner">
		<div class="b-block">
			<ul class="b-breadcrumbs clearfix">
				<li>
					<a href="index.html">Главная</a>
				</li>
				<li>
					<span>Оформление заказа</span>
				</li>
			</ul>
			<h2 class="b-title">Оформление заказа</h2>
			<div class="b-order-parent clearfix">

				<?
				//перенести код в init.php в битре
				//require_once 'init.php';
				//$ordersJSON = getOrderList();
				?>

				<div id="app-order">
					<v-order></v-order>
				</div>
			</div>
		</div>
	</div>
	
	<div class="b-footer">
		<div class="b-block clearfix">
			<div class="b-footer-top">
				<div class="b-footer-top-text">
					<h3>Видео-магазин в WhatsApp</h3>
					<p>Если вы сомневаетесь в выборе того или иного товара, мы можем провести его полный обзор с помощью видео-связи в приложении WhatsApp. Просто оставьте свой номер телефона и мы перезвоним вам для записи.</p>
				</div>
				<div class="b-footer-top-input">
					<form class="b-footer-inputs clearfix">
						<input type="text" name="name" placeholder="Ваше имя" required>
						<input type="text" name="phone" placeholder="Ваш телефон" required>
						<a href="#" class="b-btn ajax">Записаться</a>
						<div class="politics">Отправляя форму, я даю согласие на обработку моих персональных данных в соответствии с <a href="#" class="underlined">политикой конфиденциальности</a></div>
					</form>
				</div>
			</div>
			<div class="b-footer-bottom clearfix">
				<div class="b-footer-bottom-left">
					<p class="b-city">Интернет-магазин пряжи</p>
					<a href="#" class="b-footer-logo"></a>
					<a href="tel:+79039538088" class="b-phone">+7 (903) 953-8088</a>
					<a class="b-phone-call underlined">Обратный звонок</a>
					<div class="b-write-us">
						<p>Напишите нам:</p>
						<div class="b-footer-messenger">
							<a href="#" class="icon-vk"></a>
							<a href="#" class="icon-whatsapp"></a>
							<a href="#" class="icon-viber"></a>
						</div>
					</div>
					<a href="#" class="b-btn">Обратная связь</a>
				</div>
				<div class="b-footer-bottom-middle">
					<ul class="b-footer-top-menu">
						<li><a href="#">Пряжа</a></li>
						<li><a href="#">Инструменты</a></li>
						<li><a href="#">Книги и журналы</a></li>
						<li><a href="#">Наборы для вязания</a></li>
						<li><a href="#">Акции</a></li>
					</ul>
					<ul class="b-footer-bottom-menu">
						<li><a href="#">О нас</a></li>
						<li><a href="#">Доставка и оплата</a></li>
						<li><a href="#">Услуги</a></li>
						<li><a href="#">Блог</a></li>
						<li><a href="#">Отзывы</a></li>
						<li><a href="#">Контакты</a></li>
					</ul>
				</div>
				<div class="b-footer-bottom-right">
					<div class="b-subscribe">
						<h3 class="b-subscribe-us">Будьте в курсе новинок, подпишитесь на рассылку!</h3>
						<form class="b-footer-inputs clearfix">
							<input type="text" name="name" placeholder="Имя" required>
							<input type="text" name="email" placeholder="E-mail" required>
							<a href="#" class="b-btn ajax">Подписаться</a>
							<div class="politics">Отправляя форму, я даю согласие на обработку моих персональных данных в соответствии с <a href="#">политикой конфиденциальности</a></div>
						</form>
					</div>
					<div class="b-social">
						<p>Присоединяйтесь к нам в соцсетях:</p>
						<div class="b-footer-social">
							<a href="#" class="icon-vk"></a>
							<a href="#" class="icon-im"></a>
							<a href="#" class="icon-yt"></a>
						</div>
					</div>
					<div class="b-all-politics">
						<a href="#" class="underlined">Правила предоставления услуг</a>
						<a href="#" class="underlined">Пользовательское соглашение</a>
						<a href="#" class="underlined">Политика конфиденциальности</a>
						<a href="#" class="underlined">Договор-оферта</a>
					</div>
				</div>
				<div class="b-copyright">
					<p>© Моточки-Клубочки. Все права защищены</p>
					<a href="http://redder.pro" class="b-redder">Разработка сайта: REDDER</a>
				</div>
			</div>
		</div>
	</div>
	<div style="display:none;">
		<a href="#b-popup-error" class="b-error-link fancy" style="display:none;"></a>
		<div class="b-popup" id="b-popup-1">
			<h3>Оставьте заявку</h3>
			<h4>и наши специалисты<br>свяжутся с Вами в ближайшее время</h4>
			<form action="kitsend.php" data-goal="CALLBACK" method="POST" id="b-form-1">
				<div class="b-popup-form">
					<label for="name">Введите Ваше имя</label>
					<input type="text" id="name" name="name" required/>
					<label for="tel">Введите Ваш номер телефона</label>
					<input type="text" id="tel" name="phone" required/>
					<label for="tel">Введите Ваш E-mail</label>
					<input type="text" id="tel" name="email" required/>
					<input type="hidden" name="subject" value="Заказ"/>
					<input type="submit" style="display:none;">
					<a href="#" class="b-btn b-blue-btn ajax">Заказать</a>
					<a href="#b-popup-success" class="b-thanks-link fancy" style="display:none;"></a>
				</div>
			</form>
		</div>
		<div class="b-thanks b-popup" id="b-popup-success">
			<h3>Спасибо!</h3>
			<h4>Ваша заявка успешно отправлена.<br/>Наш менеджер свяжется с Вами в течение часа.</h4>
			<input type="submit" class="b-orange-butt" onclick="$.fancybox.close(); return false;" value="Закрыть">
		</div>
		<div class="b-thanks b-popup" id="b-popup-error">
			<h3>Ошибка отправки!</h3>
			<h4>Приносим свои извинения. Пожалуйста, попробуйте отправить Вашу заявку позже.</h4>
			<input type="submit" class="b-orange-butt" onclick="$.fancybox.close(); return false;" value="Закрыть">
		</div>
	</div>
	<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="js/jquery.fancybox.min.js"></script>
	<!-- <script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false&key=AIzaSyD6Sy5r7sWQAelSn-4mu2JtVptFkEQ03YI"></script> -->
	<script type="text/javascript" src="js/jquery.touch.min.js"></script>
	<script type="text/javascript" src="js/jquery.maskedinput.min.js"></script>
	<script type="text/javascript" src="js/jquery.validate.min.js"></script>
	<script type="text/javascript" src="js/KitAnimate.js"></script>
	<script type="text/javascript" src="js/mask.js"></script>
	<script type="text/javascript" src="js/KitSend.js"></script>
	<script type="text/javascript" src="js/slick.min.js"></script>
	<script type="text/javascript" src="js/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="js/autosize.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/vue.js"></script>
	<!-- <script type="text/javascript" src="js/axios.min.js"></script> -->
	<!-- <script type="text/javascript" src="js/vue-resource.min.js"></script> -->
	<script type="text/javascript" src="js/app-order.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
</body>
</html>