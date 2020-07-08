import React from 'react';
import Nav from '../Style/Layout.css';

const Category=()=>{
    return(
        <div className={Nav.category_container}>
            <div className={Nav.categoryHader}><i className="fas fa-bars"></i>  Categories</div>
            <div className={Nav.CsubContainer}>
                <a href="d"className={Nav.categoryItem} >Smart waches</a>
                <a href="d"className={Nav.categoryItem} >Toche</a>
                <a href="d"className={Nav.categoryItem} >i Pods</a>
                <a href="d"className={Nav.categoryItem} >Calculators</a>
                <a href="d"className={Nav.categoryItem} >Toys</a>
                <a href="d"className={Nav.categoryItem} >SD cards</a>
            </div>
        </div>
    );
}

export default Category;