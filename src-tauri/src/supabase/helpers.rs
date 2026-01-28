use crate::supabase::client::Supabase;
use crate::supabase::models::{Profile, UserFinal, UserWithProfile};
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

        res.json::<User>().await.map_err(|e| e.to_string())
    }

    pub async fn get_profile(&self, token: &str) -> Result<Option<Profile>, String> {
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
            if status.as_u16() == 406 || status.as_u16() == 404 {
                return Err(res.text().await.unwrap_or("Auth error".into()));
            }
            let err_text = res.text().await.unwrap_or_default();
            return Err(format!("Profile fetch failed ({}): {}", status, err_text));
        }

        let text = res.text().await.map_err(|e| e.to_string())?;

        if let Ok(profile) = serde_json::from_str::<Profile>(&text) {
            return Ok(Some(profile));
        }

        let profiles: Vec<Profile> =
            serde_json::from_str(text.as_str()).map_err(|e| e.to_string())?;

        Ok(profiles.into_iter().next())
    }

    pub async fn get_user_with_profile(&self, token: &str) -> Result<UserFinal, String> {
        let user = self.get_user(token).await?; // returns User
        let profile = self.get_profile(token).await?; // returns Profile

        Ok(UserFinal {
            id: user.id,
            email: user.email,
            full_name: profile.unwrap().full_name,
        })
    }
}
