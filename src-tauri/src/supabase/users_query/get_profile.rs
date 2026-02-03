use crate::supabase::models::Profile;
use crate::supabase::Supabase;
use serde_json::json;

impl Supabase {
    pub async fn get_profile(&self, token: &str) -> Result<Option<Profile>, String> {
        let params = json!({}).to_string();

        let res = self
            .db
            .rpc("get_my_profile", &params)
            .auth(token)
            .single()
            .execute()
            .await
            .map_err(|e| format!("Request failed: {}", e))?;

        let status = res.status();

        if !status.is_success() {
            let err_text = res.text().await.unwrap_or_default();
            return Err(format!("Profile fetch failed ({}): {}", status, err_text));
        }

        let text = res.text().await.map_err(|e| e.to_string())?;
        if text.trim().is_empty() || text.trim() == "null" {
            return Ok(None);
        }

        let profile: Profile = serde_json::from_str(&text)
            .map_err(|e| format!("JSON parse error: {}\nRaw body: {}", e, text))?;

        Ok(Some(profile))
    }
}
