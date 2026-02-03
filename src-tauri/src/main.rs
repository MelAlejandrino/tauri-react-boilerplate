// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::supabase::auth::{init_auth_service, AuthService};
use crate::supabase::client::Supabase;
use dotenvy::dotenv;
use std::env;
use std::sync::Arc;
use supabase_auth::models::AuthClient;

mod commands;
mod config;
mod supabase;

struct AppState {
    supabase: Supabase,
}

fn main() {
    dotenv().ok();

    let url = config::CONFIG.url();
    let key = config::CONFIG.key();
    let jwt_secret = config::CONFIG.jwt_secret();

    let auth_client = AuthClient::new(url, key, jwt_secret);
    let supabase = Supabase::new(url.to_string(), key.to_string());

    let app_state = AppState { supabase };

    init_auth_service(auth_client);

    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            commands::sign_in,
            commands::get_user_data,
            commands::get_all_profiles,
            commands::create_user
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
