import QRGenerator from '@/components/general/QRGenerator';

export default function QRGeneratorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[90hv]">
            <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
            <QRGenerator />
        </div>
    )
}
