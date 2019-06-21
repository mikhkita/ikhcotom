<?include "header.php";?>
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
<?include "footer.php";?>