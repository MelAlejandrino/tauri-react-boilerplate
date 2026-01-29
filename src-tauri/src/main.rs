// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::supabase::client::Supabase;
use dotenvy::dotenv;
use std::env;
use supabase_auth::models::AuthClient;

mod commands;
mod supabase;

struct AppState {
    supabase: Supabase,
    auth_client: AuthClient,
}

fn main() {
    dotenv().ok();

    let url = env::var("SUPABASE_URL").expect("SUPABASE_URL missing");
    let key = env::var("SUPABASE_ANON_KEY").expect("SUPABASE_ANON_KEY missing");
    let jwt_secret = env::var("SUPABASE_JWT_SECRET").expect("SUPABASE_JWT_SECRET missing");

    println!("Loaded Supabase URL: {}", &url);
    println!("Loaded Anon Key (first 10 chars): {}", &key[..10]);
    println!("Loaded Supabase JWT: {}", &jwt_secret);

    let auth_client = AuthClient::new(&url, &key, &jwt_secret);
    let supabase = Supabase::new(url, key);

    let app_state = AppState {
        supabase,
        auth_client,
    };

    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            commands::sign_in,
            commands::get_user_data,
            commands::get_all_profiles,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
