import { useState, useEffect } from "react";

function App() {
    const [product, setProduct] = useState([]);
    const [oneProduct, setOneProduct] = useState([]);
    const [viewer1, setViewer1] = useState(false);
    const [viewer4, setViewer4] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked6, setChecked6] = useState(false);
    const [index, setIndex] = useState(0);
    const [viewer2, setViewer2] = useState(false);
    const [allProducts, setAllProducts] = useState(false);
    const [seeByID, setSeeByID] = useState(false);
    const [AddProd, setAddProd] = useState(false);
    const [updateProd, setUpdateProd] = useState(false);
    const [deleteProd, setDeleteProd] = useState(false);
    const [studentInfo, setStudentInfo] = useState(false);
    

    function setViewAll(){
        setAllProducts(true);
        setSeeByID(false);
        setAddProd(false);
        setUpdateProd(false);
        setDeleteProd(false);
        setStudentInfo(false);
    }
    function setSeeID(){
        setAllProducts(false);
        setSeeByID(true);
        setAddProd(false);
        setUpdateProd(false);
        setDeleteProd(false);
        setStudentInfo(false);
    }
    function setAddView(){
        setAllProducts(false);
        setSeeByID(false);
        setAddProd(true);
        setUpdateProd(false);
        setDeleteProd(false);
        setStudentInfo(false);
    }
    function setUpdateView(){
        setAllProducts(false);
        setSeeByID(false);
        setAddProd(false);
        setUpdateProd(true);
        setDeleteProd(false);
        setStudentInfo(false);
    }
    function setDeleteView(){
        setAllProducts(false);
        setSeeByID(false);
        setAddProd(false);
        setUpdateProd(false);
        setDeleteProd(true);
        setStudentInfo(false);
    }
    function setInfoView(){
        setAllProducts(false);
        setSeeByID(false);
        setAddProd(false);
        setUpdateProd(false);
        setDeleteProd(false);
        setStudentInfo(true);
    }
    


    const [addNewProduct, setAddNewProduct] = useState({
        _id: 0,
        title: "",
        price: 0.0,
        description: "",
        category: "",
        image: "http://127.0.0.1:4000/images/",
        rating: { rate: 0.0, count: 0 },
    });

    const [updateProduct, setUpdateProduct] = useState({
        _id: 0,
        price: 0.0,
    });

    const showOneItem = oneProduct.map((el) => (
        <div key={el._id}>
            <br></br>
            <img src={el.image} width={500} /> <br />
            Title: {el.title} <br />
            Category: {el.category} <br />
            Price: {el.price} <br />
            Rate :{el.rating.rate} and Count:{el.rating.count} <br />
            <br></br>
        </div>
    ));

    const showAllItems = product.map((el) => (
        <div key={el._id}>
            <br></br>
            <img src={el.image} width={200} /> <br />
            Title: {el.title} <br />
            Category: {el.category} <br />
            Price: {el.price} <br />
            Rate :{el.rating.rate} and Count:{el.rating.count} <br />
            <br></br>
        </div>
    ));

    useEffect(() => {
        getAllProducts();
    }, []);

    // useEffect(() => {
    //     getAllProducts();
    // }, [checked4]);

    function getOneByOneProductNext() {
        if (product.length > 0) {
            if (index === product.length - 1) setIndex(0);
            else setIndex(index + 1);
            if (product.length > 0) setViewer4(true);
            else setViewer4(false);
        }
    }

    function getOneByOneProductPrev() {
        if (product.length > 0) {
            if (index === 0) setIndex(product.length - 1);
            else setIndex(index - 1);
            if (product.length > 0) setViewer4(true);
            else setViewer4(false);
        }
    }

    function deleteOneProduct(deleteid) {
        console.log("Product to delete :", deleteid);
        fetch("http://localhost:4000/delete/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: deleteid }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Delete a product completed : ", deleteid);
                console.log(data);
                if (data) {
                    //const keys = Object.keys(data);
                    const value = Object.values(data);
                    alert(value);
                }
            });
        setChecked4(!checked4);
        getOneByOneProductNext();
    }

    function updateOneProduct(updateid, inprice) {
        console.log("Product to update :", updateid);
        fetch("http://localhost:4000/update/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: updateid, price: inprice }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("update a product completed : ", updateid);
                console.log(data);
                if (data) {
                    //const keys = Object.keys(data);
                    const value = Object.values(data);
                    alert(value);
                }
            });
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        fetch("http://localhost:4000/insert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addNewProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Post a new product completed");
                console.log(data);
                if (data) {
                    //const keys = Object.keys(data);
                    const value = Object.values(data);
                    alert(value);
                }
            });
    }

    function getAllProducts() {
        fetch("http://localhost:4000/")
            .then((response) => response.json())
            .then((data) => {
                console.log("Show Catalog of Products :");
                console.log(data);
                setProduct(data);
            });
        setViewer1(!viewer1);
    }

    function handleChange(evt) {
        const value = evt.target.value;
        if (evt.target.name === "_id") {
            setAddNewProduct({ ...addNewProduct, _id: value });
        } else if (evt.target.name === "title") {
            setAddNewProduct({ ...addNewProduct, title: value });
        } else if (evt.target.name === "price") {
            setAddNewProduct({ ...addNewProduct, price: value });
        } else if (evt.target.name === "description") {
            setAddNewProduct({ ...addNewProduct, description: value });
        } else if (evt.target.name === "category") {
            setAddNewProduct({ ...addNewProduct, category: value });
        } else if (evt.target.name === "image") {
            const temp = value;
            setAddNewProduct({ ...addNewProduct, image: temp });
        } else if (evt.target.name === "rate") {
            setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
        } else if (evt.target.name === "count") {
            const temp = addNewProduct.rating.rate;
            setAddNewProduct({
                ...addNewProduct,
                rating: { rate: temp, count: value },
            });
        }
    }



    function getOneProduct(id) {
        console.log(id);
        if (id >= 1 && id <= 20) {
            fetch("http://localhost:4000/" + id)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show one product :", id);
                    console.log(data);
                    const dataArr = [];
                    dataArr.push(data);
                    setOneProduct(dataArr);
                });
            setViewer2(!viewer2);
        } else {
            console.log("Wrong number of Product id.");
            setViewer2(false);
        }

    }



    return (
        <div >
            <center>
                <div style={{border: 'outset lightblue'}}>
                    <h1>Catalog of Products</h1>
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => setViewAll()}>Show All products</button>
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => setSeeID()}>Search By ID</button>
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => setAddView()}>Add Product</button>
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => setUpdateView()}>Update Product</button>
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => setDeleteView()}>Delete Product</button>
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => setInfoView()}>Student Info</button>
                    <br></br>
                </div>

                    

                {allProducts &&<div style={{border: 'outset lightblue'}}>
                    <h1>All Available Products.</h1>
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => getAllProducts()}>Show All products</button>
                    {viewer1 && <div>Products {showAllItems}</div>}
                </div>}

                {seeByID && <div style={{border: 'outset lightblue'}}>   
                    <h1>Show one Product by Id:</h1>
                    <input style={{border: 'outset lightblue'}} type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />
                    {viewer2 && <div>Product: {showOneItem}</div>}
                </div>}

                

                {AddProd && <div style={{border: 'outset lightblue'}}>
                    <h3>Add a new product :</h3>
                    <form action="">
                        <input style={{border: 'outset lightblue'}} type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
                        <input style={{border: 'outset lightblue'}}type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
                        <input style={{border: 'outset lightblue'}}type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
                        <input style={{border: 'outset lightblue'}}type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
                        <input style={{border: 'outset lightblue'}}type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
                        <input style={{border: 'outset lightblue'}}type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
                        <input style={{border: 'outset lightblue'}}type="number" placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
                        <input style={{border: 'outset lightblue'}}type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
                        <button type="submit" style={{border: 'outset lightblue', backgroundColor: '#FF923D'}}  onClick={handleOnSubmit}>
                            submit
                        </button>
                    </form>
                </div>}

                {updateProd && <div style={{border: 'outset lightblue'}}>
                    <h3>update one product:</h3>
                    <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked6}
                        onChange={(e) => setChecked6(!checked6)} />

                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => getOneByOneProductPrev()}>Prev</button>
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => getOneByOneProductNext()}>Next</button>
                    <input style={{border: 'outset lightblue'}} type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => updateOneProduct(index+1, addNewProduct.price)}>Update</button>
                    {checked6 && (
                        <div key={product[index]._id}>
                            <img src={product[index].image} width={200} /> <br />
                            Id:{product[index]._id} <br />
                            Price: {product[index].price} <br />
                        </div>
                    )}
                </div>}

                { deleteProd && <div style={{border: 'outset lightblue'}}>
                    <h3>Delete one product:</h3>
                    <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
                        onChange={(e) => setChecked4(!checked4)} />
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => getOneByOneProductPrev()}>Prev</button>
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => getOneByOneProductNext()}>Next</button>
                    <button style={{border: 'outset lightblue', backgroundColor: '#FF923D'}} onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
                    {checked4 && (
                        <div key={product[index]._id}>
                            <img src={product[index].image} width={200} /> <br />
                            Id:{product[index]._id} <br />
                            Title: {product[index].title} <br />
                            Category: {product[index].category} <br />
                            Price: {product[index].price} <br />
                            Rate :{product[index].rating.rate} and Count:
                            {product[index].rating.count} <br />
                        </div>
                    )}
                </div>}

                {studentInfo && <div style={{border: 'outset lightblue'}}>
                    <h3>Credits</h3>
                    <div>
                        Names: Savannah Franklin, Ethan Gasner <br />
                        Emails: sf03@iastate.edu, egasner@iastate.edu <br />
                        Course Name: Com S 319 <br />
                        Professor: Abraham Netzahualcoy Aldaco Gastelum <br />
                        Date: 04/29/2023 <br />
                        Info: Welcome to Team 30's Shop aka Team Long Nose's Shop! This website is a project of ours where we practice using Mongo, REACT, and many other skills for our Com S 319 class! For a bit of fun, our products are fun little memes to follow our theme of using them throughout the semester.
                    </div>
                </div>}
            </center>
        </div>
    ); // return end
}; // App end

export default App;