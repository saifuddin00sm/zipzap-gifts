import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { fetchRequest, UserContext } from "../../../App";
import { adminGroupedItem } from "../../../classes";
import AdminGroupedItemCard from "../../basicComponents/adminComponents/adminGroupedItemCard";
import LoadingIcon from "../../basicComponents/LoadingIcon";
import { checkUserAdmin } from "../adminDashboard";
import { putImageURLGrouped } from "./adminGroupedItemNew";

function AdminGroupedItemsList() {
  const {
    user,
    setUserFeatures,
    admin,
    setAdmin,
    adminItems,
    setAdminItems,
    adminGroupedItems,
    setAdminGroupedItems,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const getAdminUser = async () => {
    const { allowed, userFeatures } = await checkUserAdmin(user);

    if (allowed) {
      setAdmin(allowed);
    }

    if (userFeatures.length > 0) {
      setUserFeatures(userFeatures);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!admin && "email" in user) {
      getAdminUser();
    } else if (admin) {
      if (Object.keys(adminItems).length === 0) {
        getItems();
      }

      if (Object.keys(adminGroupedItems).length === 0) {
        getGroupedItems();
      } else if (Object.keys(adminGroupedItems).length > 0) {
        setSearchItems(Object.keys(adminGroupedItems));
      }

      setLoading(false);
    } else {
      if (Object.keys(adminGroupedItems).length > 0) {
        setSearchItems(Object.keys(adminGroupedItems));
      }

      setLoading(false);
    }
  }, []);

  const [searchItems, setSearchItems] = useState([] as Array<string>);
  const getItems = async () => {
    let response = await fetchRequest(user, "items?admin=true", "GET");

    if ("items" in response) {
      setAdminItems(response.items);
      // setSearchItems(response.items);
    }

    // setLoading(false);
  };

  const getGroupedItems = async () => {
    let response = await fetchRequest(user, "groupedItems", "GET");

    if ("items" in response) {
      setAdminGroupedItems(response.items);
      setSearchItems(Object.keys(response.items));
    }

    setLoading(false);
  };

  const handleItemAction = async (
    type: string,
    item: adminGroupedItem,
    index: number,
    imageFiles?: FileList
  ) => {
    let updateResponse = {} as any;
    if (type === "save") {
      let errors = [] as Array<string>;
      if (type === "save" && imageFiles) {
        console.log("yo", imageFiles);

        let fileLoop = Object.keys(imageFiles).map(async (key, kIndex) => {
          let itemResponse = await putImageURLGrouped(
            user,
            imageFiles[parseInt(key)],
            item,
            kIndex
          );

          if (itemResponse.errors) {
            errors.push(itemResponse.errors);
            return;
          }
          item = itemResponse.item;

          let fileTempURL = itemResponse.fileTempURL;

          item.pictures.push(fileTempURL.itemPath);

          if (!item.mainPicture) {
            item.mainPicture = fileTempURL.itemPath;
          }
        });

        await Promise.all(fileLoop);
      }

      updateResponse = await fetchRequest(
        user,
        `groupedItems/${item.groupedID}`,
        "PUT",
        item
      );
    } else if (type === "delete") {
      updateResponse = await fetchRequest(
        user,
        `groupedItems/${item.groupedID}`,
        "DELETE",
        item
      );
    }

    if ("itemsID" in updateResponse && updateResponse.itemsID) {
      if (adminGroupedItems[item.groupedID]) {
        adminGroupedItems[item.groupedID] = item;
        setAdminGroupedItems({ ...adminGroupedItems });

        setSearchItems([...Object.keys(adminGroupedItems)]);
      }
    }
  };

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      let searchTerm = e.target.value.toLowerCase();

      let newList = Object.keys(adminGroupedItems);
      if (searchTerm) {
        newList = Object.keys(adminGroupedItems).filter((itemKey) => {
          let item = adminGroupedItems[itemKey];
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

  return (
    <Col>
      {!loading && !admin ? <Redirect to={""} /> : null}
      <Row>
        <Col className="page-header justify-content-center">
          <h3>Grouped Items</h3>
        </Col>
      </Row>
      <Row className="m-2">
        <Col>
          <Link
            className={`general-button admin-button`}
            to={`/admin/dashboard`}
          >
            Back to Admin Dashboard
          </Link>
        </Col>

        <Col>
          <Link
            className={`general-button admin-button m-2`}
            to={`/admin/groupedItems/new`}
          >
            Add New Grouped Item
          </Link>
        </Col>
      </Row>
      <Row className="m-2">
        <input
          className={`general-input`}
          placeholder={`Search for Item`}
          onKeyPress={handleSearch}
        ></input>
      </Row>
      <Row className="m-4">
        {loading ? (
          <LoadingIcon />
        ) : (
          searchItems.map((item, iIndex) => (
            <AdminGroupedItemCard
              key={iIndex}
              index={iIndex}
              item={adminGroupedItems[item]}
              action={handleItemAction}
            />
          ))
        )}
      </Row>
    </Col>
  );
}

export default AdminGroupedItemsList;
