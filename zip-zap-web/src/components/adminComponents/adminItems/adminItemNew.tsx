import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { fetchRequest, UserContext } from "../../../App";
import { adminItem } from "../../../classes";
import AdminItemCard from "../../basicComponents/adminComponents/adminItemCard";
import LoadingIcon from "../../basicComponents/LoadingIcon";
import { checkUserAdmin } from "../adminDashboard";

function AdminItemNew() {
  const { user, admin, setAdmin, adminItems, setAdminItems } = useContext(
    UserContext
  );
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
    item: adminItem,
    index: number
  ) => {
    if (type === "cancel") {
      setRedirect("/admin/items");
      return true;
    }

    let updateResponse = await fetchRequest(user, `items`, "POST", item);

    if ("itemsID" in updateResponse && updateResponse.itemsID) {
      if (Object.keys(adminItems).length > 0) {
        item.itemID = updateResponse.itemsID;
        adminItems[updateResponse.itemsID] = item;
        setAdminItems({ ...adminItems });
      }

      setRedirect("/admin/items");
    }
  };

  const [item, setItem] = useState({
    itemID: 0,
    name: "",
    description: "",
    mainPicture: "",
    price: 0,
    quantity: 0,
    pictures: [],
    quantityAvailable: 0,
    isActive: true,
  } as adminItem);

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
        <AdminItemCard
          index={0}
          item={item}
          action={handleItemAction}
          editing={true}
        />
      )}
    </section>
  );
}

export default AdminItemNew;
