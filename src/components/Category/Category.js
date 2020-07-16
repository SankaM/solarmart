import React, { useEffect, useState } from "react";
import Nav from "../Style/Layout.css";

const Category = () => {
  const [catagory, setCatagory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:56482/api/Catagory/GetCategory")
      .then((response) => response.json())
      .then((data) => {
        setCatagory(data);
      });
  }, []);
  return (
    <div className={Nav.category_container}>
      <div className={Nav.categoryHader}>
        <i className="fas fa-bars"></i> Categories
      </div>
      <div className={Nav.CsubContainer}>
        {catagory.map(cato=>
            <a href="#/" role="button" className={Nav.categoryItem} key={cato.CategoryId}>
          {cato.CategoryName}
        </a>
        )}
      </div>
    </div>
  );
};

export default Category;
