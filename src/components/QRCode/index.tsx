import Styles from "./QRCode.module.css";

export interface Props {
  codeURL: string;
}

export default function QRCode({ codeURL }: Props) {
  return (
    <div className={Styles["qr-code"]}>
      <img src={codeURL} alt="QR Code" />
    </div>
  );
}
