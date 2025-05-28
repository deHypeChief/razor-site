const swaggerConfig = {
    path: "/apis",
    documentation: {
        info: {
            title: 'Huttspot Documentation',
            version: '1.0.1'
        },
        tags: [
            { name: 'Auth Session', description: 'Authentication endpoints, and auth stauts retreival' },
            { name: 'User', description: 'Endpoint for user action' },
            { name: 'Admin', description: 'Endpoint for admin action' },
            { name: 'Notifications', description: 'Endpoint for notifications a verifyed auth is required' },
            { name: 'OTP', description: 'Sending and verifying of OTP tokens for email and 2FA' },
            { name: 'Transaction', description: 'Geting all transaction data for admin and user' },
            { name: 'Wallet', description: 'Wallet managemnet' },
            { name: 'Space', description: 'Create and mange spaces' },
        ]
    }
}
export default swaggerConfig