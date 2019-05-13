// =======Оформление заказа========

// Vue.component('', {
//     data: function () {
//         return {
          
//         }
//     },
//     template: '',
// });

//Список позиций заказа
Vue.component('v-order-list', {
    data: function () {
        return {

        }
    },
    props:['orders'],
    template: '\
    <div class="b-order-list">\
        <v-order-item :order="order" :key="order.id" v-for="order in orders"></v-order-item>\
    </div>',
});

//Позиция заказа
Vue.component('v-order-item', {
    data: function () {
        return {
          
        }
    },
    props:['order'],
    template: '\
    <div class="b-order-item">\
        <a href="order.url"><img :src="order.image"></a>\
        <div class="b-order-item-name">\
            <a href="order.url">{{order.name}}</a>\
        </div>\
        <div class="product-quantity">\
            <a href="#" class="icon-minus quantity-reduce"></a>\
            <input type="text" name="count" class="quantity-input" maxlength="3" :value="order.quantity">\
            <a href="#" class="icon-plus quantity-add"></a>\
        </div>\
        <div class="b-order-item-price has-discount">\
            <div class="price-base">{{order.basePrice}}<span class="icon-ruble"></span></div>\
            <div class="price-total">{{order.totalPrice}}<span class="icon-ruble"></span></div>\
        </div>\
        <a href="#" class="control-delete icon-star">11</a>\
        <a href="#" class="control-favorite icon-close">22</a>\
    </div>',
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
    props:[],
    template: '',
});

var app = new Vue({
  el: '#app-order',
  data: {
    
  }
});

// ================================