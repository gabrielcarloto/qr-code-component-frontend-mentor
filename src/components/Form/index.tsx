import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import * as QRCodeGen from "qrcode";
import Button from "../Button";
import QRCode from "../QRCode";

import Styles from "./Form.module.css";

type FormData = { ["qrcode-text"]: string };

const options: QRCodeGen.QRCodeToDataURLOptions = {
  type: "image/webp",
  scale: 8,
  color: {
    dark: "#ffffffff",
    light: "00000000",
  },
};

export default function Form() {
  const [qrCode, setQRCode] = useState<string>();
  const inputId = useId();

  const { register, handleSubmit } = useForm<FormData>();

  const generateQR = (data: FormData) => {
    QRCodeGen.toDataURL(data["qrcode-text"], options, (err, url) => {
      if (err) throw err;
      setQRCode(url);
    });
  };

  return (
    <>
      {qrCode ? <QRCode codeURL={qrCode} /> : null}
      <h1 className={Styles.title}>Create a QR Code</h1>
      <form className={Styles.form} onSubmit={handleSubmit(generateQR)}>
        <label className={Styles.form__label} htmlFor={inputId}>
          Text
        </label>
        <input
          className={Styles["form__input"]}
          id={inputId}
          placeholder="Type in your text or url"
          required
          type="text"
          {...register("qrcode-text", { required: true })}
        />
        <Button children="Generate" />
      </form>
    </>
  );
}
