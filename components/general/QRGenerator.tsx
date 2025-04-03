'use client';
import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRGenerator = () => {
    const [text, setText] = useState('https://example.com');
    const [size, setSize] = useState(256);
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [fgColor, setFgColor] = useState('#000000');
    const [includeMargin, setIncludeMargin] = useState(true);
    const [level, setLevel] = useState<any>('L');
    const qrRef = useRef(null);

    const downloadQR = () => {
        const canvas = document.getElementById('qr-code') as HTMLCanvasElement | null;
        if (canvas) {
            const pngUrl = canvas
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');

            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'qrcode.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    return (
        <div className="qr-container">
            <div className="input-group">
                <div className="form-group">
                    <label htmlFor="text">Content:</label>
                    <input
                        type="text"
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Size:</label>
                    <input
                        type="number"
                        id="size"
                        min="128"
                        max="512"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="level">Error Correction Level:</label>
                    <select
                        id="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="form-control"
                    >
                        <option value="L">Low (7%)</option>
                        <option value="M">Medium (15%)</option>
                        <option value="Q">Quartile (25%)</option>
                        <option value="H">High (30%)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="fgColor">Foreground Color:</label>
                    <input
                        type="color"
                        id="fgColor"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bgColor">Background Color:</label>
                    <input
                        type="color"
                        id="bgColor"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group checkbox">
                    <input
                        type="checkbox"
                        id="includeMargin"
                        checked={includeMargin}
                        onChange={(e) => setIncludeMargin(e.target.checked)}
                    />
                    <label htmlFor="includeMargin">Include Margin</label>
                </div>
            </div>

            <div className="qr-output">
                <QRCodeCanvas
                    id="qr-code"
                    value={text || "https://example.com"}
                    size={size}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    level={level}
                    includeMargin={includeMargin}
                    ref={qrRef}
                />

                <button onClick={downloadQR} className="download-btn">
                    Download QR Code
                </button>
            </div>
        </div>
    );
};

export default QRGenerator;
