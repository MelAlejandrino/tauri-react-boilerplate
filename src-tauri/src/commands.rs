use crate::supabase::auth;
use crate::supabase::models::{Profile, UserFinal};
use crate::supabase::users;
use crate::AppState;
use tauri::App;

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

#[tauri::command]
pub async fn get_all_profiles(
    state: tauri::State<'_, AppState>,
    token: String,
) -> Result<Vec<Profile>, String> {
    let supabase = &state.supabase;
    users::get_all_profiles(supabase, &token).await
}
