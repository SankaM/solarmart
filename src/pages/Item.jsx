import React,{Component} from 'react';
import Layout from '../components/Layout/Layout';
import Slider from '../components/ImageSlider/ImageSlider';
import VSec from '../components/VideoSec/VideoSec';
import ProductDetails from '../components/Pdetails/Pdetails';
import Rproduct from '../containers/reletedProduct';


class Item extends Component {
    constructor(prorp){
        super(prorp);
        this.state={
            product :[]
        }
    }
    componentDidMount(){
        this.getProductForItem();
    }

    getProductForItem(){
        const {id} = this.props.match.params;
        fetch("http://localhost:56482/api/Product/Product/"+id).then(res=>res.json()).then(res=>{
            this.setState({
                product:res
            })
        })
    }

    // componentDidUpdate(){
    //     this.getProductForItem();
    // }

    render(){
        const [product] = this.state.product

        return(
                <Layout>
                    <Slider/>
                    {product && <VSec
                        product={product}
                    />}
                    
                {product ? (<ProductDetails
                     proDetails={product.ProDiscription}
                    />) : null}
                   
                    <Rproduct/>
                </Layout>   
        );
        
    }
}
export default Item;