'use client';
import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CustomSelect, CustomSelectItem } from './CustomSelect';

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
        <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg">
            <CardHeader>
                <CardTitle>QR Code Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="text">Content</Label>
                    <Input
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter URL or text"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="size">Size: {size}px</Label>
                    </div>
                    <Slider
                        id="size"
                        min={128}
                        max={512}
                        step={8}
                        value={[size]}
                        onValueChange={(value) => setSize(value[0])}
                    />
                </div>

                {/* Form controls with fixed height container */}
                <div style={{ minHeight: '240px' }}>
                    <div className="space-y-2 relative">
                        <Label htmlFor="level">Error Correction Level</Label>
                        <CustomSelect
                            id="level"
                            value={level}
                            onValueChange={setLevel}
                            className="w-[180px]"
                        >
                            <CustomSelectItem value="L">Low (7%)</CustomSelectItem>
                            <CustomSelectItem value="M">Medium (15%)</CustomSelectItem>
                            <CustomSelectItem value="Q">Quartile (25%)</CustomSelectItem>
                            <CustomSelectItem value="H">High (30%)</CustomSelectItem>
                        </CustomSelect>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="fgColor">Foreground Color</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="color"
                                    id="fgColor"
                                    value={fgColor}
                                    onChange={(e) => setFgColor(e.target.value)}
                                    className="w-12 h-8 p-1"
                                />
                                <Input
                                    value={fgColor}
                                    onChange={(e) => setFgColor(e.target.value)}
                                    className="flex-1"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bgColor">Background Color</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="color"
                                    id="bgColor"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-12 h-8 p-1"
                                />
                                <Input
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="flex-1"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                        <Switch
                            id="includeMargin"
                            checked={includeMargin}
                            onCheckedChange={setIncludeMargin}
                        />
                        <Label htmlFor="includeMargin">Include Margin</Label>
                    </div>
                </div>

                {/* Fixed size container for QR code */}
                <div className="flex justify-center mt-4">
                    <div
                        className="bg-white p-2 rounded-lg border flex items-center justify-center"
                        style={{
                            height: size + 16,
                            width: size + 16,
                            margin: '0 auto'
                        }}
                    >
                        <QRCodeCanvas
                            id="qr-code"
                            value={text || "https://example.com"}
                            size={size}
                            bgColor={bgColor}
                            fgColor={fgColor}
                            includeMargin={includeMargin}
                            level={level}
                            ref={qrRef}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={downloadQR} className="w-full download-btn">
                    Download QR Code
                </Button>
            </CardFooter>
        </Card>
    );
};

export default QRGenerator;