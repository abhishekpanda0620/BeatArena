import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';

interface ShareButtonsProps {
  challengeCode: string;
  challengeUrl: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ challengeCode, challengeUrl }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(challengeUrl, { margin: 1, width: 180 })
      .then((url: string) => setQrDataUrl(url))
      .catch((err: unknown) => console.error('QR generation error', err));
  }, [challengeUrl]);

  const shareMessage = `Join my BeatArena challenge! Code: ${challengeCode}`;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* QR Code */}
      {qrDataUrl && (
        <Image
          src={qrDataUrl}
          alt="Challenge QR"
          width={180}
          height={180}
          className="rounded-md shadow-lg"
          unoptimized
        />
      )}

      {/* Native share fallback */}
      {/* Native share / Download */}
      {typeof navigator !== 'undefined' && 'share' in navigator ? (
        <button
          onClick={async () => {
            try {
              // Convert Data URL to Blob/File
              const response = await fetch(qrDataUrl);
              const blob = await response.blob();
              const file = new File([blob], 'challenge-qr.png', { type: 'image/png' });

              // Check if files are supported
              const canShareFile = navigator.canShare && navigator.canShare({ files: [file] });

              const shareData: ShareData = {
                title: 'BeatArena Challenge',
              };

              if (canShareFile) {
                // If sharing file, put URL in text (caption) and omit 'url' field
                shareData.files = [file];
                shareData.text = `${shareMessage} ${challengeUrl}`;
              } else {
                // Fallback to text/url share
                shareData.text = shareMessage;
                shareData.url = challengeUrl;
              }

              await navigator.share(shareData);
            } catch (e) {
              console.error('Share failed', e);
            }
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center gap-2"
        >
          <span>Share via device</span>
        </button>
      ) : (
        <a
          href={qrDataUrl}
          download="beatarena-challenge-qr.png"
          className="px-4 py-2 bg-neutral-700 text-white rounded-md hover:bg-neutral-600 transition flex items-center gap-2"
        >
          <span>Download QR Code</span>
        </a>
      )}

      {/* Social buttons */}
      <div className="flex space-x-2">
        <WhatsappShareButton url={challengeUrl} title={shareMessage}>
          <WhatsappIcon size={36} round />
        </WhatsappShareButton>
        <FacebookShareButton url={challengeUrl}>
          <FacebookIcon size={36} round />
        </FacebookShareButton>
        <TelegramShareButton url={challengeUrl} title={shareMessage}>
          <TelegramIcon size={36} round />
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
