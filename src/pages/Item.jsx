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
            product :[],
            Images:[]
        }
    }
    componentDidMount(){
        this.getProductForItem();
    }

    getProductForItem(){
        const {id} = this.props.match.params;
        fetch("http://localhost:56482/api/Product/Product/"+id).then(res=>res.json()).then(res=>{
            this.setState({
                product:res.Table,
                Images:res.Table1
            })
        })
    }

    // componentDidUpdate(){
    //     this.getProductForItem();
    // }

    render(){
        const [product] = this.state.product;
        const Images = this.state.Images;
        return(
                <Layout>
                    {Images?(<Slider ImgList={Images}/>):null}
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