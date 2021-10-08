import React from "react";
import { Row, Col } from "react-bootstrap";
import { fetchRequest } from "../../App";
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

function AdminDashboard({ userFeatures }: { userFeatures: Array<string> }) {
  return (
    <Col>
      <Row>
        <Col className="page-header justify-content-center">
          <h3>Admin Dashboard</h3>
        </Col>
      </Row>

      {userFeatures.includes(appSettings.features.adminChargePayment) ? (
        <AdminMenuCard
          title={"Payments"}
          buttons={[{ text: "Charge Payments", link: "/admin/chargePayments" }]}
        />
      ) : null}

      {userFeatures.includes(appSettings.features.adminUpdateDBOrders) ? (
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
