const CONSTANTS = {
    PATH: {
        ROOT_PATH: "/",
        NOT_FOUND: "*",
        LOGIN_PATH: "/login",
        ATTACHMENTS_DOCUMENTS_PATH: "/attachments-documents",
        MAP_PATH: "/map",
        DOCS_PATH: "/docs",
        CONTACT_PATH: "/contact",   
        BUSINESS_PATH: "/business"
    },
    NAME_TOKEN: "token",
    STATUS_LOGIN: "status-login",
    LIMIT_POST: 5,
    INIT_POST: 0,
    DATE_DEFAULT: new Date().toISOString().split("T")[0],
};

export { CONSTANTS };