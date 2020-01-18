const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

app.use(express.static(path.join(__dirname)));
router.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
	//__dirname : It will resolve to your project folder.
});

app.use("/", router);
let port = process.env.port || 3000;
app.listen(port);

console.log("Running at Port " + port);
