export enum STATUS_CODES {
    /// <summary>
    /// HTTP status code 200.
    /// </summary>
    OK = 200,

    /// <summary>
    /// HTTP status code 400.
    /// </summary>
    BAD_REQUEST = 400,

    /// <summary>
    /// HTTP status code 401.
    /// </summary>
    UN_AUTHORIZED = 401,

    /// <summary>
    /// HTTP status code 403.
    /// </summary>
    FORBIDDEN = 403,

    /// <summary>
    /// HTTP status code 404.
    /// </summary>
    NOT_FOUND = 404,

    /// <summary>
    /// HTTP status code 406.
    /// </summary>
    Status406NotAcceptable = 406,

    /// <summary>
    /// HTTP status code 422.
    /// </summary>
    UN_PROCESSABLE_ENTITY = 422,

    /// <summary>
    /// HTTP status code 500.
    /// </summary>
    INTERNAL_SERVER_ERROR = 500,
}