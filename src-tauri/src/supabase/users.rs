use crate::supabase::client::Supabase;
use crate::supabase::models::{Profile, UserFinal};
use supabase_auth::models::AuthClient;

pub async fn get_user_data(supabase: &Supabase, token: &str) -> Result<UserFinal, String> {
    supabase.get_user_with_profile(token).await
}

pub async fn get_all_profiles(
    supabase: &Supabase,
    token: &str,
    auth_client: &AuthClient,
) -> Result<Vec<Profile>, String> {
    supabase.get_all_profiles(token, auth_client).await
}
