export const NodeService = {
    getTreeTableNodesData() {
        return [
            {
                key: "1",
                data: {
                    code: "0123456789",
                    registerDate: "01/01/2020",
                    name: "Công ty TNHH ABC",
                    shortName: "ABC Co.",
                    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
                    phoneNumber: "028 1234 5678",
                    registeredCapital: "10.000.000.000",
                    size: "50-100",
                    type: "Hoạt động",
                },
            },
            {
                key: "2",
                data: {
                    code: "9876543210",
                    registerDate: "15/07/2019",
                    name: "Công ty Cổ phần XYZ",
                    shortName: "XYZ JSC",
                    address: "789 Đường Nguyễn Huệ, Quận 3, TP.HCM",
                    phoneNumber: "028 8765 4321",
                    registeredCapital: "50.000.000.000",
                    size: "100-200",
                    type: "Hoạt động",
                },
            },
            {
                key: "3",
                data: {
                    code: "1357924680",
                    registerDate: "30/11/2021",
                    name: "Công ty TNHH DEF",
                    shortName: "DEF Co.",
                    address: "246 Đường Võ Văn Tần, Quận 10, TP.HCM",
                    phoneNumber: "028 2468 1357",
                    registeredCapital: "15.000.000.000",
                    size: "10-50",
                    type: "Đình chỉ",
                },
            },
        ];
    },

    getTreeTableNodes() {
        return Promise.resolve(this.getTreeTableNodesData());
    },
};
