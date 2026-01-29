use crate::supabase::client::Supabase;
use crate::supabase::models::{Profile, UserFinal, UserWithProfile};
use serde_json::json;
use supabase_auth::models::User;

impl Supabase {
    pub async fn get_user(&self, token: &str) -> Result<User, String> {
        let url = format!("{}/auth/v1/user", self.url);

        let res = self
            .auth_client
            .get(&url)
            .header("apikey", &self.anon_key)
            .header("Authorization", format!("Bearer {}", token))
            .send()
            .await
            .map_err(|e| e.to_string())?;

        if !res.status().is_success() {
            return Err(res.text().await.unwrap_or("Auth error".into()));
        }

        let user: User = res.json::<User>().await.map_err(|e| e.to_string())?;
        Ok(user)
    }

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

    pub async fn get_user_with_profile(&self, token: &str) -> Result<UserFinal, String> {
        let user = self.get_user(token).await?;

        let profile_opt = self.get_profile(token).await?;

        let profile = profile_opt.ok_or_else(|| "User profile not found".to_string())?;

        Ok(UserFinal {
            id: user.id,
            email: user.email,
            full_name: profile.full_name,
        })
    }

    pub async fn get_all_profiles(&self, token: &str) -> Result<Vec<Profile>, String> {
        let res = self
            .db
            .from("profiles")
            .auth(token)
            .select("*")
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
