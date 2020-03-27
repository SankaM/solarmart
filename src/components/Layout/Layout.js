import React from 'react';
import  Aux from '../../hoc/Wrap';
import  Nav from '../Style/Layout.css';
import Image from '../../Assets/null.png';


const textArea = [Nav.Stestarea,"form-control"].join(' ');
const catoDropdown = [Nav.catoDropDown,"input-group-append"].join(' ');
const layout  = (props)=>(
    <Aux>
        <div className={Nav.Nav}>
            <img src={Image} alt="Logo" className={Nav.logo}></img>
            <a href="C" className={Nav.nav_btn +' '+Nav.test}>Sine up</a>
            <a href="C" className={Nav.nav_btn}>Log in</a>
            <a href="C" className={Nav.nav_btn}>Help center</a>
            <div className={Nav.nav_t_container}>
            <div className={"input-group mb-3"}>
                <input type="text" className={textArea} placeholder="Search for anything"/>
                <div className={catoDropdown}> 
                  <span className="input-group-text">All categories</span>
                </div>
              </div>
            </div>
        </div>
        <div className={Nav.main_heading}>
            World best sola market
        </div>
        {/* category section */}
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
        <main>
            {props.children}
        </main>
    </Aux>
);
export default layout;