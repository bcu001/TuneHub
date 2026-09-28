const passwordResetTemplate = (resetLink, name) => {
    return {
        subject: "Reset Your Password",
        text: `Hi ${name},

We received a request to reset your password.

Click the link below to create a new password:
${resetLink}

This link will expire in 15 minutes.

If you didn’t request a password reset, you can safely ignore this email.

Thanks,
TuneHub Team`,
    };
};
export default passwordResetTemplate;