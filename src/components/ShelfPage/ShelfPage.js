import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ShelfPage() {
  const items = useSelector((store) => store.shelf);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch({type: 'UPDATE_ITEM', payload:{id:clickedItemId, description: editName, image_url: editImg }})
  
  };
  const handleCancel = () => {
    setShow(false);

  
  };
  const handleShow = (item) => {
    setShow(true);
  setEditName(item.description);
  setEditImg(item.image_url);
  setClickedItemId(item.id)};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ITEMS" });
  }, []);

  console.log(items);
  
  const deleteItem = (id) => {
    console.log('item id',id)
    dispatch({
      type: "DELETE_ITEM",
      payload: {id: id}
    });
  };



  const handleNewItem = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_ITEM",
      payload: { description: itemName, image_url: itemImg },
    });
  };

  const [itemName, setItemName] = useState();
  const [itemImg, setItemImg] = useState();
  const [editName, setEditName] = useState();
  const [editImg, setEditImg] = useState();
  const [clickedItemId, setClickedItemId] = useState();

  return (
    <div className="container">
      <h2>Shelf</h2>
      <h4>Add An Item!</h4>
      <form onSubmit={handleNewItem}>
        <input
          placeholder="Item Description"
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          placeholder="Item Image"
          onChange={(e) => setItemImg(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <ul>
        {items.map((item, i)  => (
          <li onClick={()=>handleShow(item)} key={i}>
            
          {item.id}  {item.description} <img width={250} height={300} src={item.image_url} /> {item.user_id}
            <button onClick={()=>deleteItem(item.id)}>Delete item</button>
          </li>
        ))}
      </ul>
      <>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          
          <input value={editName} onChange={(e) => setEditName(e.target.value)}/>
          <input value={editImg} onChange={(e) => setEditImg(e.target.value)}/>
      
          
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    
    </div>
  );
}

export default ShelfPage;
