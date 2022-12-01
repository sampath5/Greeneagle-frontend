export const Constants = {
    "endPoint": {
        "user": {
            "signup": "http://localhost:8080/signup",
            "login": "http://localhost:8080/login",
            // "updateUser": "http://localhost:8080/admin/updatedetails",
            "getUserDetails": "http://localhost:8080/getuserdetails",
            "getProducts":"http://localhost:8080/",
            "getProductById":"http://localhost:8080/product/",
            "addToCart":"http://localhost:8080/cart/inc/",
            "removeFromCart":"http://localhost:8080/cart/dec/",
            "removeProductFromCart":"http://localhost:8080/cart/remove/",            
            "addToWishList":"http://localhost:8080/addTowishlist/",         
            "viewWishList":"http://localhost:8080/wishlist/getAll/",       
            "removeFromWishList":"http://localhost:8080/wishlist/remove/",
            "updatedetails":"http://localhost:8080/updatedetails",
            "getCartList":"http://localhost:8080/cart/getAll",
            "getCartCount":"http://localhost:8080/cart/count",            
            "getUserAddresses":"http://localhost:8080/address/getAll",            
            "addAddress":"http://localhost:8080/address/update",            
            "payment":"http://localhost:8080/pay/",
            "paypalSuccess":"http://localhost:8080/paypal/success",
            "getorders":"http://localhost:8080/getorders",
            "cancelOrder":"http://localhost:8080/cancelorder"
        },
        "admin": {
            "getUsersList": "http://localhost:8080/admin/getusers",
            "addProduct": "http://localhost:8080/admin/addProduct",
            "getAllProducts": "http://localhost:8080/admin/getproducts",
            "getProductById": "http://localhost:8080/admin/getproduct/",
            "activateProduct":"http://localhost:8080/admin/activateProduct/",
            "inActivateProduct":"http://localhost:8080/admin/inActivateProduct/",
            "getOrdersByUserId":"http://localhost:8080/admin/getOrders/"
        }
    }
}