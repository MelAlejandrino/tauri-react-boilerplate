use crate::supabase::auth::auth_service;
use crate::supabase::models::Profile;
use crate::supabase::Supabase;

impl Supabase {
    pub async fn get_all_profiles(&self, token: &str) -> Result<Vec<Profile>, String> {
        let user_id = auth_service().get_user_id(token).await?;
        let res = self
            .db
            .from("profiles")
            .auth(token)
            .select("*")
            .neq("id", user_id.to_string())
            .execute()
            .await
            .map_err(|e| e.to_string())?;

        let status = res.status();
        if !status.is_success() {
            let text = res.text();
            let err_text = text.await.unwrap_or_default();
            return Err(format!("Profiles fetch failed ({}): {}", &status, err_text));
        }

        let text = res.text().await.map_err(|e| e.to_string())?;

        let profiles: Vec<Profile> = serde_json::from_str(&text).map_err(|e| e.to_string())?;

        Ok(profiles)
    }
}
