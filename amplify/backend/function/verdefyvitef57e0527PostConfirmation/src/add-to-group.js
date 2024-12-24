const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient({});

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  if (!event.request.userAttributes["custom:usergroup"]) {
    const err = new Error("groupname are required");
    err.statusCode = 400;
    return console.log("Error happened", err);
  }
  const groupParams = {
    GroupName: event.request.userAttributes["custom:usergroup"],
    UserPoolId: event.userPoolId,
  };
  const addUserParams = {
    GroupName: event.request.userAttributes["custom:usergroup"], //your confirmed user gets added to this group
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  /**
   * Check if the group exists; if it doesn't, create it.
   */
  try {
    await cognitoIdentityServiceProvider.send(new GetGroupCommand(groupParams));
  } catch (e) {
    await cognitoIdentityServiceProvider.send(new CreateGroupCommand(groupParams));
  }
  /**
   * Then, add the user to the group.
   */
  await cognitoIdentityServiceProvider.send(new AdminAddUserToGroupCommand(addUserParams));

  return event;
};
