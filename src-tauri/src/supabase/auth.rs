use supabase_auth::models::AuthClient;

pub async fn sign_in(
    auth_client: &AuthClient,
    username: &str,
    password: &str,
) -> Result<String, String> {
    let session = auth_client
        .login_with_email(username, password)
        .await
        .map_err(|e| e.to_string())?;

    Ok(session.access_token)
}
