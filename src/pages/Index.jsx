import React,{Component} from 'react';
import Layout from '../components/Layout/Layout'
import Fcard from '../containers/feturedItem';
import Ocard from '../containers/otherItemSec';

class Index extends Component {
    render(){
      return (
        <div>
          <Layout>
            <Fcard/>
            <Ocard/>
          </Layout>
        </div>
      );
    }
}

export default Index;