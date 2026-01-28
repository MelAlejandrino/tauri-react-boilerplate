use crate::supabase::client::Supabase;
use supabase_auth::models::User;

pub async fn get_user_data(supabase: &Supabase, token: &str) -> Result<User, String> {
    supabase.get_user(token).await
}
