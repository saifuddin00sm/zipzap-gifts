import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";

const S3Image = ({ s3key = "", component, ...props }) => {
  const [src, setSrc] = useState("data:,");
  useEffect(() => {
    const getImageURL = async () => {
      const url = await Storage.get(s3key);
      setSrc(url);
    };

    // Check if someone accidentally passed in a fully-qualified URL instead of an S3 Key
    const notS3Image = ["http://", "https://", "ftp://"].some((protocol) =>
      s3key.startsWith(protocol)
    );
    if (notS3Image) {
      setSrc(s3key);
    } else {
      getImageURL();
    }
  }, [s3key]);
  const Component = component;
  return <Component src={src} {...props} />;
};

export default S3Image;
