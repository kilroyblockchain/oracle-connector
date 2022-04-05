export const OBC_API = {
  CREATE_OBC_USER: '/admin/v1/Users',
  USER_ACTIVATION: '/admin/v1/Asserter',
  USER_DEACTIVATE: '/admin/v1/UserStatusChanger',
  GET_APP_INFO: '/admin/v1/Apps/.search',
  GET_APP_ROLE: '/admin/v1/AppRoles?filter=app.value eq ',
  GRANT_APP_ROLE: '/admin/v1/Grants',
  CHANGE_PASSWORD: '/admin/v1/UserPasswordChanger',
  INVOKE_CHAINCODE: '/bcsgw/rest/v1/transaction/invocation',
  QUERY_CHAINCODE: '/bcsgw/rest/v1/transaction/query',
};
