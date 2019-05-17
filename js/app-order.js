
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
            couponFields: {
                coupon: "",
                successCoupon: "",
                hasCoupon: false,
            },
        }
    },
    mounted: function () {
      var self = this;
      //setTimeout(function() { 
        $.ajax({
            type: "post",
            url: "../send/getOrderList.php",
            success: function(response){
              if(response){
                var data = JSON.parse(response);
                if(data.items){
                    self.orders = data.items;
                    self.show = true;
                    self.showPreloader = false;
                }
                if(data.coupon){
                    self.couponFields.successCoupon = data.coupon.name;
                    self.couponFields.hasCoupon = data.coupon.success;
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
          <v-order-list \
            @onChangeQuantity="changeCoupon"\
            @onRemoveItem="removeItem"\
            :orders="orders"\
          ></v-order-list>\
          <v-totals\
            @onChangeCoupon="changeCoupon"\
            :_rawBase="rawBase"\
            :_rawTotal="rawTotal"\
            :_discount="discount"\
            :_delivery="delivery"\
            :_total="total"\
            :_couponFields="couponFields"\
          ></v-totals>\
        </div>\
        \
        <div v-if="showCatalogRef">\
          <span>Ваша корзина пуста. </span><a href="catalog.html">Перейти в каталог</a>\
        </div>\
        \
        <div v-if="showPreloader" class="b-order-preloader">\
          <h2>Прелоадер</h2>\
        </div>\
      </div>\
    ',
    methods: {
        changeQuantity: function (id, quantity) {
            this.orders.filter(function(v) {return v.id === id})[0].quantity = quantity;
        },
        removeItem: function (id) {
            var self = this,
                index = self.orders.findIndex(function(v) {return v.id === id});
            self.orders[index].visible = false;//скрыть элемент
            $.ajax({
                type: "post",
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
                      alert("Не удалось удалить товар из козрины");
                  }
                },
                error: function(){
                    self.orders[index].visible = true;
                    alert("Не удалось удалить товар из козрины");
                }
            });
        },
        changeCoupon: function (coupon) {
            this.couponFields.coupon = coupon.coupon;
            this.couponFields.successCoupon = coupon.successCoupon;
            this.couponFields.hasCoupon = coupon.hasCoupon;
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
            return (res >= 0) ? res : 0;
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
                    :_visible="order.visible"\
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
                        _visible: Boolean
                    },
                    data: function () {
                        return {
                            id: this._id,
                            image: this._image,
                            name: this._name,
                            url: this._url,
                            quantity: this._quantity,
                            basePriceForOne: this._basePriceForOne,
                            totalPriceForOne: this._totalPriceForOne,
                            maxCount: this._maxCount,
                            visible: this._visible,
                            favorite: false
                        }
                    },
                    computed: {
                        quantityValidate: {
                            get: function () {
                                return this.quantity;
                            },
                            set: function (value) {
                                if(isNumeric(value)){
                                    value = (value < 1) ? 1 : value;
                                    value = (value > this.maxCount) ? this.maxCount : value;
                                    this.quantity = value;
                                    this.onChangeQuantity(this.id, this.quantity);
                                }
                                //value = value.replace(/\D+/g,"");
                            }
                        },
                        basePrice: function () {
                           return this.basePriceForOne * this.quantity;
                        },
                        totalPrice: function () {
                           return this.totalPriceForOne * this.quantity;
                        },
                    },
                    template: '\
                    <div class="b-order-item" v-show="visible">\
                        <a :href="url">\
                            <img :src="image">\
                        </a>\
                        <a :href="url">\
                            <p class="b-order-item-name">{{ name }}</p>\
                        </a>\
                        <div class="product-quantity">\
                            <a href="#" @click.prevent="quantityReduce" class="icon-minus quantity-reduce"></a>\
                            <input v-model.number="quantityValidate" type="text" name="quantity" class="quantity-input" maxlength="3">\
                            <a href="#" @click.prevent="quantityAdd" class="icon-plus quantity-add"></a>\
                        </div>\
                        <div class="b-order-item-price has-discount">\
                            <div v-show="basePrice != totalPrice" class="price-base">{{ basePrice }}<span class="icon-ruble"></span></div>\
                            <div class="price-total">{{ totalPrice }}<span class="icon-ruble"></span></div>\
                        </div>\
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
                    </div>',
                    methods: {
                        quantityReduce: function () {
                            this.quantityValidate--;
                        },
                        quantityAdd: function () {
                            this.quantityValidate++;
                        },
                        favoriteToggle: function () {
                            this.favorite = !this.favorite;
                        },
                        onRemoveItem: function () {
                            this.$emit('onRemoveItem', this.id);
                        },
                        onChangeQuantity: function () {
                            this.$emit('onChangeQuantity', this.id, this.quantity);
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
                _couponFields: Object,
            },
            data: function () {
                return {
                    coupon: this._couponFields.coupon,
                    successCoupon: this._couponFields.successCoupon,
                    hasCoupon: this._couponFields.hasCoupon,
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
                    <input @keyup.enter="sendCoupon" v-model="coupon" type="text" name="coupon" placeholder="HFJDY61HQ">\
                  </div>\
                  <a href="#" class="b-btn" @click.prevent="sendCoupon">Применить</a>\
                  <div class="coupon-info" v-if="hasCoupon">\
                    <p><b>{{successCoupon}}</b> - купон применён</p>\
                    <a href="#" class="dashed" @click.prevent="removeCoupon">Удалить</a>\
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
                sendCoupon: function () {
                    var self = this;
                    if(self.coupon){
                        $.ajax({
                            type: "post",
                            url: "../send/addCoupon.php",
                            data: {coupon: self.coupon},
                            success: function(response){
                                if(response){
                                    self.changeCoupon({
                                        coupon: "",
                                        successCoupon: self.coupon,
                                        hasCoupon: true
                                    });
                                }else{

                                }
                            },
                            error: function(){}
                        });
                    }
                },
                removeCoupon: function () {
                    var self = this;
                    $.ajax({
                        type: "post",
                        url: "../send/removeCoupon.php",
                        data: {coupon: self.successCoupon},
                        success: function(response){
                            if(response){
                                self.changeCoupon({
                                    coupon: "",
                                    successCoupon: "",
                                    hasCoupon: false
                                });
                            }else{

                            }
                        },
                        error: function(){}
                    });
                },
                changeCoupon: function (coupon) {
                    this.coupon = coupon.coupon;
                    this.successCoupon = coupon.successCoupon;
                    this.hasCoupon = coupon.hasCoupon;
                    this.$emit('onChangeCoupon', coupon);
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
