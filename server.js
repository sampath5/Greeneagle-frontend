const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/mdb-angular-ui-kit-free'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/mdb-angular-ui-kit-free/index.html'));});
app.listen(process.env.PORT || 4500);