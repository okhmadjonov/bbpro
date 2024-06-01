import { SelectedDataInterface } from "@/Components/Types";
import { ColorPicker, Modal } from "@/ui";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { Form } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
interface Props {
  selectedData: SelectedDataInterface;
  setSelectedData: React.Dispatch<React.SetStateAction<SelectedDataInterface>>;
  refetchGetApi: () => void;
}
interface HSVColor {
  h: number; // Hue value between 0 and 1
  s: number; // Saturation value between 0 and 1
  v: number; // Value (brightness) value between 0 and 1
}

const ColorModal = ({
  selectedData,
  setSelectedData,
  refetchGetApi,
}: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const slug = router?.query?.id;
  const onFinish = (values: any) => {
    const hexColor = hsvToHex(values.colorId.metaColor.originalInput);
    appendData({ productId: slug, key: hexColor });
  };

  const { appendData, isLoading } = useQueryApiClient({
    request: {
      url: selectedData.data ? `/Colors?id=${selectedData.data.id}` : "/Colors",
      method: selectedData.method,
    },
    onSuccess(response, passOnSuccess) {
      setSelectedData({ type: "default" });
      refetchGetApi();
    },
  });

  useEffect(() => {
    if (selectedData.data) {
      form.setFieldValue("colorId", selectedData.data.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData.data]);

  function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
    let r: number = 0,
      g: number = 0,
      b: number = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  function rgbToHex(r: number, g: number, b: number): string {
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }

  function hsvToHex(hsv: HSVColor): string {
    const [r, g, b] = hsvToRgb(hsv.h, hsv.s, hsv.v);
    return rgbToHex(r, g, b);
  }

  return (
    <Modal
      onOk={() => form.submit()}
      onCancel={() => setSelectedData({ type: "default" })}
      width={400}
      open={
        selectedData.name === "color" &&
        (selectedData.type === "edit" || selectedData.type === "create")
      }
      confirmLoading={isLoading}
    >
      <Form form={form} onFinish={onFinish}>
        <ColorPicker name="colorId" />
      </Form>
    </Modal>
  );
};

export default ColorModal;
