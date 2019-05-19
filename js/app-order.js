
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
                errorCoupon: "",
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
            @onChangeQuantity="changeQuantity"\
            @onRemoveItem="removeItem"\
            :orders="orders"\
          ></v-order-list>\
          <v-totals\
            @onChangeCoupon="changeCoupon"\
            @onUpdateOrder="updateOrder"\
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
            this.orders.filter(function(v) {return v.id === id})[0].quantity = quantity;
        },
        removeItem: function (id) {
            var self = this,
                index = self.orders.map(function(v) {return v.id}).indexOf(id);
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
                      alert("Не удалось удалить товар из корзины");
                  }
                },
                error: function(){
                    self.orders[index].visible = true;
                    alert("Не удалось удалить товар из корзины");
                }
            });
        },
        changeCoupon: function (coupon) {
            this.couponFields.coupon = coupon.coupon;
            this.couponFields.successCoupon = coupon.successCoupon;
            this.couponFields.errorCoupon = coupon.errorCoupon;
        },
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
                                    value = (value < 1) ? 1 : value;
                                    value = (value > this.maxCount) ? this.maxCount : value;
                                    this.onChangeQuantity(this.id, value);
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
                _couponFields: Object,
            },
            data: function () {
                return {
                    validInput: true,
                    ajaxCoupon: false,
                    coupon: this._couponFields.coupon,
                    successCoupon: this._couponFields.successCoupon,
                    errorCoupon: this._couponFields.errorCoupon,
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
                  <div class="coupon-info">\
                    <div v-if="successCoupon" class="coupon-success">\
                        <p><b>{{successCoupon}}</b> - купон применён</p>\
                        <a href="#" class="dashed" @click.prevent="removeSuccessCoupon">Удалить</a>\
                    </div>\
                    <div v-if="errorCoupon" class="coupon-error">\
                        <p><b>{{errorCoupon}}</b> - купон не найден</p>\
                        <a href="#" class="dashed" @click.prevent="removeErrorCoupon">Удалить</a>\
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
                changeCoupon: function (coupon) {
                    this.coupon = coupon.coupon;
                    this.successCoupon = coupon.successCoupon;
                    this.errorCoupon = coupon.errorCoupon;
                    this.$emit('onChangeCoupon', coupon);
                },
                sendCoupon: function () {
                    var self = this;
                    if(self.coupon && !self.ajaxCoupon){
                        self.ajaxCoupon = true;
                        $.ajax({
                            type: "post",
                            url: "../send/addCoupon.php",
                            data: {coupon: self.coupon},
                            success: function(response){
                                if(response){
                                    var data = JSON.parse(response);
                                    self.changeCoupon({
                                        coupon: "",
                                        successCoupon: self.coupon,
                                        errorCoupon: ""
                                    });
                                    if(data.items){
                                        self.updateOrder(data.items);
                                    }
                                }else{
                                    self.changeCoupon({
                                        coupon: "",
                                        successCoupon: self.successCoupon,
                                        errorCoupon: self.coupon
                                    });
                                }
                            },
                            error: function(){},
                            complete: function(){
                                self.ajaxCoupon = false;
                            },
                        });
                    }else{
                        self.validInput = false;
                    }
                },
                removeSuccessCoupon: function () {
                    // var self = this;
                    // $.ajax({
                    //     type: "post",
                    //     url: "../send/removeCoupon.php",
                    //     data: {coupon: self.successCoupon},
                    //     success: function(response){
                    //         if(response){
                    //             var data = JSON.parse(response);
                    //             //активировать купон
                    //             self.changeCoupon({
                    //                 coupon: "",
                    //                 successCoupon: "",
                    //                 errorCoupon: self.errorCoupon,
                    //             });
                    //             //обновить позиции
                    //             if(data.items){
                    //                 self.updateOrder(data.items);
                    //             }
                    //         }else{

                    //         }
                    //     },
                    //     error: function(){}
                    // });
                },
                removeErrorCoupon: function () {
                    // var self = this;
                    // $.ajax({
                    //     type: "post",
                    //     url: "../send/removeCoupon.php",
                    //     data: {coupon: self.errorCoupon},
                    //     success: function(response){
                    //         if(response){
                    //             var data = JSON.parse(response);
                    //             //активировать купон
                    //             self.changeCoupon({
                    //                 coupon: "",
                    //                 successCoupon: self.successCoupon,
                    //                 errorCoupon: "",
                    //             });
                    //             //обновить позиции
                    //             if(data.items){
                    //                 self.updateOrder(data.items);
                    //             }
                    //         }else{

                    //         }
                    //     },
                    //     error: function(){}
                    // });
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
