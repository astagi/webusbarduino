interface TransferResult {
    data: any;
}

interface UsbDevice extends EventTarget {
    configuration: any;
    transferIn(endpoint: number, bytes: number): Promise<TransferResult>;
    open(): Promise<void>;
    selectConfiguration(configNumber: number): Promise<void>;
    claimInterface(interfaceNumber: number): Promise<void>;
    controlTransferOut(obj: any): Promise<void>;
    transferOut(interfaceNumber: number, data: any): Promise<void>;
    close(): Promise<void>;
}

interface Usb extends EventTarget {
    getDevices(): Promise<UsbDevice[]>;
    requestDevice(filter: any): Promise<UsbDevice>;
}

interface Navigator {
    usb: Usb;
}
