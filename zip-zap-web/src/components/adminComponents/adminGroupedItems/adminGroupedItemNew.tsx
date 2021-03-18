import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { fetchRequest, UserContext } from "../../../App";
import { adminGroupedItem, adminItem } from "../../../classes";
import AdminGroupedItemCard from "../../basicComponents/adminComponents/adminGroupedItemCard";
import LoadingIcon from "../../basicComponents/LoadingIcon";
import { checkUserAdmin } from "../adminDashboard";

function AdminGroupedItemNew() {
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
  const [redirect, setRedirect] = useState("");

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
    } else {
      setLoading(false);
    }
  }, []);

  const handleItemAction = async (
    type: string,
    item: adminGroupedItem,
    index: number
  ) => {
    if (type === "cancel") {
      setRedirect("/admin/groupedItems");
      return true;
    }

    let updateResponse = await fetchRequest(user, `groupedItems`, "POST", item);

    if ("itemsID" in updateResponse && updateResponse.itemsID) {
      if (Object.keys(adminGroupedItems).length > 0) {
        item.groupedID = updateResponse.itemsID;
        adminGroupedItems[updateResponse.itemsID] = item;

        setAdminGroupedItems({ ...adminGroupedItems });
      }

      setRedirect("/admin/groupedItems");
    }
  };

  const [item, setItem] = useState({
    groupedID: 0,
    name: "",
    description: "",
    mainPicture: "",
    pictures: [],
    quantityAvailable: 0,
    isActive: true,
    itemsArray: [],
    priceOverride: 0,
  } as adminGroupedItem);

  return (
    <section className={`column center`}>
      {!loading && !admin ? <Redirect to={""} /> : null}
      {redirect ? <Redirect to={redirect} /> : null}

      <Link className={`general-button admin-button`} to={`/admin/dashboard`}>
        Back to Admin Dashboard
      </Link>

      <h1>New Item</h1>

      {loading ? (
        <LoadingIcon />
      ) : (
        <AdminGroupedItemCard
          index={0}
          item={item}
          action={handleItemAction}
          editing={true}
        />
      )}
    </section>
  );
}

export default AdminGroupedItemNew;
