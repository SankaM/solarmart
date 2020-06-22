import React,{Component} from 'react';
import Aux from '../hoc/Wrap';
import Card from '../components/Card/card';
import Cstyle from '../components/Style/container.css';
import {Link} from 'react-router-dom';

class FeturedItem extends Component{
    constructor(props){
        super(props);
        this.state={
             products:[]
        }
    }
    componentDidMount(){
        this.getProduct();
    }
    getProduct(){
        fetch('http://localhost:56482/api/AdminService/GetForCard').then(responce=>responce.json()).then(res=>
        {
            this.setState({products:res})
        })
    }
    // componentDidUpdate(){
    //     this.getProduct();
    // }
    render(){
        return(
            <Aux>
                <div className={Cstyle.FcardContainer}>
                    <h4>Fetuerd Item</h4>
                    {
                        this.state.products.map(prod=>
                            <Link to={["/Item/",prod.ProductId].join("")}><Card proPrice={prod.SellPrice} proModel={prod.ProModel} proBrand = {prod.ProBrand} proName={prod.productname}/></Link>
                            )
                    }
                </div>
            </Aux>
        );
    }
}
export default FeturedItem;