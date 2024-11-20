interface BusinessDataApi {
    address: string;
    chartered_capital: string;
    code: string;
    created_at: string;
    email: string;
    fax: string;
    latitude: number;
    legal_representative: string;
    longitude: number;
    name_acronym: string;
    name_english: string;
    name_vietnamese: string;
    owner_id: string;
    phone: string;
    status: string;
    type_of_organization: string;
    updated_at: string;
    website: string;
}

interface Person {
    id: string;
    citizen_id: string;
    name: string;
    birth_date: string;
    gender: string;
    nationality: string;
    religion: string;
    type_of_certificate: string;
    issued_by: string;
    issued_date: string;
    hometown: string;
    current_address: string;
    created_at: string;
};

interface BusinessDataApiRequest {
    id: string;
    code: string;
    name_vietnamese: string;
    name_english: string;
    name_acronym: string;
    address: string;
    email: string;
    phone: string;
    fax: string;
    website: string;
    chartered_capital: string;
    type_of_organization: string;
    owner: Person;
    legal_representative: Person;
    created_at: string;
    status: string;
    number_of_employees: number;
}

interface EmployeeDataApi {
    citizen_id: string;
    name: string;
    position: string;
    phone: string;
    start_date: string;
    created_at: string;
    updated_at: string;
}

interface LicenseDataApi {
    type: string;
    licenses: LicenseOfType[];
}

interface LicenseOfType {
    id: string;
    status: string;
    name: string;
    file: string;
}

interface BusinessLicenseDataApi {
    id: string;
    status: string;
    type: string;
    name: string;
    file: string;
    size: number;
    company: string;
    address: string;
    updated_at: string;
}

interface EmployeeInfo {
    id: string;
    name: string;
    citizen_id: string;
    position: string;
    start_date: string;
    phone: string;
    updated_at: string;
}

interface BusinessMap {
    code: string;
    name_vietnamese: string;
    address: string;
    type_of_organization: string;
    latitude: number;
    longitude: number;
    status: string;
    created_at: Date;
    number_of_employees: number;
    license_status: string[];
}


export type { BusinessDataApi, BusinessDataApiRequest, EmployeeDataApi, LicenseDataApi, BusinessLicenseDataApi, EmployeeInfo, BusinessMap, LicenseOfType };
