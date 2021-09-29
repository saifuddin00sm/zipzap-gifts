import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import { adminGroupedItem, adminItem } from "../../../classes";
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";
import AdminItemRow from "./adminItemRow";
import {Row, Col, Accordion} from 'react-bootstrap';
import appSettings from "../../../appSettings.json";

// props.action req = (type:string, item:adminItem, index:number)
function AdminGroupedItemCard(props: {
  index: number;
  item: adminGroupedItem;
  action: Function;
  editing?: boolean;
}) {
  const { adminItems } = useContext(UserContext);
  const [editing, setEditing] = useState(props.editing ? props.editing : false);
  const [editingError, setEditingError] = useState("");

  const [editableItem, setEditableItem] = useState(
    JSON.parse(JSON.stringify(props.item)) as adminGroupedItem
  );

  const [imageFiles, setImageFiles] = useState({} as FileList);

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
    if (!editableItem.name) {
      setEditingError("Please Enter an Item Name");
      return true;
    } else if (!editableItem.description) {
      setEditingError("Please Enter an Item Description");
      return true;
    }
    // else if (!editableItem.quantity) {
    //   setEditingError("Please Enter an Item Quantity");
    //   return true;
    // } else if (!editableItem.quantityAvailable) {
    //   setEditingError("Please Enter an Item Quantity Available");
    //   return true;
    // }
    else {
      setEditingError("");
    }

    props.action(
      "save",
      editableItem,
      props.index,
      Object.keys(imageFiles).length > 0 ? imageFiles : null
    );
    setEditing(false);
    setImageFiles({} as FileList);
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

  const handlePictureAdd = async (e: any) => {
    setImageFiles(e.target.files);
  };

  return editing ? (
    <Col className={`item-card-container`} xs="12">
      <span className="p-4">Box Name:</span>
      <input
        className={`item-card-container-name m-2`}
        type={"text"}
        value={editableItem.name}
        onChange={(e: any) => handleEditItem("name", e)}
        placeholder={`Grouped Item Name`}
      ></input>
          <Row>
            <Col>
          <div className={`center-column`}>
            <span className="p-4">
              {editableItem.mainPicture ? "Main Image" : "NO MAIN IMAGE"}:
            </span>
            {editableItem.mainPicture ? (
              <img
                // src={props.item.mainPicture}
                src={`${appSettings.pictureURL}/${editableItem.mainPicture}`}
                alt={`${editableItem.name}-main-picture`}
                className={`item-card-image-main-edit`}
              ></img>
            ) : null}
          </div>
          </Col>
          <Col>

          {/* <div>
            <CloseIcon className={`delete-button-svg`} />
          </div> */}

            <Row>
            {editableItem.pictures.map((pictureURL, pIndex) => (
              <Col sm="3" className="border">
              <div key={pIndex} className={`space-between p-3`}>
                  <CloseIcon
                    className={`delete-button-svg`}
                    onClick={() => handleImageRemove(pIndex)}
                  />
                  <img
                    src={`${appSettings.pictureURL}/${pictureURL}`}
                    alt={`${editableItem.name}-alt-picture-${pIndex}`}
                    className={`item-card-image-small-edit`}
                  ></img>
                  <button  className="admin-button-small" onClick={() => changeMainPicture(pIndex)}>
                    Make Main Image
                  </button>
                <div>
                </div>
              </div>
              </Col>
            ))}
            </Row>
        </Col>
        </Row>
        {/* <button
          className={`general-button admin-button`}
          // onClick={() => setShowSearchContainer(!showSearchContainer)}
        >
          Add Image
        </button> */}
        <input
          className={`item-picture-upload general-button admin-button`}
          type="file"
          multiple
          accept="image/png, image/gif, image/jpeg"
          onChange={handlePictureAdd}
          disabled={!editableItem.name}
        ></input>
        <span className={`item-picture-upload-message`}>
          Please Enter Item Name First
        </span>

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
        <div className={`center`}>
          <Row>
            <Col>
          <span>Items Included:  </span>
          </Col>
          <Col xs="2">
          <button
            className={`general-button admin-button`}
            onClick={() => setShowSearchContainer(!showSearchContainer)}
          >
            {showSearchContainer ? "Cancel" : "Add Item"}
          </button>
          </Col>
          </Row>
          <Row>
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
          </Row>
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
        </div>
      </div>
      <br></br>
      <Row>
        <Col sm="4"></Col>
        <Col sm="2">
        <button className={`general-button admin-button p-2 px-4`} onClick={handleSave}>
          Save Item
        </button>
        </Col>
        <Col sm="2">
        <button
          className={`general-button admin-button p-2 px-4`}
          onClick={() => {
            setEditing(false);
            if (props.editing) {
              props.action("cancel", editableItem, props.index);
            }
          }}
        >
          Cancel
        </button>
        </Col>
      </Row>

      {!props.editing ? (
        <button
          className={`general-button admin-button delete-button`}
          onClick={handleDelete}
        >
          Delete Item
        </button>
      ) : null}
    </Col>
  ) : (
    <Col md="4" sm="6"
      className={`item-card-container p-4 ${
        !props.item.isActive ? "item-card-container-inactive" : ""
      }`}
    >
      <Row>
        <Col>
        <h3>
          {props.item.name} {!props.item.isActive ? ` - INACTIVE` : ""}
        </h3>
        </Col>
        <Col xs="3">
        <button
          className={`general-button admin-button`}
          onClick={() => setEditing(true)}
          disabled={!props.item.isActive}
        >
          Edit Item
        </button>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
        <Col>
            <img
              src={`${appSettings.pictureURL}/${props.item.mainPicture}`}
              alt={`${props.item.name}-main-picture`}
              className={`item-card-image-main`}
            ></img>
        </Col>
        <Col>
        </Col>
        </Row>
        <hr/>
        <Row>
        {props.item.pictures.slice(0, 4).map((pictureURL, pIndex) => (
          <Col sm="3">
            <img
              key={pIndex}
              src={`${appSettings.pictureURL}/${pictureURL}`}
              alt={`${props.item.name}-alt-picture-${pIndex}`}
              className={`item-card-image-small`}
            ></img>
          </Col>
        ))}
        </Row>
        <p>{props.item.description}</p>
        <Accordion>
          <Accordion.Item eventKey={props.item.name}>
            <Accordion.Header>
              <h4>Items</h4>
            </Accordion.Header>
            <Accordion.Body>
            <Row>
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
            </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
    </Col>
  );
}

export default AdminGroupedItemCard;
