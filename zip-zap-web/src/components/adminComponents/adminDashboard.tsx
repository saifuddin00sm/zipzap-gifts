import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { fetchRequest, UserContext } from "../../App";
import {Row, Col} from 'react-bootstrap';
import LoadingIcon from "../basicComponents/LoadingIcon";
import AdminMenuCard from "./adminMenuCard";
import appSettings from "../../appSettings.json";

const checkUserAdmin = async (user: any) => {
  let functionResponse = { allowed: false, userFeatures: [] };
  let response = await fetchRequest(user, "admin/userCheck", "GET");

  if ("allowed" in response && response.allowed) {
    functionResponse.allowed = true;
  }

  if (
    "userFeatures" in response &&
    response.userFeatures &&
    response.userFeatures.length > 0
  ) {
    functionResponse.userFeatures = response.userFeatures;
  }

  return functionResponse;
};

function AdminDashboard() {
  const {
    user,
    admin,
    setAdmin,
    setUserFeatures,
    userFeatures: AppUserFeatures,
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
      setLoading(false);
    } else {
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
    <Col>
      <Row>
        <Col className="page-header justify-content-center">
          <h3>Admin Dashboard</h3>
        </Col>
      </Row>

      {AppUserFeatures.includes(appSettings.features.adminChargePayment) ? (
        <AdminMenuCard
          title={"Payments"}
          buttons={[{ text: "Charge Payments", link: "/admin/chargePayments" }]}
        />
      ) : null}

      {AppUserFeatures.includes(appSettings.features.adminUpdateDBOrders) ? (
        <AdminMenuCard
          title={"Import This Months Orders"}
          buttons={[{ text: "Import Orders", link: "/admin/dbOrders" }]}
        />
      ) : null}

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
    </Col>
  );
}

export { checkUserAdmin };
export default AdminDashboard;
