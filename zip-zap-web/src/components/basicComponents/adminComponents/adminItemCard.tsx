import React, { useEffect, useState } from "react";
import { adminItem } from "../../../classes";
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";

// props.action req = (type:string, item:adminItem, index:number)
function AdminItemCard(props: {
  index: number;
  item: adminItem;
  action: Function;
  editing?: boolean;
}) {
  const [editing, setEditing] = useState(props.editing ? props.editing : false);

  const [editableItem, setEditableItem] = useState(
    JSON.parse(JSON.stringify(props.item)) as adminItem
  );

  useEffect(() => {
    setEditableItem(JSON.parse(JSON.stringify(props.item)));
  }, [editing]);

  const handleEditItem = (type: string, e: any) => {
    if (type === "name") {
      editableItem.name = e.target.value;
    } else if (type === "price") {
      editableItem.price = e.target.value;
    } else if (type === "description") {
      editableItem.description = e.target.value;
    } else if (type === "quantity") {
      editableItem.quantity = e.target.value;
    } else if (type === "quantityAvailable") {
      editableItem.quantityAvailable = e.target.value;
    }

    setEditableItem({ ...editableItem });
  };

  const handleSave = () => {
    props.action("save", editableItem, props.index);
    setEditing(false);
  };

  const handleDelete = () => {
    editableItem.isActive = false;
    props.action("delete", editableItem, props.index);
    setEditing(false);
  };

  const handleImageRemove = (index: number) => {
    editableItem.pictures.splice(index, 1);
    setEditableItem({ ...editableItem });
  };

  const changeMainPicture = (index: number) => {
    editableItem.pictures.push(editableItem.mainPicture);
    editableItem.mainPicture = editableItem.pictures[index];
    setEditableItem({ ...editableItem });

    handleImageRemove(index);
  };

  return editing ? (
    <div className={`column center item-card-container`}>
      <input
        className={`item-card-container-name`}
        type={"text"}
        value={editableItem.name}
        onChange={(e: any) => handleEditItem("name", e)}
        placeholder={`Item Name`}
      ></input>
      {/* <h3>{editableItem.name}</h3> */}
      <div className={`column `}>
        <div className={`row center space-between`}>
          <div className={`row center-column`}>
            {editableItem.mainPicture ? (
              <img
                src={props.item.mainPicture}
                alt={`${editableItem.name}-main-picture`}
                className={`item-card-image-small`}
              ></img>
            ) : null}

            <span>
              {editableItem.mainPicture ? "Main Image" : "NO MAIN IMAGE"}
            </span>
          </div>

          {/* <div>
            <CloseIcon className={`delete-button-svg`} />
          </div> */}
        </div>

        {editableItem.pictures.map((pictureURL, pIndex) => (
          <div key={pIndex} className={`row center space-between`}>
            <div className={`row center-column`}>
              <img
                src={props.item.mainPicture}
                alt={`${editableItem.name}-alt-picture-${pIndex}`}
                className={`item-card-image-small`}
              ></img>
              <button onClick={() => changeMainPicture(pIndex)}>
                Make Main Image
              </button>
            </div>
            <div>
              <CloseIcon
                className={`delete-button-svg`}
                onClick={() => handleImageRemove(pIndex)}
              />
            </div>
          </div>
        ))}

        <button
          className={`general-button admin-button`}
          // onClick={() => setShowSearchContainer(!showSearchContainer)}
        >
          Add Image
        </button>
      </div>

      <div className={`item-card-body`}>
        <textarea
          value={editableItem.description}
          onChange={(e: any) => handleEditItem("description", e)}
          placeholder={`Item Description`}
        ></textarea>
        <p>
          Price: $
          <input
            type={`number`}
            min={"1.00"}
            step={"0.01"}
            value={editableItem.price}
            onChange={(e: any) => handleEditItem("price", e)}
          ></input>
        </p>
        <p className={`column`}>
          <span>
            Quantity:
            <input
              type={`number`}
              min={"0"}
              value={editableItem.quantity}
              onChange={(e: any) => handleEditItem("quantity", e)}
            ></input>
          </span>
          <span>
            {" "}
            Quantity Available:
            <input
              type={`number`}
              min={"0"}
              value={editableItem.quantityAvailable}
              onChange={(e: any) => handleEditItem("quantityAvailable", e)}
            ></input>
          </span>
        </p>
      </div>

      <div className={`row center`}>
        <button className={`general-button admin-button`} onClick={handleSave}>
          Save Item
        </button>
        <button
          className={`general-button admin-button`}
          onClick={() => {
            setEditing(false);
            if (props.editing) {
              props.action("cancel", editableItem, props.index);
            }
          }}
        >
          Cancel
        </button>
      </div>

      {!props.editing ? (
        <button
          className={`general-button admin-button delete-button`}
          onClick={handleDelete}
        >
          Delete Item
        </button>
      ) : null}
    </div>
  ) : (
    <div
      className={`column center item-card-container ${
        !props.item.isActive ? "item-card-container-inactive" : ""
      }`}
    >
      <h3>
        {props.item.name} {!props.item.isActive ? ` - INACTIVE` : ""}
      </h3>
      <div className={`column center`}>
        <img
          src={props.item.mainPicture}
          alt={`${props.item.name}-main-picture`}
          className={`item-card-image-main`}
        ></img>
        <div className={`row center`}>
          {props.item.pictures.slice(0, 4).map((pictureURL, pIndex) => (
            <img
              key={pIndex}
              src={pictureURL}
              alt={`${props.item.name}-alt-picture-${pIndex}`}
              className={`item-card-image-small`}
            ></img>
          ))}
        </div>
      </div>

      <div className={`item-card-body`}>
        <p>{props.item.description}</p>
        <p>Price: ${props.item.price}</p>
        <p>
          Quantity: {props.item.quantity}, Quantity Available:{" "}
          {props.item.quantityAvailable}
        </p>
      </div>

      <button
        className={`general-button admin-button`}
        onClick={() => setEditing(true)}
        disabled={!props.item.isActive}
      >
        Edit Item
      </button>
    </div>
  );
}

export default AdminItemCard;
