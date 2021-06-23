import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { fetchRequest, UserContext } from "../../../App";
import { adminGroupedItem, adminItem } from "../../../classes";
import AdminGroupedItemCard from "../../basicComponents/adminComponents/adminGroupedItemCard";
import LoadingIcon from "../../basicComponents/LoadingIcon";
import { checkUserAdmin } from "../adminDashboard";

function AdminGroupedItemsList() {
  const {
    user,
    admin,
    setAdmin,
    adminItems,
    setAdminItems,
    adminGroupedItems,
    setAdminGroupedItems,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const getAdminUser = async () => {
    const { allowed } = await checkUserAdmin(user);

    if (allowed) {
      setAdmin(allowed);
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
    let response = await fetchRequest(user, "items", "GET");

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
    index: number
  ) => {
    let updateResponse = {} as any;
    if (type === "save") {
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
    <section className={`column center`}>
      {!loading && !admin ? <Redirect to={""} /> : null}

      <Link className={`general-button admin-button`} to={`/admin/dashboard`}>
        Back to Admin Dashboard
      </Link>

      <h1>Grouped Items</h1>

      <div className={`column center width-90`}>
        <input
          className={`general-input`}
          placeholder={`Search for Item`}
          onKeyPress={handleSearch}
        ></input>
        <Link
          className={`general-button admin-button`}
          to={`/admin/groupedItems/new`}
        >
          Add New Grouped Item
        </Link>
      </div>

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
    </section>
  );
}

export default AdminGroupedItemsList;
