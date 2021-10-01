import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { fetchRequest, UserContext } from "../../../App";
import { adminItem } from "../../../classes";
import AdminItemCard from "../../basicComponents/adminComponents/adminItemCard";
import LoadingIcon from "../../basicComponents/LoadingIcon";
import { checkUserAdmin } from "../adminDashboard";

const putImageURL = async (
  user: any,
  file: any,
  item: adminItem,
  kIndex: number
) => {
  // let file = imageFiles[parseInt(key)];
  let errors = "";
  // let response = {errors:errors, item:item}
  let fileTypeSplit = file.name.split(".");
  let fileType = fileTypeSplit[fileTypeSplit.length - 1];

  let fileTempURL = await fetchRequest(
    user,
    `items/tempURL?pictureName=${`${item.name}-${
      item.pictures.length + 2 + kIndex
    }.${fileType}`}&itemType=${"item"}&itemName=${item.name}`,
    "GET"
  );

  // Example Response
  // { error: "", itemURL: "", itemPath: "" }

  if ("error" in fileTempURL && fileTempURL.error) {
    errors = `${fileTempURL.error} - Image:${kIndex + 1}`;
    // response.errors = errors
    return { errors, item, fileTempURL };
  }

  let fileUpload = await fetch(fileTempURL.itemURL, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return { uploaded: true, error: "" };
      } else {
        return { uploaded: false, error: "Please Contact Support" };
      }
    })
    .catch((err) => {
      return {
        uploaded: false,
        error: "Please Contact Support",
        errorDetails: err,
      };
    });

  if (fileUpload.error) {
    errors = `${fileTempURL.error} - Image:${kIndex + 1}`;
    // response.errors = errors
    return { errors, item, fileTempURL };
  }

  return { errors, item, fileTempURL };
};

function AdminItemNew() {
  const { user, setUserFeatures, admin, setAdmin, adminItems, setAdminItems } =
    useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState("");

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
    } else {
      setLoading(false);
    }
  }, []);

  const handleItemAction = async (
    type: string,
    item: adminItem,
    index: number,
    imageFiles?: FileList
  ) => {
    if (type === "cancel") {
      setRedirect("/admin/items");
      return true;
    }

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

    // TO-DO - Show Errors
    console.log("ERROR", errors, item);

    // return;

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

  const item = {
    itemID: 0,
    name: "",
    description: "",
    mainPicture: "",
    price: 0,
    quantity: 0,
    pictures: [],
    quantityAvailable: 0,
    isActive: true,
    detailFields: {},
    purchasedFrom: "",
    weight: 0,
    cost: 0,
    brandingAvailable: false,
  } as adminItem;

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

export { putImageURL };

export default AdminItemNew;
