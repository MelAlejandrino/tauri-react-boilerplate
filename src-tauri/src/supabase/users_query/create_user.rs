use crate::supabase::auth::auth_service;
use crate::supabase::Supabase;
use supabase_auth::models::{EmailSignUpResult, User};

impl Supabase {
    pub async fn create_user(&self, email: &str, password: &str) -> Result<User, String> {
        let auth_client = auth_service().client();
        let res = auth_client
            .sign_up_with_email_and_password(email, password, None)
            .await
            .map_err(|e| e.to_string())?;

        match res {
            EmailSignUpResult::SessionResult(session) => {
                let user = auth_client
                    .get_user(&session.access_token)
                    .await
                    .map_err(|e| e.to_string())?;
                Ok(user)
            }
            EmailSignUpResult::ConfirmationResult(confirmation) => {
                Err("User must confirm email before logging in".to_string())
            }
        }
    }
}
