const { CommunicationIdentityClient } = require('@azure/communication-identity');
const { voipKey } = require('../config/service.config')

module.exports = {
    generateToken: async (req, res) => {
        console.log("Generating Azure Communication Services Token...");
        // Instantiate the identity client
        const identityClient = new CommunicationIdentityClient(voipKey);
    
        // Issue an identity and an access token with a validity of 24 hours and the "voip" scope for the new identity
        let identityTokenResponse = await identityClient.createUserAndToken(["voip"]);
        // Get the token and its expiration date from the response
        ({token, expiresOn, user} = identityTokenResponse);

        return token;
    }
}