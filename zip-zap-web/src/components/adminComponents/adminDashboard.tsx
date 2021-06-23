import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { fetchRequest, UserContext } from "../../App";
import LoadingIcon from "../basicComponents/LoadingIcon";
import AdminMenuCard from "./adminMenuCard";

const checkUserAdmin = async (user: any) => {
  let functionResponse = { allowed: false };
  let response = await fetchRequest(user, "admin/userCheck", "GET");

  if ("allowed" in response && response.allowed) {
    functionResponse.allowed = true;
  }

  return functionResponse;
};

function AdminDashboard() {
  const { user, admin, setAdmin } = useContext(UserContext);
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
      setLoading(false);
    }
  }, []);

  return loading ? (
    <section>
      <LoadingIcon />
    </section>
  ) : !admin ? (
    <section>
      <Redirect to={""} />
    </section>
  ) : (
    <section className={`column center`}>
      <h1>Admin Dashboard</h1>
      <AdminMenuCard
        title={"Items"}
        buttons={[
          { text: "View All Items", link: "/admin/items" },
          { text: "Add New Item", link: "/admin/items/new" },
        ]}
      />

      <AdminMenuCard
        title={"Grouped Items"}
        buttons={[
          { text: "View All Grouped Items", link: "/admin/groupedItems" },
          { text: "Add New Grouped Item", link: "/admin/groupedItems/new" },
        ]}
      />

      <AdminMenuCard
        title={"This Week's Orders"}
        buttons={[{ text: "View Orders", link: "/admin/orders" }]}
      />
    </section>
  );
}

export { checkUserAdmin };
export default AdminDashboard;
