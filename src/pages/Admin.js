import React, { Component } from "react";
import Astyle from "../components/Style/admin.css";
import Aux from "../hoc/Wrap";
import { Row, Table, Button, ButtonToolbar } from "react-bootstrap";
import AddItemModel from "../components/AdminPage/AddItemModel";
import EditItemModel from "../components/AdminPage/EditItemModel";
import AddCategoryModel from "../components/AdminPage/AddCategoryModel";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: [],
      //proImgList: [],
      addModelShow: false,
      editModelShow: false,
      addCatergory: false,
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList() {
    fetch("http://localhost:56482/api/EditProduct/GetUpdate")
      .then((responce) => responce.json())
      .then((data) => {
        this.setState({ deps: data });
      });
  }
  getProImgList = (ItemId) => {
    fetch("http://localhost:56482/api/EditProduct/GetProdImgList/" + ItemId)
      .then((res) => res.json())
      .then((ImgList) => {
        this.setState({
          proImgList: ImgList,
        });
      });
  };
  // componentDidUpdate(){
  //     this.refreshList();
  // }

  DeleteProduct = (id) => {
    fetch("http://localhost:56482/api/AdminService/Delete/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  render() {
    const { product } = this.state;
    let addModelClose = () => {
      this.setState({ addModelShow: false });
    };
    let editModelClose = () => {
      this.setState({ editModelShow: false });
    };
    let addCategoryModelClose = () => {
      this.setState({ addCatergory: false });
    };
    return (
      <Aux>
        <div className="container-flud">
          <h3 className={[Astyle.heder, "mt-2"].join(" ")}>
            SolarMart Administration
          </h3>
          <div className="row">
            <div className="col-2">
              <div style={{ textAlign: "center" }}>
                <Button
                  className={Astyle.addbtn}
                  onClick={() => {
                    this.setState({ addCatergory: true });
                  }}
                >
                  Add New Categotry
                </Button>
                <Button
                  className={Astyle.addbtn}
                  onClick={() => {
                    this.setState({ addModelShow: true });
                  }}
                >
                  Add New Product
                </Button>
              </div>
            </div>
            <div className="col-9">
              <Table className="mt-5" striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Product Brand</th>
                    <th>Product Model</th>
                    <th>Product Color</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.deps.map((dep) => (
                    <tr key={dep.ProductId}>
                      <td>{dep.productname}</td>
                      <td>{dep.ProBrand}</td>
                      <td>{dep.ProModel}</td>
                      <td>{dep.ProColor}</td>
                      <td>
                        <ButtonToolbar>
                          <Button
                            className="mr-2"
                            key={dep.ProductId}
                            variant="info"
                            onClick={() => {
                              this.setState({
                                editModelShow: true,
                                product: dep,
                              });
                              this.getProImgList(dep.ProductId);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className={[Astyle.deleteBtn, "mr-2"].join(" ")}
                            onClick={() => this.DeleteProduct(dep.ProductId)}
                          >
                            Delete
                          </Button>
                        </ButtonToolbar>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <Row></Row>
          <AddCategoryModel
            show={this.state.addCatergory}
            onHide={addCategoryModelClose}
          />
          <AddItemModel show={this.state.addModelShow} onHide={addModelClose} />
          <EditItemModel
            product={product}
            productimg={this.state.proImgList}
            show={this.state.editModelShow}
            onHide={editModelClose}
          />
        </div>
      </Aux>
    );
  }
}

export default Admin;
