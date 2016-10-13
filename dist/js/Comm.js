"use strict";
var CommPort = (function () {
    function CommPort(device) {
        this.device_ = device;
    }
    CommPort.prototype.connect = function () {
        var _this = this;
        var readLoop = function () {
            _this.device_.transferIn(5, 64).then(function (result) {
                _this.onReceive(result.data);
                readLoop();
            }, function (error) {
                _this.onReceiveError(error);
            });
        };
        return this.device_.open()
            .then(function () {
            if (_this.device_.configuration === null) {
                return _this.device_.selectConfiguration(1);
            }
        })
            .then(function () { return _this.device_.claimInterface(2); })
            .then(function () { return _this.device_.controlTransferOut({
            'requestType': 'class',
            'recipient': 'interface',
            'request': 0x22,
            'value': 0x01,
            'index': 0x02 }); })
            .then(function () {
            readLoop();
        });
    };
    CommPort.prototype.disconnect = function () {
        var _this = this;
        return this.device_.controlTransferOut({
            'requestType': 'class',
            'recipient': 'interface',
            'request': 0x22,
            'value': 0x00,
            'index': 0x02 })
            .then(function () { return _this.device_.close(); });
    };
    ;
    CommPort.prototype.send = function (data) {
        return this.device_.transferOut(4, data);
    };
    ;
    return CommPort;
}());
var Comm = (function () {
    function Comm() {
    }
    Comm.prototype.getPorts = function () {
        return navigator.usb.getDevices().then(function (devices) {
            return devices.map(function (device) { return new CommPort(device); });
        });
    };
    Comm.prototype.requestPort = function () {
        var filters = [
            { 'vendorId': 0x2341, 'productId': 0x8036 },
            { 'vendorId': 0x2341, 'productId': 0x8037 },
        ];
        return navigator.usb.requestDevice({ 'filters': filters }).then(function (device) { return new CommPort(device); });
    };
    return Comm;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Comm;
;
//# sourceMappingURL=Comm.js.map