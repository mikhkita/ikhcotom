<?include "header.php";?>
	<div class="b-content-inner">
		<div class="b-block">
			<ul class="b-breadcrumbs clearfix">
				<li>
					<a href="index.html">Главная</a>
				</li>
				<li>
					<a href="cabinet.html">Личный кабинет</a>
				</li>
				<li>
					<span>Редактирование профиля</span>
				</li>
			</ul>
			<h2 class="b-title">Редактирование профиля</h2>
			<div class="b-cabinet">
				<div class="b-cabinet-profile">
					<div class="b-profile-photo">
						<div class="current-photo">
							<img src="i/cabinet-photo.jpg">
							<div class="background-photo">
								<div class="photo-update-icon"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="b-cabinet-content">
					<form action="" method="POST">
						<div class="b-inputs-3 clearfix">
							<div class="b-input">
								<p>Ф.И.О.</p>
								<input type="text" name="name" placeholder="Фамилия Имя Отчество">
							</div>
							<div class="b-input">
								<p>Номер телефона</p>
								<input type="text" name="phone" placeholder="+7 (999) 999 0000">
							</div>
							<div class="b-input">
								<p>Электронная почта</p>
								<input type="text" name="email" placeholder="example@yandex.ru">
							</div>
						</div>
						<a href="#" class="b-btn b-btn-save">Сохранить изменения</a>
					</form>
				</div>
			</div>
		</div>
	</div>
	</div>
<?include "footer.php";?>