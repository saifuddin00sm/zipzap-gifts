import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import { adminGroupedItem, adminItem } from "../../../classes";

import { ReactComponent as CloseIcon } from "../../../icons/close.svg";
import AdminItemRow from "./adminItemRow";

// props.action req = (type:string, item:adminItem, index:number)
function AdminGroupedItemCard(props: {
  index: number;
  item: adminGroupedItem;
  action: Function;
  editing?: boolean;
}) {
  const { adminItems } = useContext(UserContext);
  const [editing, setEditing] = useState(props.editing ? props.editing : false);

  const [editableItem, setEditableItem] = useState(
    JSON.parse(JSON.stringify(props.item)) as adminGroupedItem
  );

  useEffect(() => {
    setEditableItem(JSON.parse(JSON.stringify(props.item)));
    setSearchItems(Object.keys(adminItems));
  }, [editing]);

  const handleEditItem = (type: string, e: any) => {
    if (type === "name") {
      editableItem.name = e.target.value;
    } else if (type === "price") {
      editableItem.priceOverride = e.target.value;
    } else if (type === "description") {
      editableItem.description = e.target.value;
    } else if (type === "removeItem") {
      editableItem.itemsArray.splice(e, 1);
    } else if (type === "addItem") {
      editableItem.itemsArray.push(e);
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

  const [showSearchContainer, setShowSearchContainer] = useState(false);
  const [searchItems, setSearchItems] = useState([] as Array<string>);

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      let searchTerm = e.target.value.toLowerCase();

      let newList = Object.keys(adminItems);
      if (searchTerm) {
        newList = Object.keys(adminItems).filter((itemKey) => {
          let item = adminItems[itemKey];
          if (item.name.toLowerCase().includes(searchTerm)) {
            return true;
          } else if (item.description.toLowerCase().includes(searchTerm)) {
            return true;
          }
        });
      }

      setSearchItems([...newList]);
    }
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
        placeholder={`Grouped Item Name`}
      ></input>

      <div className={`column center`}>
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
          placeholder={`Grouped Item Description`}
        ></textarea>
        <p>
          Price Override: $
          <input
            type={`number`}
            min={"1.00"}
            step={"0.01"}
            value={editableItem.priceOverride}
            onChange={(e: any) => handleEditItem("price", e)}
          ></input>
        </p>
        <div className={`column center`}>
          <span>Items Included:</span>
          {editableItem.itemsArray.map((itemID, iIndex) => (
            <AdminItemRow
              key={iIndex}
              index={iIndex}
              item={adminItems[itemID]}
              // item={adminItems.find((item, index) => item.itemID === itemIndex)}
              type={"remove"}
              action={handleEditItem}
            />
          ))}
          <br></br>
          {showSearchContainer ? (
            <div className={`column center full-width`}>
              <input
                className={`general-input`}
                placeholder={`Search for Item`}
                onKeyPress={handleSearch}
              ></input>

              {searchItems.map((sItem, iIndex) => (
                <AdminItemRow
                  key={iIndex}
                  index={iIndex}
                  item={adminItems[sItem]}
                  // item={adminItems.find(
                  //   (item, index) => item.itemID === sItem.itemID
                  // )}
                  type={"add"}
                  action={handleEditItem}
                />
              ))}
            </div>
          ) : null}
          <button
            className={`general-button admin-button`}
            onClick={() => setShowSearchContainer(!showSearchContainer)}
          >
            {showSearchContainer ? "Cancel" : "Add Item"}
          </button>
        </div>
      </div>
      <br></br>
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

        <div className={`column center`}>
          <span>Items Included:</span>
          {props.item.itemsArray.map((itemID) => (
            <AdminItemRow
              key={itemID}
              index={itemID}
              item={adminItems[itemID]}
              // item={adminItems.find((item, index) => item.itemID === itemIndex)}
              type={""}
              action={handleEditItem}
            />
          ))}
        </div>
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

export default AdminGroupedItemCard;
