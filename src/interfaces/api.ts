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

interface BusinessDataApiRequest {
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
    owner_id: string;
    legal_representative: string;
    created_at: string;
    status: string;
}

export type { BusinessDataApi, BusinessDataApiRequest };
