import React, { useEffect, useState } from "react";
import Nav from "../Style/Layout.css";
import { makeStyles } from "@material-ui/core/styles";

const Category = (props) => {
  const [catagory, setCatagory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:56482/api/Catagory/GetCategory")
      .then((response) => response.json())
      .then((data) => {
        setCatagory(data);
        console.log(data);
      });
  }, []);

  const useStyles = makeStyles((theme) => ({
    linWrap: {
      position: "relative",
      "&:hover > div": {
        display: "block",
      },
    },
    subCat: {
      position: "absolute",
      width: "180px",
      height: "200px",
      backgroundColor: "white",
      top: "0",
      right: "-180px",
      zIndex: "2",
      display: "none",
    },
  }));
  const classes = useStyles();
  return (
    <div className={Nav.category_container}>
      <div className={Nav.categoryHader}>
        <i className="fas fa-bars"></i> Categories
      </div>
      <div className={Nav.CsubContainer}>
        {catagory.map((cato) =>
          cato.SubCat.length !== 0 ? (
            <div className={classes.linWrap} key={cato.CategoryId}>
              <a href="#/" role="button" className={Nav.categoryItem}>
                {cato.CategoryName}
              </a>
              <div className={classes.subCat}>
                {cato.SubCat.map((scato) => (
                  <a
                    href={"/collection/"+scato.SubCatId}
                    role="button"
                    className={Nav.categoryItem}
                    key={scato.SubCatId}
                  >
                    {scato.SubCatName}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a href="#/" role="button" className={Nav.categoryItem}>
              {cato.CategoryName}
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default Category;
