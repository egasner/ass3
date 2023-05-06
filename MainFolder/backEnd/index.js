const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Product = require("./dataSchema.js");


app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));


mongoose.connect("mongodb://127.0.0.1:27017/reactdata", {
    dbName: "reactdata",
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const port = process.env.PORT || 4000;
const host = "localhost";

app.get("/", async (req, resp) => {
    const query = {};
    const allProducts = await Product.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.post("/insert", async (req, res) => {
    console.log(req.body);
    const p_id = req.body._id;
    const ptitle = req.body.title;
    const ppoints = req.body.points;
    const pquestion = req.body.question;
    const panswer = req.body.answer;
    const pimage = req.body.image;
    const formData = new Product({
        _id: p_id,
        title: ptitle,
        points: ppoints,
        question: pquestion,
        answer: panswer,
        image: pimage,
    });
    try {
        // await formData.save();
        await Product.create(formData);
        const messageResponse = { message: `Product ${p_id} added correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});

app.post("/update", async (req, res) => {
    console.log(req.body);
    const panswer = req.body.answer;
    const pquestion = req.body.question
    const p_id = req.body._id;
    const ppoints = req.body.points;

    try{
        await Product.updateOne({ _id: p_id}, {
            points: ppoints,
            question: pquestion,
            answer: panswer,
        });
        const messageResponse = { message: `product ${p_id} updated correctly`};
        res.send(JSON.stringify(messageResponse));
    } catch (err){
        console.log("error while updating a product:" + p_id + " " + err);
    }
    
});

app.delete("/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { _id: req.body._id };
        await Product.deleteOne(query);
        const messageResponse = {
            message: `Product ${req.body._id} deleted correctly`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + p_id + " " + err);
    }
});

app.get("/:id", async (req, resp) => {
    const id = req.params.id;
    const query = { _id: id };
    const oneProduct = await Product.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});



app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});