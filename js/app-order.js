
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// ===== Дерево компонентов =====

// v-order
//   |--v-order-list
//      |--v-order-item
//   |--v-totals

// ==============================

Vue.component('v-order',{
    data: function () {
        return {
            orders: [],
            show: false,
            showCatalogRef: false,
            showPreloader: true,
            couponList: [],
            form: {
                name: "",
                phone: "",
                email: "",
                delivery: [
                    // {
                    //     name: "Почта России",
                    //     cost: 350
                    // }
                ],
                pay: [],
                address: "",
                comment: "",
            },
            delayAjax: 200,
            countQueue: 0
        }
    },
    mounted: function () {
      var self = this;
      //setTimeout(function() { 
        $.ajax({
            type: "get",
            url: "../send/getOrderList.php",
            success: function(response){
              if(response){
                var data = JSON.parse(response);
                if(data.items){
                    self.orders = data.items;
                    self.show = true;
                    self.showPreloader = false;
                }
                if(data.coupons){
                    data.coupons.forEach(function(item, i, arr) {
                        self.couponList.push({value: item.name, success: item.success});
                    });
                }
              }
            },
            error: function(){}
        });
      //}, 1000);
        
    },
    template: '\
    <div>\
        <div v-if="show" class="b-order">\
            <div class="b-order-left">\
                <v-order-list \
                    @onChangeQuantity="changeQuantity"\
                    @onRemoveItem="removeItem"\
                    :orders="orders"\
                ></v-order-list>\
                <form class="b-order-form" method="post" action="">\
                    <h3>Данные к заказу</h3>\
                    <div class="b-inputs-3 clearfix">\
                        <div class="b-input">\
                            <p>Ф.И.О.</p>\
                            <input type="text" name="name" placeholder="Как вас зовут?">\
                        </div>\
                        <div class="b-input">\
                            <p>Номер телефона</p>\
                            <input type="text" name="phone" placeholder="+7 (999) 999 0000">\
                        </div>\
                        <div class="b-input">\
                            <p>Электронная почта</p>\
                            <input type="text" name="email" placeholder="example@yandex.ru">\
                        </div>\
                    </div>\
                    <div class="b-choice clearfix">\
                      <div class="b-delivery">\
                        <h4>Способ доставки</h4>\
                        <ul class="b-radio">\
                            <li>\
                                <input id="label-post" type="radio" name="delivery" value="post">\
                                <label for="label-post">Почта России</label>\
                            </li>\
                            <li>\
                                <input id="label-SDEC" type="radio" name="delivery" value="SDEC">\
                                <label for="label-SDEC">СДЭК</label>\
                            </li>\
                            <li>\
                                <input id="label-courier" type="radio" name="delivery" value="courier">\
                                <label for="label-courier">Курьер по Томску</label>\
                            </li>\
                            <li>\
                                <input id="label-pickup" type="radio" name="delivery" value="pickup">\
                                <label for="label-pickup">Самовывоз из офиса</label>\
                            </li>\
                        </ul>\
                        <ul class="b-delivery-tabs">\
                            <li>\
                                1. Без объявленной ценности. Если хотите ценную посылку, пишите в примечании к заказу, какую ценность указать, и мы пересчитаем доставку.\
                            </li>\
                            <li>\
                                2. Без объявленной ценности. Если хотите ценную посылку, пишите в примечании к заказу, какую ценность указать, и мы пересчитаем доставку.\
                            </li>\
                            <li>\
                                3. Без объявленной ценности. Если хотите ценную посылку, пишите в примечании к заказу, какую ценность указать, и мы пересчитаем доставку.\
                            </li>\
                            <li>\
                                4. Без объявленной ценности. Если хотите ценную посылку, пишите в примечании к заказу, какую ценность указать, и мы пересчитаем доставку.\
                            </li>\
                        </ul>\
                      </div>\
                      <div class="b-pay">\
                        <h4>Способ оплаты</h4>\
                        <ul class="b-radio">\
                            <li>\
                                <input id="label-online" type="radio" name="pay" value="online">\
                                <label for="label-online">Онлайн-оплата картой</label>\
                            </li>\
                            <li>\
                                <input id="label-sber" type="radio" name="pay" value="sber">\
                                <label for="label-sber">Сбербанк.Онлайн</label>\
                            </li>\
                        </ul>\
                      </div>\
                    </div>\
                    <div class="b-order-form-bottom">\
                        <div class="b-input">\
                            <p>Адрес доставки</p>\
                            <input type="text" name="address" placeholder="Введите адрес">\
                        </div>\
                        <div class="b-textarea">\
                            <p>Комментарий к заказу</p>\
                            <textarea rows="1" name="comment" placeholder="Введите комментарий"></textarea>\
                        </div>\
                    </div>\
                    <a href="#" class="b-btn">Оформить заказ</a>\
                </form>\
            </div>\
            <v-totals\
                @onUpdateOrder="updateOrder"\
                :_rawBase="rawBase"\
                :_rawTotal="rawTotal"\
                :_discount="discount"\
                :_delivery="delivery"\
                :_total="total"\
                :_couponList="couponList"\
            ></v-totals>\
        </div>\
        \
        <div v-if="showCatalogRef">\
          <span>Ваша корзина пуста. </span><a class="dashed" href="catalog.html">Перейти в каталог</a>\
        </div>\
        \
        <div v-if="showPreloader" class="b-order-preloader">\
          <img src="../i/preloader.svg">\
        </div>\
    </div>\
    ',
    methods: {
        changeQuantity: function (id, quantity) {
            var self = this;
            self.orders.filter(function(v) {return v.id === id})[0].quantity = quantity;
            //setTimeout(function () {
                self.countQueue++;
                $.ajax({
                    type: "get",
                    url: "../send/changeQuantity.php",
                    data: {"id": id, "quantity": quantity},
                    success: function(response){
                      if(response){
                        var data = JSON.parse(response);
                        self.countQueue--;
                        if(self.countQueue == 0){
                            self.orders.filter(function(v) {return v.id === data.id})[0].quantity = data.quantity;
                        }
                      }else{
                        alert("Ошибка изменения количеста, пожалуйста, обновите страницу");
                      }
                    },
                    error: function(){
                        self.countQueue--;
                    }
                });
            //}, self.delayAjax);
        },
        removeItem: function (id) {
            var self = this,
                index = self.orders.map(function(v) {return v.id}).indexOf(id);
            self.orders[index].visible = false;//скрыть элемент
            $.ajax({
                type: "get",
                url: "../send/removeItem.php",
                data: {"id": id},
                success: function(response){
                  if(response){
                      self.orders.splice(index, 1);
                      if(self.orders.length === 0){//остались ли ещё товары
                          self.show = false;
                          self.showCatalogRef = true;
                      }
                  }else{
                      self.orders[index].visible = true;//вернуть элемент
                      alert("Не удалось удалить товар из корзины");
                  }
                },
                error: function(){
                    self.orders[index].visible = true;
                    alert("Не удалось удалить товар из корзины");
                }
            });
        },
        // addCoupon: function (coupon) {
        //     this.couponList.push(coupon);
        // },
        // removeCoupon: function (index) {
        //     this.couponList.splice(index, 1);
        // },
        updateOrder: function (orders) {
            this.orders = orders;
        },
    },
    computed: {
        rawBase: function () {
            var res = 0;
            this.orders.forEach(function(item, i, arr) {
                res += item.basePriceForOne * item.quantity;
            });
            return res;
        },
        rawTotal: function () {
            var res = 0;
            this.orders.forEach(function(item, i, arr) {
                res += item.totalPriceForOne * item.quantity;
            });
            return res;
        },
        discount: function () {
            var res = this.rawBase - this.rawTotal;
            return (res > 0) ? res : 0;
        },
        delivery: function () {
            return 350;
        },
        total: function () {
            return this.rawTotal + this.delivery;
        },
    },
    components: {
        //Список позиций заказа
        'v-order-list': {
            props: ['orders'],
            data: function () {
                return {

                }
            },
            template: '\
            <div class="b-order-list">\
                <v-order-item\
                    @onRemoveItem="removeItem"\
                    @onChangeQuantity="changeQuantity"\
                    :_id="order.id"\
                    :_image="order.image"\
                    :_name="order.name"\
                    :_url="order.url"\
                    :_quantity="order.quantity"\
                    :_basePriceForOne="order.basePriceForOne"\
                    :_totalPriceForOne="order.totalPriceForOne"\
                    :_maxCount="order.maxCount"\
                    :key="order.id" v-for="order in orders">\
                </v-order-item>\
            </div>',
            methods: {
                removeItem: function (id) {
                    this.$emit('onRemoveItem', id);
                },
                changeQuantity: function (id, quantity) {
                    this.$emit('onChangeQuantity', id, quantity);
                },
            },
            components: {
                //Позиция заказа
                'v-order-item': {
                    props:{
                        _id: Number,
                        _image: String,
                        _name: String,
                        _url: String,
                        _quantity: Number,
                        _basePriceForOne: Number,
                        _totalPriceForOne: Number,
                        _maxCount: Number,
                    },
                    data: function () {
                        return {
                            visible: true,
                            favorite: false
                        }
                    },
                    computed: {
                        id: function () {
                           return this._id;
                        },
                        image: function () {
                           return this._image;
                        },
                        name: function () {
                           return this._name;
                        },
                        url: function () {
                           return this._url;
                        },
                        quantity: {
                            get: function () {
                                return this._quantity;
                            },
                            set: function (value) {
                                if(isNumeric(value)){
                                    if(value > 0 && value <= this.maxCount){
                                       this.onChangeQuantity(this.id, value); 
                                    }
                                    value = (value < 1) ? 1 : value;
                                    value = (value > this.maxCount) ? this.maxCount : value;
                                }
                                //value = value.replace(/\D+/g,"");
                            }
                        },
                        basePrice: function () {
                           return this._basePriceForOne * this.quantity;
                        },
                        totalPrice: function () {
                           return this._totalPriceForOne * this.quantity;
                        },
                        maxCount: function () {
                           return this._maxCount;
                        },
                    },
                    template: '\
                    <div class="b-order-item" v-show="visible">\
                        <a :href="url" class="item-field b-order-item-img">\
                            <img :src="image">\
                        </a>\
                        <a :href="url" class="item-field b-order-item-name">\
                            <p>{{ name }}</p>\
                        </a>\
                        <div class="item-field b-order-item-quantity">\
                            <div class="product-quantity">\
                                <a href="#" @click.prevent="quantityReduce" class="icon-minus quantity-reduce"></a>\
                                <input v-model.number="quantity" type="text" name="quantity" class="quantity-input" maxlength="3">\
                                <a href="#" @click.prevent="quantityAdd" class="icon-plus quantity-add"></a>\
                            </div>\
                        </div>\
                        <div class="item-field b-order-item-price has-discount">\
                            <div v-show="basePrice != totalPrice" class="price-base">{{ basePrice }}<span class="icon-ruble"></span></div>\
                            <div class="price-total">{{ totalPrice }}<span class="icon-ruble"></span></div>\
                        </div>\
                        <div class="item-field b-order-item-controls">\
                            <div \
                                @click.prevent="favoriteToggle" \
                                :class="{active: favorite}" \
                                class="control-favorite"\
                            >\
                                <div class="icon-star-order"></div>\
                                <div class="icon-star-order-fill"></div>\
                            </div>\
                            <a href="#" \
                                @click.prevent="onRemoveItem" \
                                class="control-delete icon-close"\
                            ></a>\
                        </div>\
                    </div>',
                    methods: {
                        quantityReduce: function () {
                            this.quantity--;
                        },
                        quantityAdd: function () {
                            this.quantity++;
                        },
                        favoriteToggle: function () {
                            this.favorite = !this.favorite;
                        },
                        onRemoveItem: function () {
                            this.$emit('onRemoveItem', this.id);
                        },
                        onChangeQuantity: function (id, value) {
                            this.$emit('onChangeQuantity', id, value);
                        } 
                    }
                }
            }
        },
        //блок с итоговой ценой
        'v-totals': {
            props: {
                _rawBase: Number,
                _rawTotal: Number,
                _discount: Number,
                _delivery: Number,
                _total: Number,
                _couponList: Array,
            },
            data: function () {
                return {
                    coupon: "",
                    validInput: true,
                    ajaxCoupon: false,
                    couponList: this._couponList,
                }
            },
            template: '\
              <div class="b-order-totals">\
                <div class="b-price-string b-price-raw clearfix">\
                  <span class="explanation">Стоимость заказа:</span>\
                  <div class="b-price-total has-discount">\
                    <div v-show="_rawBase != _rawTotal" class="price-base">{{ _rawBase }}<span class="icon-ruble"></span></div>\
                    <div class="price-total">{{ _rawTotal }}<span class="icon-ruble"></span></div>\
                  </div>\
                </div>\
                <div class="b-order-coupon">\
                  <div class="b-input">\
                    <p>Купон</p>\
                    <input\
                        @keyup.enter="sendCoupon"\
                        @input="validInput = true"\
                        v-model="coupon"\
                        :class="{error: !validInput}"\
                        type="text"\
                        name="coupon"\
                        placeholder="HFJDY61HQ"\
                    >\
                  </div>\
                  <a href="#" class="b-btn" @click.prevent="sendCoupon">Применить</a>\
                  <div class="coupon-list">\
                    <div class="coupon-item"\
                        v-for="coupon in couponList"\
                        :class="{\'coupon-success\': coupon.success, \'coupon-error\': !coupon.success}"\
                    >\
                        <p><b>{{ coupon.value }}</b> - {{ (coupon.success) ? "купон применён" : "купон не найден" }}</p>\
                        <a href="#" class="dashed" @click.prevent="removeCoupon(coupon.value)">Удалить</a>\
                    </div>\
                  </div>\
                </div>\
                <div v-show="_discount > 0" class="b-price-string clearfix">\
                  <span class="explanation">Размер скидки:</span>\
                  <div class="price-total">{{ _discount }}<span class="icon-ruble"></span></div>\
                </div>\
                <div class="b-price-string clearfix">\
                  <span class="explanation">Стоимость доставки:</span>\
                  <div class="price-total">{{ _delivery }}<span class="icon-ruble"></span></div>\
                </div>\
                <div class="b-price-string clearfix price-final">\
                  <span class="explanation">Итого:</span>\
                  <div class="price-total">{{ _total }}<span class="icon-ruble"></span></div>\
                </div>\
              </div>\
            ',
            methods: {
                updateOrder: function (orders) {
                    this.$emit('onUpdateOrder', orders);
                },
                sendCoupon: function () {
                    var self = this;
                    if(self.coupon && !self.ajaxCoupon){
                        self.ajaxCoupon = true;
                        $.ajax({
                            type: "get",
                            url: "../send/addCoupon.php",
                            data: {coupon: self.coupon},
                            success: function(response){
                                var newCoupon;
                                if(response){
                                    var data = JSON.parse(response);
                                    newCoupon = {value: self.coupon, success: true};
                                    self.couponList.push(newCoupon);
                                    if(data.items){
                                        self.updateOrder(data.items);
                                    }
                                }else{
                                    newCoupon = {value: self.coupon, success: false};
                                    self.couponList.push(newCoupon);
                                }
                                //self.$emit('onAddCoupon', newCoupon);
                            },
                            error: function(){},
                            complete: function(){
                                self.coupon = "";
                                self.ajaxCoupon = false;
                            },
                        });
                    }else{
                        self.validInput = false;
                    }
                },
                removeCoupon: function (value) {
                    var self = this;
                    $.ajax({
                        type: "get",
                        url: "../send/removeCoupon.php",
                        data: {coupon: value},
                        success: function(response){
                            if(response){
                                var data = JSON.parse(response),
                                    index = self.couponList.map(function(v) {return v.value}).indexOf(value);
                                self.couponList.splice(index, 1);
                                if(data.items){
                                    self.updateOrder(data.items);
                                }
                                //self.$emit('onRemoveCoupon', index);
                            }else{
                                alert("Произошла ошибка при удалении купона.\nПожалуйста, обновите страницу");
                            }
                        },
                        error: function(){}
                    });
                },
            }
        }
    }
});

var app = new Vue({
    el: '#app-order',
    data: {
        
    },
    mounted: function () {

    }
});
