use crate::supabase::auth;
use crate::supabase::models::UserFinal;
use crate::supabase::users;
use crate::AppState;

#[tauri::command]
pub async fn sign_in(
    state: tauri::State<'_, AppState>,
    email: String,
    password: String,
) -> Result<String, String> {
    let auth_client = &state.auth_client;
    auth::sign_in(auth_client, &email, &password).await
}

#[tauri::command]
pub async fn get_user_data(
    state: tauri::State<'_, AppState>,
    token: String,
) -> Result<UserFinal, String> {
    let supabase = &state.supabase;
    users::get_user_data(supabase, &token).await
}
