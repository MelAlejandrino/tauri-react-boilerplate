use once_cell::sync::OnceCell;
use std::sync::Arc;
use supabase_auth::models::AuthClient;
use uuid::Uuid;

pub async fn sign_in(username: &str, password: &str) -> Result<String, String> {
    let auth_client = auth_service().client();
    let session = auth_client
        .login_with_email(username, password)
        .await
        .map_err(|e| e.to_string())?;

    Ok(session.access_token)
}

static AUTH_SERVICE: OnceCell<AuthService> = OnceCell::new();

pub fn init_auth_service(auth_client: AuthClient) {
    let _ = AUTH_SERVICE.set(AuthService {
        auth_client: Arc::new(auth_client),
    });
}

pub fn auth_service() -> &'static AuthService {
    AUTH_SERVICE.get().expect("AuthService not initialized")
}

pub struct AuthService {
    auth_client: Arc<AuthClient>,
}

impl AuthService {
    pub async fn get_user_id(&self, token: &str) -> Result<Uuid, String> {
        let user = self
            .auth_client
            .get_user(token)
            .await
            .map_err(|e| e.to_string())?;
        Ok(user.id)
    }

    pub fn client(&self) -> &AuthClient {
        &self.auth_client
    }
}
