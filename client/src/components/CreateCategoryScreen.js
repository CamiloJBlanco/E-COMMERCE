import React from 'react';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCategory, getCategories, saveCategory, updateCategory } from '../actions/CategoryAction';
import Button from '@material-ui/core/Button';


function CreateCategoryScreen() {

  const dispatch = useDispatch();
  const { categoriesLoaded, loading, error } = useSelector(state => state.categories);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [form, setForm] = useState({ id: '', name: '', description: '', tipoModal: '' })


  const peticionPost = async () => {
    delete form.id;
    modalInsert();
    await dispatch(saveCategory(form))
    await dispatch(getCategories());
  }

  const peticionPut = async () => {
    await dispatch(updateCategory(form.id, form));
    await dispatch(getCategories());
    modalInsert();
  }

  const peticionDelete = async () => {
    setModalEliminar(false);
    await dispatch(deleteCategory(form.id));
    await dispatch(getCategories());
  }

  const modalInsert = () => {
    setModalInsertar(!modalInsertar);
  }

  const selecCategory = (cat) => {
    setForm({
      tipoModal: 'actualizar',
      id: cat.id,
      name: cat.name,
      description: cat.description,
    })
  }

  const handleChange = async e => {
    e.persist();
    await setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="App">
      <br /><br /><br />
      <Button variant="contained" color="primary" >
        <div
        onClick={() => {
          setForm({ tipoModal: 'insertar' });
          modalInsert()
        }}>Agregar Categoria</div>
           </Button>
      <br /><br />
      <table className="table ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {categoriesLoaded.map(cat => {
            return (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.description}</td>
                <td>
                  <button className="btn btn-primary"
                    onClick={() => {
                      selecCategory(cat);
                      modalInsert()
                    }}><FontAwesomeIcon icon={faEdit} /></button>
                  {"   "}
                  <button className="btn btn-danger"
                    onClick={() => {
                      selecCategory(cat);
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
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input className="form-control"
              type="text" name="id" id="id"
              readOnly onChange={handleChange}
              value={form ? form.id : categoriesLoaded.length + 1} />
            <br />
            <label htmlFor="name">Nombre</label>
            <input className="form-control"
              type="text" name="name" id="name"
              onChange={handleChange}
              value={form ? form.name : ''} />
            <br />
            <label htmlFor="description">Descripcion</label>
            <input className="form-control"
              type="text" name="description"
              id="description"
              onChange={handleChange}
              value={form ? form.description : ''} />
            <br />
          </div>
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
          Estás seguro que deseas eliminar la categoria {form && form.name}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger"
            onClick={() => peticionDelete()}>Sí</button>
          <button className="btn btn-secundary"
            onClick={() => setModalEliminar(false)}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default CreateCategoryScreen;