const CONSTANTS = {
    PATH: {
        ROOT_PATH: "/",
        NOT_FOUND: "*",
        LOGIN_PATH: "/login",
        BUSINESS_LICENSE_PATH: "/business-license",
        MAP_PATH: "/map",
        DOCS_PATH: "/docs",
        CONTACT_PATH: "/contact",   
        BUSINESS_PATH: "/business",
        EDIT_BUSINESS_PATH: "/business/edit/",
        HELP_PATH: "/help",
    },
    NAME_TOKEN: "token",
    STATUS_LOGIN: "status-login",
    LIMIT_BUSINESS: 7,
    LIMIT_EMPLOYEES: 7,
    LIMIT_BUSINESS_LICENSE: 10,
    INIT_POST: 0,
    DATE_DEFAULT: new Date().toISOString().split("T")[0],
    DATE_DEFAULT_FORMAT: "DD/MM/YYYY",
    PAGE_DEFAULT: 1,
    LICENSE_TYPE: {
        BUSINESS: 'Giấy phép kinh doanh',
        SECURITY: 'Giấy phép ANTT',
        FIRE: 'Giấy phép PCCC',
    },
    ACCEPT_FILE: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
};

export { CONSTANTS };