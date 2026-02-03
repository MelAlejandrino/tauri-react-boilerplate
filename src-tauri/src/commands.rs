use crate::supabase::auth;
use crate::supabase::auth::{auth_service, AuthService};
use crate::supabase::models::{Profile, UserFinal};
use crate::supabase::users;
use crate::AppState;
use supabase_auth::models::User;

#[tauri::command]
pub async fn sign_in(email: String, password: String) -> Result<String, String> {
    auth::sign_in(&email, &password).await
}

#[tauri::command]
pub async fn get_user_data(
    state: tauri::State<'_, AppState>,
    token: String,
) -> Result<UserFinal, String> {
    let supabase = &state.supabase;
    users::get_user_data(supabase, &token).await
}

#[tauri::command]
pub async fn get_all_profiles(
    state: tauri::State<'_, AppState>,
    token: String,
) -> Result<Vec<Profile>, String> {
    let supabase = &state.supabase;
    users::get_all_profiles(supabase, &token).await
}

#[tauri::command]
pub async fn create_user(
    state: tauri::State<'_, AppState>,
    email: String,
    password: String,
) -> Result<User, String> {
    let supabase = &state.supabase;

    users::create_user(supabase, &email, &password).await
}
