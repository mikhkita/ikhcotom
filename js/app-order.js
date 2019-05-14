
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Vue.component('', {
//     data: function () {
//         return {
          
//         }
//     },
//     template: '',
// });

// =======Оформление заказа========

//Список позиций заказа
Vue.component('v-order-list', {
    props:['_orders'],
    data: function () {
        return {
            orders: this._orders
        }
    },
    template: '\
    <div class="b-order-list">\
        <v-order-item\
            @onRemoveItem="removeItem(order.id)"\
            :_id="order.id"\
            :_image="order.image"\
            :_name="order.name"\
            :_url="order.url"\
            :_quantity="order.quantity"\
            :_basePrice="order.basePrice"\
            :_totalPrice="order.totalPrice"\
            :_maxCount="order.maxCount"\
            :key="order.id" v-for="order in orders">\
        </v-order-item>\
    </div>',
    methods: {
        removeItem: function (id) {
            //!!!
            //Добавить удаление позиции на сервере
            //!!!
            var index = this.orders.findIndex(function(v) {return v.id === id});
            this.orders.splice(index, 1);
        }
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
                _basePrice: Number,
                _totalPrice: Number,
                _maxCount: Number,
            },
            data: function () {
                return {
                    id: this._id,
                    image: this._image,
                    name: this._name,
                    url: this._url,
                    quantity: this._quantity,
                    basePriceForOne: this._basePrice,
                    totalPriceForOne: this._totalPrice,
                    maxCount: this._maxCount,
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
                }
                // quantityValidate: function () {
                //     //this.quantity = this.quantity.replace(/\D/g, '');
                //     console.log("before || "+this.quantity);
                //     this.quantity = (this.quantity < 1)? 1 : this.quantity;
                //     this.quantity = (this.quantity > this.maxCount) ? this.maxCount : this.quantity;
                //     console.log("after || "+this.quantity);
                // }
            }
        }
    }
});

//Блок с итоговой ценой
Vue.component('v-totals', {
    data: function () {
        return {
            prices: {
                rawBase: 0,
                rawTotal: 0,
                discount: 0,
                delivery: 0,
                total: 0,
            },
            coupon: '',
            successCoupon: false,
        }
    },
    template: '\
    <div class="b-order-totals">\
        <div class="b-price-string b-price-raw clearfix">\
            <span class="explanation">Стоимость заказа:</span>\
            <div class="b-price-total has-discount">\
                <div class="price-base">22 300<span class="icon-ruble"></span></div>\
                <div class="price-total">20 590<span class="icon-ruble"></span></div>\
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
            <div class="price-total">1 710<span class="icon-ruble"></span></div>\
        </div>\
        <div class="b-price-string clearfix">\
            <span class="explanation">Стоимость доставки:</span>\
            <div class="price-total">350<span class="icon-ruble"></span></div>\
        </div>\
        <div class="b-price-string price-final">\
            <span class="explanation">Итого:</span>\
            <div class="price-total">20 940<span class="icon-ruble"></span></div>\
        </div>\
    </div>',
});

var app = new Vue({
  el: '#app-order',
  data: {
    
  }
});

// ================================