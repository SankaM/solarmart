import React from 'react';
import  Aux from '../../hoc/Wrap';
import  Nav from '../Style/Layout.css';
import Image from '../../Assets/null.png';


const textArea = [Nav.Stestarea,"form-control"].join(' ');
const catoDropdown = [Nav.catoDropDown,"input-group-append"].join(' ');
const layout  = (props)=>(
    <Aux>
        <div className={Nav.Nav}>
            <a href="/" role="button" ><img src={Image} alt="Logo" className={Nav.logo}></img></a>
            <a href="C" className={Nav.nav_btn +' '+Nav.test}>Sine up</a>
            <a href="C" className={Nav.nav_btn}>Log in</a>
            <a href="C" className={Nav.nav_btn}>Help center</a>
            <div className={Nav.nav_t_container}>
            <div className={"input-group mb-3"}>
                <input type="text" className={textArea} placeholder="Search for anything"/>
                <div className={catoDropdown}> 
                  <span className={[Nav.searchBarText,"input-group-text"].join(" ")}>All categories</span>
                </div>
              </div>
            </div>
        </div>
        <main>
            {props.children}
        </main>
    </Aux>
);
export default layout;