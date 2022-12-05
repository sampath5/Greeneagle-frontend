export const Constants = {
    "endPoint": {
        "user": {
            "signup": "https://eaglestore-frontend.herokuapp.com/signup",
            "login": "https://eaglestore-frontend.herokuapp.com/login",
            // "updateUser": "https://eaglestore-frontend.herokuapp.com/admin/updatedetails",
            "getUserDetails": "https://eaglestore-frontend.herokuapp.com/getuserdetails",
            "getProducts":"https://eaglestore-frontend.herokuapp.com/",
            "getProductById":"https://eaglestore-frontend.herokuapp.com/product/",
            "addToCart":"https://eaglestore-frontend.herokuapp.com/cart/inc/",
            "removeFromCart":"https://eaglestore-frontend.herokuapp.com/cart/dec/",
            "removeProductFromCart":"https://eaglestore-frontend.herokuapp.com/cart/remove/",            
            "addToWishList":"https://eaglestore-frontend.herokuapp.com/addTowishlist/",         
            "viewWishList":"https://eaglestore-frontend.herokuapp.com/wishlist/getAll/",       
            "removeFromWishList":"https://eaglestore-frontend.herokuapp.com/wishlist/remove/",
            "updatedetails":"https://eaglestore-frontend.herokuapp.com/updatedetails",
            "getCartList":"https://eaglestore-frontend.herokuapp.com/cart/getAll",
            "getCartCount":"https://eaglestore-frontend.herokuapp.com/cart/count",            
            "getUserAddresses":"https://eaglestore-frontend.herokuapp.com/address/getAll",            
            "addAddress":"https://eaglestore-frontend.herokuapp.com/address/update",            
            "payment":"https://eaglestore-frontend.herokuapp.com/pay/",
            "paypalSuccess":"https://eaglestore-frontend.herokuapp.com/paypal/success",
            "getorders":"https://eaglestore-frontend.herokuapp.com/getorders",
            "cancelOrder":"https://eaglestore-frontend.herokuapp.com/cancelorder",
            "viewUserTransactions":"https://eaglestore-frontend.herokuapp.com/userTransactions"
        },
        "admin": {
            "getUsersList": "https://eaglestore-frontend.herokuapp.com/admin/getusers",
            "addProduct": "https://eaglestore-frontend.herokuapp.com/admin/addProduct",
            "getAllProducts": "https://eaglestore-frontend.herokuapp.com/admin/getproducts",
            "getProductById": "https://eaglestore-frontend.herokuapp.com/admin/getproduct/",
            "activateProduct":"https://eaglestore-frontend.herokuapp.com/admin/activateProduct/",
            "inActivateProduct":"https://eaglestore-frontend.herokuapp.com/admin/inActivateProduct/",
            "getOrdersByUserId":"https://eaglestore-frontend.herokuapp.com/admin/getOrders/",
            "viewUserTransactions":"https://eaglestore-frontend.herokuapp.com/admin/userTransactions/"
        }
    }
}