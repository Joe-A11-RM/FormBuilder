import { Button } from "antd";
import React from "react";

export default function AntButton({ item, activeInput }) {
  return (
    <>
      <Button htmlType={item?.btnType} key={activeInput} style={item?.css}>
        {item?.title}
      </Button>
    </>
  );
}
