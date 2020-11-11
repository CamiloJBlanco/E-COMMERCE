import '../App.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Label, Input } from 'reactstrap';
import { deleteProduct, getProducts, saveProduct, updateProduct } from '../actions/ProductsActions';
import Button from '@material-ui/core/Button';



function CreateProductsScreen() {

  const dispatch = useDispatch();
  const [form, setForm] = useState({ id: '', name: '', price: '', stock: '', description: '', category: '', brand: '', image: '', tipoModal: '' })
  const { productsLoaded, loading, error } = useSelector(state => state.product)
  const dataCat = useSelector(state => state.categories.categoriesLoaded)
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const peticionPost = async () => {
    delete form.id;
    const formData = Object.entries(form).reduce((formData, [key, value]) => {
      formData.append(key, value);
      return formData;
    }, new FormData());
    modalInsert();
    await dispatch(saveProduct(formData));
    await dispatch(getProducts());
  }

  const peticionPut = async () => {
    modalInsert();
    await dispatch(updateProduct(form.id, form));
    await dispatch(getProducts());

  }

  const peticionDelete = async () => {
    await dispatch(deleteProduct(form.id));
    await dispatch(getProducts());
    setModalEliminar(false);
  }

  const modalInsert = (adfasdf) => {
    setModalInsertar(!modalInsertar);
  }

  const selectedProduct = (prod) => {
    setForm({
      tipoModal: 'actualizar',
      id: prod.id,
      name: prod.name,
      brand: prod.brand,
      price: prod.price,
      stock: prod.stock,
      description: prod.description,
      category: prod.category,
      image: prod.image
    }
    )
  }

  const handleChange = async e => {
    e.preventDefault();
    e.persist();
    await setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    console.log(form);
  }


  const handleFileChange = async e => {
    e.preventDefault();
    e.persist();
    await setForm({
      ...form,
      [e.target.name]: e.target.files[0]
    });
    console.log(form);
  }

  return (
    <>
      <br />
      {loading ? (<div>Loading...</div>) : error ? (<div>no esta funcionando{error}</div>) : (
        <div className="App">
          <br /><br /><br />
            <Button variant="contained" color="primary" >
            <div
            action='/uploads'
            method='POST'
            encType='multipart/form-data'
            onClick={() => {
              setForm({ tipoModal: 'insertar' });
              modalInsert()
            }}>Agregar Producto</div>
           </Button>
          <br /><br />
          <table className="table ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Descripcion</th>
                <th>Categoria</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {productsLoaded.map(prod => {
                return (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.name}</td>
                    <td>{prod.brand}</td>
                    <td>${prod.price}</td>
                    <td>{prod.stock}u</td>
                    <td>{prod.description}</td>
                    <td>{prod.category}</td>
                    <td><img src={`http://localhost:3001/static/${prod.image}`} class="image-thumbnail" /></td>
                    <td>
                      <button className="btn btn-primary" //boton editar
                        onClick={() => {
                          selectedProduct(prod);
                          modalInsert()
                        }}><FontAwesomeIcon icon={faEdit} /></button>
                      {"   "}
                      <button className="btn btn-danger"  // boton eliminar
                        onClick={() => {
                          selectedProduct(prod);
                          setModalEliminar(true)
                        }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <Modal isOpen={modalInsertar}>
            <ModalHeader style={{ display: 'block' }}>
              <span style={{ float: 'right' }} onClick={() => modalInsert()}>x</span>
            </ModalHeader>
            <ModalBody>
              <form action='/uploads'
                method='POST' encType='multipart/form-data' >
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input className="form-control"
                    type="text" name="id" id="id"
                    readOnly onChange={() => handleChange}
                    value={form ? form.id : productsLoaded.length + 1} />
                  <br />
                  <label htmlFor="name">Nombre</label>
                  <input className="form-control"
                    type="text" name="name" id="name"
                    onChange={handleChange} value={form ? form.name : ''} />
                  <br />
                  <label htmlFor="brand">Marca</label>
                  <input className="form-control"
                    type="text" name="brand" id="brand"
                    onChange={handleChange} value={form ? form.brand : ''} />
                  <br />
                  <label htmlFor="price">Precio</label>
                  <input className="form-control"
                    type="number" name="price" id="price"
                    onChange={handleChange} value={form ? form.price : ''} />
                  <br />
                  <label htmlFor="stock">Stock</label>
                  <input className="form-control"
                    type="number" name="stock" id="stock"
                    onChange={handleChange} value={form ? form.stock : ''} />
                  <br />
                  <FormGroup>
                    <Label for="exampleSelect">Categorias</Label>
                    <Input type="select" name="category" id="category"
                      onChange={handleChange}
                      value={form ? form.category : ''}>
                      {
                        dataCat.map(e => {
                          return <option className='' key={e.id}>{e.name}</option>
                        })
                      }
                    </Input>
                  </FormGroup>
                  <br />
                  <label htmlFor="description">Descripcion</label>
                  <input className="form-control"
                    type="text" name="description" id="description"
                    onChange={handleChange} value={form ? form.description : ''} />
                  <br />
                  <label htmlFor="image">Imagen</label>
                  <input type="file" name="image" id="image" alt="imagen"
                    onChange={handleFileChange} value=''
                  //onChange={(e) => {this.uploadImage(e)}}
                  />
                  <br />
                </div>
              </form>
            </ModalBody>

            <ModalFooter>
              {form.tipoModal === 'insertar' ?
                <button className="btn btn-success"
                  onClick={() => peticionPost()}>Insertar
                    </button> : <button className="btn btn-primary"
                  onClick={() => peticionPut()}>Actualizar</button>
              }
              <button className="btn btn-danger"
                onClick={() => modalInsert()}>Cancelar</button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={modalEliminar}>
            <ModalBody>
              Estás seguro que deseas eliminar el producto {form && form.name}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger"
                onClick={() => peticionDelete()}>Sí</button>
              <button className="btn btn-secundary"
                onClick={() => setModalEliminar(false)}>No</button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </>
  )
}
export default CreateProductsScreen;
