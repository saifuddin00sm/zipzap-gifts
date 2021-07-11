import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { fetchRequest, UserContext } from "../../../App";
import { adminItem } from "../../../classes";
import AdminItemCard from "../../basicComponents/adminComponents/adminItemCard";
import LoadingIcon from "../../basicComponents/LoadingIcon";
import { checkUserAdmin } from "../adminDashboard";
import { putImageURL } from "./adminItemNew";

function AdminItemsList() {
  const { user, setUserFeatures, admin, setAdmin, adminItems, setAdminItems } =
    useContext(UserContext);
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
    } else if (admin && Object.keys(adminItems).length === 0) {
      getItems(true);
    } else {
      setSearchItems(Object.keys(adminItems));
      setLoading(false);
    }
  }, []);

  const [searchItems, setSearchItems] = useState([] as Array<string>);
  const getItems = async (admin = false) => {
    let response = await fetchRequest(
      user,
      `items${admin ? "?admin=true" : ""}`,
      "GET"
    );

    if ("items" in response) {
      setAdminItems(response.items);
      setSearchItems(Object.keys(response.items));
    }

    setLoading(false);
  };

  const handleItemAction = async (
    type: string,
    item: adminItem,
    index: number,
    imageFiles?: FileList
  ) => {
    // TO-DO - LOADING
    // TO-DO - NOTE THAT IMAGE MIGHT NOT LOAD UNTIL REFRESH
    let updateResponse = {} as any;
    if (type === "save") {
      let errors = [] as Array<string>;
      if (type === "save" && imageFiles) {
        console.log("yo", imageFiles);

        let fileLoop = Object.keys(imageFiles).map(async (key, kIndex) => {
          let itemResponse = await putImageURL(
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

        let fileUploadResult = await Promise.all(fileLoop);
      }

      updateResponse = await fetchRequest(
        user,
        `items/${item.itemID}`,
        "PUT",
        item
      );
    } else if (type === "delete") {
      updateResponse = await fetchRequest(
        user,
        `items/${item.itemID}`,
        "DELETE",
        item
      );
    }

    if ("itemsID" in updateResponse && updateResponse.itemsID) {
      if (adminItems[item.itemID]) {
        adminItems[item.itemID] = item;
        setAdminItems({ ...adminItems });
        // setSearchItems([...Object.keys(adminItems)]);
      }
    }
  };

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
          } else if (item.purchasedFrom.toLowerCase().includes(searchTerm)) {
            return true;
          }
        });
      }

      setSearchItems([...newList]);
    }
  };

  return (
    <section className={`column center`}>
      {!loading && !admin ? <Redirect to={""} /> : null}

      <Link className={`general-button admin-button`} to={`/admin/dashboard`}>
        Back to Admin Dashboard
      </Link>

      <h1>Items</h1>

      <div className={`column center width-90`}>
        <input
          className={`general-input`}
          placeholder={`Search for Item`}
          onKeyPress={handleSearch}
        ></input>

        <Link className={`general-button admin-button`} to={`/admin/items/new`}>
          Add New Item
        </Link>
      </div>

      {loading ? (
        <LoadingIcon />
      ) : (
        searchItems.map((item, iIndex) => (
          <AdminItemCard
            key={iIndex}
            index={iIndex}
            item={adminItems[item]}
            action={handleItemAction}
          />
        ))
      )}
    </section>
  );
}

export default AdminItemsList;
