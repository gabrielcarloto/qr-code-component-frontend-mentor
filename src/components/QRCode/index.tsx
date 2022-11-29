import { useRef } from 'preact/hooks';
import * as htmlToImage from 'html-to-image';

import DownloadIcon from '@assets/download.svg?url';
import Styles from './QRCode.module.css';

export interface Props {
  codeURL: string;
}

export default function QRCode({ codeURL }: Props) {
  const qrcode = useRef<HTMLDivElement>(null);
  const downloadButton = useRef<HTMLButtonElement>(null);

  const downloadImage = async () => {
    downloadButton.current!.style.display = 'none';
    const dataUrl = await htmlToImage.toPng(qrcode.current!);
    downloadButton.current!.style.display = 'block';

    const link = document.createElement('a');

    link.download = 'qrcode.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div ref={qrcode} className={Styles['qr-code-wrapper']}>
      <div className={Styles['qr-code']}>
        <img src={codeURL} alt="QR Code" />
      </div>
      <button
        ref={downloadButton}
        onClick={downloadImage}
        className={Styles.download}
        title="Download the QR Code"
      >
        <img src={DownloadIcon} alt="" />
      </button>
    </div>
  );
}
