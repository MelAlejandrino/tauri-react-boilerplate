use crate::supabase::client::Supabase;
use reqwest::Client;
use supabase_auth::models::User;

impl Supabase {
    pub async fn get_user(&self, token: &str) -> Result<User, String> {
        let url = format!("{}/auth/v1/user", self.url);

        let res = Client::new()
            .get(url)
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
}
