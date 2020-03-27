import React,{Component} from 'react';
import Astyle from '../components/Style/admin.css';
import Aux from '../hoc/Wrap';
import {Row,Table,Button,ButtonToolbar} from 'react-bootstrap';
import AddItemModel from '../components/AdminPage/AddItemModel';
import EditItemModel from '../components/AdminPage/EditItemModel';


class Admin extends Component {
    constructor(props){
        super(props);
        this.state ={deps:[],addModelShow :false,editModelShow:false}
    }
    componentDidMount(){
        this.refreshList();
    }
    refreshList(){
      fetch('http://localhost:56482/api/Item').then(responce=>responce.json()).then(data=>
      {
          this.setState({deps:data});
      }
      );
    }
   
    componentDidUpdate(){
        this.refreshList();
    }
   
    DeleteProduct=(id)=>{
            fetch('http://localhost:56482/api/Item/'+id,{
                method:'DELETE',
                headers:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
    }

    render(){
        const {product} = this.state;
        let addModelClose =()=>{
            this.setState({addModelShow:false});
        };
        let editModelClose=()=>{
            this.setState({editModelShow:false});
        }
        return(
            <Aux>
            <div className="container-flud">
                <h3 className={[Astyle.heder,"mt-2"].join(' ')}>SolarMart Administration</h3>
                <div className="row">
                    <div className="col-2">
                        <div style={{textAlign:"center"}}>
                            <Button className={Astyle.addbtn} onClick={()=>{this.setState({addModelShow:true})}}>Add New Categotry</Button>
                            <Button className={Astyle.addbtn} onClick={()=>{this.setState({addModelShow:true})}}>Add New Product</Button>
                        </div>
                    </div>
                    <div className="col-9">
                        <Table className="mt-5" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Product Brand</th>
                                    <th>Product Model</th>
                                    <th>Product Color</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.deps.map(dep=>
                                                <tr key={dep.ProductId}>
                                                    <td>{dep.ProductId}</td>
                                                    <td>{dep.productname}</td>
                                                    <td>{dep.ProBrand }</td>
                                                    <td>{dep.ProModel }</td>
                                                    <td>{dep.ProColor }</td>
                                                    <td>
                                                        <ButtonToolbar>
                                                            <Button className="mr-2" key={dep.ProductId} variant="info" onClick={()=>{this.setState({editModelShow:true,
                                                                product:dep             
                                                            })}}>Edit</Button> 
                                                            <Button className={[Astyle.deleteBtn,"mr-2"].join(' ')} 
                                                            onClick={()=>this.DeleteProduct(dep.ProductId)}
                                                            >Delete</Button>
                                                        </ButtonToolbar>
                                                    </td>
                                                </tr>
                                        )
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>

                <Row>
                    
                </Row>
                <AddItemModel show={this.state.addModelShow} onHide={addModelClose}/>
                <EditItemModel 
                    product={product}
                    show={this.state.editModelShow}
                    onHide={editModelClose}
                />
            </div>
                
            </Aux>
        )
    }
}

export default Admin;