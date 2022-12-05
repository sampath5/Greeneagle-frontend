export const Constants = {
    "endPoint": {
        "user": {
            "signup": "https://eaglestore-server.herokuapp.com/signup",
            "login": "https://eaglestore-server.herokuapp.com/login",
            // "updateUser": "https://eaglestore-server.herokuapp.com/admin/updatedetails",
            "getUserDetails": "https://eaglestore-server.herokuapp.com/getuserdetails",
            "getProducts":"https://eaglestore-server.herokuapp.com/",
            "getProductById":"https://eaglestore-server.herokuapp.com/product/",
            "addToCart":"https://eaglestore-server.herokuapp.com/cart/inc/",
            "removeFromCart":"https://eaglestore-server.herokuapp.com/cart/dec/",
            "removeProductFromCart":"https://eaglestore-server.herokuapp.com/cart/remove/",            
            "addToWishList":"https://eaglestore-server.herokuapp.com/addTowishlist/",         
            "viewWishList":"https://eaglestore-server.herokuapp.com/wishlist/getAll/",       
            "removeFromWishList":"https://eaglestore-server.herokuapp.com/wishlist/remove/",
            "updatedetails":"https://eaglestore-server.herokuapp.com/updatedetails",
            "getCartList":"https://eaglestore-server.herokuapp.com/cart/getAll",
            "getCartCount":"https://eaglestore-server.herokuapp.com/cart/count",            
            "getUserAddresses":"https://eaglestore-server.herokuapp.com/address/getAll",            
            "addAddress":"https://eaglestore-server.herokuapp.com/address/update",            
            "payment":"https://eaglestore-server.herokuapp.com/pay/",
            "paypalSuccess":"https://eaglestore-server.herokuapp.com/paypal/success",
            "getorders":"https://eaglestore-server.herokuapp.com/getorders",
            "cancelOrder":"https://eaglestore-server.herokuapp.com/cancelorder",
            "viewUserTransactions":"https://eaglestore-server.herokuapp.com/userTransactions"
        },
        "admin": {
            "getUsersList": "https://eaglestore-server.herokuapp.com/admin/getusers",
            "addProduct": "https://eaglestore-server.herokuapp.com/admin/addProduct",
            "getAllProducts": "https://eaglestore-server.herokuapp.com/admin/getproducts",
            "getProductById": "https://eaglestore-server.herokuapp.com/admin/getproduct/",
            "activateProduct":"https://eaglestore-server.herokuapp.com/admin/activateProduct/",
            "inActivateProduct":"https://eaglestore-server.herokuapp.com/admin/inActivateProduct/",
            "getOrdersByUserId":"https://eaglestore-server.herokuapp.com/admin/getOrders/",
            "viewUserTransactions":"https://eaglestore-server.herokuapp.com/admin/userTransactions/",
            "inActivateUser":"https://eaglestore-server.herokuapp.com/admin/inActivateUser/",
            "activateUser":"https://eaglestore-server.herokuapp.com/admin/activateUser/"
        }
    }
}