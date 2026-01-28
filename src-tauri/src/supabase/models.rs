use serde::Deserialize;
use serde::Serialize;
use supabase_auth::models::User;

#[derive(Debug, Serialize, Deserialize)]
pub struct Profile {
    pub id: uuid::Uuid,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub full_name: Option<String>,
    pub address: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct UserWithProfile {
    pub user: User,
    pub profile: Option<Profile>,
}

#[derive(Debug, Serialize)]
pub struct UserFinal {
    pub id: uuid::Uuid,
    pub email: String,
    pub full_name: Option<String>,
}
