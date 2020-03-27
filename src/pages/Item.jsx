import React,{Component} from 'react';
import Layout from '../components/Layout/Layout';
import Slider from '../components/ImageSlider/ImageSlider';
import VSec from '../components/VideoSec/VideoSec';
import ProductDetails from '../components/Pdetails/Pdetails';
import Rproduct from '../containers/reletedProduct';


class Item extends Component {
    render(){
        return(
            <Layout>
                <Slider/>
                <VSec/>
                <ProductDetails/>
                <Rproduct/>
            </Layout>       
        );
    }
}
export default Item;