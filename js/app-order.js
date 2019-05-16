
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Vue.component('', {
//     data: function () {
//         return {
          
//         }
//     },
//     template: '<div></div>',
// });

// =======Оформление заказа========

Vue.component('v-order',{
    data: function () {
        return {
            orders: [],
            totals: {
                coupon: '',
                successCoupon: false,
            },
        }
    },
    mounted: function () {
      var _this = this;
        $.ajax({
            type: "get",
            url: "../getOrderList.php",
            success: function(response){
              var data = JSON.parse(response);
              _this.orders = data;
            },
            error: function(){
                
            }
        });
    },
    template: '\
      <div>\
        <v-order-list\
          @onChangeQuantity="changeQuantity(id, quantity)"\
          :_orders="orders"\
        >\
        </v-order-list>\
        <div class="b-order-totals">\
          <div class="b-price-string b-price-raw clearfix">\
            <span class="explanation">Стоимость заказа:</span>\
            <div class="b-price-total has-discount">\
              <div class="price-base">{{ rawBase }}<span class="icon-ruble"></span></div>\
              <div class="price-total">{{ rawTotal }}<span class="icon-ruble"></span></div>\
            </div>\
          </div>\
          <div class="b-order-coupon">\
            <div class="b-input">\
              <p>Купон</p>\
              <input type="text" name="coupon" placeholder="HFJDY61HQ">\
            </div>\
            <a href="#" class="b-btn">Применить</a>\
          </div>\
          <div class="b-price-string clearfix">\
            <span class="explanation">Размер скидки:</span>\
            <div class="price-total">{{ discount }}<span class="icon-ruble"></span></div>\
          </div>\
          <div class="b-price-string clearfix">\
            <span class="explanation">Стоимость доставки:</span>\
            <div class="price-total">{{ delivery }}<span class="icon-ruble"></span></div>\
          </div>\
          <div class="b-price-string price-final">\
            <span class="explanation">Итого:</span>\
            <div class="price-total">{{ total }}<span class="icon-ruble"></span></div>\
          </div>\
        </div>\
      </div>\
    ',
    methods: {
        changeQuantity: function (id, quantity) {
            this.orders.filter(function(v) {return v.id === id})[0].quantity = quantity;
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
          return 0;
        },
        discount: function () {
          return 0;
        },
        delivery: function () {
          return 0;
        },
        total: function () {
          return 0;
        },
    },
    components: {
        //Список позиций заказа
        'v-order-list': {
            props: ['_orders'],
            data: function () {
                return {
                    //orders: this._orders,
                }
            },
            template: '\
            <div class="b-order-list">\
                <v-order-item\
                    @onRemoveItem="removeItem(order.id)"\
                    :id="order.id"\
                    :image="order.image"\
                    :name="order.name"\
                    :url="order.url"\
                    :quantity="order.quantity"\
                    :basePriceForOne="order.basePrice"\
                    :totalPriceForOne="order.totalPrice"\
                    :maxCount="order.maxCount"\
                    :key="order.id" v-for="order in _orders">\
                </v-order-item>\
            </div>',
            methods: {
                removeItem: function (id) {
                    //!!!
                    //Добавить удаление позиции на сервере
                    //!!!
                    var index = this._orders.findIndex(function(v) {return v.id === id});
                    this._orders.splice(index, 1);
                }
            },
            components: {
                //Позиция заказа
                'v-order-item': {
                    props:{
                        id: Number,
                        image: String,
                        name: String,
                        url: String,
                        quantity: Number,
                        basePriceForOne: Number,
                        totalPriceForOne: Number,
                        maxCount: Number,
                    },
                    data: function () {
                        return {
                            // id: this._id,
                            // image: this._image,
                            // name: this._name,
                            // url: this._url,
                            // quantity: this._quantity,
                            // basePriceForOne: this._basePrice,
                            // totalPriceForOne: this._totalPrice,
                            // maxCount: this._maxCount,
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
                                }
                                onChangeQuantity(this.id, this.quantity);
                                //value = value.replace(/\D+/g,"");
                            }
                        },
                        basePrice: function () {
                          console.log(this.basePriceForOne);
                           return this.basePriceForOne * this.quantity;
                        },
                        totalPrice: function () {
                           return this.totalPriceForOne * this.quantity;
                        },
                    },
                    template: '\
                    <div class="b-order-item">\
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
                            <div class="price-base">{{ basePrice }}<span class="icon-ruble"></span></div>\
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
        }
    }
});

var app = new Vue({
    el: '#app-order',
    data: {
        // totals: {
        //     prices: {
        //         rawBase: 0,
        //         rawTotal: 0,
        //         discount: 0,
        //         delivery: 0,
        //         total: 0,
        //     },
        //     coupon: '',
        //     successCoupon: false,
        // },
        
    },
    // computed: {
    //     rawBase: function () {
    //       return 0;
    //     },
    //     rawTotal: function () {
    //       return 0;
    //     },
    //     discount: function () {
    //       return 0;
    //     },
    //     delivery: function () {
    //       return 0;
    //     },
    //     total: function () {
    //       return 0;
    //     },
    // }
    mounted: function () {
        // axios
        //     .get('../getOrderList.php')
        //     .then( response => {
        //         this.orders = response.data;
        //     }).catch( error => {
        //         console.log(error);
        //     })
        // this.$http.get("../getOrderList.php").then(response => {
        //     this.orders = response.data;
        // }, error => {
        //     console.log(error);
        // });
        // var _this = this;
        // $.ajax({
        //     type: "get",
        //     url: "../getOrderList.php",
        //     success: function(response){
        //       var data = JSON.parse(response);
        //       _this.orders = data;
        //     },
        //     error: function(){
                
        //     }
        // });
    }
});

// ================================